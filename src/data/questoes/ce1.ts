import { ar, disc, ma, obj } from '../build';

/** Algoritmos, Estruturas de Dados, Programação */
export const CE1 = [
  // ───────── Algoritmos e Complexidade ─────────
  obj('ALG-01', 'algoritmos', 1,
    'Considere o trecho de código a seguir.\n\n```\nfor (i = 0; i < n; i++)\n  for (j = 0; j < n; j++)\n    soma += i * j;\n```\n\nA complexidade de tempo desse trecho, em notação O, é',
    [
      ['O(1).', 'O tempo cresce com n; não é constante.'],
      ['O(log n).', 'Não há divisão do problema pela metade a cada passo.'],
      ['O(n).', 'Seria o caso com apenas um laço.'],
      ['O(n²).', 'Dois laços aninhados de n iterações executam n × n operações.'],
      ['O(2ⁿ).', 'Exponencial ocorre em recursões que se ramificam, não em laços aninhados fixos.'],
    ], 3),

  obj('ALG-02', 'algoritmos', 1,
    'A busca binária em um vetor ordenado com n elementos tem complexidade de pior caso igual a',
    [
      ['O(n).', 'Essa é a complexidade da busca sequencial.'],
      ['O(log n).', 'A cada comparação, o espaço de busca é reduzido pela metade.'],
      ['O(n log n).', 'Complexidade típica de ordenações eficientes, não de busca.'],
      ['O(1).', 'Só seria constante com acesso direto por chave (ex.: hash ideal).'],
      ['O(n²).', 'Não há laços aninhados na busca binária.'],
    ], 1),

  ma('ALG-03', 'algoritmos', 2,
    'Sobre algoritmos de ordenação, avalie as afirmativas.',
    [
      ['O Merge Sort tem complexidade O(n log n) em todos os casos.', true, 'divide sempre ao meio e intercala em tempo linear'],
      ['O Quick Sort tem complexidade O(n log n) no pior caso.', false, 'seu pior caso é O(n²), com pivôs mal escolhidos'],
      ['O Insertion Sort é eficiente para vetores quase ordenados, aproximando-se de O(n).', true, 'cada elemento se desloca poucas posições'],
      ['O Bubble Sort é um algoritmo de ordenação não comparativo.', false, 'ele compara pares adjacentes; não comparativos são Counting/Radix Sort'],
    ]),

  obj('ALG-04', 'algoritmos', 2,
    'A recorrência T(n) = 2T(n/2) + n, com T(1) = 1, descreve o custo de um algoritmo de divisão e conquista. Pelo Teorema Mestre, T(n) pertence a',
    [
      ['Θ(n).', 'Seria o caso se f(n) dominasse polinomialmente n^(log₂2) = n, o que não ocorre.'],
      ['Θ(n log n).', 'a = 2, b = 2, n^(log_b a) = n = f(n): caso 2 do Teorema Mestre.'],
      ['Θ(n²).', 'Seria, por exemplo, T(n) = 4T(n/2) + n.'],
      ['Θ(log n).', 'Seria T(n) = T(n/2) + 1 (busca binária).'],
      ['Θ(2ⁿ).', 'Recorrências de divisão e conquista desse tipo não são exponenciais.'],
    ], 1, 'Teorema Mestre: compare f(n) com n^(log_b a).'),

  obj('ALG-05', 'algoritmos', 2,
    'Em um grafo com pesos não negativos nas arestas, deseja-se encontrar o menor caminho de um vértice de origem para todos os demais. O algoritmo mais adequado é',
    [
      ['Busca em profundidade (DFS).', 'DFS não considera pesos e não garante menor caminho.'],
      ['Dijkstra.', 'Resolve caminhos mínimos de fonte única com pesos não negativos.'],
      ['Kruskal.', 'Encontra árvore geradora mínima, não caminhos mínimos.'],
      ['Ordenação topológica.', 'Ordena vértices de um DAG; não calcula distâncias em grafos gerais.'],
      ['Floyd-Warshall com pesos negativos obrigatórios.', 'Floyd-Warshall calcula todos os pares e não exige pesos negativos; não é o mais adequado para fonte única.'],
    ], 1),

  ar('ALG-06', 'algoritmos', 3,
    'Problemas da classe NP-completo aparecem com frequência em otimização, como o problema do caixeiro-viajante (versão de decisão).',
    'Se for encontrado um algoritmo polinomial para um problema NP-completo, então P = NP.',
    'Todo problema em NP pode ser reduzido em tempo polinomial a qualquer problema NP-completo.',
    true, true, true,
    'Como todo problema de NP se reduz polinomialmente a um NP-completo (II), resolver um NP-completo em tempo polinomial resolveria todos os de NP em tempo polinomial (I).'),

  obj('ALG-07', 'algoritmos', 2,
    'O problema da mochila 0/1 pode ser resolvido em tempo pseudopolinomial O(n·W), em que n é o número de itens e W a capacidade. A técnica que permite esse resultado é',
    [
      ['algoritmo guloso, escolhendo itens por maior razão valor/peso.', 'O guloso é ótimo para a mochila fracionária, mas não para a 0/1.'],
      ['programação dinâmica, armazenando soluções de subproblemas em uma tabela.', 'A tabela n × W evita recomputar subproblemas sobrepostos.'],
      ['força bruta, testando todas as combinações.', 'Força bruta custa O(2ⁿ).'],
      ['busca binária sobre os pesos.', 'Não se aplica à estrutura do problema.'],
      ['ordenação por contagem.', 'É um algoritmo de ordenação, não de otimização.'],
    ], 1),

  obj('ALG-08', 'algoritmos', 1,
    'Analise a função recursiva.\n\n```\nint f(int n) {\n  if (n <= 1) return 1;\n  return n * f(n - 1);\n}\n```\n\nO valor retornado por f(5) é',
    [
      ['5', 'Seria o caso se não houvesse multiplicação recursiva.'],
      ['15', 'Corresponde à soma 1+2+3+4+5, não ao produto.'],
      ['24', 'Corresponde a 4! (f(4)).'],
      ['120', 'f(5) = 5 × 4 × 3 × 2 × 1 = 120 (fatorial).'],
      ['720', 'Corresponde a 6!.'],
    ], 3),

  // ───────── Estruturas de Dados ─────────
  obj('ED-01', 'estruturas', 1,
    'Em um sistema de atendimento, os pedidos devem ser processados na ordem de chegada. A estrutura de dados mais adequada é a',
    [
      ['pilha.', 'Pilha segue LIFO: o último a chegar seria atendido primeiro.'],
      ['fila.', 'Fila segue FIFO: o primeiro a chegar é o primeiro atendido.'],
      ['árvore binária de busca.', 'Organiza por chave, não por ordem de chegada.'],
      ['tabela hash.', 'Otimiza busca por chave, sem preservar ordem de chegada.'],
      ['grafo.', 'Representa relações, não uma ordem de atendimento.'],
    ], 1),

  obj('ED-02', 'estruturas', 2,
    'Inserem-se, nesta ordem, as chaves 50, 30, 70, 20, 40, 60 e 80 em uma árvore binária de busca inicialmente vazia. O percurso em pré-ordem dessa árvore é',
    [
      ['20, 30, 40, 50, 60, 70, 80', 'Esse é o percurso em ordem simétrica (in-ordem).'],
      ['50, 30, 20, 40, 70, 60, 80', 'Pré-ordem: raiz, subárvore esquerda, subárvore direita.'],
      ['20, 40, 30, 60, 80, 70, 50', 'Esse é o percurso em pós-ordem.'],
      ['50, 30, 70, 20, 40, 60, 80', 'Esse é o percurso em largura (por níveis).'],
      ['80, 70, 60, 50, 40, 30, 20', 'É a ordem decrescente, não um percurso padrão.'],
    ], 1),

  ma('ED-03', 'estruturas', 2,
    'Sobre tabelas hash (tabelas de dispersão), avalie as afirmativas.',
    [
      ['No caso médio, busca, inserção e remoção têm custo O(1).', true, 'com boa função hash e fator de carga controlado'],
      ['Colisões são impossíveis quando a função hash é bem escolhida.', false, 'pelo princípio da casa dos pombos, colisões sempre podem ocorrer'],
      ['Encadeamento separado e endereçamento aberto são técnicas de tratamento de colisões.', true, 'são as duas famílias clássicas'],
    ]),

  obj('ED-04', 'estruturas', 2,
    'Uma árvore AVL mantém, para cada nó, a diferença de altura entre as subárvores esquerda e direita limitada a 1. A principal vantagem dessa restrição é',
    [
      ['ocupar menos memória que uma lista encadeada.', 'AVL armazena ponteiros e fator de balanceamento; não ocupa menos memória.'],
      ['garantir altura O(log n), mantendo buscas em O(log n) no pior caso.', 'O balanceamento evita a degeneração em lista.'],
      ['permitir chaves duplicadas sem custo adicional.', 'Não é a finalidade do balanceamento.'],
      ['eliminar a necessidade de comparações durante a busca.', 'A busca continua sendo por comparações.'],
      ['garantir inserção em O(1).', 'Inserção em AVL é O(log n).'],
    ], 1),

  obj('ED-05', 'estruturas', 1,
    'Considere uma pilha inicialmente vazia e as operações: push(1), push(2), pop(), push(3), push(4), pop(), pop(), push(5).\n\nO elemento no topo da pilha ao final é',
    [
      ['1', 'O 1 está na base, abaixo do 5.'],
      ['2', 'O 2 foi removido no primeiro pop().'],
      ['3', 'O 3 foi removido no terceiro pop().'],
      ['4', 'O 4 foi removido no segundo pop().'],
      ['5', 'Pilha final: [1, 5]; o topo é 5.'],
    ], 4),

  ar('ED-06', 'estruturas', 2,
    'Um heap binário máximo é frequentemente implementado em um vetor.',
    'Em um heap máximo, o maior elemento pode ser obtido em O(1).',
    'Em um heap máximo, todo nó é maior ou igual a seus filhos, então o maior elemento fica na raiz.',
    true, true, true,
    'A propriedade de heap (II) garante que o máximo está na raiz, posição 0 do vetor, acessível em O(1) (I).'),

  obj('ED-07', 'estruturas', 2,
    'Um grafo com V vértices e E arestas é muito esparso (E ≈ V). A representação que economiza mais memória é',
    [
      ['matriz de adjacência, com O(V²) de espaço.', 'Para grafos esparsos, desperdiça espaço com zeros.'],
      ['lista de adjacência, com O(V + E) de espaço.', 'Armazena apenas as arestas existentes.'],
      ['matriz de incidência, com O(V·E) de espaço.', 'Ainda maior que a lista de adjacência.'],
      ['vetor ordenado de vértices sem arestas.', 'Não representa as arestas do grafo.'],
      ['árvore AVL de vértices.', 'Não representa relações de adjacência.'],
    ], 1),

  obj('ED-08', 'estruturas', 2,
    'Em uma lista duplamente encadeada, dado um ponteiro para um nó, a remoção desse nó tem custo',
    [
      ['O(1), pois é possível acessar o anterior e o próximo diretamente.', 'Basta religar anterior.prox e próximo.ant.'],
      ['O(n), pois é preciso percorrer a lista desde o início.', 'Isso ocorre na lista simplesmente encadeada, para achar o anterior.'],
      ['O(log n), como em árvores balanceadas.', 'Não há estrutura hierárquica.'],
      ['O(n²), devido ao deslocamento de elementos.', 'Listas encadeadas não deslocam elementos, ao contrário de vetores.'],
      ['impossível sem copiar toda a lista.', 'A remoção é feita apenas ajustando ponteiros.'],
    ], 0),

  // ───────── Programação e Paradigmas ─────────
  obj('PRG-01', 'programacao', 1,
    'Na programação orientada a objetos, o princípio que consiste em ocultar os detalhes internos de uma classe, expondo apenas uma interface pública, é',
    [
      ['herança.', 'Herança é o reaproveitamento de estrutura e comportamento de uma superclasse.'],
      ['polimorfismo.', 'Polimorfismo é a capacidade de um mesmo método ter comportamentos diferentes.'],
      ['encapsulamento.', 'Encapsular é proteger o estado interno e expor uma interface controlada.'],
      ['sobrecarga.', 'Sobrecarga é ter métodos de mesmo nome com assinaturas diferentes.'],
      ['recursão.', 'Recursão é uma técnica algorítmica, não um princípio de OO.'],
    ], 2),

  obj('PRG-02', 'programacao', 2,
    'Considere o código em Python.\n\n```\ndef f(lista=[]):\n    lista.append(1)\n    return lista\n\nf()\nf()\nprint(f())\n```\n\nO que é impresso?',
    [
      ['[1]', 'Seria o esperado se o valor padrão fosse recriado a cada chamada, o que não ocorre em Python.'],
      ['[1, 1]', 'Ignora que a terceira chamada também adiciona um elemento.'],
      ['[1, 1, 1]', 'O argumento padrão mutável é criado uma única vez e compartilhado entre as chamadas.'],
      ['[]', 'A função sempre adiciona 1 antes de retornar.'],
      ['Um erro de execução.', 'O código é válido.'],
    ], 2, 'Em Python, valores padrão de parâmetros são avaliados uma vez, na definição da função.'),

  ma('PRG-03', 'programacao', 2,
    'Sobre paradigmas de programação, avalie as afirmativas.',
    [
      ['No paradigma funcional, funções puras não produzem efeitos colaterais.', true, 'funções puras dependem só das entradas e não alteram estado externo'],
      ['Prolog é uma linguagem do paradigma lógico, baseada em fatos e regras.', true, 'Prolog usa cláusulas de Horn e unificação'],
      ['No paradigma imperativo, o programa descreve o que deve ser obtido, sem especificar como.', false, 'isso caracteriza o paradigma declarativo; o imperativo descreve como, passo a passo'],
    ]),

  obj('PRG-04', 'programacao', 2,
    'Em Java, uma classe Animal possui o método som(). As classes Cachorro e Gato estendem Animal e sobrescrevem som(). Ao executar\n\n```\nAnimal a = new Gato();\na.som();\n```\n\nserá executado o método som() de',
    [
      ['Animal, pois a variável é do tipo Animal.', 'O tipo estático não define o método executado em métodos sobrescritos.'],
      ['Gato, por causa da ligação dinâmica (polimorfismo).', 'O método é escolhido pelo tipo real do objeto em tempo de execução.'],
      ['Cachorro, pois foi a primeira subclasse declarada.', 'A ordem de declaração é irrelevante.'],
      ['nenhum; ocorre erro de compilação.', 'Atribuir subclasse a variável da superclasse é válido.'],
      ['ambos, Animal e Gato, em sequência.', 'Só o método sobrescrito é executado, salvo chamada explícita a super.'],
    ], 1),

  ar('PRG-05', 'programacao', 2,
    'Linguagens como C permitem manipulação direta de memória por ponteiros.',
    'Em C, o programador é responsável por liberar a memória alocada dinamicamente com malloc.',
    'A linguagem C possui coletor de lixo (garbage collector) nativo.',
    true, false, false,
    'A I é verdadeira (usa-se free). A II é falsa: C não tem coleta de lixo nativa, justamente por isso a liberação é manual.'),

  obj('PRG-06', 'programacao', 1,
    'Qual o valor de x ao final da execução do pseudocódigo?\n\n```\nx ← 0\npara i de 1 até 10 faça\n  se i mod 2 = 0 então\n    x ← x + i\nfim-para\n```',
    [
      ['25', 'É a soma dos ímpares de 1 a 10.'],
      ['30', 'Soma dos pares: 2 + 4 + 6 + 8 + 10 = 30.'],
      ['55', 'É a soma de todos os números de 1 a 10.'],
      ['10', 'É apenas o último par.'],
      ['5', 'É a quantidade de pares, não a soma.'],
    ], 1),

  obj('PRG-07', 'programacao', 2,
    'O princípio SOLID que afirma que “entidades de software devem estar abertas para extensão, mas fechadas para modificação” é o',
    [
      ['Princípio da Responsabilidade Única (SRP).', 'SRP diz que uma classe deve ter um único motivo para mudar.'],
      ['Princípio Aberto/Fechado (OCP).', 'É exatamente a definição do OCP.'],
      ['Princípio da Substituição de Liskov (LSP).', 'LSP trata de subtipos substituírem seus tipos base sem quebrar o programa.'],
      ['Princípio da Segregação de Interfaces (ISP).', 'ISP recomenda interfaces pequenas e específicas.'],
      ['Princípio da Inversão de Dependência (DIP).', 'DIP recomenda depender de abstrações, não de implementações.'],
    ], 1),

  obj('PRG-08', 'programacao', 2,
    'Analise o código JavaScript.\n\n```\nconst nums = [1, 2, 3, 4];\nconst r = nums.filter(n => n % 2 === 0).map(n => n * 10).reduce((a, b) => a + b, 0);\n```\n\nO valor de r é',
    [
      ['100', 'É a soma de todos multiplicados por 10.'],
      ['60', 'Pares [2, 4] → [20, 40] → 20 + 40 = 60.'],
      ['40', 'Considera apenas o último par.'],
      ['6', 'Esquece o map que multiplica por 10.'],
      ['[20, 40]', 'O reduce transforma o vetor em um único número.'],
    ], 1),

  disc('ALG-D1', 'algoritmos',
    'Uma empresa precisa verificar, em uma lista de n CPFs, se existe algum CPF duplicado. Um estagiário propôs comparar cada CPF com todos os outros.\n\na) Qual a complexidade da solução do estagiário? b) Proponha uma solução mais eficiente, descrevendo o algoritmo e sua complexidade. c) Cite uma vantagem e uma desvantagem da sua solução.',
    'a) Comparar todos os pares é O(n²). b) Opção 1: ordenar (O(n log n)) e verificar elementos adjacentes (O(n)), total O(n log n). Opção 2: inserir em uma tabela hash/conjunto e verificar se já existe, O(n) no caso médio. c) Hash: vantagem é tempo médio linear; desvantagem é memória extra O(n) e pior caso O(n²) com muitas colisões. Ordenação: vantagem é pouca memória extra (in-place); desvantagem é O(n log n) e alteração da ordem original.',
    ['Identifica O(n²) corretamente (3 pontos)', 'Propõe solução O(n log n) ou O(n) bem descrita (4 pontos)', 'Discute vantagem e desvantagem pertinentes (3 pontos)']),

  disc('ED-D1', 'estruturas',
    'Um editor de textos precisa implementar as funções “desfazer” (Ctrl+Z) e “refazer” (Ctrl+Y). Explique quais estruturas de dados você usaria, como as operações funcionariam e o que acontece com o histórico de “refazer” quando o usuário faz uma nova edição.',
    'Usar duas pilhas: Desfazer e Refazer. Cada edição é empilhada em Desfazer. Ctrl+Z desempilha de Desfazer, reverte a ação e a empilha em Refazer. Ctrl+Y desempilha de Refazer, reaplica e empilha em Desfazer. Uma nova edição após desfazer limpa a pilha Refazer, pois o histórico alternativo deixa de ser válido. Pilhas são adequadas pela natureza LIFO.',
    ['Escolhe pilhas e justifica pela política LIFO (3 pontos)', 'Descreve corretamente desfazer e refazer (4 pontos)', 'Explica a limpeza da pilha de refazer após nova edição (3 pontos)']),
];
