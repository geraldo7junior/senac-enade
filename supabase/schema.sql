-- SENAC ENADE: esquema do ranking
-- Rode este script uma vez no Supabase: Dashboard > SQL Editor > New query > Run.

create extension if not exists pgcrypto;

create table if not exists public.resultados (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254),
  nome text check (nome is null or length(nome) <= 80),
  turma text not null check (length(turma) between 1 and 40),
  cenario text not null check (cenario in ('q10', 'q20', 'q30', 'q40', 'enade')),
  acertos int not null check (acertos >= 0),
  total int not null check (total between 1 and 40),
  tempo_segundos int not null check (tempo_segundos between 1 and 4 * 3600),
  pontos int not null default 0 check (pontos between 0 and 20000),
  created_at timestamptz not null default now(),
  check (acertos <= total),
  -- tempo mínimo plausível: 3 segundos por questão
  check (tempo_segundos >= total * 3)
);

create index if not exists resultados_cenario_idx on public.resultados (cenario, acertos desc, tempo_segundos asc);
create index if not exists resultados_turma_idx on public.resultados (turma);

-- RLS: qualquer visitante pode inserir resultado, mas ninguém lê a tabela diretamente
-- (o e-mail completo fica protegido; a leitura é feita pelas funções abaixo).
alter table public.resultados enable row level security;

drop policy if exists "inserir resultados" on public.resultados;
create policy "inserir resultados" on public.resultados
  for insert to anon, authenticated with check (true);

-- Ranking por cenário: melhor resultado de cada e-mail (mais acertos, depois menor tempo).
create or replace function public.ranking_cenario(p_cenario text, p_turma text default null, p_email text default null)
returns table (
  nome text, email_mascarado text, turma text, acertos int, total int,
  tempo_segundos int, pontos int, created_at timestamptz, sou_eu boolean
)
language sql stable security definer set search_path = public as $$
  with melhores as (
    select distinct on (lower(r.email)) r.*
    from resultados r
    where r.cenario = p_cenario
      and (p_turma is null or r.turma = p_turma)
    order by lower(r.email), r.acertos desc, r.tempo_segundos asc, r.created_at asc
  )
  select
    m.nome,
    left(split_part(m.email, '@', 1), 2) || repeat('•', greatest(1, length(split_part(m.email, '@', 1)) - 2)) || '@' || split_part(m.email, '@', 2),
    m.turma, m.acertos, m.total, m.tempo_segundos, m.pontos, m.created_at,
    (p_email is not null and lower(m.email) = lower(p_email))
  from melhores m
  order by m.acertos desc, m.tempo_segundos asc, m.created_at asc
  limit 100;
$$;

create or replace function public.turmas_ranking()
returns table (turma text)
language sql stable security definer set search_path = public as $$
  select distinct r.turma from resultados r order by 1;
$$;

grant execute on function public.ranking_cenario(text, text, text) to anon, authenticated;
grant execute on function public.turmas_ranking() to anon, authenticated;
