import { ar, disc, ma, obj } from '../build';

export const FG = [
  obj('FG-01', 'fg', 1,
    'Um município registrou aumento de enchentes urbanas nos últimos dez anos. Estudos apontam que a impermeabilização do solo, o descarte irregular de resíduos e a ocupação de margens de rios contribuíram para o problema.\n\nQual medida atua diretamente sobre a causa mais estrutural apontada no texto?',
    [
      ['Distribuir kits de emergência à população atingida após as chuvas.', 'Ação de resposta a desastres: mitiga consequências, mas não altera as causas.'],
      ['Ampliar áreas verdes e pavimentos permeáveis, associados a um plano de uso e ocupação do solo.', 'Atua sobre a impermeabilização e a ocupação irregular, causas estruturais citadas.'],
      ['Aumentar o número de agentes da defesa civil durante o verão.', 'Melhora a resposta à emergência, mas não reduz a probabilidade de enchentes.'],
      ['Criar um aplicativo para avisar a população sobre chuvas fortes.', 'Sistemas de alerta reduzem danos, mas não tratam a origem do problema.'],
      ['Transferir a responsabilidade pela drenagem ao governo estadual.', 'Mudar o ente responsável não modifica as causas físicas descritas.'],
    ], 1, 'Em questões de Formação Geral, diferencie medidas paliativas (resposta) de medidas estruturais (prevenção).'),

  obj('FG-02', 'fg', 1,
    'Segundo a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), dado pessoal sensível inclui informações sobre origem racial ou étnica, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico.\n\nUma escola que deseja usar reconhecimento facial para registrar a frequência dos estudantes deve',
    [
      ['dispensar qualquer cuidado, pois a finalidade é educacional.', 'A finalidade educacional não afasta as obrigações da LGPD.'],
      ['tratar os dados biométricos como sensíveis, com base legal adequada, transparência e medidas de segurança.', 'Biometria é dado sensível e exige base legal específica, transparência e segurança.'],
      ['publicar as imagens no site da escola para garantir transparência.', 'Transparência não significa expor dados; isso violaria o princípio da necessidade.'],
      ['armazenar as imagens por tempo indeterminado para futuras pesquisas.', 'A LGPD exige limitação de finalidade e de tempo de retenção.'],
      ['compartilhar os dados com empresas parceiras sem informar os responsáveis.', 'Compartilhamento sem transparência e base legal é vedado.'],
    ], 1, 'LGPD: princípios de finalidade, adequação, necessidade, transparência e segurança.'),

  ar('FG-03', 'fg', 2,
    'A inclusão digital vai além do acesso a equipamentos e à internet: envolve também a capacidade de usar criticamente as tecnologias.',
    'Distribuir tablets a estudantes de escolas públicas é suficiente para garantir a inclusão digital.',
    'A inclusão digital depende também de letramento digital, conectividade de qualidade e formação de professores.',
    false, true, false,
    'A I é falsa porque o texto deixa claro que acesso a equipamentos não basta; a II é verdadeira e, na verdade, contradiz a I.'),

  ma('FG-04', 'fg', 2,
    'Os Objetivos de Desenvolvimento Sustentável (ODS) da Agenda 2030 da ONU formam um conjunto de 17 metas globais. Sobre eles, avalie as afirmativas.',
    [
      ['O ODS 4 trata de educação de qualidade, inclusiva e equitativa.', true, 'é o objetivo “Educação de Qualidade”'],
      ['Os ODS são obrigatórios e preveem sanções econômicas aos países que não os cumprirem.', false, 'são compromissos voluntários, sem sanções'],
      ['Os ODS integram dimensões sociais, econômicas e ambientais do desenvolvimento.', true, 'a integração das três dimensões é a base da Agenda 2030'],
    ]),

  obj('FG-05', 'fg', 2,
    'Em uma pesquisa, 60% dos entrevistados afirmaram confiar em notícias recebidas por aplicativos de mensagem quando enviadas por familiares, mesmo sem fonte identificada.\n\nEsse dado evidencia, principalmente,',
    [
      ['a eficiência dos aplicativos em filtrar notícias falsas.', 'O dado não mede filtragem, e sim confiança na origem pessoal.'],
      ['o papel das relações de confiança na propagação de desinformação.', 'A confiança no remetente, e não na fonte, favorece a circulação de conteúdos falsos.'],
      ['que familiares sempre compartilham informações verificadas.', 'Generalização indevida não sustentada pelo dado.'],
      ['que a imprensa tradicional deixou de existir.', 'Conclusão sem relação com o dado apresentado.'],
      ['que a regulação das plataformas é desnecessária.', 'O dado sugere justamente riscos que motivam debates sobre regulação.'],
    ], 1),

  obj('FG-06', 'fg', 1,
    'A Constituição Federal de 1988 estabelece que todos são iguais perante a lei, sem distinção de qualquer natureza. Ações afirmativas, como cotas em universidades públicas, são justificadas com base no princípio da',
    [
      ['igualdade formal, que impede qualquer tratamento diferenciado.', 'A igualdade formal sozinha não justificaria tratamento diferenciado.'],
      ['igualdade material, que trata desigualmente os desiguais para reduzir desigualdades históricas.', 'Ações afirmativas buscam igualdade de oportunidades reais (material).'],
      ['livre iniciativa, que garante a concorrência entre instituições.', 'Princípio da ordem econômica, sem relação direta com cotas.'],
      ['legalidade tributária.', 'Princípio do direito tributário, não relacionado ao tema.'],
      ['soberania nacional.', 'Princípio de relações externas, não aplicável ao caso.'],
    ], 1),

  obj('FG-07', 'fg', 2,
    'Um gráfico mostra que, entre 2010 e 2020, a participação de fontes renováveis na matriz elétrica de um país subiu de 40% para 55%, enquanto o consumo total de energia elétrica cresceu 30%.\n\nÉ correto concluir que, no período,',
    [
      ['a geração de energia não renovável caiu pela metade.', 'Não renovável: 60% × C para 45% × 1,3C = 58,5% de C; caiu só cerca de 2,5%.'],
      ['a geração renovável cresceu mais de 70% em termos absolutos.', 'Renovável: 0,40C para 0,55 × 1,3C = 0,715C, ou seja, crescimento de cerca de 79%.'],
      ['o consumo de energia renovável permaneceu constante.', 'Aumentou em participação e em valor absoluto.'],
      ['a matriz passou a ser 100% renovável.', 'Chegou a 55%, não a 100%.'],
      ['o consumo total diminuiu.', 'O texto informa crescimento de 30%.'],
    ], 1, 'Cuidado com percentuais de um total que também mudou: calcule valores absolutos.'),

  ar('FG-08', 'fg', 2,
    'Plataformas digitais de trabalho (aplicativos de entrega e transporte) cresceram rapidamente no Brasil.',
    'O trabalho por plataformas tem levantado debates sobre proteção social dos trabalhadores.',
    'Em muitos casos, esses trabalhadores não têm acesso a direitos como férias, previdência e limite de jornada.',
    true, true, true,
    'Ambas são verdadeiras e a ausência de direitos (II) é exatamente o motivo do debate sobre proteção social (I).'),

  obj('FG-09', 'fg', 1,
    'A acessibilidade em ambientes digitais é garantida no Brasil pela Lei Brasileira de Inclusão (Lei nº 13.146/2015). Uma prática que contribui para sites acessíveis é',
    [
      ['usar apenas cores para diferenciar informações importantes.', 'Pessoas com daltonismo não percebem a diferença; é uma barreira.'],
      ['fornecer texto alternativo para imagens e permitir navegação por teclado.', 'Beneficia usuários de leitores de tela e de quem não usa mouse.'],
      ['desabilitar o zoom em dispositivos móveis.', 'Prejudica pessoas com baixa visão.'],
      ['colocar textos importantes somente dentro de imagens.', 'Leitores de tela não leem texto em imagem sem alternativa.'],
      ['reproduzir vídeos automaticamente com som.', 'Dificulta o uso com leitores de tela e incomoda usuários.'],
    ], 1),

  ma('FG-10', 'fg', 2,
    'Sobre democracia e participação cidadã no Brasil, avalie as afirmativas.',
    [
      ['Plebiscito, referendo e iniciativa popular são instrumentos de democracia direta previstos na Constituição.', true, 'estão no art. 14 da CF/88'],
      ['O voto é facultativo para maiores de 18 anos e menores de 70.', false, 'nessa faixa o voto é obrigatório'],
      ['Conselhos de políticas públicas são espaços de participação social na gestão.', true, 'conselhos de saúde, educação etc. permitem controle social'],
      ['A liberdade de imprensa pode ser suspensa por decisão do Poder Executivo.', false, 'a CF/88 veda a censura prévia'],
    ]),

  obj('FG-11', 'fg', 2,
    'Em uma cidade, 30% dos domicílios não possuem coleta de esgoto. Um programa pretende reduzir esse percentual em um terço em cinco anos.\n\nAo final do programa, se a meta for cumprida, o percentual de domicílios sem coleta será de',
    [
      ['10%.', 'Isso seria reduzir em dois terços.'],
      ['20%.', 'Reduzir 30% em um terço: 30% − 10% = 20%.'],
      ['27%.', 'Seria reduzir apenas 3 pontos percentuais (10% do valor).'],
      ['33%.', 'Confunde a fração com o resultado.'],
      ['0%.', 'Seria a universalização, não a redução de um terço.'],
    ], 1),

  obj('FG-12', 'fg', 2,
    '“A tecnologia não é boa nem má; nem é neutra.” (Melvin Kranzberg)\n\nA frase sugere que',
    [
      ['as tecnologias não produzem nenhum efeito social.', 'Contradiz o “nem é neutra”.'],
      ['os efeitos das tecnologias dependem de contextos, escolhas de projeto e usos sociais.', 'A tecnologia carrega valores e seus impactos variam conforme o contexto.'],
      ['toda tecnologia é intrinsecamente prejudicial.', 'Contradiz o “não é má”.'],
      ['a ética não se aplica ao desenvolvimento tecnológico.', 'Se não é neutra, a ética é relevante.'],
      ['apenas o usuário final é responsável pelos impactos.', 'Ignora as escolhas de quem projeta a tecnologia.'],
    ], 1),

  ar('FG-13', 'fg', 1,
    'O Brasil possui uma das maiores biodiversidades do planeta.',
    'O desmatamento da Amazônia afeta o regime de chuvas em outras regiões do país.',
    'A floresta transporta umidade para o centro-sul por meio dos chamados “rios voadores”.',
    true, true, true,
    'Os rios voadores (II) são o mecanismo que explica a influência da Amazônia nas chuvas de outras regiões (I).'),

  obj('FG-14', 'fg', 1,
    'Uma empresa divulgou: “Nossas vendas cresceram 200%!”. No ano anterior, foram vendidas 500 unidades.\n\nQuantas unidades foram vendidas no ano atual?',
    [
      ['700', 'Corresponderia a crescimento de 40%.'],
      ['1.000', 'Corresponde a crescimento de 100% (dobrar).'],
      ['1.500', 'Crescer 200% é somar o dobro: 500 + 1.000 = 1.500.'],
      ['2.000', 'Corresponderia a crescimento de 300%.'],
      ['200', 'Confunde percentual com quantidade.'],
    ], 2),

  ma('FG-15', 'fg', 2,
    'A respeito de diversidade e direitos humanos, avalie as afirmativas.',
    [
      ['Racismo é crime inafiançável e imprescritível no Brasil.', true, 'previsto no art. 5º, XLII, da CF/88'],
      ['A Declaração Universal dos Direitos Humanos foi adotada pela ONU em 1948.', true, 'adotada em 10 de dezembro de 1948'],
      ['O Estatuto da Pessoa Idosa se aplica a pessoas a partir de 70 anos.', false, 'aplica-se a partir de 60 anos'],
    ]),

  obj('FG-16', 'fg', 3,
    'Um estudo correlacionou o número de sorveterias em funcionamento e os casos de afogamento em uma cidade litorânea, encontrando correlação positiva forte.\n\nA interpretação mais adequada é que',
    [
      ['abrir sorveterias causa afogamentos.', 'Correlação não implica causalidade.'],
      ['existe uma variável de confusão, como a temperatura ou a estação do ano, que influencia ambos.', 'No verão há mais sorvete e mais banhistas, logo mais afogamentos.'],
      ['a correlação é falsa e deve ser descartada.', 'A correlação existe; o erro estaria em interpretá-la como causa.'],
      ['afogamentos fazem as pessoas comprarem sorvete.', 'Causalidade reversa sem fundamento.'],
      ['fechar sorveterias reduziria afogamentos.', 'Intervenção baseada em causalidade inexistente.'],
    ], 1, 'Correlação ≠ causalidade: procure variáveis de confusão.'),

  obj('FG-17', 'fg', 2,
    'A economia circular propõe um modelo produtivo diferente do linear (extrair, produzir, descartar). Um exemplo de prática alinhada à economia circular no setor de tecnologia é',
    [
      ['incentivar a troca anual de celulares por modelos novos.', 'Acelera o descarte; típico do modelo linear.'],
      ['projetar equipamentos modulares, reparáveis e com programas de logística reversa.', 'Prolonga a vida útil e reintroduz materiais no ciclo produtivo.'],
      ['enviar lixo eletrônico para aterros comuns.', 'Descarte inadequado, contrário à circularidade.'],
      ['impedir atualizações de software em aparelhos antigos.', 'Favorece a obsolescência programada.'],
      ['usar embalagens maiores para proteger produtos.', 'Aumenta o consumo de material sem reaproveitamento.'],
    ], 1),

  obj('FG-18', 'fg', 2,
    'Leia: “A inteligência artificial generativa pode ampliar a produtividade, mas também reproduzir vieses presentes nos dados de treinamento.”\n\nUma medida de governança responsável para o uso dessa tecnologia em processos seletivos de emprego seria',
    [
      ['delegar integralmente a decisão final ao sistema automatizado.', 'Remove a supervisão humana e a possibilidade de contestação.'],
      ['auditar periodicamente os resultados para identificar discriminação e garantir revisão humana.', 'Auditoria e supervisão humana mitigam vieses e asseguram responsabilização.'],
      ['ocultar dos candidatos o uso de IA no processo.', 'Fere o princípio da transparência.'],
      ['treinar o sistema apenas com dados de contratações passadas, sem análise.', 'Tende a perpetuar vieses históricos.'],
      ['proibir qualquer uso de computadores no RH.', 'Medida desproporcional que não trata o problema de governança.'],
    ], 1),

  obj('FG-19', 'fg', 1,
    'A mobilidade urbana sustentável prioriza modos de transporte que reduzem emissões e ocupam menos espaço viário. Assinale a política coerente com esse objetivo.',
    [
      ['Ampliar vias exclusivas para automóveis particulares.', 'Estimula o transporte individual motorizado.'],
      ['Implantar faixas exclusivas de ônibus e ciclovias integradas.', 'Prioriza transporte coletivo e ativo.'],
      ['Reduzir calçadas para aumentar o número de faixas de carros.', 'Prejudica pedestres, modo mais sustentável.'],
      ['Eliminar a integração tarifária entre ônibus e metrô.', 'Desestimula o transporte coletivo.'],
      ['Subsidiar estacionamentos gratuitos no centro.', 'Atrai mais carros às áreas centrais.'],
    ], 1),

  ar('FG-20', 'fg', 3,
    'O Brasil ainda apresenta altos índices de desigualdade de renda.',
    'O índice de Gini do Brasil está entre os mais altos do mundo.',
    'Quanto mais próximo de zero o índice de Gini, maior a desigualdade de renda.',
    true, false, false,
    'A I é verdadeira (o Brasil historicamente tem Gini elevado). A II é falsa: Gini próximo de 0 indica igualdade; próximo de 1, máxima desigualdade.'),

  disc('FG-D1', 'fg',
    'O uso de celulares em sala de aula tem sido objeto de leis e regulamentações no Brasil e no mundo. Há quem defenda a proibição para melhorar a concentração e quem defenda o uso pedagógico mediado.\n\nRedija um texto dissertativo (até 15 linhas) apresentando: a) um argumento a favor da restrição; b) um argumento a favor do uso pedagógico; c) uma proposta de equilíbrio entre as posições.',
    'Espera-se que o estudante: a) cite impactos na atenção, cyberbullying ou saúde mental como justificativa para restrições; b) cite pesquisa, produção de conteúdo, acessibilidade ou letramento digital como benefícios pedagógicos; c) proponha regras claras de uso, mediação docente e momentos planejados, com participação da comunidade escolar.',
    ['Apresenta argumento coerente para a restrição (3 pontos)', 'Apresenta argumento coerente para o uso pedagógico (3 pontos)', 'Propõe solução equilibrada e viável (3 pontos)', 'Texto coeso e na norma-padrão (1 ponto)']),

  disc('FG-D2', 'fg',
    'O lixo eletrônico é um dos resíduos que mais crescem no mundo. Explique dois impactos ambientais ou sociais do descarte inadequado de equipamentos eletrônicos e proponha duas ações, uma do poder público e outra das empresas, para enfrentar o problema.',
    'Impactos: contaminação do solo e da água por metais pesados (chumbo, mercúrio, cádmio); riscos à saúde de catadores e trabalhadores informais; desperdício de materiais valiosos. Ações do poder público: fiscalização da Política Nacional de Resíduos Sólidos, pontos de coleta, educação ambiental. Ações das empresas: logística reversa, design para reparo e reciclagem, programas de recompra.',
    ['Explica corretamente dois impactos (4 pontos)', 'Propõe ação viável do poder público (3 pontos)', 'Propõe ação viável das empresas (3 pontos)']),

  disc('FG-D3', 'fg',
    'A desinformação em períodos eleitorais pode comprometer a democracia. Discuta o papel de três atores (plataformas digitais, poder público e cidadãos) no combate à desinformação, respeitando a liberdade de expressão.',
    'Plataformas: transparência de algoritmos, moderação com critérios públicos, rotulagem e redução de alcance de conteúdos falsos, cooperação com checadores. Poder público: legislação equilibrada, Justiça Eleitoral atuante, educação midiática nas escolas, sem censura prévia. Cidadãos: checar fontes antes de compartilhar, desconfiar de conteúdos sensacionalistas, denunciar. O texto deve reconhecer a tensão entre combater desinformação e preservar a liberdade de expressão.',
    ['Aborda adequadamente o papel das plataformas (3 pontos)', 'Aborda adequadamente o papel do poder público (3 pontos)', 'Aborda adequadamente o papel dos cidadãos (3 pontos)', 'Considera a liberdade de expressão (1 ponto)']),
];
