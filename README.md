# SENAC ENADE

Simulado web e responsivo do ENADE para cursos de Computação, com correção comentada, gamificação e ranking por cenário de prova.

## Funcionalidades

- **Entrada com e-mail e turma** (nome opcional para o ranking; o e-mail aparece mascarado).
- **5 cenários**: 10, 20, 30 ou 40 questões objetivas, ou **prova completa ENADE** (Formação Geral: 2 discursivas + 8 objetivas; Componente Específico: 3 discursivas + 27 objetivas; 4 horas).
- **Sorteio balanceado por assunto**: as questões são sorteadas em rodízio entre os 18 assuntos da ementa, priorizando as que o estudante ainda não viu. Nos cenários de 10 a 40, cerca de 25% são de Formação Geral, como no ENADE.
- **Todos os estilos do ENADE**: objetiva simples, asserção-razão, múltiplas afirmativas (I, II, III…) e discursivas.
- **Dois modos de correção**: *Aprendizado* (feedback imediato) e *Prova* (correção só ao final).
- **Didática**: cada alternativa tem explicação própria; ao errar, o app mostra por que a resposta escolhida está errada, qual é a certa e um “Para lembrar”. Discursivas mostram padrão de resposta, critérios e autoavaliação.
- **Gamificação**: pontos por dificuldade, bônus de sequência e de rapidez, níveis (Calouro → Lenda do ENADE), 10 medalhas, domínio por assunto e recomendações de estudo.
- **Ranking por cenário**: melhor resultado de cada e-mail, ordenado por acertos e, no empate, pelo menor tempo. Filtro por turma.
- **Estudo por assunto** (fora do ranking).

## Banco de questões

`src/data/questoes/` — 190 questões (178 objetivas e 12 discursivas), todas com explicação por alternativa. Rode `npm run validar` para conferir a integridade e ver a contagem por assunto.

As questões atuais são **autorais no estilo ENADE**. Questões oficiais do INEP podem ser adicionadas em `src/data/questoes/enade-reais.ts`, informando a fonte (ano e número).

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha com os dados do Supabase (opcional)
npm run dev
```

Sem as variáveis do Supabase o app funciona normalmente, mas o ranking fica salvo só no navegador (modo local).

## Publicar

### 1. Supabase (ranking on-line)

1. No painel do projeto: **SQL Editor → New query**, cole o conteúdo de `supabase/schema.sql` e clique em **Run**.
2. Em **Project Settings → API**, copie a *Project URL* e a chave *publishable* (ou *anon*).

O script cria a tabela `resultados` com RLS: visitantes só podem **inserir** resultados; a leitura é feita pela função `ranking_cenario`, que devolve o e-mail mascarado.

### 2. Vercel

1. Em vercel.com: **Add New → Project → Import** o repositório do GitHub.
2. Framework: **Vite** (detectado automaticamente). Build: `npm run build`. Output: `dist`.
3. Em **Environment Variables**, crie `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. **Deploy**. Cada push na branch principal publica de novo automaticamente.

## Estrutura

```
src/
  data/topicos.ts           assuntos da ementa
  data/build.ts             construtores de questões (obj, ar, ma, disc)
  data/questoes/            banco de questões
  lib/prova.ts              sorteio balanceado e pontuação
  lib/perfil.ts             XP, níveis e medalhas (localStorage)
  lib/ranking.ts            ranking Supabase com fallback local
  components/               telas (Entrada, Início, Prova, Resultado, Ranking, Perfil)
supabase/schema.sql         tabela, RLS e funções do ranking
```
