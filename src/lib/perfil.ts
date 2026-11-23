import type { ItemProva, RespostaItem, ResultadoProva } from '../types';
import { TOPICOS } from '../data/topicos';
import { ler, gravar } from './armazenamento';

export interface Perfil {
  xp: number;
  provas: number;
  medalhas: string[];
  vistas: string[];
  porTopico: Record<string, { acertos: number; total: number }>;
  historico: ResultadoProva[];
  melhorSequencia: number;
}

export interface Medalha {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
}

export const MEDALHAS: Medalha[] = [
  { id: 'primeira', nome: 'Primeira prova', icone: '🎓', descricao: 'Concluiu o primeiro simulado.' },
  { id: 'seq5', nome: 'Embalado', icone: '🔥', descricao: '5 acertos seguidos.' },
  { id: 'seq10', nome: 'Imparável', icone: '⚡', descricao: '10 acertos seguidos.' },
  { id: 'gabarito', nome: 'Gabaritou', icone: '🏆', descricao: '100% de acertos em um simulado de 10 ou mais questões.' },
  { id: 'aprovado', nome: 'Acima da média', icone: '✅', descricao: '70% ou mais de acertos em um simulado.' },
  { id: 'maratona', nome: 'Maratonista', icone: '🏃', descricao: 'Concluiu a prova completa do ENADE.' },
  { id: 'velocista', nome: 'Velocista', icone: '⏱️', descricao: 'Média abaixo de 45 s por questão com pelo menos 70% de acertos.' },
  { id: 'persistente', nome: 'Persistente', icone: '💪', descricao: 'Concluiu 5 simulados.' },
  { id: 'explorador', nome: 'Explorador', icone: '🧭', descricao: 'Respondeu questões de todos os assuntos da ementa.' },
  { id: 'aprendiz', nome: 'Aprende com o erro', icone: '📚', descricao: 'Errou, leu a explicação e acertou o assunto no simulado seguinte.' },
];

export const NIVEIS = ['Calouro', 'Explorador', 'Monitor', 'Pesquisador', 'Especialista', 'Mestre', 'Lenda do ENADE'];

export function nivel(xp: number) {
  const n = Math.min(Math.floor(Math.sqrt(xp / 400)), NIVEIS.length - 1);
  const min = n * n * 400;
  const max = (n + 1) * (n + 1) * 400;
  return { indice: n + 1, titulo: NIVEIS[n], progresso: Math.min(1, (xp - min) / (max - min)), proximo: max };
}

const chave = (email: string) => `senac-enade:perfil:${email.toLowerCase()}`;

export function carregarPerfil(email: string): Perfil {
  return ler<Perfil>(chave(email), {
    xp: 0, provas: 0, medalhas: [], vistas: [], porTopico: {}, historico: [], melhorSequencia: 0,
  });
}

/** Atualiza o perfil com o resultado e retorna as medalhas novas. */
export function registrarResultado(
  email: string,
  itens: ItemProva[],
  respostas: RespostaItem[],
  resultado: ResultadoProva,
): Medalha[] {
  const p = carregarPerfil(email);
  const antes = new Set(p.medalhas);
  const errosAnteriores = new Set(
    Object.entries(p.porTopico).filter(([, v]) => v.total > v.acertos).map(([k]) => k),
  );
  p.xp += resultado.pontos;
  p.provas += 1;
  p.historico = [resultado, ...p.historico].slice(0, 50);
  const vistas = new Set(p.vistas);
  let seq = 0;
  let melhor = 0;
  const acertouTopico = new Set<string>();
  itens.forEach((it, i) => {
    const r = respostas[i];
    vistas.add(it.questao.id);
    if (it.questao.tipo !== 'objetiva' || !r) return;
    const t = (p.porTopico[it.questao.topico] ??= { acertos: 0, total: 0 });
    t.total += 1;
    if (r.correta) {
      t.acertos += 1;
      seq += 1;
      acertouTopico.add(it.questao.topico);
    } else seq = 0;
    melhor = Math.max(melhor, seq);
  });
  p.vistas = [...vistas];
  p.melhorSequencia = Math.max(p.melhorSequencia, melhor);

  const ganhar = (id: string) => !antes.has(id) && p.medalhas.push(id);
  const pct = resultado.totalObjetivas ? resultado.acertos / resultado.totalObjetivas : 0;
  ganhar('primeira');
  if (melhor >= 5) ganhar('seq5');
  if (melhor >= 10) ganhar('seq10');
  if (pct === 1 && resultado.totalObjetivas >= 10) ganhar('gabarito');
  if (pct >= 0.7) ganhar('aprovado');
  if (resultado.cenario === 'enade') ganhar('maratona');
  if (pct >= 0.7 && resultado.tempoSegundos / Math.max(1, itens.length) < 45) ganhar('velocista');
  if (p.provas >= 5) ganhar('persistente');
  if (TOPICOS.every((t) => p.porTopico[t.id]?.total)) ganhar('explorador');
  if ([...acertouTopico].some((t) => errosAnteriores.has(t))) ganhar('aprendiz');

  gravar(chave(email), p);
  return MEDALHAS.filter((m) => p.medalhas.includes(m.id) && !antes.has(m.id));
}
