/**
 * Journalistic Deep-Context Expansion Engine
 * Enriches shallow RSS/news snippets into comprehensive, multi-section investigative reports (800 - 1200+ words).
 * Enforces historical background, cause & effect, multi-stakeholder perspectives, technical glossaries, and future outlook.
 */

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
    cover_url: rawArticle.cover_url || "/placeholder.svg",
    published: true,
    published_at: rawArticle.published_at || new Date().toISOString(),
    source_name: sourceName,
    read_time: readTime,
    word_count: wordCount,
    key_takeaways: takeaways,
  };
}
