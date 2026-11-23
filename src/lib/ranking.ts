import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { LinhaRanking, Usuario } from '../types';
import { ler, gravar } from './armazenamento';

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let cliente: SupabaseClient | null = null;
if (URL && KEY) {
  try {
    cliente = createClient(URL, KEY, { auth: { persistSession: false } });
  } catch {
    cliente = null;
  }
}

export const rankingOnline = () => cliente !== null;

export interface NovoResultado {
  usuario: Usuario;
  cenario: string;
  acertos: number;
  total: number;
  tempoSegundos: number;
  pontos: number;
}

interface LocalRow extends NovoResultado {
  data: string;
}

const LOCAL = 'senac-enade:ranking-local';

export function mascararEmail(email: string) {
  const [u, d] = email.split('@');
  if (!d) return email;
  return `${u.slice(0, 2)}${'•'.repeat(Math.max(1, u.length - 2))}@${d}`;
}

export async function salvarResultado(r: NovoResultado): Promise<{ ok: boolean; online: boolean; erro?: string }> {
  const local = ler<LocalRow[]>(LOCAL, []);
  local.push({ ...r, data: new Date().toISOString() });
  gravar(LOCAL, local.slice(-500));
  if (!cliente) return { ok: true, online: false };
  const { error } = await cliente.from('resultados').insert({
    email: r.usuario.email.toLowerCase(),
    nome: r.usuario.nome || null,
    turma: r.usuario.turma,
    cenario: r.cenario,
    acertos: r.acertos,
    total: r.total,
    tempo_segundos: r.tempoSegundos,
    pontos: r.pontos,
  });
  return error ? { ok: false, online: true, erro: error.message } : { ok: true, online: true };
}

function ordenar<T extends { acertos: number; tempoSegundos: number }>(a: T, b: T) {
  return b.acertos - a.acertos || a.tempoSegundos - b.tempoSegundos;
}

export async function buscarRanking(
  cenario: string,
  turma: string | null,
  eu: string,
): Promise<{ linhas: LinhaRanking[]; online: boolean; erro?: string }> {
  const meuEmail = eu.toLowerCase();
  if (cliente) {
    const { data, error } = await cliente.rpc('ranking_cenario', {
      p_cenario: cenario,
      p_turma: turma,
      p_email: meuEmail,
    });
    if (!error && data) {
      const linhas = (data as Record<string, unknown>[]).map((d, i) => ({
        posicao: i + 1,
        nome: (d.nome as string) || '',
        emailMascarado: d.email_mascarado as string,
        turma: d.turma as string,
        acertos: d.acertos as number,
        total: d.total as number,
        tempoSegundos: d.tempo_segundos as number,
        pontos: d.pontos as number,
        data: d.created_at as string,
        souEu: d.sou_eu as boolean,
      }));
      return { linhas, online: true };
    }
    return { ...rankingLocal(cenario, turma, meuEmail), erro: error?.message };
  }
  return rankingLocal(cenario, turma, meuEmail);
}

function rankingLocal(cenario: string, turma: string | null, eu: string) {
  const melhores = new Map<string, LocalRow>();
  for (const r of ler<LocalRow[]>(LOCAL, [])) {
    if (r.cenario !== cenario) continue;
    if (turma && r.usuario.turma !== turma) continue;
    const k = r.usuario.email.toLowerCase();
    const atual = melhores.get(k);
    if (!atual || ordenar(r, atual) < 0) melhores.set(k, r);
  }
  const linhas: LinhaRanking[] = [...melhores.values()].sort(ordenar).slice(0, 100).map((r, i) => ({
    posicao: i + 1,
    nome: r.usuario.nome,
    emailMascarado: mascararEmail(r.usuario.email),
    turma: r.usuario.turma,
    acertos: r.acertos,
    total: r.total,
    tempoSegundos: r.tempoSegundos,
    pontos: r.pontos,
    data: r.data,
    souEu: r.usuario.email.toLowerCase() === eu,
  }));
  return { linhas, online: false };
}

export async function listarTurmas(): Promise<string[]> {
  if (cliente) {
    const { data, error } = await cliente.rpc('turmas_ranking');
    if (!error && data) return (data as { turma: string }[]).map((d) => d.turma);
  }
  return [...new Set(ler<LocalRow[]>(LOCAL, []).map((r) => r.usuario.turma))].sort();
}
