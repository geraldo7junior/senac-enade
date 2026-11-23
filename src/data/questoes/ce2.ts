import { ar, disc, ma, obj } from '../build';

/** Teoria da Computação, Matemática Discreta, Arquitetura, Sistemas Operacionais */
export const CE2 = [
  // ───────── Teoria da Computação e Compiladores ─────────
  obj('TEO-01', 'teoria', 2,
    'A linguagem L = { aⁿbⁿ | n ≥ 0 } é um exemplo clássico de linguagem',
    [
      ['regular, reconhecida por um autômato finito determinístico.', 'Um AFD não tem memória para contar quantos a foram lidos; o Lema do Bombeamento prova que L não é regular.'],
      ['livre de contexto, mas não regular, reconhecida por um autômato com pilha.', 'A pilha permite empilhar os a e desempilhar um para cada b.'],
      ['sensível ao contexto, mas não livre de contexto.', 'Existe a gramática S → aSb | ε, que é livre de contexto.'],
      ['não recursivamente enumerável.', 'L é decidível; uma máquina de Turing a reconhece facilmente.'],
      ['finita.', 'Há infinitas cadeias, uma para cada n.'],
    ], 1),

  obj('TEO-02', 'teoria', 1,
    'Na arquitetura de um compilador, a fase responsável por agrupar caracteres do código-fonte em tokens (identificadores, palavras-chave, operadores) é a análise',
    [
      ['sintática.', 'A análise sintática verifica a estrutura gramatical usando os tokens.'],
      ['léxica.', 'O analisador léxico (scanner) produz a sequência de tokens.'],
      ['semântica.', 'Verifica tipos e escopos, após a análise sintática.'],
      ['de fluxo de dados.', 'Faz parte da otimização, não do reconhecimento de tokens.'],
      ['de geração de código.', 'É a fase final que produz código-alvo.'],
    ], 1),

  ma('TEO-03', 'teoria', 3,
    'Sobre computabilidade e máquinas de Turing, avalie as afirmativas.',
    [
      ['O problema da parada é indecidível.', true, 'Turing provou que não há algoritmo geral que decida se um programa para'],
      ['Todo autômato finito não determinístico pode ser convertido em um determinístico equivalente.', true, 'pela construção de subconjuntos'],
      ['Máquinas de Turing não determinísticas reconhecem mais linguagens que as determinísticas.', false, 'têm o mesmo poder de reconhecimento; diferem possivelmente em eficiência'],
      ['Autômatos com pilha determinísticos e não determinísticos reconhecem exatamente as mesmas linguagens.', false, 'APs não determinísticos são mais expressivos (ex.: palíndromos de comprimento par)'],
    ]),

  obj('TEO-04', 'teoria', 2,
    'A expressão regular (a|b)*abb, sobre o alfabeto {a, b}, denota o conjunto das cadeias que',
    [
      ['começam com abb.', 'O prefixo é livre; o padrão fixo está no final.'],
      ['terminam com abb.', '(a|b)* gera qualquer prefixo, seguido obrigatoriamente de abb.'],
      ['contêm exatamente um a.', 'O prefixo pode conter vários a.'],
      ['têm comprimento par.', 'Cadeias como abb (comprimento 3) pertencem à linguagem.'],
      ['não contêm a subcadeia ab.', 'Todas as cadeias terminam com abb, que contém ab.'],
    ], 1),

  ar('TEO-05', 'teoria', 2,
    'Gramáticas ambíguas podem causar problemas na construção de analisadores sintáticos.',
    'Uma gramática é ambígua quando alguma sentença admite mais de uma árvore de derivação.',
    'Toda linguagem livre de contexto possui uma gramática não ambígua.',
    true, false, false,
    'A I é a definição correta de ambiguidade. A II é falsa: existem linguagens inerentemente ambíguas, para as quais toda gramática é ambígua.'),

  obj('TEO-06', 'teoria', 2,
    'Na expressão a + b * c, o compilador gera a árvore sintática com * em nível mais profundo que +. Isso ocorre porque a gramática',
    [
      ['define precedência maior para * por meio de níveis distintos de não terminais (expressão, termo, fator).', 'A estrutura da gramática codifica a precedência dos operadores.'],
      ['lê a expressão da direita para a esquerda.', 'A ordem de leitura não determina precedência.'],
      ['é ambígua e o compilador escolhe uma árvore aleatoriamente.', 'Compiladores não escolhem aleatoriamente; a gramática ou regras explícitas resolvem a ambiguidade.'],
      ['trata todos os operadores com a mesma prioridade.', 'Então a + b seria agrupado primeiro.'],
      ['usa análise léxica para calcular o valor da expressão.', 'A análise léxica apenas produz tokens.'],
    ], 0),

  // ───────── Matemática Discreta e Lógica ─────────
  obj('MD-01', 'matdisc', 1,
    'A negação lógica da proposição “Todo estudante de Computação gosta de programar” é',
    [
      ['Nenhum estudante de Computação gosta de programar.', 'Isso é a contrária, não a negação.'],
      ['Existe pelo menos um estudante de Computação que não gosta de programar.', '¬(∀x P(x)) ≡ ∃x ¬P(x).'],
      ['Todo estudante de Computação não gosta de programar.', 'Equivale a “nenhum”, que é mais forte que a negação.'],
      ['Algum estudante de Computação gosta de programar.', 'É compatível com a proposição original.'],
      ['Quem gosta de programar é estudante de Computação.', 'É a recíproca, não a negação.'],
    ], 1),

  obj('MD-02', 'matdisc', 2,
    'A proposição p → q é logicamente equivalente a',
    [
      ['q → p', 'É a recíproca, que não é equivalente.'],
      ['¬p → ¬q', 'É a inversa, que não é equivalente.'],
      ['¬q → ¬p', 'A contrapositiva é equivalente à condicional.'],
      ['p ∧ ¬q', 'É exatamente a negação de p → q.'],
      ['p ∨ q', 'Equivalente seria ¬p ∨ q.'],
    ], 2),

  obj('MD-03', 'matdisc', 2,
    'Quantas senhas de 4 caracteres podem ser formadas usando os dígitos de 0 a 9, sem repetição de dígitos?',
    [
      ['10.000', 'É o total com repetição permitida (10⁴).'],
      ['5.040', 'Arranjo: 10 × 9 × 8 × 7 = 5.040.'],
      ['210', 'É a combinação C(10,4), que ignora a ordem.'],
      ['40', 'Multiplica 10 por 4, sem fundamento combinatório.'],
      ['24', 'São as permutações de 4 elementos fixos.'],
    ], 1),

  ma('MD-04', 'matdisc', 2,
    'Considere a relação R = {(1,1), (2,2), (3,3), (1,2), (2,1)} sobre o conjunto A = {1, 2, 3}. Avalie as afirmativas.',
    [
      ['R é reflexiva.', true, 'contém (1,1), (2,2) e (3,3)'],
      ['R é simétrica.', true, 'para (1,2) existe (2,1)'],
      ['R é transitiva.', true, '(1,2) e (2,1) geram (1,1), que pertence a R; todas as composições estão em R'],
      ['R é antissimétrica.', false, '(1,2) e (2,1) estão em R com 1 ≠ 2'],
    ], 'Uma relação reflexiva, simétrica e transitiva é de equivalência.'),

  obj('MD-05', 'matdisc', 2,
    'Por indução matemática, prova-se que 1 + 2 + … + n = n(n+1)/2. No passo indutivo, supõe-se verdadeira para k e deve-se mostrar que',
    [
      ['1 + 2 + … + k = k(k+1)/2.', 'Essa é a hipótese de indução, não o que se quer provar.'],
      ['1 + 2 + … + (k+1) = (k+1)(k+2)/2.', 'Deve-se provar a fórmula para k + 1 usando a hipótese.'],
      ['a fórmula vale para n = 1.', 'Isso é a base da indução.'],
      ['a fórmula vale para todo k menor que 1.', 'Não faz parte do esquema de indução.'],
      ['k(k+1)/2 é sempre par.', 'Não é necessário e nem sempre é verdade.'],
    ], 1),

  obj('MD-06', 'matdisc', 3,
    'Um grafo simples, conexo e não direcionado possui 10 vértices e é uma árvore. O número de arestas desse grafo é',
    [
      ['10', 'Com 10 arestas haveria um ciclo.'],
      ['9', 'Toda árvore com n vértices tem n − 1 arestas.'],
      ['45', 'É o número de arestas do grafo completo K₁₀.'],
      ['20', 'Não há relação com o dobro de vértices.'],
      ['Não é possível determinar.', 'Para árvores, o número de arestas é determinado.'],
    ], 1),

  // ───────── Arquitetura e Organização de Computadores ─────────
  obj('ARQ-01', 'arquitetura', 1,
    'O número decimal 45 representado em binário é',
    [
      ['101101', '32 + 8 + 4 + 1 = 45.'],
      ['110101', 'Vale 53.'],
      ['101011', 'Vale 43.'],
      ['111001', 'Vale 57.'],
      ['100101', 'Vale 37.'],
    ], 0),

  obj('ARQ-02', 'arquitetura', 2,
    'Um processador com pipeline de 5 estágios executa a instrução ADD R1, R2, R3 seguida de SUB R4, R1, R5. O problema que pode ocorrer entre essas instruções é',
    [
      ['hazard estrutural, por falta de memória.', 'Hazard estrutural é conflito por recurso de hardware, não dependência de dados.'],
      ['hazard de dados do tipo RAW (leitura após escrita).', 'SUB lê R1 antes que ADD tenha escrito o resultado; forwarding ou stalls resolvem.'],
      ['hazard de controle, por desvio condicional.', 'Não há desvio entre as instruções.'],
      ['falha de página.', 'Falha de página é evento de memória virtual, não de pipeline.'],
      ['nenhum problema, pois as instruções são independentes.', 'SUB depende de R1, produzido por ADD.'],
    ], 1),

  ma('ARQ-03', 'arquitetura', 2,
    'Sobre hierarquia de memória, avalie as afirmativas.',
    [
      ['A memória cache explora os princípios de localidade temporal e espacial.', true, 'dados usados recentemente e próximos tendem a ser reutilizados'],
      ['Registradores são mais lentos que a memória principal.', false, 'registradores são o nível mais rápido'],
      ['Quanto mais próxima do processador, maior o custo por bit e menor a capacidade.', true, 'é o trade-off fundamental da hierarquia'],
    ]),

  obj('ARQ-04', 'arquitetura', 2,
    'Em complemento de dois com 8 bits, o número −5 é representado por',
    [
      ['10000101', 'Essa é a representação em sinal-magnitude.'],
      ['11111010', 'Esse é o complemento de um de 5.'],
      ['11111011', 'Inverte-se 00000101 (11111010) e soma-se 1.'],
      ['00000101', 'É +5.'],
      ['11111101', 'Vale −3.'],
    ], 2),

  ar('ARQ-05', 'arquitetura', 2,
    'Processadores RISC e CISC adotam filosofias distintas de projeto.',
    'Arquiteturas RISC favorecem o uso de pipeline.',
    'Arquiteturas RISC usam instruções simples, de tamanho fixo e, em geral, executadas em um ciclo.',
    true, true, true,
    'Instruções uniformes e simples (II) tornam previsível a divisão em estágios, o que favorece o pipeline (I).'),

  obj('ARQ-06', 'arquitetura', 1,
    'A porta lógica cuja saída é 1 somente quando as entradas são diferentes é a',
    [
      ['AND.', 'AND é 1 somente quando ambas as entradas são 1.'],
      ['OR.', 'OR é 1 quando pelo menos uma entrada é 1, inclusive quando são iguais a 1.'],
      ['XOR.', 'OU exclusivo: 1 quando as entradas diferem.'],
      ['NAND.', 'NAND é 0 apenas quando ambas são 1.'],
      ['XNOR.', 'XNOR é 1 quando as entradas são iguais.'],
    ], 2),

  obj('ARQ-07', 'arquitetura', 3,
    'Um programa passa 40% do tempo em uma parte que será acelerada 4 vezes. Pela Lei de Amdahl, o speedup total é aproximadamente',
    [
      ['4,00', 'Só ocorreria se 100% do programa fosse acelerado.'],
      ['1,43', '1 / (0,6 + 0,4/4) = 1 / 0,7 ≈ 1,43.'],
      ['1,60', 'Soma indevida de 0,6 com o fator de aceleração.'],
      ['2,50', 'Corresponde a 1/0,4, sem fundamento.'],
      ['1,10', 'Subestima o ganho.'],
    ], 1, 'Lei de Amdahl: S = 1 / ((1 − f) + f/k).'),

  // ───────── Sistemas Operacionais ─────────
  obj('SO-01', 'so', 1,
    'A diferença fundamental entre processo e thread é que',
    [
      ['threads de um mesmo processo compartilham o espaço de endereçamento.', 'Threads compartilham memória, arquivos abertos e recursos do processo.'],
      ['processos não podem ser executados em paralelo.', 'Processos podem executar em paralelo em múltiplos núcleos.'],
      ['threads possuem espaço de memória isolado entre si.', 'O isolamento de memória é característica de processos.'],
      ['um processo não pode ter mais de uma thread.', 'Processos multithread são comuns.'],
      ['threads não podem ser escalonadas pelo sistema operacional.', 'Threads de kernel são escalonadas pelo SO.'],
    ], 0),

  ma('SO-02', 'so', 2,
    'Para que ocorra um deadlock, quatro condições devem estar presentes simultaneamente (condições de Coffman). Avalie as afirmativas.',
    [
      ['Exclusão mútua é uma das condições necessárias.', true, 'recursos não compartilháveis'],
      ['Espera circular é uma das condições necessárias.', true, 'cadeia circular de processos esperando recursos'],
      ['Preempção de recursos é uma das condições necessárias.', false, 'a condição é a NÃO preempção'],
      ['Posse e espera é uma das condições necessárias.', true, 'processos retêm recursos enquanto esperam outros'],
    ]),

  obj('SO-03', 'so', 2,
    'Três processos chegam ao mesmo tempo com tempos de execução P1 = 8, P2 = 4 e P3 = 2. Usando o escalonamento SJF (Shortest Job First) não preemptivo, o tempo médio de espera é',
    [
      ['2,67', 'Ordem P3, P2, P1: esperas 0, 2 e 6; média = 8/3 ≈ 2,67.'],
      ['6,67', 'É a média de espera na ordem FCFS P1, P2, P3 (0, 8, 12).'],
      ['4,67', 'Média de tempos de execução (14/3), não de espera.'],
      ['0', 'Apenas o primeiro processo não espera.'],
      ['8', 'É a espera de nenhum processo individual nesse cenário.'],
    ], 0, 'SJF minimiza o tempo médio de espera quando todos chegam juntos.'),

  ar('SO-04', 'so', 2,
    'A memória virtual permite executar programas maiores que a memória física disponível.',
    'Um aumento excessivo de falhas de página pode levar ao thrashing.',
    'No thrashing, o sistema gasta mais tempo trocando páginas entre memória e disco do que executando processos.',
    true, true, true,
    'A II é a definição de thrashing, consequência de falhas de página excessivas descritas na I.'),

  obj('SO-05', 'so', 2,
    'Duas threads incrementam a mesma variável global contador sem sincronização. Ao final, o valor é menor que o esperado. Esse problema é chamado',
    [
      ['deadlock.', 'Deadlock é bloqueio mútuo; aqui as threads terminam.'],
      ['condição de corrida (race condition).', 'O resultado depende da intercalação das operações de leitura-modificação-escrita.'],
      ['starvation.', 'Starvation é uma thread nunca obter o recurso.'],
      ['fragmentação externa.', 'Problema de alocação de memória.'],
      ['thrashing.', 'Excesso de paginação.'],
    ], 1, 'Proteja seções críticas com mutex, semáforo ou operações atômicas.'),

  obj('SO-06', 'so', 3,
    'Com 3 quadros de memória e a sequência de referências 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, o algoritmo FIFO gera quantas falhas de página?',
    [
      ['7', 'Seria o resultado do algoritmo ótimo (OPT) nessa sequência.'],
      ['9', 'FIFO com 3 quadros gera 9 falhas nessa sequência clássica.'],
      ['10', 'É o resultado do FIFO com 4 quadros (anomalia de Belady).'],
      ['12', 'Considera falha em todas as referências.'],
      ['5', 'É apenas o número de páginas distintas.'],
    ], 1, 'Essa sequência ilustra a anomalia de Belady: com 4 quadros, FIFO gera 10 falhas.'),

  disc('SO-D1', 'so',
    'Em um sistema bancário, duas transferências simultâneas acessam as contas A e B: a primeira bloqueia A e depois tenta bloquear B; a segunda bloqueia B e depois tenta bloquear A.\n\na) Que problema pode ocorrer? b) Quais condições de Coffman estão presentes? c) Proponha uma solução e explique por que ela funciona.',
    'a) Deadlock: cada transação espera indefinidamente pelo recurso da outra. b) Exclusão mútua (locks), posse e espera (cada uma segura um lock e espera o outro), não preempção (locks não são retirados) e espera circular (T1 espera T2 e T2 espera T1). c) Impor ordem global de aquisição de locks (ex.: sempre bloquear a conta de menor número primeiro), eliminando a espera circular; alternativas: timeout com rollback ou adquirir ambos os locks atomicamente.',
    ['Identifica deadlock (2 pontos)', 'Relaciona corretamente as quatro condições (4 pontos)', 'Propõe solução e justifica qual condição é eliminada (4 pontos)']),

  disc('TEO-D1', 'teoria',
    'Projete um autômato finito determinístico (AFD) sobre o alfabeto {0, 1} que aceite cadeias binárias que representam números divisíveis por 3. Descreva os estados, o estado inicial, os estados de aceitação e a função de transição.',
    'Estados q0, q1, q2 representam o resto da divisão por 3. Inicial e de aceitação: q0. Ao ler o bit b, o novo resto é (2·r + b) mod 3: δ(q0,0)=q0, δ(q0,1)=q1, δ(q1,0)=q2, δ(q1,1)=q0, δ(q2,0)=q1, δ(q2,1)=q2.',
    ['Associa estados aos restos (3 pontos)', 'Define corretamente inicial e aceitação (2 pontos)', 'Apresenta as seis transições corretas (5 pontos)']),
];
