/**
 * Coleção de Artigos Científicos Peer-Reviewed com Leitura Completa Integral.
 * Abrange as principais fronteiras da ciência contemporânea com rigor metodológico,
 * introdução contextual, desenho experimental, resultados quantitativos, discussão crítica e referências acadêmicas.
 */

export interface ScientificArticleData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  institution: string;
  field: string;
  doi: string;
  description: string;
  cover_url: string;
  published_at: string;
  read_time: number;
  peer_reviewed: boolean;
  downloads: number;
  rating: number;
  rating_count: number;
  chapters: Array<{
    id: string;
    position: number;
    title: string;
    content: string;
    is_free_preview: boolean;
  }>;
}

export const SCIENTIFIC_ARTICLES: ScientificArticleData[] = [
  {
    id: "sci-computacao-quantica-decoerencia",
    title: "Supressão de Decoerência em Qubits Supercondutores via Códigos de Superfície",
    subtitle: "Artigo Científico · Física Quântica & Computação",
    author: "Dr. Alexei Morozov, Dra. Sofia L. Chen & Dr. Marcos V. Ribeiro",
    institution: "Laboratório de Dispositivos Quânticos & Instituto de Física Teórica",
    field: "Física Quântica",
    doi: "10.1103/PhysRevX.2026.041029",
    description: "Estudo experimental sobre arquiteturas de qubits supercondutores do tipo Transmon com aplicação de códigos de correção de erros de superfície (Surface Codes), demonstrando supressão de ruído térmico e preservação de coerência quântica acima do limiar de tolerância a falhas.",
    cover_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    published_at: "2026-03-14",
    read_time: 45,
    peer_reviewed: true,
    downloads: 14200,
    rating: 4.96,
    rating_count: 530,
    chapters: [
      {
        id: "chap-sci-quant-1",
        position: 1,
        title: "1. Resumo Estruturado (Abstract) & Termos-Chave",
        content: `RESUMO ESTRUTURADO\n\nContexto: A computação quântica escalável enfrenta o obstáculo da decoerência induzida por acoplamentos parasitas com o ambiente térmico e flutuações de carga em junções Josephson.\n\nObjetivo: Demonstrar a supressão de erros lógicos em um processador de 72 qubits supercondutores Transmon acoplados bidimensionalmente utilizando um código de superfície de distância d=5.\n\nMétodos: Implementamos sequências contínuas de estabilizadores de paridade de Pauli (medidas de peso 4 em X e Z) operando a uma temperatura de base de 12 mK em refrigerador de diluição de hélio-3/hélio-4.\n\nResultados: Obtivemos uma taxa de erro por ciclo de estabilizador inferior a 0,14%, posicionando o sistema abaixo do limiar crítico de percolação de falhas (0,75%). O tempo de coerência efetivo do qubit lógico superou o tempo de vida físico médio dos qubits componentes em um fator de 3,8x.\n\nConclusão: Os dados fornecem prova irrefutável de que a correção de erros quânticos ativa é viável em matrizes supercondutoras planares de média escala.\n\nPalavras-Chave: Qubits Transmon, Código de Superfície, Decoerência Quântica, Junções Josephson, Tolerância a Falhas.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-quant-2",
        position: 2,
        title: "2. Introdução & Fundamentação Teórica",
        content: `O desenvolvimento de processadores quânticos universais depende fundamentalmente da superação do teorema de não-clonagem e da sensibilidade de estados superpostos a perturbações eletromagnéticas ambientais. Ao contrário da computação clássica, onde a dissipação de energia estabiliza os níveis lógicos binários 0 e 1, nos sistemas quânticos a informação é codificada no estado puro:\n\n|ψ⟩ = α|0⟩ + β|1⟩, onde |α|² + |β|² = 1.\n\nQualquer interação inelástica com fônons do substrato de silício ou fótons térmicos no ressonador de guia de onda coplanar induz relaxamento longitudinal (T₁) e defasagem pura (T_φ), colapsando a matriz densidade para uma mistura estatística clássica.\n\nO modelo de código de superfície introduzido por Kitaev e aprimorado por Fowler et al. propõe a distribuição da informação de um único 'qubit lógico' em uma rede bidimensional de 'qubits de dados' entrelaçados por medidas repetidas de 'qubits de ancilla'. Este trabalho analisa a estabilidade temporal dessa malha sob condições criogênicas extremas.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-quant-3",
        position: 3,
        title: "3. Metodologia Experimental & Calibração de Portas",
        content: `O chip quântico foi confeccionado sobre wafer de safira de alta pureza (C-plane), com deposição de filmes finos de tântalo de 100 nm para redução de perdas dieletroelétricas em interfaces bifásicas. As junções Josephson foram fabricadas por litografia por feixe de elétrons e técnica de evaporação angular de Dolan (Al/AlOx/Al).\n\nProtocolo de Operação:\n1. Resfriamento criogênico a 12,4 ± 0,2 mK com blindagem magnética de três camadas em Cryoperm e cobre livre de oxigênio.\n2. Calibração de portas de 1 qubit via pulsos gaussianos DRAG (Derivative Removal by Adiabatic Gate) de 25 ns, alcançando fidelidade média de 99,92% (mensurada por Randomized Benchmarking).\n3. Portas controladas de 2 qubits (CZ) implementadas por sintonização adiabática de fluxo em barramentos ressonantes intermediários, com fidelidade de porta de 99,65%.\n4. Leitura multiplexada no domínio da frequência utilizando amplificadores paramétricos Josephson de ondas progressivas (TWPA).`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-quant-4",
        position: 4,
        title: "4. Resultados Experimentais & Análise de Síndrome",
        content: `A verificação do código de superfície exigiu a execução de 50.000 trajetórias temporais completas com até 25 ciclos consecutivos de extração de síndrome.\n\nAnálise de Paridade:\n- Medições de estabilizador X (detecção de inversão de fase Z): taxa média de detecção de erro de 1,2 x 10⁻³ por ciclo.\n- Medições de estabilizador Z (detecção de inversão de bit X): taxa média de 1,4 x 10⁻³ por ciclo.\n- O decodificador de grafo de emparelhamento perfeito de peso mínimo (MWPM) corrigiu 98,7% dos agrupamentos de defeitos espaciotemporais em tempo real.\n\nQuando a distância topológica do código foi elevada de d=3 (17 qubits físicos) para d=5 (49 qubits físicos), a taxa de decaimento do estado lógico demonstrou a assinatura exponencial esperada de supressão de erro, confirmando que a qualidade das operações físicas ultrapassou o limiar de tolerância.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-quant-5",
        position: 5,
        title: "5. Discussão, Limitações & Referências Bibliográficas",
        content: `DISCUSSÃO\nOs resultados demonstram que o gargalo para a escalabilidade já não é a fidelidade das portas locais de dois corpos, mas os eventos de radiação ionizante de fundo (raios cósmicos e traços de isótopos nos materiais estruturais), que geram rajadas de quase-partículas capazes de correlacionar erros em múltiplos qubits simultâneos.\n\nEstratégias Futuras:\n- Inclusão de armadilhas de quase-partículas de alumínio normal nas linhas de retorno de terra.\n- Desenvolvimento de decodificadores baseados em redes neurais gráficas com latência sub-microssegundo para hardware FPGA.\n\nREFERÊNCIAS BIBLIOGRÁFICAS\n1. Fowler, A. G., et al. (2012). Surface codes: Towards practical large-scale quantum computation. Physical Review A, 86(3), 032324.\n2. Barends, R., et al. (2014). Superconducting quantum circuits at the surface code threshold for fault tolerance. Nature, 508(7497), 500-503.\n3. Krinner, S., et al. (2022). Realizing repeated quantum error correction in a distance-three surface code. Nature, 605(7911), 669-674.\n4. Google Quantum AI. (2023). Suppressing quantum errors by scaling a quantum logical qubit. Nature, 614(7949), 676-681.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "sci-neurociencia-plasticidade-sinaptica",
    title: "Remodelamento Ultraestrutural de Espinhas Dendríticas e Mecanismos da LTP no Hipocampo",
    subtitle: "Artigo Científico · Neurociência & Biologia Molecular",
    author: "Dra. Helena S. Guimarães, Dr. Arthur von Preussen & Dra. Juliana K. Batista",
    institution: "Centro de Neurobiologia Celular & Departamento de Fisiologia Molecular",
    field: "Neurociência",
    doi: "10.1016/j.neuron.2026.02.015",
    description: "Investigação com microscopia de emissão estimulada de depleção (STED) e eletrofisiologia de patch-clamp sobre a translocação de receptores AMPA e reorganização do citoesqueleto de actina durante a potenciação de longa duração (LTP) na área CA1 do hipocampo.",
    cover_url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&auto=format&fit=crop&q=80",
    published_at: "2026-02-28",
    read_time: 40,
    peer_reviewed: true,
    downloads: 11800,
    rating: 4.94,
    rating_count: 412,
    chapters: [
      {
        id: "chap-sci-neuro-1",
        position: 1,
        title: "1. Abstract Estruturado & Relevância Clínica",
        content: `RESUMO ESTRUTURADO\n\nA plasticidade sináptica dependente de atividade na sinapse glutamatérgica de Schaffer-CA1 é o substrato biológico primordial para a formação e consolidação da memória espacial declarativa.\n\nNeste estudo, combinamos imagem em super-resolução STED ao vivo com estimulação fotolítica de glutamato de dois fótons para quantificar a dinâmica temporal de agregação da densidade pós-sináptica (PSD-95) e o recrutamento lateral de subunidades GluA1/GluA2 de receptores AMPA.\n\nDemonstramos que a indução de LTP por estimulação teta-burst deflagra uma polimerização de F-actina dependente da quinase CaMKII em menos de 45 segundos, resultando em uma expansão volumétrica de 68% da cabeça da espinha dendrítica que persiste de forma estável por mais de 6 horas in vitro.\n\nA desregulação desta cascata está diretamente correlacionada aos déficits cognitivos precoces observados em modelos murinos da Doença de Alzheimer e Síndrome do X Frágil.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-neuro-2",
        position: 2,
        title: "2. Introdução: O Postulado Hebbiano e a Biofísica Sináptica",
        content: `Desde a formulação teórica de Donald Hebb em 1949 e a descoberta empírica da potenciação de longa duração por Bliss e Lømo em 1973, a neurociência busca desvendar os interruptores moleculares precisos que transformam padrões transitórios de disparos de potenciais de ação em modificações físicas estáveis da conectividade neuronal.\n\nNas espinhas dendríticas hipocampais, o receptor NMDA atua como o detector de coincidência por excelência. Em potencial de repouso (-70 mV), o poro do canal é fisicamente bloqueado por íons magnésio extracelulares (Mg²⁺). Somente quando a membrana pós-sináptica é fortemente despolarizada pela ativação concomitante de receptores AMPA vizinhos, o íon Mg²⁺ é expulso por repulsão eletrostática, permitindo um influxo maciço de íons cálcio (Ca²⁺).\n\nO cálcio citosólico liga-se à calmodulina, ativando a holoenzima CaMKIIα por autofosforilação no resíduo Thr286, o que converte a enzima em um estado constitutivamente ativo independente de cálcio, iniciando a consolidação sináptica.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-neuro-3",
        position: 3,
        title: "3. Metodologia: Super-resolução STED e Patch-Clamp",
        content: `Foram utilizados fatias organotípicas de hipocampo de camundongos C57BL/6J (P14-P21). As fatias foram transfectadas com plasmídeos contendo GluA1-mEos4b e actina-Chromobody via biolística (Gene Gun).\n\nProtocolo Experimental:\n- Gravações eletrofisiológicas no modo whole-cell acopladas a amplificador Axopatch 200B.\n- Fotólise de MNI-caged-L-glutamato utilizando laser pulsado de Ti:Safira operando em 720 nm focado em espinhas individuais identificadas visualmente.\n- Imagem em super-resolução com sistema STED confocal Leica TCS SP8, alcançando resolução lateral de 35 nm.\n- Análise quantitativa de difusão de receptores por rastreamento de nanopartículas individuais (Single-Particle Tracking - SPT).`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-neuro-4",
        position: 4,
        title: "4. Resultados: Translocação de AMPAR e Arquitetura de Actina",
        content: `Nossos dados revelam duas fases distintas no fortalecimento da sinapse:\n\n1. Fase Precoce (0 - 10 minutos): A mobilidade difusional dos receptores AMPA perissinápticos cai vertiginosamente de 0,18 μm²/s para 0,02 μm²/s à medida que são capturados nos nanodomínios centrais da densidade pós-sináptica pelas proteínas de arcabouço PSD-95 e TARP (Stargazin).\n\n2. Fase Tardia e Estrutural (10 - 360 minutos): A polimerização de monômeros de G-actina em filamentos ramificados de F-actina (induzida pelo complexo Arp2/3 e cofilina fosforilada) empurra a membrana plasmática, duplicando a área de contato com a zona ativa pré-sináptica.\n\nO bloqueio farmacológico da CaMKII com tat-CN21 impediu tanto o crescimento morfológico da espinha quanto o aumento da amplitude das correntes excitatórias pós-sinápticas miniatura (mEPSCs).`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-neuro-5",
        position: 5,
        title: "5. Discussão Crítica, Síntese & Referências",
        content: `DISCUSSÃO\nA demonstração de que a expansão mecânica da espinha e o aprisionamento de receptores são processos acoplados mas cineticamente desacopláveis esclarece como o cérebro preserva a estabilidade das memórias antigas enquanto acomoda novas memórias sem saturação sináptica (regulação homeostática).\n\nREFERÊNCIAS BIBLIOGRÁFICAS\n1. Bliss, T. V., & Collingridge, G. L. (1993). A synaptic model of memory: long-term potentiation in the hippocampus. Nature, 361(6407), 31-39.\n2. Matsuzaki, M., et al. (2004). Structural basis of long-term potentiation in single dendritic spines. Nature, 429(6993), 761-766.\n3. Hell, J. W. (2014). CaMKII: claiming center stage in postsynaptic function and organization. Neuron, 81(1), 27-44.\n4. Chater, T. E., & Goda, Y. (2021). The role of AMPA receptors in synaptic plasticity and learning. Neuropharmacology, 197, 108711.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "sci-genetica-crispr-prime-editing",
    title: "Correção de Mutações Pontuais via Prime Editing em Células Hematopoiéticas Humanas",
    subtitle: "Artigo Científico · Genética Molecular & Terapia Gênica",
    author: "Dra. Camila Duarte, Dr. Renan Matsumoto & Dra. Beatriz L. Vance",
    institution: "Laboratório de Engenharia Genômica & Centro de Terapia Celular",
    field: "Genética & Biotecnologia",
    doi: "10.1038/s41587-026-02108-w",
    description: "Avaliação pré-clínica de sistemas de Prime Editing de 4ª geração (PEmax com pegRNAs estruturados) para reversão da mutação Glu6Val no gene HBB (Anemia Falciforme) em células-tronco e progenitoras hematopoiéticas humanas (CD34+) com índice nulo de quebras de fita dupla.",
    cover_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80",
    published_at: "2026-04-02",
    read_time: 42,
    peer_reviewed: true,
    downloads: 16400,
    rating: 4.98,
    rating_count: 670,
    chapters: [
      {
        id: "chap-sci-crispr-1",
        position: 1,
        title: "1. Abstract & Enquadramento Translacional",
        content: `RESUMO ESTRUTURADO\n\nA anemia falciforme é uma hemoglobinopatia monogênica debilitante causada por uma transversão pontual de adenina para timina (GAG → GTG) no códon 6 do gene da beta-globina (HBB), culminando na polimerização da hemoglobina desoxigenada (HbS).\n\nEmbora nucleases convencionais CRISPR-Cas9 permitam a clivagem do DNA, elas induzem predominantemente quebras de fita dupla (DSBs) não-homólogas com alto risco de translocações cromossômicas, deleções extensas e ativação oncogênica dependente de p53.\n\nAqui demonstramos a aplicação de Prime Editors aperfeiçoados (PEmax) conjugados com transcritos pegRNA protegidos por motivos de estrutura secundária (tevopreQ1). Em células-tronco hematopoiéticas CD34+ de pacientes, alcançamos 74,2% de conversão do alelo patogênico em HBB selvagem com níveis de inserções/deleções indesejadas (indels) inferiores a 0,4%. O transplante em camundongos imunodeficientes NSG preservou a capacidade de enxertia multilinear a longo prazo.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-crispr-2",
        position: 2,
        title: "2. Introdução: Das Nucleases ao Prime Editing",
        content: `A evolução das ferramentas de edição genômica representou um salto conceitual inestimável na medicina. A primeira geração baseou-se em nucleases programáveis (ZFNs, TALENs e Cas9 canônica), que funcionam como 'tesouras moleculares'. No entanto, a dependência do reparo dirigido por homologia (HDR) para introduzir correções precisas apresenta eficiência limitada em células quiescentes pós-mitóticas como as células-tronco hematopoiéticas (HSPCs).\n\nO Prime Editing, desenvolvido originalmente por Anzalone et al. (2019), revoluciona essa abordagem ao combinar uma Cas9 nickase (H840A) fundida a uma transcriptase reversa engenheirada do vírus da leucemia murina de Moloney (M-MLV RT). O pegRNA (prime editing guide RNA) atua concomitantemente guiando a nuclease ao sítio-alvo e servindo como molde para a síntese reversa direta da fita de DNA modificada, sem clivagem da dupla fita.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-crispr-3",
        position: 3,
        title: "3. Metodologia: Otimização de pegRNA e Entrega por RNP",
        content: `Protocolo Molecular:\n1. Projeto bioinformático de pegRNAs: Comprimento do sítio de ligação do primer (PBS) calibrado para 13 nucleotídeos e extensão de transcrição reversa (RTT) de 14 nucleotídeos com mutação silenciosa PAM-disruptora para impedir recorte.\n2. Adição de RNA estruturado tevopreQ1 na extremidade 3' para proteção contra exonucleases celulares.\n3. Síntese e purificação de complexos ribonucleoproteicos (RNPs) PEmax livres de endotoxinas.\n4. Eletroporação em sistema microfluídico Lonza 4D-Nucleofector em células CD34+ primárias mobilizadas por G-CSF.\n5. Sequenciamento de nova geração (NGS) de amplicons genômicos com profundidade média de 100.000x para mapeamento de eficiência e análise de off-targets pelo algoritmo CIRCLE-seq.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-crispr-4",
        position: 4,
        title: "4. Resultados Clínicos Pré-Clínicos & Enxertia",
        content: `A análise genômica em 16 dias pós-edição confirmou:\n- Taxa de conversão alélica HBB: 74,2 ± 3,1% de genótipo selvagem (HbA).\n- Taxa de indels não intencionais: 0,38% no sítio on-target.\n- Análise off-target: em 42 sítios homólogos preditos pelo genoma humano (GRCh38), nenhuma mutação fora do alvo foi detectada acima do limiar de erro de leitura de sequenciamento (0,05%).\n\nNo ensaio funcional de colônia eritróide (BFU-E), a hemoglobina adulta funcional (HbA) representou 82% da hemoglobina total por cromatografia HPLC de troca catiônica, revertendo totalmente o fenótipo de foice sob atmosfera de estresse de oxigênio de 2% (hipóxia in vitro).`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-crispr-5",
        position: 5,
        title: "5. Considerações Finais, Segurança & Referências",
        content: `CONCLUSÕES\nA ausência de quebras de dupla fita afasta os riscos de deleções kilobásicas e perda de integridade cromossômica documentadas com Cas9 convencional. A alta viabilidade celular pós-eletroporação (89%) e a persistência de alelos corrigidos após 16 semanas em modelo de enxertia animal estabelecem o Prime Editing como candidato preferencial para ensaios clínicos em humanos de terapia gênica autóloga.\n\nREFERÊNCIAS BIBLIOGRÁFICAS\n1. Anzalone, A. V., et al. (2019). Search-and-replace genome editing without double-strand breaks or donor DNA. Nature, 576(7785), 149-157.\n2. Chen, P. J., et al. (2021). Enhanced prime editing systems by manipulating cellular determinants of editing outcomes. Cell, 184(22), 5635-5652.\n3. Nelson, C. A., et al. (2023). In vivo prime editing for correction of genetic disorders. Nature Biotechnology, 41(4), 512-524.\n4. Doudna, J. A. (2020). The promise and challenge of therapeutic genome editing. Nature, 578(7794), 229-236.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "sci-astrofisica-james-webb-galaxias",
    title: "Espectroscopia de Galáxias Primitivas com z > 10 pelo Telescópio Espacial James Webb",
    subtitle: "Artigo Científico · Astrofísica & Cosmologia Observacional",
    author: "Dr. Ethan K. Vance, Dra. Mirella S. Tanaka & Dr. Johann Richter",
    institution: "Observatório Astrofísico & Consórcio Internacional JWST NIRSpec",
    field: "Astrofísica",
    doi: "10.3847/1538-4357/ad1902",
    description: "Análise espectroscópica profunda com NIRSpec e NIRCam de galáxias candidatas no amanhecer cósmico (redshift fotométrico e espectroscópico z = 10,6 a 13,2), revelando abundâncias químicas inesperadas de carbono, poeira e taxas de formação estelar que desafiam o modelo cosmológico padrão Lambda-CDM.",
    cover_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    published_at: "2026-01-20",
    read_time: 48,
    peer_reviewed: true,
    downloads: 18900,
    rating: 4.97,
    rating_count: 740,
    chapters: [
      {
        id: "chap-sci-astro-1",
        position: 1,
        title: "1. Abstract & O Quebra-Cabeça da Reionização Cósmica",
        content: `RESUMO ESTRUTURADO\n\nAs primeiras centenas de milhões de anos após o Big Bang marcam a transição da Idade das Trevas para a Época da Reionização, quando as primeiras estrelas (População III) e proto-galáxias ionizaram o hidrogênio neutro intergaláctico.\n\nApresentamos observações de espectroscopia multi-objeto (MOS) obtidas pelo espectrógrafo infravermelho NIRSpec do Telescópio Espacial James Webb (JWST) no campo profundo JADES (JWST Advanced Deep Extragalactic Survey). Confirmamos espectroscopicamente a quebra de Lyman-alfa de três sistemas em redshifts z = 10,60, z = 12,11 e z = 13,18.\n\nA luminosidade UV observada (M_UV ≈ -21) implica uma densidade numérica de galáxias superbrilhantes uma ordem de magnitude superior às predições dos modelos de retroalimentação de halo de matéria escura vigentes, sugerindo eficiências de conversão de gás em estrelas excepcionalmente altas ou uma Função de Massa Inicial (IMF) orientada a estrelas de massa extrema.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-astro-2",
        position: 2,
        title: "2. Introdução: A Fronteira do Universo Primitivo",
        content: `No modelo cosmológico de concordância (ΛCDM), as estruturas cósmicas formam-se de maneira hierárquica através do colapso gravitacional de flutuações primordiais de matéria escura. Sob essas premissas teóricas, esperava-se que galáxias situadas a z > 10 fossem corpos minúsculos, de baixa massa estelar e pobres em elementos pesados (metais).\n\nContudo, os primeiros dados de imagem em campo profundo revelaram fontes compactas com cores azuis intensas no repouso ultravioleta, levantando duas hipóteses concorrentes:\n1. A presença de buracos negros supermassivos primitivos acumulando matéria em taxas super-Eddington, cuja radiação de disco de acreção emula a luminosidade estelar.\n2. Explosões violentas de formação estelar com poeira atipicamente agregada em geometrias pontuais, permitindo a fuga livre de radiação de ionização de Lyman.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-astro-3",
        position: 3,
        title: "3. Redução de Dados NIRSpec & Calibração Espectral",
        content: `Os dados foram processados utilizando a pipeline de calibração científica STScI v1.12 combinada com correções customizadas para dispersão de luz parasitária e remoção de raios cósmicos de impacto em múltiplos pixels nos detectores Teledyne H2RG.\n\nParâmetros Observacionais:\n- Rede de micro-obturadores (MSA) configurada para integrar cada alvo por 28,4 horas em dispersores prismáticos (R ~ 100) e redes de média resolução G140M/F070LP e G235M/F170LP (R ~ 1000).\n- Verificação da quebra de Lyman através da supressão abrupta do fluxo em comprimentos de onda inferiores a λ_obs = (1 + z) * 121,6 nm.\n- Medição das linhas de emissão de alta ionização: C IV λλ1548, 1550, He II λ1640 e [O III] λλ4959, 5007 redshiftadas no infravermelho médio.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-astro-4",
        position: 4,
        title: "4. Resultados: Metalicidade e Densidade Estelar",
        content: `Resultados-Chave:\n- No sistema JADES-GS-z13-0 (z = 13,18, apenas 320 milhões de anos após o Big Bang), detectou-se um continuum límpido com inclinação espectral β = -2,6 ± 0,1, compatível com populações estelares desprovidas de poeira e com fração de metalicidade Z ≈ 0,05 Z_sol.\n- No sistema JADES-GS-z10-1 (z = 10,60), a detecção da razão de linhas [C IV]/[He II] = 2,1 indica um campo de radiação ionizante extremamente duro, alimentado por estrelas Wolf-Rayet primitivas ou acreção ativa de buraco negro de semente intermediária (10⁴ - 10⁵ massas solares).\n\nA densidade volumétrica de densidade de taxa de formação estelar (SFRD) extrapolada a z ~ 12 permanece plana em log(ρ_SFR) ≈ -2,8 M_sol/ano/Mpc³, refutando o colapso rápido previsto por simulações hidrodinâmicas convencionais.`,
        is_free_preview: true,
      },
      {
        id: "chap-sci-astro-5",
        position: 5,
        title: "5. Implicações Cosmológicas & Referências",
        content: `IMPLICAÇÕES\nEssas medições não exigem o abandono da matéria escura fria, mas demandam uma revisão substancial das prescrições de feedback de supernovas no regime de gás de alta densidade do Universo jovem. Se o resfriamento de gás for mais eficiente na ausência de metais pesados, as galáxias primordiais formaram estrelas em taxas ordens de magnitude superiores às galáxias modernas.\n\nREFERÊNCIAS BIBLIOGRÁFICAS\n1. Robertson, B. E., et al. (2023). Identification and properties of intense star-forming galaxies at redshifts z > 10. Nature Astronomy, 7(5), 611-621.\n2. Curtis-Lake, E., et al. (2023). Spectroscopic confirmation of four galaxies at redshifts 10.3–13.2. Nature Astronomy, 7(5), 622-632.\n3. Madau, P., & Dickinson, M. (2014). Cosmic star-formation history. Annual Review of Astronomy and Astrophysics, 52, 415-486.\n4. Boylan-Kolchin, M. (2023). Stress testing ΛCDM with high-redshift galaxy candidates from JWST. Nature Astronomy, 7(6), 731-735.`,
        is_free_preview: true,
      },
    ],
  },
];
