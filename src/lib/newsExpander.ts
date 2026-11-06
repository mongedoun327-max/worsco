/**
 * Journalistic Deep-Context Expansion Engine
 * Enriches shallow RSS/news snippets into comprehensive, multi-section investigative reports (800 - 1200+ words).
 * Enforces historical background, cause & effect, multi-stakeholder perspectives, technical glossaries, and future outlook.
 */

import { getSmartNewsCover } from "./newsImageResolver";

export interface EnrichedNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_url: string;
  published: boolean;
  published_at: string;
  source_name: string;
  read_time: number;
  word_count: number;
  key_takeaways: string[];
}

export function expandNewsToDeepReport(rawArticle: {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  cover_url?: string;
  published_at?: string;
  source_name?: string;
  author?: string;
}): EnrichedNews {
  const title = (rawArticle.title || "Notícia em Destaque").trim();
  const category = (rawArticle.category || "Cultura").trim();
  const sourceName = rawArticle.source_name || rawArticle.author || "Redação Investigativa Worscoi";
  const catLower = category.toLowerCase();
  const titleLower = title.toLowerCase();

  // Extract existing paragraphs
  const rawParagraphs = (rawArticle.content || rawArticle.excerpt || "")
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => {
      if (p.length < 20) return false;
      if (/^(the post|o post|fonte:|saiba mais|confira também|leia também|assine|compartilhe)/i.test(p)) return false;
      if (/apareceu primeiro em|todos os direitos reservados/i.test(p)) return false;
      return true;
    });

  // Base lead paragraph
  const initialLead = rawParagraphs[0] || rawArticle.excerpt || `${title} marca um momento crucial de transformação e debate na cena contemporânea.`;

  // 1. Contextualização Histórica e Global personalizada
  let historicalSection = "";
  let causeEffectSection = "";
  let perspectivesSection = "";
  let technicalGlossarySection = "";
  let futureOutlookSection = "";
  let takeaways: string[] = [];

  if (catLower.includes("anime") || catLower.includes("mang")) {
    historicalSection = `### Contexto Histórico e Antecedentes da Indústria

A indústria contemporânea de animação e publicação japonesa atravessa uma das transformações econômicas e culturais mais profundas de sua história recente. Historicamente, desde a consolidação do pós-guerra na década de 1960 com Osamu Tezuka, o modelo japonês operava sob o rígido sistema do *Seisaku Iinkai* (comitê de produção formado por redes de televisão abertas, gravadoras musicais e grandes editoras como Shueisha, Kodansha e Kadokawa). Esse sistema foi concebido primordialmente para diluir riscos financeiros no mercado doméstico japonês.

Contudo, a última década provocou uma ruptura estrutural sem precedentes. A expansão em massa das plataformas globais de streaming e licenciamento simultâneo (*simulcast*) alterou o centro de gravidade econômico: hoje, mais de 52% da receita bruta dos estúdios japoneses é gerada fora do Japão. 

Nesse panorama, o acontecimento em torno de **"${title}"** não é um fato isolado de calendário. Ele simboliza anos de negociações contratuais, readequações operacionais em estúdios que operam no limite de sua capacidade produtiva e a necessidade inadiável de cativar audiências internacionais que exigem fidelidade à obra original e excelência técnica inegociável.`;

    causeEffectSection = `### Análise de Causa e Efeito: Forças de Curto, Médio e Longo Prazo

Para compreender a magnitude dos desdobramentos atuais, é necessário decompor os fatores determinantes em três horizontes temporais bem definidos:

• **A Curto Prazo (Impacto Imediato de Atenção):** A repercussão nas redes sociais e nos fóruns especializados mobilizou imediatamente milhões de interações. Em um ecossistema dominado por picos efêmeros de visibilidade, conseguir furar a barreira dos algoritmos nas primeiras 24 horas representa um termômetro vital para o sucesso comercial de qualquer propriedade intelectual.
• **A Médio Prazo (Sustentabilidade dos Cronogramas de Produção):** O maior gargalo da animação moderna reside na escassez de diretores de animação seniores e animadores de quadros-chave (*genga*). O anúncio impõe uma corrida contra o relógio para que a equipe técnica mantenha o padrão estético elevado sem incorrer no esgotamento físico (*burnout*), que levou diversos estúdios a adiarem episódios recentemente.
• **A Longo Prazo (Valuation da Franquia e Mercadorias):** O impacto real será medido pela longevidade da marca. Grandes sucessos modernos não dependem apenas da audiência episódica, mas da capacidade de gerar receita perene em jogos eletrônicos, figuras colecionáveis, eventos presenciais e licenciamentos internacionais.`;

    perspectivesSection = `### Múltiplos Ângulos: O Que Dizem Criadores, Produtores e Fãs

A recepção deste evento reflete visões contrastantes entre os principais participantes do setor:

• **A Comunidade de Leitores e Fãs:** Embora haja entusiasmo generalizado pela continuidade e visibilidade da obra, analistas e leitores veteranos manifestam preocupações legítimas quanto ao ritmo da narrativa (*pacing*), cortes de subtramas da história original e a qualidade das adaptações em computação gráfica (CGI).
• **Os Estúdios e Equipes Criativas:** Nos bastidores, profissionais de animação apontam que a pressão para atender a prazos simultâneos internacionais reduziu as margens de erro a zero. A sincronização de lançamento global exige que episódios sejam finalizados semanas antes para etapas de legendagem e dublagem multilíngue.
• **Os Investidores e Comitês Executivos:** Do ponto de vista corporativo, a prioridade máxima é a estabilidade de catálogo e a retenção de assinantes em plataformas de streaming, onde o custo de aquisição de clientes novos (CAC) subiu mais de 35% nos últimos dois anos.`;

    technicalGlossarySection = `### Conceitos Técnicos e Vocabulário Especializado

Para navegar pelas particularidades técnicas mencionadas nesta cobertura, destacam-se os seguintes conceitos essenciais:

• **Simulcast (Transmissão Simultânea):** Prática consolidada de disponibilizar o episódio com tradução oficial internacional poucas horas após a exibição original na televisão japonesa, combatendo frontalmente a pirataria digital.
• **Sakuga (作画):** Termo utilizado por entusiastas e críticos para designar momentos específicos de animação em que a qualidade gráfica, fluidez e liberdade artística dos animadores atingem um nível extraordinário.
• **Comitê de Produção (Seisaku Iinkai):** Consórcio de empresas investidoras que financia um projeto de animação, retendo conjuntamente os direitos patrimoniais da obra e dividindo lucros e prejuízos.`;

    futureOutlookSection = `### Desdobramentos Futuros e Perspectivas

Nos próximos meses, o foco da indústria estará na revelação de cronogramas detalhados, equipes de direção confirmadas e parcerias de distribuição para a América Latina e Brasil. A capacidade dos realizadores em balancear respeito às origens e sofisticação cinematográfica determinará se **"${title}"** se consolidará como um marco cultural duradouro ou apenas como mais uma tendência passageira no feed dos consumidores.`;

    takeaways = [
      "A movimentação reflete a dependência crescente da indústria japonesa em relação a receitas geradas fora do mercado doméstico.",
      "Gargalos na contratação de animadores seniores e prazos apertados continuam sendo o maior desafio operacional dos estúdios.",
      "O modelo de distribuição simultânea (simulcast) impõe etapas complexas de localização em múltiplos idiomas antes da estreia.",
      "A fidelidade ao material original permanece como o fator decisivo para a sustentação do engajamento dos fãs a longo prazo."
    ];
  } else if (catLower.includes("webtoon")) {
    historicalSection = `### Contexto Histórico e Antecedentes da Indústria

O formato dos Webtoons sul-coreanos emergiu no início dos anos 2000 como uma resposta pioneira ao colapso do mercado tradicional de quadrinhos impressos na Coreia do Sul. Liderados por portais de busca como Naver (fundadora da LINE Webtoon em 2004) e Daum (posteriormente incorporada pela Kakao), criadores sul-coreanos desenvolveram uma linguagem estética inteiramente pensada para o consumo vertical em smartphones.

O formato eliminou a divisão convencional de páginas e sarjetas, substituindo-a por transições fluidas de rolagem (*infinite scroll*), uso expressivo de cores digitais e trilhas sonoras integradas. O que começou como experimento local transformou-se em um fenômeno transnacional com mais de 170 milhões de usuários ativos globais e receita anual superior a 4 bilhões de dólares.

A repercussão em torno de **"${title}"** ilustra o ápice dessa evolução: as propriedades intelectuais que nascem na tela dos celulares coreanos hoje servem como a principal matéria-prima para os maiores estúdios de cinema, séries live-action da Netflix e adaptações em anime de alto orçamento.`;

    causeEffectSection = `### Análise de Causa e Efeito no Mercado Digital

• **A Causa Principal (Saturação de Mídias Tradicionais):** O esgotamento de fórmulas nos quadrinhos ocidentais abriu espaço para narrativas com sistemas de progressão claros, ritmo acelerado e forte apelo visual, características marcantes dos webtoons de ação e romance.
• **Consequência a Médio Prazo (Investimentos Transcontinentais):** Grupos como Sony, Crunchyroll e estúdios japoneses como REDICE Studio e MAPPA passaram a firmar acordos de coprodução direta com produtoras sul-coreanas para garantir direitos exclusivos de adaptação.
• **Consequência a Longo Prazo (Globalização de Autores e Artistas):** Plataformas como Webtoon Canvas e Kakao Page democratizaram a entrada de quadrinistas de todo o mundo, criando um mercado de trabalho globalizado e competitivo.`;

    perspectivesSection = `### Perspectivas do Setor: Artistas, Plataformas e Leitores

• **Artistas e Desenhistas:** Relatam uma carga de trabalho exaustiva para entregar entre 60 e 80 painéis totalmente coloridos por semana, o que tem gerado discussões sindicais na Coreia do Sul sobre a necessidade de estúdios maiores e divisão de tarefas (linework, coloração e pós-produção).
• **Plataformas de Publicação:** Buscam novos modelos de monetização além do sistema de moedas virtuais (*Fast Pass*), investindo em assinaturas ilimitadas e parcerias com o mercado editorial de livros impressos.
• **Leitores:** Valorizam a comodidade e a leitura vertical contínua, mas demandam traduções oficiais de alta qualidade e sincronização de lançamentos sem defasagem em relação aos capítulos originais coreanos.`;

    technicalGlossarySection = `### Glossário de Termos Técnicos

• **Fast Pass / Moedas Digitais:** Mecanismo de monetização onde os capítulos mais recentes ficam bloqueados por um micropagamento temporário, tornando-se gratuitos após algumas semanas.
• **Manhwa vs. Manhua vs. Mangá:** *Manhwa* designa histórias em quadrinhos originárias da Coreia do Sul; *Manhua* refere-se a produções da China ou Taiwan; e *Mangá* é o termo clássico para obras do Japão.
• **Infinite Scroll Layout:** Diagramação visual concebida especificamente para rolagem vertical descendente, onde o espaçamento entre painéis controla o ritmo dramático e a tensão da narrativa.`;

    futureOutlookSection = `### Próximos Passos e Cenário Prospectivo

O mercado aguarda agora a consolidação de acordos globais de distribuição e a publicação impressa de edições de luxo para colecionadores. A trajetória de **"${title}"** reflete como o formato vertical coreano redefiniu para sempre a maneira como a juventude global consome ficção sequencial no século XXI.`;

    takeaways = [
      "Os Webtoons superaram as limitações dos quadrinhos físicos tradicionais através do design vertical nativo para smartphones.",
      "As propriedades intelectuais coreanas tornaram-se o principal motor de novas adaptações em streaming e animação global.",
      "A rotina de produção de 60 a 80 painéis coloridos semanais impulsiona debates sobre saúde física e profissionalização em estúdio.",
      "A sincronia de lançamentos internacionais reduziu drasticamente o espaço de atuação de traduções não-oficiais na internet."
    ];
  } else if (catLower.includes("tecnolog") || catLower.includes("game")) {
    historicalSection = `### Contexto Histórico e Antecedentes Tecnológicos

A evolução dos ecossistemas digitais, jogos eletrônicos e plataformas conectadas atinge neste momento um ponto de inflexão decisivo. Ao longo dos últimos dez anos, a infraestrutura da internet móvel (4G e 5G), a computação em nuvem de hiperescala e a evolução das GPUs dedicadas criaram as bases para que experiências multimídia antes restritas a supercomputadores chegassem à palma da mão de bilhões de indivíduos.

Paralelamente, a corrida pela soberania em inteligência artificial generativa, gráficos em tempo real (como o avanço das engines Unreal Engine 5 e Unity) e semicondutores avançados redesenhou as fronteiras da disputa geopolítica e corporativa entre as maiores empresas do Vale do Silício e da Ásia.

Compreender as implicações de **"${title}"** exige examinar como as corporações estão navegando o dilema entre inovação radical e disciplina de capital, em um ambiente macroeconômico caracterizado por taxas de juros mais altas e escrutínio antitruste rigoroso.`;

    causeEffectSection = `### Causa e Efeito: Impactos na Infraestrutura e no Consumo

• **Causas Fundamentais:** A necessidade inadiável de reduzir custos operacionais em servidores enquanto se amplia a capacidade de processamento de dados e personalização de algoritmos.
• **Efeitos Imediatos:** Reestruturação de equipes técnicas, reavaliação de prioridades de produto e lançamentos iterativos com foco na retenção de usuários pagantes.
• **Impactos de Longo Prazo:** Consolidação de padrões abertos versus jardins murados (*walled gardens*), definindo se o futuro da tecnologia será interoperável ou fragmentado entre ecossistemas proprietários rivais.`;

    perspectivesSection = `### Múltiplos Pontos de Vista: Desenvolvedores, Mercado e Sociedade

• **Desenvolvedores e Engenheiros:** Apontam que a velocidade exigida para adoção de novas tecnologias impõe desafios severos de segurança da informação, confiabilidade e governança de dados.
• **Analistas de Mercado e Investidores:** Priorizam a monetização comprovada e o retorno sobre o capital investido (ROIC), penalizando iniciativas puramente conceituais sem caminho claro para lucratividade.
• **Consumidores e Sociedade Civil:** Cobram transparência algorítmica, privacidade de dados pessoais e sustentabilidade energética dos data centers que sustentam essa infraestrutura global.`;

    technicalGlossarySection = `### Conceitos Técnicos Essenciais

• **Edge Computing (Computação de Borda):** Processamento de dados realizado fisicamente próximo à fonte onde as informações são coletadas ou solicitadas, diminuindo a latência de resposta.
• **Interoperabilidade:** Capacidade de diferentes sistemas, softwares ou plataformas trocarem dados e operarem conjuntamente sem barreiras proprietárias.
• **Modelos Multimodais:** Sistemas de inteligência artificial treinados para processar e gerar múltiplos formatos de dados simultaneamente (texto, imagem, áudio e código).`;

    futureOutlookSection = `### O Que Observar nos Próximos Meses

Os desdobramentos de **"${title}"** serão acompanhados por marcos regulatórios governamentais, novos lançamentos competitivos e conferências internacionais de tecnologia. A questão central não é se a tecnologia continuará transformando a sociedade, mas quem ditará as regras éticas e econômicas desse novo ciclo.`;

    takeaways = [
      "A corrida por eficiência computacional e arquitetura em nuvem redefine as prioridades das principais gigantes do setor.",
      "A transição de modelos teóricos para produtos economicamente viáveis impõe disciplina de custos sem precedentes.",
      "Segurança da informação e privacidade do usuário passam a ser requisitos obrigatórios de conformidade global.",
      "A interoperabilidade entre sistemas rivais determinará a facilidade de uso para os consumidores nos próximos anos."
    ];
  } else if (catLower.includes("livro")) {
    historicalSection = `### Contexto Histórico e o Renascimento da Leitura

O mercado do livro e a difusão da literatura atravessam uma fase fascinante de reinvenção. Desde a invenção dos tipos móveis por Johannes Gutenberg em meados do século XV até a consolidação dos leitores digitais modernos (*e-readers*), a forma de transmissão do pensamento escrito sempre acompanhou as revoluções tecnológicas de cada época.

Na era das redes sociais e dos estímulos ultravelozes, testemunha-se um contramovimento surpreendente: a redescoberta do prazer da leitura aprofundada, do silêncio reflexivo e dos clubes de livros digitais (movimento impulsionado por comunidades de leitores que acumulam bilhões de visualizações e alavancam best-sellers instantaneamente).

O tema tratado em **"${title}"** toca diretamente nessa encruzilhada cultural: como manter viva a tradição literária clássica e contemporânea em um mundo que disputa cada segundo da atenção humana.`;

    causeEffectSection = `### Análise de Causa e Efeito no Setor Editorial

• **Democratização do Acesso:** A digitalização em massa de obras de domínio público e bibliotecas mundiais quebrou o monopólio geográfico de acesso aos grandes clássicos da humanidade.
• **Renovação de Catálogo:** Editoras consolidadas foram forçadas a modernizar suas traduções, investir em projetos gráficos sofisticados e criar edições definitivas para conquistar leitores exigentes.
• **Impacto na Formação Crítica:** Sociedades com maiores índices de leitura consistente apresentam maior capacidade analítica, pensamento autônomo e empatia interpessoal em seus debates públicos.`;

    perspectivesSection = `### Vozes do Mundo Literário: Autores, Editores e Leitores

• **Escritores e Tradutores:** Enfatizam a importância da valorização profissional e da proteção aos direitos autorais em um momento onde ferramentas generativas desafiam a propriedade intelectual literária.
• **Editoras Independentes e Livreiros:** Defendem a sobrevivência de livrarias físicas como espaços de convivência comunitária, debate de ideias e curadoria humana insubstituível.
• **Leitores:** Celebram a facilidade de carregar centenas de obras em formatos digitais enquanto mantêm o fetiche afetivo e estético pelo livro físico em suas estantes.`;

    technicalGlossarySection = `### Conceitos Editoriais Importantes

• **Domínio Público:** Condição jurídica em que os direitos patrimoniais de uma obra expiram (geralmente 70 anos após o falecimento do autor), permitindo sua livre reprodução e adaptação pela sociedade.
• **Curadoria Editorial:** Processo analítico e seletivo de escolha, cotejamento de manuscritos, revisão e contextualização crítica de textos para publicação.
• **Edição Crítica / Anotada:** Publicação enriquecida com notas de rodapé eruditas, ensaios introdutórios e fortuna crítica que elucidam o contexto histórico original da obra.`;

    futureOutlookSection = `### Horizontes Futuros para a Palavra Escrita

O debate estimulado por **"${title}"** reforça que o livro, em qualquer formato que assuma, permanece como a mais duradoura tecnologia já criada pela humanidade para a preservação e transmissão da sabedoria através das gerações.`;

    takeaways = [
      "A circulação literária contemporânea vive a convivência harmônica entre formatos digitais ágeis e edições físicas de colecionador.",
      "Comunidades espontâneas de leitores nas redes sociais tornaram-se o motor mais influente de vendas do mercado editorial.",
      "A proteção aos direitos autorais e o respeito às traduções cuidadosas mantêm-se como pilares da sustentabilidade cultural.",
      "O hábito da leitura atenta desponta como o antídoto mais eficaz contra a fragmentação cognitiva da era digital."
    ];
  } else if (catLower.includes("futebol") || catLower.includes("esport")) {
    historicalSection = `### Contexto Histórico e Cenário do Futebol Contemporâneo

O futebol profissional vive sua mais dramática transformação estrutural desde a instituição da Lei Pelé e a consolidação do calendário unificado da FIFA. A transição acelerada de associações civis sem fins lucrativos para Sociedades Anônimas do Futebol (SAFs), a injeção maciça de fundos soberanos de investimento e a reconfiguração dos direitos de transmissão televisiva pulverizaram o ecossistema esportivo.

No Brasil e na América do Sul, a disputa de forças entre a Copa Libertadores, o Campeonato Brasileiro e o poderio econômico da UEFA Champions League gerou uma corrida armamentista por receitas comerciais, profissionalização das categorias de base e governança financeira.

A repercussão em torno de **"${title}"** não é um fato esportivo fortuito: trata-se de um ponto de inflexão na tabela, nos planos de gestão do clube e na relação passional entre a torcida e as decisões tomadas nos gabinetes executivos.`;

    causeEffectSection = `### Análise de Causa e Efeito: Tática, Finanças e Vestiário

• **Vetor Tático e Desempenho em Campo:** As decisões da comissão técnica e as variações de esquema tático geram impactos diretos na intensidade de pressão, ocupação dos espaços e consistência defensiva da equipe ao longo dos 90 minutos.
• **Vetor Econômico e Orçamentário:** Premiações por fases atingidas, cotas de bilheteria e valorização dos direitos federativos de jovens atletas dependem diretamente da estabilidade dos resultados nas competições oficiais.
• **Clima Interno e Fator Psicológico:** A resposta do elenco perante a pressão da torcida e da imprensa define a capacidade de superação nos momentos de oscilação do calendário.`;

    perspectivesSection = `### Múltiplos Ângulos: Comissões Técnicas, Gestão e Arquibancada

• **Comissão Técnica e Atletas:** Apontam o desgaste do calendário de jogos a cada 72 horas como o principal adversário na manutenção dos índices físicos ideais e na prevenção de lesões musculares.
• **Diretoria Executiva e Investidores:** Buscam blindar o planejamento a médio prazo, defendendo responsabilidade orçamentária contra a fúria imediatista de eliminações pontuais.
• **Torcedores e Sócios-Torcedores:** Reivindicam dedicação em campo, transparência nas contratações e respeito à identidade histórica da instituição.`;

    technicalGlossarySection = `### Glossário Tático e Termos Especializados

• **Fair Play Financeiro:** Conjunto de regras que visa impedir que clubes gastem mais do que arrecadam, coibindo o endividamento descontrolado e a concorrência desleal.
• **Expected Goals (xG):** Métrica estatística avançada que calcula a probabilidade matemática de uma finalização resultar em gol com base na distância, ângulo e pressão adversária.
• **Gegenpressing (Pressão Pós-Perda):** Movimento tático imediato de reocupação e combate defensivo no exato segundo em que a equipe perde a posse de bola no terço ofensivo.`;

    futureOutlookSection = `### Perspectivas e Próximos Confrontos

A sequência de partidas decisivas determinará o fôlego da equipe nas rodadas finais. A capacidade de manter a coesão interna diante dos holofotes e executar o plano de jogo com precisão ditará os rumos do clube na temporada.`;

    takeaways = [
      "A profissionalização das SAFs e novas cotas de transmissão transformaram o futebol em indústria multibilionária.",
      "A gestão de carga física e a profundidade de elenco são determinantes para a competitividade em calendários densos.",
      "A harmonia entre conselho gestor, comissão técnica e arquibancada é o fator crítico para a sustentabilidade de resultados."
    ];
  } else if (catLower.includes("mercado") || catLower.includes("econom") || catLower.includes("finan")) {
    historicalSection = `### Contexto Macroeconômico e Antecedentes de Mercado

Os mercados financeiros globais e a economia nacional operam em um ambiente de transição complexa. As decisões sobre taxas de juros básicas (como a Selic no Brasil pelo Copom e os Fed Funds pelo Federal Reserve nos Estados Unidos), o equilíbrio fiscal e as pressões inflacionárias sobre cadeias de suprimentos redefinem o custo de capital das companhias.

Nesse horizonte, os ativos de risco, as captações de crédito corporativo e o fluxo de investimento estrangeiro direto (IED) reagem em tempo real a cada indicador divulgado. 

A notícia envolvendo **"${title}"** reflete como fundos de investimento, tesourarias corporativas e analistas de mercado estão recalculando cenários para proteger rentabilidade e antecipar movimentos macroeconômicos.`;

    causeEffectSection = `### Dinâmica de Causa e Efeito no Sistema Econômico

• **Taxa Livre de Risco e Custo da Dívida:** Oscilações nos juros futuros (curva de DI) alteram imediatamente a precificação das ações na bolsa e encarecem o financiamento de projetos de infraestrutura.
• **Confiança Empresarial e Geração de Empregos:** A previsibilidade regulatória e fiscal é o gatilho indispensável para que o setor privado destrave investimentos em maquinário, tecnologia e pessoal.
• **Poder de Compra das Famílias:** A transmissão dos juros para o crédito ao consumidor regula o ritmo do varejo e a inadimplência bancária.`;

    perspectivesSection = `### Visões dos Agentes: Bancos Centrais, Empresas e Investidores

• **Autoridades Monetárias:** Priorizam o cumprimento das metas de inflação e a ancoragem das expectativas de longo prazo, mantendo postura vigilante contra choques exógenos.
• **CEOs e Diretorias Financeiras (CFOs):** Buscam otimizar a estrutura de capital, recorrendo a emissões de dívida privada (debêntures incentivadas) e renegociação de passivos.
• **Pequenos e Médios Investidores:** Migram carteiras entre renda fixa e fundos imobiliários à procura de dividendos resilientes e proteção contra a desvalorização cambial.`;

    technicalGlossarySection = `### Vocabulário Econômico e de Mercado

• **Hawkish vs. Dovish:** Postura rigorosa e austera no combate à inflação com juros mais altos (*hawkish*) versus postura estimulativa e flexível para acelerar o crescimento (*dovish*).
• **Spread Bancário:** Diferença entre o custo de captação de recursos pelas instituições financeiras e a taxa efetivamente cobrada dos tomadores de empréstimos.
• **EBITDA / LAJIDA:** Lucro antes de juros, impostos, depreciação e amortização; indicador fundamental para avaliar a geração de caixa operacional de uma empresa.`;

    futureOutlookSection = `### Projeções e Tendências de Curto e Médio Prazo

As atenções dos analistas estarão voltadas para as próximas divulgações de atas econômicas e relatórios de inflação. A consistência dos fundamentos corporativos e a solidez fiscal serão as âncoras para navegar as oscilações dos mercados globais.`;

    takeaways = [
      "A política monetária e a curva de juros determinam o fluxo de capital entre ativos de renda fixa e renda variável.",
      "A disciplina fiscal e a segurança jurídica permanecem como pré-requisitos essenciais para atração de capitais internacionais.",
      "Companhias com balanços descarbonizados e geração robusta de caixa enfrentam períodos de volatilidade com folga competitiva."
    ];
  } else if (catLower.includes("viral") || catLower.includes("virais") || catLower.includes("trend")) {
    historicalSection = `### Contexto da Cultura Digital e Fenômenos de Massa

A velocidade com que informações e formatos multimídia se propagam nas redes sociais atingiu patamares inéditos na história da comunicação humana. O deslocamento do feed cronológico para feeds algorítmicos orientados estritamente por inteligência artificial (como TikTok, Instagram Reels e YouTube Shorts) transformou a dinâmica da atenção coletiva.

Hoje, um meme, um desafio sonoro ou uma revelação espontânea pode transitar da obscuridade para centenas de milhões de telas em menos de 12 horas, gerando impactos na linguagem cotidiana, na publicidade e até na tomada de decisão de governos e marcas globais.

O fenômeno tratado em **"${title}"** não é uma simples curiosidade passageira: ele exemplifica como a cultura participativa dos usuários da internet é capaz de pautar o debate público global.`;

    causeEffectSection = `### Mecanismos do Algoritmo: Causa, Efeito e Dispersão Viral

• **Gatilho Emocional e Compartilhamento Espontâneo:** Conteúdos que provocam surpresa, empatia ou humor aceleram o tempo de retenção nos primeiros três segundos, sinalizando aos algoritmos alta relevância.
• **Efeito Manada e Remodelagem por Criadores:** Outros usuários rapidamente produzem suas próprias versões ou reações em vídeo, multiplicando exponencialmente os pontos de contato da tendência.
• **Comercialização Acelerada:** Agências de publicidade e marcas entram na conversa para capitalizar a visibilidade antes que a onda perca o frescor.`;

    perspectivesSection = `### Quem Participa do Ecossistema: Criadores, Plataformas e Sociedade

• **Criadores de Conteúdo:** Enfrentam a pressão constante de produzir em ritmo industrial para permanecerem favorecidos pelas recomendações algorítmicas.
• **Engenheiros de Plataformas:** Aprimoram modelos de moderação para frear a disseminação de desinformação enquanto maximizam as métricas de tempo de tela ativo.
• **Especialistas em Sociologia Digital:** Alertam para a efemeridade das conexões e a saturação mental decorrente da sobrecarga de estímulos instantâneos.`;

    technicalGlossarySection = `### Termos Nativos da Era dos Algoritmos

• **Algoritmo de Recomendação:** Modelo preditivo baseado em machine learning que personaliza a distribuição de conteúdo a partir do tempo de visualização e interações anteriores do usuário.
• **Creator Economy (Economia de Criadores):** Ecossistema de negócios formado por criadores independentes que monetizam diretamente sua audiência por patrocínios, assinaturas e produtos.
• **Doomscrolling:** Hábito involuntário de rolar interminavelmente feeds de notícias e vídeos, consumindo grandes volumes de estímulos sem pausas reflexivas.`;

    futureOutlookSection = `### Ciclo de Vida da Tendência e Próximos Desdobramentos

Como toda onda viral, a tendência atravessa sua fase de pico e se encaminha para a incorporação no vocabulário cultural ou para o esquecimento gradual. O saldo desse movimento reside no poder renovado da criatividade descentralizada nas redes.`;

    takeaways = [
      "A distribuição algorítmica substituiu o grafo de seguidores pelo mérito imediato de retenção de cada publicação.",
      "A economia dos criadores movimenta dezenas de bilhões de dólares e redefine as estratégias de marketing das maiores marcas.",
      "A velocidade da informação impõe novos desafios de discernimento crítico e consumo consciente nas redes."
    ];
  } else if (catLower.includes("lista") || catLower.includes("ranking") || catLower.includes("top")) {
    historicalSection = `### A Arte da Curadoria e a Função Crítica dos Rankings

Em uma sociedade caracterizada pela abundância esmagadora de opções culturais e tecnológicas, a seleção rigorosa e a classificação fundamentada cumprem uma função essencial de orientação. Desde as primeiras antologias da biblioteca de Alexandria até os rankings contemporâneos de excelência, o ato de hierarquizar obras ou ferramentas exige critérios transparentes, imparcialidade e discernimento histórico.

A proposta de **"${title}"** não visa fechar debates com dogmatismo, mas sim oferecer uma bússola de valor e deleite intelectual para quem busca investir seu tempo e atenção com o que há de melhor.`;

    causeEffectSection = `### Critérios Metodológicos de Seleção e Descarte

• **Critério de Impacto Duradouro:** Avalia-se se a obra ou item continua relevante e influente anos após seu lançamento inicial, resistindo ao teste do tempo.
• **Critério de Inovação Técnica e Estética:** Premia-se a originalidade, o pioneirismo no uso de recursos e a coragem de romper convenções estabelecidas.
• **Critério de Acessibilidade e Experiência do Usuário:** Mensura-se a clareza com que a proposta atinge o público a que se destina.`;

    perspectivesSection = `### O Debate Crítico: Julgamento Subjetivo vs. Consenso Técnico

• **Especialistas e Jurados:** Fundamentam cada escolha em análise técnica comparativa e cotejamento com concorrentes diretos.
• **Comunidade e Leitores:** Contrastam as escolhas com suas próprias experiências afetivas, enriquecendo o debate com contrapropostas legítimas.
• **Criadores e Fabricantes:** Enxergam a inclusão no ranking como um selo de prestígio que valida anos de investimento criativo ou técnico.`;

    technicalGlossarySection = `### Conceitos de Curadoria e Análise Comparativa

• **Benchmark (Ponto de Referência):** Padrão de excelência ou desempenho amplamente aceito contra o qual todas as alternativas são medidas.
• **Fortuna Crítica:** Conjunto de estudos, resenhas e análises produzidas por especialistas sobre uma obra ao longo de sua história.
• **Custo-Benefício Ponderado:** Avaliação que confronta o preço cobrado com a entrega real de valor, durabilidade e usabilidade.`;

    futureOutlookSection = `### Recomendações e Descobertas Futuras

Convidamos os leitores a explorarem os títulos e itens destacados, formando suas próprias conclusões e sugerindo novas adições aos debates que continuam abertos no portal Worscoi.`;

    takeaways = [
      "Rankings e listas bem fundamentadas atuam como antídotos necessários contra a paralisia decisória contemporânea.",
      "A curadoria humana especializada distingue o que é verdadeiramente relevante do que é apenas efêmero.",
      "Cada item ranqueado representa um ponto de partida para leituras, explorações e descobertas aprofundadas."
    ];
  } else if (catLower.includes("política") || catLower.includes("politica")) {
    historicalSection = `### Contexto Político-Institucional e Cenário Geopolítico

A conjuntura política e a dinâmica institucional atravessam um período de intensa redefinição de prioridades democráticas, governança pública e alianças estratégicas. Os equilíbrios de poder entre os Poderes da República (Executivo, Legislativo e Judiciário), a tramitação de reformas estruturais e os compromissos em fóruns multilaterais moldam o ambiente de estabilidade e cidadania.

Nesse panorama, a matéria sobre **"${title}"** toca no cerne dos debates de políticas públicas: como harmonizar interesses diversos, assegurar transparência orçamentária e entregar resultados concretos para a sociedade civil.`;

    causeEffectSection = `### Forças Determinantes: Articulação, Legislação e Sociedade

• **Articulação Parlamentar e Construção de Maiorias:** A viabilidade de qualquer proposição depende de negociações entre bancadas, governos e sociedade organizada.
• **Impacto Fiscal e Orçamento Público:** Toda medida de Estado repercute nas contas públicas, exigindo fontes de custeio equilibradas e fiscalização por órgãos de controle.
• **Repercussão Cidadã e Participação Social:** A legitimidade das decisões políticas consolida-se através da transparência e do escrutínio livre da imprensa e da população.`;

    perspectivesSection = `### Os Diversos Atores no Debate Público

• **Gestores e Autoridades Governamentais:** Defendem a urgência de suas iniciativas como instrumentos necessários para o desenvolvimento socioeconômico.
• **Oposição e Fiscalização Cidadã:** Questionam aspectos metodológicos, custos e possíveis efeitos colaterais das medidas propostas.
• **Organizações da Sociedade Civil e Juristas:** Avaliam a constitucionalidade, a salvaguarda de direitos e a sustentabilidade a longo prazo das diretrizes adotadas.`;

    technicalGlossarySection = `### Conceitos Políticos e Institucionais

• **Governança Democrática:** Prática de conduzir os negócios públicos com observância estrita da legalidade, transparência e controle social.
• **Segurança Jurídica:** Princípio que garante previsibilidade nas relações jurídicas, evitando retrocessos ou alterações arbitrárias das regras do jogo.
• **Bicameralismo:** Sistema legislativo composto por duas casas (Câmara dos Deputados e Senado Federal) para garantir dupla reflexão nas leis nacionais.`;

    futureOutlookSection = `### Próximos Desdobramentos e Votações

O desfecho deste tema será acompanhado por novos relatórios, votações em plenário e posicionamentos oficiais. A redação manterá a cobertura equilibrada dos fatos e seus desdobramentos cívicos.`;

    takeaways = [
      "O diálogo institucional maduro é o alicerce fundamental para a estabilidade democrática e o desenvolvimento sustentável.",
      "A fiscalização contínua dos atos do poder público assegura a correta aplicação dos recursos da sociedade.",
      "Decisões políticas fundamentadas em evidências técnicas produzem impactos sociais duradouros e positivos."
    ];
  } else if (catLower.includes("geografia") || catLower.includes("geopol") || catLower.includes("clima") || catLower.includes("meio ambiente")) {
    historicalSection = `### Dimensão Territorial, Geopolítica e Clima Global

A compreensão das transformações do planeta exige examinar como o espaço geográfico, a distribuição dos recursos naturais e as mudanças climáticas interagem com as atividades humanas. Desde as grandes navegações e a formação dos Estados nacionais até os modernos sistemas de sensoriamento remoto por satélite, a geografia constitui a base física sobre a qual se ergue a civilização.

Atualmente, a geopolítica dos minerais críticos, a preservação dos biomas e a transição energética global reconfiguraram o mapa estratégico mundial.

A cobertura sobre **"${title}"** lança luz sobre como fronteiras, ecossistemas e populações estão se adaptando às novas realidades ecológicas e geográficas do século XXI.`;

    causeEffectSection = `### Conexões Geográficas: Causa, Efeito e Impacto Espacial

• **Dinâmica Ecológica e Ciclos Naturais:** Alterações na cobertura vegetal e nos regimes pluviométricos afetam bacias hidrográficas, agricultura e abastecimento urbano.
• **Geopolítica de Recursos e Soberania Territorial:** A posse e a gestão sustentável de água potável, terras férteis e minérios tornaram-se questões de segurança nacional.
• **Demografia e Migrações:** O estresse ambiental e as transformações econômicas provocam redistribuições populacionais e novas demandas por infraestrutura territorial.`;

    perspectivesSection = `### Visões Multidisciplinares: Cientistas, Populações Locais e Estados

• **Geógrafos e Climatologistas:** Fornecem dados cartográficos e modelos preditivos que comprovam a urgência de políticas de ordenamento territorial integradas.
• **Comunidades Tradicionais e Rurais:** Detêm conhecimentos ancestrais de convivência harmônica com a biodiversidade e reivindicam demarcação e proteção de suas terras.
• **Governos e Organismos Internacionais:** Buscam conciliar crescimento industrial com compromissos de emissões líquidas zero e acordos climáticos globais.`;

    technicalGlossarySection = `### Termos Geográficos e Ambientais

• **Sensoriamento Remoto:** Obtenção de dados e imagens da superfície terrestre por meio de sensores orbitais em satélites e aeronaves.
• **Bioma:** Conjunto de vida vegetal e animal com características homogêneas em equilíbrio com o relevo e o clima regional.
• **Geopolítica:** Ramo da geografia que estuda como a geografia física e humana influencia a política internacional e as relações interestatais.`;

    futureOutlookSection = `### Expedições, Monitoramento e Ações Futuras

Os indicadores levantados por esta cobertura servirão de base para novos estudos de impacto ambiental e cooperação científica global. A conservação da Terra é uma responsabilidade compartilhada que começa pelo conhecimento rigoroso de sua geografia.`;

    takeaways = [
      "A geografia física e humana estabelece os limites e as oportunidades reais para o desenvolvimento das nações.",
      "O sensoriamento por satélite e o mapeamento digital revolucionaram a fiscalização e a proteção ambiental.",
      "A cooperação transfronteiriça é indispensável para enfrentar os desafios das mudanças climáticas globais."
    ];
  } else if (catLower.includes("ciência") || catLower.includes("ciencia") || catLower.includes("astronom")) {
    historicalSection = `### O Método Científico e as Fronteiras do Conhecimento

A história da ciência é a saga da curiosidade humana em decifrar as leis fundamentais do cosmos, da matéria e da vida. Da formulação da teoria da relatividade por Einstein e da mecânica quântica no século XX até as imagens profundas dos telescópios espaciais e a revolução da biologia molecular contemporânea, cada descoberta expande nossa compreensão do universo.

No mundo atual, a ciência de fronteira não é mais um empreendimento isolado, mas uma colaboração internacional multidisciplinar que une supercomputadores, aceleradores de partículas, radiotelescópios e laboratórios de biossegurança de ponta.

A descoberta e o debate em torno de **"${title}"** representam mais um degrau conquistado pela investigação rigorosa, pela revisão por pares e pelo compromisso intransigente com as evidências empíricas.`;

    causeEffectSection = `### Do Experimento Teórico à Aplicação Prática

• **Hipótese e Experimentação Controlada:** Pesquisadores formulam teorias testáveis e submetem dados a testes de falseabilidade para garantir que os resultados não decorram do acaso.
• **Revisão por Pares (Peer Review):** O artigo passa pela sabatina minuciosa de cientistas independentes antes da publicação em periódicos internacionais de alto impacto.
• **Transbordamento Tecnológico:** Descobertas puras frequentemente dão origem a novas terapias médicas, materiais revolucionários e tecnologias de comunicação que mudam o cotidiano.`;

    perspectivesSection = `### Vozes da Comunidade Científica e da Sociedade

• **Pesquisadores e Autores do Estudo:** Celebram o avanço conceitual enquanto apontam as limitações metodológicas e os novos questionamentos que o resultado suscita.
• **Comunidade Médica e Bioeticistas:** Analisam a segurança, a equidade no acesso aos avanços terapêuticos e os limites éticos da intervenção biológica ou computacional.
• **Divulgadores Científicos e Sociedade:** Atuam como pontes didáticas para traduzir linguagens matemáticas complexas em sabedoria acessível a todos os cidadãos.`;

    technicalGlossarySection = `### Vocabulário da Ciência Moderna

• **Revisão por Pares (Peer-Review):** Processo de validação crítica em que outros especialistas da mesma área analisam o rigor e a confiabilidade de uma pesquisa científica.
• **Exoplaneta:** Planeta que orbita uma estrela que não seja o nosso Sol, cujo estudo ilumina a busca por condições habitáveis no cosmos.
• **CRISPR-Cas9:** Ferramenta biomolecular revolucionária que atua como uma "tesoura genética", permitindo editar sequências de DNA com precisão atômica.`;

    futureOutlookSection = `### Novas Pesquisas e Próximos Desdobramentos

Os próximos passos envolverão a replicação dos experimentos em laboratórios independentes e o aprofundamento das variáveis observadas. O portal Worscoi continuará trazendo a divulgação científica de excelência com o respeito e o encanto que o conhecimento humano merece.`;

    takeaways = [
      "A ciência progride pelo teste empírico constante e pela coragem de questionar dogmas pré-estabelecidos.",
      "Grandes descobertas dependem de colaborações internacionais e investimentos duradouros em infraestrutura de pesquisa.",
      "A divulgação científica responsável é a melhor vacina contra a desinformação e o obscurantismo."
    ];
  } else {
    historicalSection = `### Contexto Histórico e Antecedentes Gerais

Os eventos e debates que cercam **"${title}"** conectam-se a correntes estruturais profundas da sociedade contemporânea. Longe de representar um episódio isolado na linha do tempo, a notícia reflete uma convergência de interesses econômicos, transformações culturais e novas expectativas do público consumidor acumuladas ao longo dos últimos anos.`;

    causeEffectSection = `### Mecanismos de Causa e Efeito

• **Causas Fundamentais:** Mudanças nos padrões de comportamento social, avanço de tecnologias de rede e a urgência por respostas mais transparentes em momentos de transição institucional.
• **Efeitos Imediatos:** Ampla repercussão na imprensa especializada, engajamento orgânico do público e posicionamento oficial dos principais agentes envolvidos.
• **Desdobramentos Duradouros:** Estabelecimento de novos precedentes que servirão de referência para decisões semelhantes no curto e médio prazo.`;

    perspectivesSection = `### Múltiplos Ângulos e Perspectivas

• **O Público Consumidor:** Exige clareza de informações, previsibilidade de ações e respeito aos compromissos previamente acordados.
• **Os Especialistas e Analistas:** Recomendam cautela contra conclusões precipitadas, sublinhando que o sucesso de qualquer medida depende da consistência de sua execução técnica.
• **As Entidades e Gestores:** Enfrentam o desafio de conciliar pressões imediatistas com a responsabilidade institucional de longo prazo.`;

    technicalGlossarySection = `### Termos e Conceitos Chave

• **Governança Institucional:** Conjunto de regras, processos e diretrizes que garantem transparência, ética e prestação de contas na tomada de decisão.
• **Impacto Sistêmico:** Efeito que ultrapassa o domínio imediato de um acontecimento, influenciando setores correlatos de forma interligada.`;

    futureOutlookSection = `### Perspectivas e Próximos Passos

A redação continuará acompanhando de forma minuciosa os desdobramentos de **"${title}"**, assegurando que os leitores tenham acesso a coberturas checadas, densas e livres de sensacionalismo.`;

    takeaways = [
      "A notícia insere-se em um debate mais amplo de modernização e transparência setorial.",
      "O impacto imediato demonstra alto interesse público e necessidade de aprofundamento analítico.",
      "Acompanhamento contínuo dos órgãos reguladores e especialistas será determinante nos próximos meses."
    ];
  }

  // Intermediate original paragraphs if present
  const middleOriginal = rawParagraphs.length > 2
    ? `### Fatos em Evidência e Cobertura Detalhada\n\n` + rawParagraphs.slice(2).join("\n\n")
    : "";

  // Combine full rich article
  const fullContent = [
    initialLead,
    historicalSection,
    middleOriginal,
    causeEffectSection,
    perspectivesSection,
    technicalGlossarySection,
    futureOutlookSection,
  ]
    .filter(Boolean)
    .join("\n\n");

  const wordCount = fullContent.split(/\s+/).length;
  const readTime = Math.max(4, Math.round(wordCount / 180));

  return {
    id: rawArticle.id,
    title,
    slug: rawArticle.slug || rawArticle.id,
    excerpt: initialLead.slice(0, 240) + "...",
    content: fullContent,
    category,
    cover_url: getSmartNewsCover(title, category, rawArticle.cover_url),
    published: true,
    published_at: rawArticle.published_at || new Date().toISOString(),
    source_name: sourceName,
    read_time: readTime,
    word_count: wordCount,
    key_takeaways: takeaways,
  };
}
