import type { CenarioId, ItemProva, Questao } from '../types';
import { QUESTOES } from '../data/questoes';

function embaralhar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Sorteia n questões do pool distribuindo por tópico (round-robin), priorizando as não vistas. */
export function sortearBalanceado(pool: Questao[], n: number, vistas: Set<string>): Questao[] {
  const grupos = new Map<string, Questao[]>();
  for (const q of pool) {
    if (!grupos.has(q.topico)) grupos.set(q.topico, []);
    grupos.get(q.topico)!.push(q);
  }
  const filas = embaralhar([...grupos.values()]).map((g) => {
    const e = embaralhar(g);
    return [...e.filter((q) => !vistas.has(q.id)), ...e.filter((q) => vistas.has(q.id))];
  });
  const out: Questao[] = [];
  while (out.length < n && filas.some((f) => f.length)) {
    for (const f of filas) {
      if (out.length >= n) break;
      const q = f.shift();
      if (q) out.push(q);
    }
  }
  return out;
}

function item(q: Questao): ItemProva {
  if (q.tipo === 'discursiva') return { questao: q, ordem: [] };
  const idx = q.alternativas.map((_, i) => i);
  return { questao: q, ordem: q.fixa ? idx : embaralhar(idx) };
}

export function montarProva(cenario: CenarioId, vistas: Set<string>, topico?: string): ItemProva[] {
  const obj = QUESTOES.filter((q) => q.tipo === 'objetiva');
  const disc = QUESTOES.filter((q) => q.tipo === 'discursiva');
  if (topico) {
    return embaralhar(sortearBalanceado(obj.filter((q) => q.topico === topico), 10, vistas)).map(item);
  }
  if (cenario === 'enade') {
    const fgObj = sortearBalanceado(obj.filter((q) => q.area === 'FG'), 8, vistas);
    const fgDisc = sortearBalanceado(disc.filter((q) => q.area === 'FG'), 2, vistas);
    const ceObj = sortearBalanceado(obj.filter((q) => q.area === 'CE'), 27, vistas);
    const ceDisc = sortearBalanceado(disc.filter((q) => q.area === 'CE'), 3, vistas);
    // ordem do ENADE: FG discursivas, FG objetivas, CE discursivas, CE objetivas
    return [...fgDisc, ...embaralhar(fgObj), ...ceDisc, ...embaralhar(ceObj)].map(item);
  }
  const total = { q10: 10, q20: 20, q30: 30, q40: 40 }[cenario];
  const nFG = Math.round(total * 0.25);
  const fg = sortearBalanceado(obj.filter((q) => q.area === 'FG'), nFG, vistas);
  const ce = sortearBalanceado(obj.filter((q) => q.area === 'CE'), total - fg.length, vistas);
  return embaralhar([...fg, ...ce]).map(item);
}

export const LETRAS = ['A', 'B', 'C', 'D', 'E'];

export function pontosQuestao(dificuldade: number, sequencia: number, segundos: number): number {
  const base = { 1: 100, 2: 150, 3: 200 }[dificuldade] ?? 100;
  const bonusSeq = Math.min(sequencia, 5) * 10;
  const bonusTempo = segundos <= 60 ? 20 : 0;
  return base + bonusSeq + bonusTempo;
}

export function formatarTempo(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const p = (n: number) => String(n).padStart(2, '0');
  return h ? `${h}:${p(m)}:${p(ss)}` : `${p(m)}:${p(ss)}`;
}
