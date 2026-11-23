import type { Questao } from '../../types';

/**
 * Espaço reservado para questões oficiais do ENADE (INEP), transcritas das provas
 * e gabaritos públicos em https://www.gov.br/inep (Provas e Gabaritos).
 *
 * Use os mesmos construtores de ../build (obj, ar, ma, disc) e informe a fonte, por exemplo:
 *   { ...obj('ENADE21-CC-12', 'redes', 2, 'enunciado...', [[texto, explicação], ...], 2),
 *     fonte: 'ENADE 2021 – Ciência da Computação – Questão 12' }
 */
export const ENADE_REAIS: Questao[] = [];
