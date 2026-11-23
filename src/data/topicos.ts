export interface Topico {
  id: string;
  nome: string;
  area: 'FG' | 'CE';
  icone: string;
}

export const TOPICOS: Topico[] = [
  { id: 'fg', nome: 'Formação Geral', area: 'FG', icone: '🌎' },
  { id: 'algoritmos', nome: 'Algoritmos e Complexidade', area: 'CE', icone: '🧮' },
  { id: 'estruturas', nome: 'Estruturas de Dados', area: 'CE', icone: '🌳' },
  { id: 'programacao', nome: 'Programação e Paradigmas', area: 'CE', icone: '💻' },
  { id: 'teoria', nome: 'Teoria da Computação e Compiladores', area: 'CE', icone: '🤖' },
  { id: 'matdisc', nome: 'Matemática Discreta e Lógica', area: 'CE', icone: '🔢' },
  { id: 'arquitetura', nome: 'Arquitetura e Organização de Computadores', area: 'CE', icone: '🔌' },
  { id: 'so', nome: 'Sistemas Operacionais', area: 'CE', icone: '⚙️' },
  { id: 'redes', nome: 'Redes de Computadores', area: 'CE', icone: '🌐' },
  { id: 'bd', nome: 'Banco de Dados', area: 'CE', icone: '🗄️' },
  { id: 'es', nome: 'Engenharia de Software', area: 'CE', icone: '🛠️' },
  { id: 'ia', nome: 'Inteligência Artificial e Ciência de Dados', area: 'CE', icone: '🧠' },
  { id: 'seguranca', nome: 'Segurança da Informação', area: 'CE', icone: '🔐' },
  { id: 'distribuidos', nome: 'Sistemas Distribuídos e Nuvem', area: 'CE', icone: '☁️' },
  { id: 'ihc', nome: 'Interação Humano-Computador', area: 'CE', icone: '🖐️' },
  { id: 'grafica', nome: 'Computação Gráfica e Imagens', area: 'CE', icone: '🎨' },
  { id: 'probest', nome: 'Probabilidade e Estatística', area: 'CE', icone: '📊' },
  { id: 'sociedade', nome: 'Computação, Sociedade e Gestão', area: 'CE', icone: '⚖️' },
];

export const topicoPorId = (id: string) => TOPICOS.find((t) => t.id === id);
