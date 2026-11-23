import { ar, disc, ma, obj } from '../build';

/** Segurança, Distribuídos, IHC, Computação Gráfica, Probabilidade e Estatística, Sociedade */
export const CE4 = [
  // ───────── Segurança da Informação ─────────
  obj('SEG-01', 'seguranca', 1,
    'A tríade clássica da segurança da informação é composta por',
    [
      ['confidencialidade, integridade e disponibilidade.', 'É a tríade CIA (CID em português).'],
      ['criptografia, firewall e antivírus.', 'São mecanismos, não propriedades fundamentais.'],
      ['autenticação, auditoria e backup.', 'São controles que apoiam a tríade.'],
      ['velocidade, escalabilidade e custo.', 'São requisitos de desempenho e negócio.'],
      ['hardware, software e rede.', 'São componentes de infraestrutura.'],
    ], 0),

  obj('SEG-02', 'seguranca', 2,
    'Analise o código de login.\n\n```\nsql = "SELECT * FROM usuarios WHERE login = \'" + login + "\' AND senha = \'" + senha + "\'";\n```\n\nSe o atacante digitar como login o texto  \' OR \'1\'=\'1\' --  o sistema fica vulnerável a',
    [
      ['Cross-Site Scripting (XSS).', 'XSS injeta scripts no navegador da vítima, não comandos SQL.'],
      ['SQL Injection, mitigável com consultas parametrizadas (prepared statements).', 'A concatenação permite alterar a lógica da consulta.'],
      ['negação de serviço distribuída (DDoS).', 'DDoS sobrecarrega o serviço com tráfego.'],
      ['ataque de força bruta.', 'Não há tentativa exaustiva de senhas.'],
      ['phishing.', 'Phishing engana o usuário com mensagens falsas.'],
    ], 1),

  ma('SEG-03', 'seguranca', 2,
    'Sobre criptografia, avalie as afirmativas.',
    [
      ['Na criptografia simétrica, a mesma chave é usada para cifrar e decifrar.', true, 'ex.: AES'],
      ['Na criptografia assimétrica, a mensagem cifrada com a chave pública do destinatário só é decifrada com a chave privada dele.', true, 'garante confidencialidade'],
      ['Funções hash criptográficas são reversíveis, permitindo recuperar a senha original.', false, 'hashes são unidirecionais'],
      ['Assinatura digital usa a chave privada do remetente para assinar.', true, 'e a chave pública dele para verificar'],
    ]),

  obj('SEG-04', 'seguranca', 2,
    'A forma mais adequada de armazenar senhas de usuários em um banco de dados é',
    [
      ['em texto puro, para facilitar a recuperação.', 'Um vazamento exporia todas as senhas.'],
      ['cifradas com AES usando chave fixa no código.', 'Quem obtiver a chave decifra tudo.'],
      ['com hash lento e salt, como bcrypt ou Argon2.', 'Salt impede tabelas pré-computadas e o custo dificulta força bruta.'],
      ['com hash MD5 sem salt.', 'MD5 é rápido e vulnerável a rainbow tables.'],
      ['codificadas em Base64.', 'Base64 é codificação reversível, não proteção.'],
    ], 2),

  ar('SEG-05', 'seguranca', 2,
    'A autenticação multifator (MFA) é recomendada para contas críticas.',
    'A MFA reduz o risco de acesso indevido mesmo que a senha seja vazada.',
    'A MFA exige fatores de categorias diferentes, como algo que você sabe e algo que você possui.',
    true, true, true,
    'Como o atacante precisaria também do segundo fator (II), o vazamento da senha sozinho não basta (I).'),

  obj('SEG-06', 'seguranca', 2,
    'Um malware cifra os arquivos de uma empresa e exige pagamento em criptomoeda para liberá-los. A medida preventiva mais eficaz para recuperar os dados sem pagar é',
    [
      ['manter backups regulares, isolados (offline) e testados.', 'Permite restaurar os dados sem depender do criminoso.'],
      ['desligar o firewall para agilizar a rede.', 'Aumenta a exposição.'],
      ['dar privilégios de administrador a todos os usuários.', 'Facilita a propagação do malware.'],
      ['pagar o resgate imediatamente.', 'Não garante recuperação e financia o crime.'],
      ['usar a mesma senha em todos os sistemas.', 'Aumenta o impacto de credenciais vazadas.'],
    ], 0, 'Ransomware: regra de backup 3-2-1 (3 cópias, 2 mídias, 1 fora do local).'),

  // ───────── Sistemas Distribuídos e Nuvem ─────────
  obj('SD-01', 'distribuidos', 2,
    'Segundo o teorema CAP, na ocorrência de uma partição de rede, um sistema distribuído deve escolher entre',
    [
      ['consistência e disponibilidade.', 'Com partição (P), não é possível garantir C e A simultaneamente.'],
      ['latência e custo.', 'Não fazem parte do teorema CAP.'],
      ['segurança e desempenho.', 'Não são os termos do teorema.'],
      ['escalabilidade vertical e horizontal.', 'São estratégias de escala.'],
      ['TCP e UDP.', 'São protocolos de transporte.'],
    ], 0),

  ma('SD-02', 'distribuidos', 1,
    'Sobre modelos de serviço em computação em nuvem, avalie as afirmativas.',
    [
      ['No IaaS, o cliente gerencia sistema operacional e aplicações sobre infraestrutura virtualizada.', true, 'ex.: máquinas virtuais'],
      ['No SaaS, o cliente usa o software pronto, sem gerenciar infraestrutura.', true, 'ex.: e-mail web, suítes de escritório on-line'],
      ['No PaaS, o cliente é responsável pela manutenção física dos servidores.', false, 'no PaaS o provedor gerencia a plataforma e o hardware'],
    ]),

  obj('SD-03', 'distribuidos', 2,
    'Uma aplicação foi dividida em serviços pequenos, implantados de forma independente e comunicando-se por APIs. Essa arquitetura é chamada de',
    [
      ['monolítica.', 'Monólitos são implantados como uma única unidade.'],
      ['microsserviços.', 'Serviços autônomos, independentes e com comunicação por APIs.'],
      ['cliente-servidor de duas camadas.', 'Não implica decomposição em serviços independentes.'],
      ['peer-to-peer.', 'Nós iguais, sem servidor central; não é o caso.'],
      ['mainframe.', 'Computação centralizada.'],
    ], 1),

  ar('SD-04', 'distribuidos', 3,
    'Relógios físicos de máquinas diferentes nunca estão perfeitamente sincronizados.',
    'Relógios lógicos de Lamport permitem ordenar eventos de forma consistente com a causalidade.',
    'Se o evento a acontece antes de b (a → b), então o timestamp de Lamport de a é menor que o de b.',
    true, true, true,
    'A propriedade da II (a → b ⇒ C(a) < C(b)) é exatamente o que torna a ordenação consistente com a causalidade (I).'),

  obj('SD-05', 'distribuidos', 2,
    'Containers (por exemplo, Docker) diferem de máquinas virtuais tradicionais porque',
    [
      ['compartilham o kernel do sistema operacional hospedeiro, sendo mais leves.', 'Containers isolam processos sem emular hardware nem carregar um SO completo.'],
      ['exigem um hipervisor tipo 1 para funcionar.', 'Containers usam recursos do kernel (namespaces, cgroups).'],
      ['incluem sempre um sistema operacional completo e independente.', 'Isso caracteriza VMs.'],
      ['não podem ser orquestrados.', 'Kubernetes orquestra containers.'],
      ['só executam em servidores físicos.', 'Executam em VMs, nuvem e desktops.'],
    ], 0),

  // ───────── Interação Humano-Computador ─────────
  obj('IHC-01', 'ihc', 1,
    'A heurística de Nielsen que recomenda que o sistema mantenha o usuário informado sobre o que está acontecendo, com feedback adequado em tempo razoável, é',
    [
      ['visibilidade do status do sistema.', 'Ex.: barra de progresso durante um upload.'],
      ['controle e liberdade do usuário.', 'Trata de desfazer e sair de estados indesejados.'],
      ['prevenção de erros.', 'Trata de evitar que erros ocorram.'],
      ['estética e design minimalista.', 'Trata de evitar informação irrelevante.'],
      ['flexibilidade e eficiência de uso.', 'Trata de atalhos para usuários experientes.'],
    ], 0),

  ma('IHC-02', 'ihc', 2,
    'Sobre avaliação de interfaces, avalie as afirmativas.',
    [
      ['A avaliação heurística é feita por especialistas, sem participação de usuários.', true, 'especialistas inspecionam a interface com base em heurísticas'],
      ['Testes de usabilidade observam usuários reais executando tarefas.', true, 'é um método empírico'],
      ['O SUS (System Usability Scale) é um questionário padronizado de 10 itens.', true, 'gera pontuação de 0 a 100'],
      ['Avaliação de usabilidade só deve ocorrer após a implantação do sistema.', false, 'deve ocorrer desde protótipos iniciais'],
    ]),

  obj('IHC-03', 'ihc', 2,
    'A Lei de Fitts afirma que o tempo para alcançar um alvo depende da distância até ele e de seu tamanho. Uma aplicação prática dessa lei é',
    [
      ['tornar botões de ações frequentes maiores e próximos do ponto de interação.', 'Alvos maiores e mais próximos são atingidos mais rapidamente.'],
      ['usar fontes serifadas em textos longos.', 'Questão tipográfica, não de apontamento.'],
      ['limitar menus a sete itens.', 'Relaciona-se a interpretações da “regra 7±2” de memória.'],
      ['usar cores contrastantes para erros.', 'Questão de percepção visual.'],
      ['reduzir o número de cliques por meio de atalhos de teclado.', 'Relevante, mas não decorre da Lei de Fitts.'],
    ], 0),

  ar('IHC-04', 'ihc', 2,
    'O Design Centrado no Usuário envolve os usuários durante todo o ciclo de desenvolvimento.',
    'Personas são úteis no design de interfaces.',
    'Personas são usuários reais que participam obrigatoriamente de todos os testes.',
    true, false, false,
    'Personas ajudam a guiar decisões de design (I verdadeira), mas são arquétipos fictícios baseados em pesquisa, não usuários reais (II falsa).'),

  // ───────── Computação Gráfica ─────────
  obj('CG-01', 'grafica', 1,
    'No modelo de cores RGB, a cor resultante de (255, 255, 0) é',
    [
      ['branco.', 'Branco é (255, 255, 255).'],
      ['amarelo.', 'Vermelho + verde em intensidade máxima resulta em amarelo (modelo aditivo).'],
      ['ciano.', 'Ciano é (0, 255, 255).'],
      ['magenta.', 'Magenta é (255, 0, 255).'],
      ['preto.', 'Preto é (0, 0, 0).'],
    ], 1),

  obj('CG-02', 'grafica', 2,
    'Em computação gráfica 2D, para rotacionar um objeto em torno de um ponto P diferente da origem, usando coordenadas homogêneas, a sequência correta de transformações é',
    [
      ['rotacionar e depois transladar P para a origem.', 'Rotacionar antes faz o objeto girar em torno da origem.'],
      ['transladar P para a origem, rotacionar e transladar de volta.', 'Composição T(P)·R(θ)·T(−P).'],
      ['escalar pelo ângulo e transladar.', 'Escala não produz rotação.'],
      ['apenas rotacionar, pois a rotação independe do ponto.', 'Rotações são sempre em torno da origem do sistema.'],
      ['espelhar e depois rotacionar.', 'Não produz a rotação desejada em torno de P.'],
    ], 1),

  ma('CG-03', 'grafica', 2,
    'Sobre processamento de imagens, avalie as afirmativas.',
    [
      ['Um filtro de média suaviza a imagem e reduz ruído, mas borra bordas.', true, 'é um filtro passa-baixa'],
      ['O filtro de mediana é eficaz contra ruído do tipo sal e pimenta.', true, 'descarta valores extremos'],
      ['O operador de Sobel é usado para detectar bordas.', true, 'aproxima o gradiente da imagem'],
    ]),

  obj('CG-04', 'grafica', 2,
    'No pipeline gráfico, o algoritmo Z-buffer é utilizado para',
    [
      ['comprimir texturas.', 'Compressão é outra etapa.'],
      ['determinar a visibilidade de superfícies, armazenando a profundidade de cada pixel.', 'Mantém o fragmento mais próximo da câmera em cada pixel.'],
      ['calcular sombras suaves.', 'Sombras usam técnicas como shadow mapping.'],
      ['converter cores RGB em CMYK.', 'Conversão de espaço de cor.'],
      ['reduzir o número de polígonos.', 'Isso é simplificação de malha (LOD).'],
    ], 1),

  // ───────── Probabilidade e Estatística ─────────
  obj('PE-01', 'probest', 1,
    'Lançando-se dois dados honestos de seis faces, a probabilidade de a soma ser 7 é',
    [
      ['1/36', 'É a probabilidade de um resultado específico, como (1,1).'],
      ['1/6', 'Há 6 pares com soma 7 em 36 resultados: 6/36 = 1/6.'],
      ['7/36', 'Não há 7 combinações com soma 7.'],
      ['1/12', 'Corresponde a 3/36.'],
      ['1/2', 'Muito acima do correto.'],
    ], 1),

  obj('PE-02', 'probest', 2,
    'Os tempos de resposta (ms) de um servidor foram: 10, 12, 11, 13, 200. A medida de tendência central mais representativa do comportamento típico é',
    [
      ['a média, pois usa todos os valores.', 'A média (49,2 ms) é distorcida pelo valor atípico 200.'],
      ['a mediana, pois é robusta a valores extremos.', 'A mediana é 12 ms, representando bem o típico.'],
      ['a amplitude.', 'Amplitude é medida de dispersão.'],
      ['o desvio padrão.', 'É medida de dispersão.'],
      ['a variância.', 'É medida de dispersão.'],
    ], 1),

  ar('PE-03', 'probest', 2,
    'Eventos independentes são frequentes em modelos probabilísticos.',
    'Se A e B são independentes, então P(A ∩ B) = P(A) · P(B).',
    'Eventos mutuamente exclusivos com probabilidades positivas são sempre independentes.',
    true, false, false,
    'A I é a definição de independência. A II é falsa: se são exclusivos, P(A ∩ B) = 0 ≠ P(A)·P(B) > 0, logo são dependentes.'),

  obj('PE-04', 'probest', 3,
    'Um teste detecta uma doença com sensibilidade de 99% e especificidade de 95%. A prevalência da doença é 1%. Dado um resultado positivo, a probabilidade de a pessoa estar doente é aproximadamente',
    [
      ['99%', 'Confunde sensibilidade com valor preditivo positivo.'],
      ['95%', 'Confunde especificidade com valor preditivo positivo.'],
      ['17%', 'Bayes: 0,0099 / (0,0099 + 0,0495) ≈ 0,167.'],
      ['50%', 'Sem fundamento no cálculo.'],
      ['1%', 'É a prevalência, antes do teste.'],
    ], 2, 'Teorema de Bayes: com prevalência baixa, falsos positivos dominam.'),

  ma('PE-05', 'probest', 2,
    'Sobre a distribuição normal, avalie as afirmativas.',
    [
      ['É simétrica em torno da média.', true, 'a curva é simétrica'],
      ['Aproximadamente 95% dos valores estão a até 2 desvios padrão da média.', true, 'regra empírica 68–95–99,7'],
      ['Média, mediana e moda são diferentes entre si.', false, 'na normal as três coincidem'],
    ]),

  // ───────── Computação, Sociedade e Gestão ─────────
  obj('SOC-01', 'sociedade', 1,
    'Um desenvolvedor descobre que o sistema em que trabalha coleta dados de localização dos usuários sem consentimento. A atitude eticamente adequada é',
    [
      ['ignorar, pois a decisão é da gerência.', 'Profissionais têm responsabilidade ética sobre o que constroem.'],
      ['comunicar o problema pelos canais internos e propor adequação à LGPD.', 'Age com responsabilidade profissional e conformidade legal.'],
      ['vender os dados para compensar o risco.', 'Agravaria a violação.'],
      ['apagar o banco de dados sem autorização.', 'Ação destrutiva e não autorizada.'],
      ['divulgar os dados nas redes sociais para expor a empresa.', 'Exporia os usuários, violando sua privacidade.'],
    ], 1),

  ma('SOC-02', 'sociedade', 2,
    'Sobre sistemas de informação nas organizações, avalie as afirmativas.',
    [
      ['Sistemas ERP integram processos de diferentes áreas em uma base de dados única.', true, 'finanças, estoque, RH, vendas etc.'],
      ['Sistemas de apoio à decisão auxiliam gestores em decisões semiestruturadas.', true, 'usam modelos e análise de dados'],
      ['CRM é um sistema voltado exclusivamente ao controle da folha de pagamento.', false, 'CRM gerencia o relacionamento com clientes'],
    ]),

  obj('SOC-03', 'sociedade', 2,
    'Uma startup de tecnologia quer validar uma ideia de produto gastando pouco. Segundo a abordagem Lean Startup, ela deve',
    [
      ['desenvolver o produto completo antes de mostrar a qualquer cliente.', 'Aumenta risco e desperdício.'],
      ['construir um produto mínimo viável (MVP), medir o uso e aprender com os dados.', 'Ciclo construir–medir–aprender.'],
      ['investir primeiro em marketing de massa.', 'Sem validação, o investimento pode ser perdido.'],
      ['evitar contato com clientes para proteger a ideia.', 'O contato com clientes é central para validar hipóteses.'],
      ['copiar um concorrente sem adaptações.', 'Não valida hipóteses próprias.'],
    ], 1),

  ar('SOC-04', 'sociedade', 2,
    'O software livre tem papel relevante na educação e no setor público.',
    'Software livre garante ao usuário as liberdades de executar, estudar, modificar e redistribuir o programa.',
    'Todo software livre é necessariamente gratuito e não pode ser comercializado.',
    true, false, false,
    'As quatro liberdades definem o software livre (I verdadeira). Mas “livre” refere-se a liberdade, não a preço: pode ser vendido (II falsa).'),

  obj('SOC-05', 'sociedade', 2,
    'Algoritmos de recomendação em redes sociais podem criar “bolhas de filtro”. Esse fenômeno ocorre porque',
    [
      ['o usuário é exposto principalmente a conteúdos semelhantes às suas preferências anteriores.', 'O reforço de preferências reduz o contato com visões diversas.'],
      ['os algoritmos mostram conteúdos aleatórios.', 'Aleatoriedade reduziria bolhas.'],
      ['as plataformas bloqueiam usuários com opiniões diferentes.', 'Não é o mecanismo descrito.'],
      ['a internet é lenta em algumas regiões.', 'Sem relação com o fenômeno.'],
      ['os usuários não têm acesso a mecanismos de busca.', 'Sem relação com o fenômeno.'],
    ], 0),

  disc('SEG-D1', 'seguranca',
    'Uma clínica médica sofreu vazamento de dados de pacientes após um funcionário clicar em um link de phishing. Como consultor(a) de segurança, proponha um plano com: a) duas medidas técnicas; b) duas medidas organizacionais; c) as obrigações da clínica perante a LGPD após o incidente.',
    'a) Técnicas: autenticação multifator, filtros antiphishing no e-mail, criptografia de dados em repouso e em trânsito, controle de acesso por menor privilégio, monitoramento e logs, backups. b) Organizacionais: treinamento e simulações de phishing, política de segurança, plano de resposta a incidentes, nomeação de encarregado (DPO). c) LGPD: comunicar à ANPD e aos titulares em prazo razoável incidente que possa gerar risco ou dano relevante, descrevendo dados afetados, riscos e medidas adotadas; dados de saúde são sensíveis, agravando a gravidade.',
    ['Duas medidas técnicas pertinentes (3 pontos)', 'Duas medidas organizacionais pertinentes (3 pontos)', 'Obrigações da LGPD: comunicação à ANPD e aos titulares (4 pontos)']),

  disc('IA-D1', 'ia',
    'Uma prefeitura quer usar um modelo de aprendizado de máquina para priorizar vistorias em imóveis com risco de irregularidade. Discuta: a) dois riscos éticos dessa aplicação; b) duas medidas técnicas ou de governança para mitigá-los; c) como avaliar se o modelo é justo entre bairros diferentes.',
    'a) Viés nos dados históricos (bairros mais fiscalizados no passado aparecem como mais irregulares), discriminação socioeconômica, falta de transparência e explicabilidade, ausência de contestação. b) Auditoria de vieses, uso de técnicas de explicabilidade, revisão humana das decisões, documentação do modelo, transparência pública, retreinamento com dados balanceados. c) Comparar métricas por grupo (taxa de falsos positivos e negativos, precisão por bairro), avaliar paridade estatística ou igualdade de oportunidades.',
    ['Dois riscos éticos coerentes (3 pontos)', 'Duas medidas de mitigação (3 pontos)', 'Proposta de avaliação de justiça com métricas por grupo (4 pontos)']),
];
