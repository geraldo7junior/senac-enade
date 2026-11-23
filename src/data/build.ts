import type { QuestaoDiscursiva, QuestaoObjetiva } from '../types';

const FONTE = 'Autoral SENAC ENADE (estilo ENADE)';
const area = (topico: string) => (topico === 'fg' ? 'FG' : 'CE') as 'FG' | 'CE';
type Dif = 1 | 2 | 3;

/** Questão objetiva simples: cada alternativa = [texto, explicação]. */
export function obj(
  id: string,
  topico: string,
  dificuldade: Dif,
  enunciado: string,
  alts: [string, string][],
  correta: number,
  conceito?: string,
): QuestaoObjetiva {
  return {
    id, topico, dificuldade, enunciado, correta, conceito,
    area: area(topico), tipo: 'objetiva', estilo: 'simples', fonte: FONTE,
    alternativas: alts.map(([texto, explicacao], i) => ({
      texto,
      explicacao: (i === correta ? 'Correta. ' : 'Incorreta. ') + explicacao,
    })),
  };
}

const AR_TEXTOS = [
  'As asserções I e II são proposições verdadeiras, e a II é uma justificativa correta da I.',
  'As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa correta da I.',
  'A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.',
  'A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.',
  'As asserções I e II são proposições falsas.',
];
const AR_VALORES: [boolean, boolean, boolean | null][] = [
  [true, true, true], [true, true, false], [true, false, null], [false, true, null], [false, false, null],
];

/** Questão de asserção-razão no formato clássico do ENADE. */
export function ar(
  id: string,
  topico: string,
  dificuldade: Dif,
  contexto: string,
  I: string,
  II: string,
  vI: boolean,
  vII: boolean,
  justifica: boolean,
  analise: string,
): QuestaoObjetiva {
  const correta = vI && vII ? (justifica ? 0 : 1) : vI ? 2 : vII ? 3 : 4;
  const enunciado =
    (contexto ? contexto + '\n\n' : '') +
    'Considerando o contexto, avalie as asserções a seguir e a relação proposta entre elas.\n\n' +
    `I. ${I}\n\nPORQUE\n\nII. ${II}\n\nA respeito dessas asserções, assinale a opção correta.`;
  return {
    id, topico, dificuldade, enunciado, correta,
    area: area(topico), tipo: 'objetiva', estilo: 'assercao-razao', fixa: true, fonte: FONTE,
    conceito: 'Asserção-razão: primeiro julgue cada asserção isoladamente; só avalie a relação “porque” se ambas forem verdadeiras.',
    alternativas: AR_TEXTOS.map((texto, i) => {
      if (i === correta) return { texto, explicacao: 'Correta. ' + analise };
      const [aI, aII, aJ] = AR_VALORES[i];
      const partes: string[] = [];
      if (aI !== vI) partes.push(`a asserção I é ${vI ? 'verdadeira' : 'falsa'}`);
      if (aII !== vII) partes.push(`a asserção II é ${vII ? 'verdadeira' : 'falsa'}`);
      if (partes.length === 0 && aJ !== null && aJ !== justifica)
        partes.push(justifica ? 'a II justifica corretamente a I' : 'a II, embora verdadeira, não justifica a I');
      return { texto, explicacao: `Incorreta: ${partes.join(' e ')}. ${analise}` };
    }),
  };
}

const ROMANOS = ['I', 'II', 'III', 'IV', 'V'];
function rotulo(s: number[]): string {
  const r = s.map((i) => ROMANOS[i]);
  if (r.length === 1) return `${r[0]}, apenas.`;
  return r.slice(0, -1).join(', ') + ' e ' + r[r.length - 1] + ', apenas.';
}
function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** Múltiplas afirmativas (I, II, III[, IV]) — “É correto o que se afirma em”. */
export function ma(
  id: string,
  topico: string,
  dificuldade: Dif,
  contexto: string,
  afirmativas: [string, boolean, string][],
  conceito?: string,
): QuestaoObjetiva {
  const n = afirmativas.length;
  const corretoSet = afirmativas.map((a, i) => (a[1] ? i : -1)).filter((i) => i >= 0);
  const key = corretoSet.join(',');
  let opcoes: number[][] =
    n === 3 ? [[0], [1], [0, 2], [1, 2], [0, 1, 2]] : [[0, 1], [0, 2], [1, 3], [0, 2, 3], [1, 2, 3]];
  if (!opcoes.some((o) => o.join(',') === key)) {
    const idx = hash(id) % 5;
    opcoes[idx] = corretoSet;
  }
  opcoes = opcoes.sort((a, b) => a.length - b.length || a.join(',').localeCompare(b.join(',')));
  const correta = opcoes.findIndex((o) => o.join(',') === key);
  const enunciado =
    (contexto ? contexto + '\n\n' : '') +
    afirmativas.map((a, i) => `${ROMANOS[i]}. ${a[0]}`).join('\n') +
    '\n\nÉ correto o que se afirma em';
  const todas = (o: number[]) => o.length === n;
  return {
    id, topico, dificuldade, enunciado, correta,
    area: area(topico), tipo: 'objetiva', estilo: 'multiplas-afirmativas', fixa: true, fonte: FONTE, conceito,
    alternativas: opcoes.map((o, i) => {
      const texto = todas(o) ? ROMANOS.slice(0, n).join(', ').replace(/, ([^,]*)$/, ' e $1') + '.' : rotulo(o);
      if (i === correta)
        return {
          texto,
          explicacao:
            'Correta. ' +
            afirmativas.map((a, j) => `${ROMANOS[j]} é ${a[1] ? 'verdadeira' : 'falsa'}: ${a[2]}`).join(' '),
        };
      const sobra = o.filter((j) => !afirmativas[j][1]);
      const falta = corretoSet.filter((j) => !o.includes(j));
      const partes = [
        ...sobra.map((j) => `inclui a afirmativa ${ROMANOS[j]}, que é falsa (${afirmativas[j][2]})`),
        ...falta.map((j) => `deixa de fora a afirmativa ${ROMANOS[j]}, que é verdadeira (${afirmativas[j][2]})`),
      ];
      return { texto, explicacao: 'Incorreta: ' + partes.join('; ') + '.' };
    }),
  };
}

export function disc(
  id: string,
  topico: string,
  enunciado: string,
  padraoResposta: string,
  criterios: string[],
): QuestaoDiscursiva {
  return {
    id, topico, enunciado, padraoResposta, criterios,
    area: area(topico), tipo: 'discursiva', dificuldade: 2, fonte: FONTE,
  };
}
