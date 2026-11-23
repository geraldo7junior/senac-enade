import { ar, disc, ma, obj } from '../build';

/** Redes, Banco de Dados, Engenharia de Software, IA */
export const CE3 = [
  // ───────── Redes de Computadores ─────────
  obj('RED-01', 'redes', 1,
    'No modelo TCP/IP, o protocolo responsável pela entrega confiável e ordenada de segmentos, com controle de fluxo e de congestionamento, é o',
    [
      ['IP.', 'IP é da camada de rede e oferece entrega de melhor esforço, sem garantias.'],
      ['UDP.', 'UDP é de transporte, mas não garante entrega nem ordem.'],
      ['TCP.', 'TCP é orientado a conexão, confiável, com controle de fluxo e congestionamento.'],
      ['HTTP.', 'HTTP é de aplicação e usa o TCP (ou QUIC) para transporte.'],
      ['ARP.', 'ARP mapeia endereços IP em endereços MAC.'],
    ], 2),

  obj('RED-02', 'redes', 2,
    'Uma rede usa o endereço 192.168.10.0/26. Quantos endereços IPv4 utilizáveis para hosts existem nessa sub-rede?',
    [
      ['64', 'É o total de endereços do bloco, incluindo rede e broadcast.'],
      ['62', '2⁶ − 2 = 62 (excluem-se rede e broadcast).'],
      ['254', 'Corresponde a uma máscara /24.'],
      ['30', 'Corresponde a uma máscara /27.'],
      ['126', 'Corresponde a uma máscara /25.'],
    ], 1, 'Hosts = 2^(32 − prefixo) − 2.'),

  ma('RED-03', 'redes', 2,
    'Sobre protocolos da camada de aplicação, avalie as afirmativas.',
    [
      ['O DNS traduz nomes de domínio em endereços IP.', true, 'é a função principal do DNS'],
      ['O DHCP atribui configurações de rede automaticamente aos hosts.', true, 'fornece IP, máscara, gateway e DNS'],
      ['O SMTP é utilizado para ler e-mails na caixa de entrada do usuário.', false, 'SMTP envia e-mails; leitura usa IMAP ou POP3'],
    ]),

  obj('RED-04', 'redes', 2,
    'Um switch de camada 2 decide para qual porta encaminhar um quadro com base',
    [
      ['no endereço IP de destino.', 'Isso é feito por roteadores (camada 3).'],
      ['no endereço MAC de destino, consultando sua tabela de endereços.', 'O switch aprende MACs por porta e encaminha seletivamente.'],
      ['na porta TCP de destino.', 'Portas são da camada de transporte.'],
      ['no nome de domínio.', 'Nomes são resolvidos pelo DNS, na aplicação.'],
      ['aleatoriamente, para balancear carga.', 'O encaminhamento é determinístico.'],
    ], 1),

  ar('RED-05', 'redes', 2,
    'Aplicações de videoconferência e jogos on-line têm requisitos rígidos de latência.',
    'Muitas aplicações de tempo real usam UDP em vez de TCP.',
    'O UDP não realiza retransmissões nem estabelecimento de conexão, reduzindo o atraso.',
    true, true, true,
    'A ausência de retransmissão e handshake (II) é o motivo de o UDP ser preferido em tempo real (I): pacotes atrasados são inúteis.'),

  obj('RED-06', 'redes', 1,
    'O estabelecimento de uma conexão TCP utiliza o three-way handshake, cuja sequência de segmentos é',
    [
      ['SYN, SYN-ACK, ACK.', 'Cliente envia SYN, servidor responde SYN-ACK e cliente confirma com ACK.'],
      ['ACK, SYN, FIN.', 'FIN é usado para encerrar conexões.'],
      ['SYN, ACK, FIN.', 'Mistura abertura e encerramento.'],
      ['FIN, ACK, SYN.', 'Ordem inválida.'],
      ['GET, POST, PUT.', 'São métodos HTTP.'],
    ], 0),

  obj('RED-07', 'redes', 2,
    'Uma empresa usa endereços privados 10.0.0.0/8 internamente e um único IP público para acessar a internet. A técnica que permite isso é',
    [
      ['VLAN.', 'VLAN segmenta logicamente a rede local.'],
      ['NAT (Network Address Translation).', 'NAT traduz endereços privados para o IP público, usando portas para diferenciar conexões.'],
      ['ARP.', 'ARP resolve IP para MAC na rede local.'],
      ['ICMP.', 'ICMP envia mensagens de controle e erro, como o ping.'],
      ['STP.', 'Spanning Tree evita laços em redes comutadas.'],
    ], 1),

  // ───────── Banco de Dados ─────────
  obj('BD-01', 'bd', 1,
    'Considere as tabelas ALUNO(matricula, nome, id_curso) e CURSO(id_curso, nome_curso). A consulta que lista o nome de cada aluno com o nome do seu curso é',
    [
      ['SELECT nome, nome_curso FROM ALUNO, CURSO;', 'Sem condição de junção, gera produto cartesiano.'],
      ['SELECT a.nome, c.nome_curso FROM ALUNO a JOIN CURSO c ON a.id_curso = c.id_curso;', 'Junção interna pela chave estrangeira.'],
      ['SELECT nome FROM ALUNO WHERE nome_curso IS NOT NULL;', 'nome_curso não existe em ALUNO.'],
      ['SELECT * FROM CURSO GROUP BY nome;', 'GROUP BY por coluna inexistente em CURSO.'],
      ['SELECT a.nome, c.nome_curso FROM ALUNO a JOIN CURSO c ON a.matricula = c.id_curso;', 'Junta por colunas sem relação.'],
    ], 1),

  ma('BD-02', 'bd', 2,
    'Sobre as propriedades ACID de transações, avalie as afirmativas.',
    [
      ['Atomicidade garante que todas as operações da transação sejam efetivadas ou nenhuma.', true, 'é o “tudo ou nada”'],
      ['Isolamento garante que transações concorrentes não interfiram indevidamente umas nas outras.', true, 'o efeito deve equivaler a alguma execução serial'],
      ['Durabilidade garante que dados sejam replicados em vários servidores.', false, 'durabilidade é persistir efeitos confirmados mesmo após falhas, não replicação'],
    ]),

  obj('BD-03', 'bd', 2,
    'A tabela PEDIDO(num_pedido, cod_produto, nome_produto, quantidade) tem chave primária composta (num_pedido, cod_produto). nome_produto depende apenas de cod_produto. Essa tabela viola a',
    [
      ['1FN, pois possui atributos multivalorados.', 'Todos os atributos são atômicos.'],
      ['2FN, pois há dependência parcial da chave primária.', 'nome_produto depende de parte da chave (cod_produto).'],
      ['3FN, por dependência transitiva entre atributos não chave.', 'O problema é dependência parcial, verificado antes da 3FN.'],
      ['FNBC, por não ter chave primária.', 'A tabela tem chave primária composta.'],
      ['nenhuma forma normal.', 'Há dependência parcial.'],
    ], 1),

  obj('BD-04', 'bd', 2,
    'Analise a consulta.\n\n```\nSELECT id_curso, COUNT(*)\nFROM ALUNO\nGROUP BY id_curso\nHAVING COUNT(*) > 30;\n```\n\nEla retorna',
    [
      ['todos os alunos com mais de 30 anos.', 'Não há filtro por idade.'],
      ['os cursos com mais de 30 alunos e a quantidade de alunos de cada um.', 'GROUP BY agrupa por curso e HAVING filtra os grupos.'],
      ['os 30 primeiros alunos de cada curso.', 'Não há limite de linhas por grupo.'],
      ['um erro, pois HAVING só pode ser usado sem GROUP BY.', 'HAVING é usado justamente com GROUP BY.'],
      ['o total geral de alunos.', 'O resultado é por curso.'],
    ], 1, 'WHERE filtra linhas antes do agrupamento; HAVING filtra grupos depois.'),

  ar('BD-05', 'bd', 2,
    'Índices são estruturas auxiliares usadas por SGBDs relacionais.',
    'Criar índices em todas as colunas de uma tabela sempre melhora o desempenho do banco de dados.',
    'Índices aceleram consultas, mas tornam inserções, atualizações e remoções mais custosas.',
    false, true, false,
    'A I é falsa porque cada índice precisa ser atualizado nas escritas e ocupa espaço (exatamente o que diz a II, que é verdadeira).'),

  obj('BD-06', 'bd', 2,
    'Em um modelo entidade-relacionamento, ALUNO e DISCIPLINA têm relacionamento N:N “cursa”, com o atributo nota. No modelo relacional, esse relacionamento é mapeado para',
    [
      ['uma chave estrangeira em ALUNO.', 'Só comporta uma disciplina por aluno.'],
      ['uma tabela associativa com as chaves de ALUNO e DISCIPLINA e o atributo nota.', 'Relacionamentos N:N viram tabelas próprias com as chaves e os atributos do relacionamento.'],
      ['um atributo multivalorado em DISCIPLINA.', 'Violaria a 1FN.'],
      ['a fusão das duas tabelas.', 'Geraria redundância massiva.'],
      ['uma visão (view) sem tabela física.', 'É preciso armazenar os dados do relacionamento.'],
    ], 1),

  obj('BD-07', 'bd', 2,
    'Um sistema de rede social precisa armazenar grandes volumes de dados com esquema flexível e escalabilidade horizontal. Uma escolha adequada é',
    [
      ['um banco NoSQL orientado a documentos, como MongoDB.', 'Esquema flexível e fácil escalabilidade horizontal por sharding.'],
      ['uma planilha eletrônica compartilhada.', 'Não é um SGBD e não escala.'],
      ['arquivos de texto sem estrutura.', 'Não oferece consultas, índices nem concorrência.'],
      ['um banco relacional sem índices.', 'Não atende a flexibilidade de esquema e degrada o desempenho.'],
      ['um único arquivo XML local.', 'Não escala nem suporta concorrência.'],
    ], 0),

  // ───────── Engenharia de Software ─────────
  obj('ES-01', 'es', 1,
    'No Scrum, o evento cujo objetivo é inspecionar como foi a última Sprint em relação a pessoas, processos e ferramentas, e planejar melhorias, é a',
    [
      ['Sprint Planning.', 'Planeja o trabalho da próxima Sprint.'],
      ['Daily Scrum.', 'Reunião diária para inspecionar o progresso rumo à meta.'],
      ['Sprint Review.', 'Inspeciona o incremento com as partes interessadas.'],
      ['Sprint Retrospective.', 'Foca na melhoria do processo e da equipe.'],
      ['Backlog Refinement.', 'Detalha e estima itens do Product Backlog.'],
    ], 3),

  ma('ES-02', 'es', 2,
    'Sobre testes de software, avalie as afirmativas.',
    [
      ['Testes de caixa-branca são projetados com base na estrutura interna do código.', true, 'usam cobertura de comandos, desvios e caminhos'],
      ['Testes de regressão verificam se mudanças não introduziram defeitos em funcionalidades existentes.', true, 'reexecutam testes após alterações'],
      ['Testes unitários verificam a integração entre vários sistemas externos.', false, 'unitários isolam a menor unidade; integração é outro nível'],
      ['Particionamento em classes de equivalência é uma técnica de caixa-preta.', true, 'baseia-se na especificação das entradas'],
    ]),

  obj('ES-03', 'es', 2,
    'O requisito “o sistema deve responder a 95% das requisições em até 2 segundos” é um requisito',
    [
      ['funcional.', 'Funcionais descrevem o que o sistema faz, não como se comporta em qualidade.'],
      ['não funcional, de desempenho.', 'Define restrição de qualidade (tempo de resposta).'],
      ['de domínio legal.', 'Não decorre de lei.'],
      ['de usuário, informal.', 'É mensurável e técnico.'],
      ['inválido, pois não pode ser testado.', 'É verificável por testes de carga.'],
    ], 1),

  obj('ES-04', 'es', 2,
    'Uma classe deve ter uma única instância em toda a aplicação, com ponto global de acesso (por exemplo, um gerenciador de configurações). O padrão de projeto adequado é',
    [
      ['Observer.', 'Notifica dependentes sobre mudanças de estado.'],
      ['Singleton.', 'Garante uma única instância e acesso global a ela.'],
      ['Factory Method.', 'Delega a criação de objetos a subclasses.'],
      ['Adapter.', 'Converte uma interface em outra.'],
      ['Strategy.', 'Encapsula algoritmos intercambiáveis.'],
    ], 1),

  ar('ES-05', 'es', 2,
    'Práticas de DevOps buscam integrar desenvolvimento e operações.',
    'A integração contínua (CI) reduz problemas de integração tardia.',
    'Na CI, o código é integrado ao repositório principal com frequência, disparando builds e testes automatizados.',
    true, true, true,
    'Integrar frequentemente com verificação automática (II) é o que evita conflitos e defeitos acumulados no fim (I).'),

  obj('ES-06', 'es', 1,
    'Em UML, o diagrama mais adequado para representar a interação entre atores e funcionalidades do sistema, na fase de levantamento de requisitos, é o diagrama de',
    [
      ['classes.', 'Modela a estrutura estática do sistema.'],
      ['casos de uso.', 'Representa atores e os serviços que o sistema oferece a eles.'],
      ['implantação.', 'Mostra a distribuição física dos componentes.'],
      ['estados.', 'Modela o ciclo de vida de um objeto.'],
      ['componentes.', 'Mostra a organização modular do software.'],
    ], 1),

  obj('ES-07', 'es', 2,
    'O versionamento semântico (SemVer) usa o formato MAIOR.MENOR.CORREÇÃO. Uma biblioteca na versão 2.4.1 recebeu uma mudança que quebra a compatibilidade da API pública. A nova versão deve ser',
    [
      ['2.4.2', 'Indica apenas correção de bug compatível.'],
      ['2.5.0', 'Indica nova funcionalidade compatível.'],
      ['3.0.0', 'Mudanças incompatíveis incrementam a versão MAIOR e zeram as demais.'],
      ['2.4.1-beta', 'Rótulo de pré-lançamento, sem indicar quebra de API.'],
      ['3.4.1', 'Ao incrementar a MAIOR, MENOR e CORREÇÃO voltam a zero.'],
    ], 2),

  // ───────── Inteligência Artificial e Ciência de Dados ─────────
  obj('IA-01', 'ia', 1,
    'Um modelo é treinado com e-mails rotulados como “spam” ou “não spam” para classificar novos e-mails. Esse é um exemplo de aprendizado',
    [
      ['supervisionado.', 'Há exemplos rotulados com a resposta esperada.'],
      ['não supervisionado.', 'Seria o caso sem rótulos, como em clusterização.'],
      ['por reforço.', 'Envolve um agente que aprende por recompensas em interação com o ambiente.'],
      ['simbólico por regras manuais.', 'As regras são aprendidas dos dados, não escritas à mão.'],
      ['por busca em largura.', 'BFS é algoritmo de busca, não de aprendizado.'],
    ], 0),

  obj('IA-02', 'ia', 2,
    'Um modelo obtém 99% de acurácia nos dados de treino e 65% nos dados de teste. O fenômeno observado e uma forma de mitigá-lo são',
    [
      ['underfitting; aumentar a regularização.', 'Underfitting tem desempenho ruim também no treino.'],
      ['overfitting; usar regularização, mais dados ou validação cruzada.', 'O modelo decorou o treino e não generaliza.'],
      ['overfitting; treinar por mais épocas.', 'Treinar mais tende a piorar o sobreajuste.'],
      ['viés nulo; nenhuma ação é necessária.', 'A diferença indica problema de generalização.'],
      ['vazamento de memória; reiniciar o servidor.', 'Não é problema de infraestrutura.'],
    ], 1),

  ma('IA-03', 'ia', 2,
    'Sobre métricas de avaliação de classificadores, avalie as afirmativas.',
    [
      ['Precisão é a proporção de verdadeiros positivos entre todos os exemplos classificados como positivos.', true, 'VP / (VP + FP)'],
      ['Revocação (recall) é a proporção de verdadeiros positivos entre todos os positivos reais.', true, 'VP / (VP + FN)'],
      ['Em bases muito desbalanceadas, a acurácia é sempre a métrica mais confiável.', false, 'um modelo que só prevê a classe majoritária pode ter acurácia alta e ser inútil'],
    ]),

  obj('IA-04', 'ia', 2,
    'O algoritmo k-means é utilizado para',
    [
      ['classificar dados rotulados em k classes conhecidas.', 'É algoritmo não supervisionado; não usa rótulos.'],
      ['agrupar dados não rotulados em k grupos com base na proximidade aos centroides.', 'Atribui pontos ao centroide mais próximo e recalcula centroides iterativamente.'],
      ['encontrar o menor caminho em grafos.', 'É função de algoritmos como Dijkstra.'],
      ['reduzir a dimensionalidade preservando variância.', 'Essa é a finalidade do PCA.'],
      ['gerar texto a partir de prompts.', 'É função de modelos de linguagem.'],
    ], 1),

  ar('IA-05', 'ia', 3,
    'Algoritmos de busca são fundamentais em IA clássica.',
    'O algoritmo A* encontra o caminho ótimo quando a heurística é admissível.',
    'Uma heurística admissível nunca superestima o custo real até o objetivo.',
    true, true, true,
    'Por nunca superestimar (II), o A* não descarta o caminho ótimo antes de encontrá-lo, garantindo otimalidade (I).'),

  obj('IA-06', 'ia', 2,
    'Em redes neurais, a função de ativação ReLU é definida como',
    [
      ['f(x) = 1 / (1 + e^(−x))', 'Essa é a sigmoide.'],
      ['f(x) = max(0, x)', 'ReLU zera valores negativos e mantém os positivos.'],
      ['f(x) = x²', 'Não é função de ativação usual.'],
      ['f(x) = tanh(x)', 'É a tangente hiperbólica.'],
      ['f(x) = 0 para todo x', 'Anularia a rede.'],
    ], 1),

  obj('IA-07', 'ia', 2,
    'Em modelos de linguagem de grande porte (LLMs), o termo “alucinação” refere-se a',
    [
      ['falhas de hardware durante o treinamento.', 'Não se trata de hardware.'],
      ['respostas fluentes e plausíveis, porém factualmente incorretas ou inventadas.', 'O modelo gera conteúdo sem respaldo nos dados ou na realidade.'],
      ['a capacidade de gerar imagens.', 'Não é o significado técnico do termo.'],
      ['o processo de tokenização do texto.', 'Tokenização divide o texto em unidades.'],
      ['a compressão do modelo para dispositivos móveis.', 'Isso é quantização ou destilação.'],
    ], 1, 'Técnicas como RAG (geração aumentada por recuperação) e verificação humana reduzem alucinações.'),

  disc('BD-D1', 'bd',
    'Uma biblioteca universitária deseja um banco de dados para controlar livros, exemplares, usuários e empréstimos. Cada livro pode ter vários exemplares; cada empréstimo envolve um exemplar, um usuário, data de retirada e data de devolução.\n\na) Proponha o esquema relacional com chaves primárias e estrangeiras. b) Escreva uma consulta SQL que liste os usuários com empréstimos em atraso (data de devolução prevista anterior à data atual e ainda não devolvidos).',
    'a) LIVRO(id_livro PK, titulo, autor, isbn); EXEMPLAR(id_exemplar PK, id_livro FK→LIVRO); USUARIO(id_usuario PK, nome, email); EMPRESTIMO(id_emprestimo PK, id_exemplar FK→EXEMPLAR, id_usuario FK→USUARIO, data_retirada, data_prevista, data_devolucao NULL). b) SELECT DISTINCT u.nome FROM USUARIO u JOIN EMPRESTIMO e ON e.id_usuario = u.id_usuario WHERE e.data_devolucao IS NULL AND e.data_prevista < CURRENT_DATE;',
    ['Separa livro e exemplar corretamente (3 pontos)', 'Define PKs e FKs coerentes (3 pontos)', 'Consulta SQL correta com junção e filtros (4 pontos)']),

  disc('ES-D1', 'es',
    'Uma startup está desenvolvendo um aplicativo e os requisitos mudam a cada semana, conforme feedback dos clientes. Compare o modelo cascata com uma abordagem ágil (Scrum ou Kanban) para esse cenário e justifique qual você recomendaria, citando duas práticas concretas.',
    'O cascata é sequencial, com requisitos definidos no início e pouca tolerância a mudanças; mudanças tardias são caras. Métodos ágeis trabalham em ciclos curtos, entregas incrementais e feedback contínuo, acomodando mudanças. Recomendação: ágil. Práticas: Sprints curtas com Review com clientes, backlog priorizado pelo Product Owner, integração contínua, retrospectivas, quadro Kanban com limite de WIP.',
    ['Caracteriza corretamente o cascata (3 pontos)', 'Caracteriza corretamente a abordagem ágil (3 pontos)', 'Recomenda com justificativa e duas práticas concretas (4 pontos)']),

  disc('RED-D1', 'redes',
    'Ao digitar https://www.senac.br no navegador, diversos protocolos atuam até a página ser exibida. Descreva, em ordem, pelo menos quatro etapas desse processo, indicando o protocolo e a camada envolvidos em cada uma.',
    '1) Resolução DNS do nome para IP (aplicação, normalmente sobre UDP 53). 2) ARP para descobrir o MAC do gateway (enlace). 3) Estabelecimento da conexão TCP com three-way handshake na porta 443 (transporte), ou QUIC/UDP no HTTP/3. 4) Handshake TLS para negociação de chaves e verificação do certificado (entre transporte e aplicação). 5) Requisição HTTP GET e resposta com o HTML (aplicação). 6) Roteamento dos pacotes via IP (rede).',
    ['Cita DNS corretamente (2 pontos)', 'Cita TCP/handshake ou QUIC (2 pontos)', 'Cita TLS/HTTPS (3 pontos)', 'Cita HTTP e ordem coerente das etapas (3 pontos)']),
];
