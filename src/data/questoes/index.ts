import type { Questao } from '../../types';
import { FG } from './fg';
import { CE1 } from './ce1';
import { CE2 } from './ce2';
import { CE3 } from './ce3';
import { CE4 } from './ce4';
import { CE5 } from './ce5';
import { ENADE_REAIS } from './enade-reais';

export const QUESTOES: Questao[] = [...ENADE_REAIS, ...FG, ...CE1, ...CE2, ...CE3, ...CE4, ...CE5];
export const questaoPorId = new Map(QUESTOES.map((q) => [q.id, q]));
