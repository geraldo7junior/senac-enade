import type { Cenario } from '../types';

export const CENARIOS: Cenario[] = [
  { id: 'q10', nome: 'Aquecimento', descricao: '10 questões objetivas', total: 10, minutos: 30 },
  { id: 'q20', nome: 'Treino', descricao: '20 questões objetivas', total: 20, minutos: 60 },
  { id: 'q30', nome: 'Desafio', descricao: '30 questões objetivas', total: 30, minutos: 90 },
  { id: 'q40', nome: 'Maratona', descricao: '40 questões objetivas', total: 40, minutos: 120 },
  {
    id: 'enade', nome: 'Prova completa ENADE',
    descricao: '40 questões: Formação Geral (8 objetivas + 2 discursivas) e Componente Específico (27 objetivas + 3 discursivas)',
    total: 40, minutos: 240,
  },
];

export const cenarioPorId = (id: string) => CENARIOS.find((c) => c.id === id);
