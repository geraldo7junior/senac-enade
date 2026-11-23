export type Area = 'FG' | 'CE';

export interface Alternativa {
  texto: string;
  explicacao: string;
}

export type Estilo = 'simples' | 'assercao-razao' | 'multiplas-afirmativas';

export interface QuestaoObjetiva {
  id: string;
  area: Area;
  topico: string;
  tipo: 'objetiva';
  estilo: Estilo;
  dificuldade: 1 | 2 | 3;
  enunciado: string;
  alternativas: Alternativa[];
  correta: number;
  /** alternativas com ordem fixa (asserção-razão, múltiplas afirmativas) */
  fixa?: boolean;
  conceito?: string;
  fonte: string;
}

export interface QuestaoDiscursiva {
  id: string;
  area: Area;
  topico: string;
  tipo: 'discursiva';
  dificuldade: 1 | 2 | 3;
  enunciado: string;
  padraoResposta: string;
  criterios: string[];
  fonte: string;
}

export type Questao = QuestaoObjetiva | QuestaoDiscursiva;

export type CenarioId = 'q10' | 'q20' | 'q30' | 'q40' | 'enade';

export interface Cenario {
  id: CenarioId;
  nome: string;
  descricao: string;
  total: number;
  minutos: number;
}

export interface Usuario {
  email: string;
  turma: string;
  nome: string;
}

export interface RespostaItem {
  questaoId: string;
  /** índice da alternativa original escolhida (-1 = em branco) */
  escolhida: number;
  correta: boolean;
  segundos: number;
  pontos: number;
  /** discursiva: texto e autoavaliação */
  textoDiscursivo?: string;
  autoavaliacao?: number;
}

export interface ItemProva {
  questao: Questao;
  /** ordem de exibição das alternativas (índices originais) */
  ordem: number[];
}

export interface ResultadoProva {
  cenario: CenarioId | string;
  acertos: number;
  totalObjetivas: number;
  tempoSegundos: number;
  pontos: number;
  data: string;
}

export interface LinhaRanking {
  posicao: number;
  nome: string;
  emailMascarado: string;
  turma: string;
  acertos: number;
  total: number;
  tempoSegundos: number;
  pontos: number;
  data: string;
  souEu?: boolean;
}
