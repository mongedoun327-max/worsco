/**
 * Manuais e Livros Didáticos Completos de Disciplinas Curriculares.
 * Cobre Ensino Fundamental II, Ensino Médio, Pré-Vestibular / ENEM e Ensino Superior (Ciclo Básico de Exatas e Humanas).
 * Oferece leitura integral estruturada em capítulos temáticos com teoria explicativa, fórmulas,
 * resolução de problemas modelo e questões comentadas para provas e vestibulares.
 */

export interface CurricularBookData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  discipline: string;
  grade_level: string; // "Ensino Fundamental II" | "Ensino Médio" | "Pré-Vestibular / ENEM" | "Ensino Superior"
  description: string;
  cover_url: string;
  year: number;
  read_time: number;
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

export const CURRICULAR_BOOKS: CurricularBookData[] = [
  {
    id: "curr-matematica-ensino-medio-completo",
    title: "Matemática Fundamental & Avançada para o Ensino Médio",
    subtitle: "Disciplina Curricular · 1º ao 3º Ano & ENEM",
    author: "Profª. Dra. Mariana Peixoto & Prof. Renato Silveira",
    discipline: "Matemática",
    grade_level: "Ensino Médio & ENEM",
    description: "Curso didático completo de Matemática do Ensino Médio: Funções Afim e Quadrática, Logaritmos, Trigonometria no Ciclo, Matrizes, Geometria Espacial Métrica e Análise Combinatória com problemas resolvidos passo a passo e gabarito comentado.",
    cover_url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80",
    year: 2026,
    read_time: 180,
    downloads: 24500,
    rating: 4.95,
    rating_count: 890,
    chapters: [
      {
        id: "chap-curr-mat-1",
        position: 1,
        title: "Capítulo I — Funções Reais: Conceito, Domínio, Função Afim e Taxa de Variação",
        content: `1. CONCEITO DE FUNÇÃO\nUma função f de um conjunto A em um conjunto B (f: A → B) é uma lei matemática que associa a cada elemento x ∈ A um único elemento y ∈ B, denotado por y = f(x).\n- Domínio (D): Conjunto de valores reais de x para os quais a expressão tem significado.\n- Imagem (Im): Conjunto de valores y efetivamente assumidos.\n\n2. FUNÇÃO AFIM (1º GRAU)\nA função afim possui a forma algébrica:\nf(x) = ax + b, com a, b ∈ ℝ e a ≠ 0.\n- O coeficiente 'a' é o coeficiente angular (taxa de variação média: a = Δy / Δx = tg θ).\n- Se a > 0, a função é estritamente crescente; se a < 0, é estritamente decrescente.\n- O coeficiente 'b' é o coeficiente linear, representando o ponto de interseção da reta com o eixo das ordenadas (0, b).\n- A raiz ou zero da função ocorre quando f(x) = 0 ⟹ x = -b/a.\n\nEXEMPLO RESOLVIDO PASSO A PASSO:\nProblema: Uma empresa de transporte cobra uma taxa fixa de R$ 15,00 mais R$ 3,50 por quilômetro rodado. Determine a lei da função que expressa o custo C em relação à distância d (em km) e o custo de uma corrida de 24 km.\n\nResolução:\n1. A taxa fixa independe da distância: b = 15.\n2. O valor por quilômetro é o coeficiente angular: a = 3,50.\n3. Logo: C(d) = 3,50d + 15.\n4. Para d = 24: C(24) = 3,50 * 24 + 15 = 84 + 15 = R$ 99,00.\n\nEXERCÍCIOS DE FIXAÇÃO:\nQuestão 1: Determine a equação da reta que passa pelos pontos A(2, 5) e B(6, 13).\nGabarito: a = (13 - 5)/(6 - 2) = 8/4 = 2. Usando y - y₀ = a(x - x₀): y - 5 = 2(x - 2) ⟹ y = 2x + 1.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-mat-2",
        position: 2,
        title: "Capítulo II — Função Quadrática: Vértice, Zeros da Função e Otimização",
        content: `1. FORMA GERAL DA FUNÇÃO QUADRÁTICA\nf(x) = ax² + bx + c, com a, b, c ∈ ℝ e a ≠ 0.\nO gráfico é uma parábola com eixo de simetria vertical paralelo ao eixo y.\n- Se a > 0, a concavidade é voltada para cima (possui ponto de mínimo).\n- Se a < 0, a concavidade é voltada para baixo (possui ponto de máximo).\n\n2. DISCRIMINANTE (Δ) E RAÍZES:\nΔ = b² - 4ac.\n- Δ > 0: A parábola corta o eixo x em dois pontos reais distintos x₁, x₂ = (-b ± √Δ)/(2a).\n- Δ = 0: A parábola tangencia o eixo x em um único ponto real duplo x = -b/(2a).\n- Δ < 0: A parábola não intersecta o eixo real x.\n\n3. COORDENADAS DO VÉRTICE (PONTO CRÍTICO):\nV = (x_v, y_v), onde:\nx_v = -b / (2a)\ny_v = -Δ / (4a) = f(x_v)\n\nAPLICAÇÃO CLÁSSICA EM OTIMIZAÇÃO (ENEM):\nProblema: Um projétil é disparado de modo que sua trajetória descreve a equação h(t) = -5t² + 40t, onde h é a altura em metros e t é o tempo em segundos. Calcule a altura máxima atingida e o tempo para atingi-la.\n\nResolução:\n- a = -5, b = 40, c = 0.\n- O tempo para a altura máxima é x_v: t_max = -40 / (2 * (-5)) = 4 segundos.\n- A altura máxima é y_v: h_max = -5(4)² + 40(4) = -80 + 160 = 80 metros.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-mat-3",
        position: 3,
        title: "Capítulo III — Trigonometria no Ciclo: Seno, Cosseno, Tangente e Relação Fundamental",
        content: `1. O CICLO TRIGONOMÉTRICO\nO círculo trigonométrico é uma circunferência de raio unitário (R = 1) centrada na origem dos eixos cartesianos.\n- Eixo horizontal (eixo das abscissas): Eixo dos Cossenos.\n- Eixo vertical (eixo das ordenadas): Eixo dos Senos.\n- Eixo vertical tangente ao ponto (1, 0): Eixo das Tangentes.\n\n2. RELAÇÃO FUNDAMENTAL DA TRIGONOMETRIA\nPara todo arco real x, decorrente do Teorema de Pitágoras no triângulo retângulo de coordenadas (cos x, sen x):\nsen²(x) + cos²(x) = 1.\n\nFórmulas Derivadas Indispensáveis:\n- 1 + tg²(x) = sec²(x)\n- 1 + cotg²(x) = cossec²(x)\n\n3. FÓRMULAS DE ADIÇÃO E ARCO DUPLO\n- sen(a ± b) = sen(a)cos(b) ± sen(b)cos(a)\n- cos(a ± b) = cos(a)cos(b) ∓ sen(a)sen(b)\n- sen(2a) = 2 * sen(a) * cos(a)\n- cos(2a) = cos²(a) - sen²(a) = 1 - 2sen²(a) = 2cos²(a) - 1\n\nEXERCÍCIO MODELO ENEM:\nSabendo que sen(x) = 3/5 e x pertence ao segundo quadrante (π/2 < x < π), calcule cos(x) e tg(x).\nResolução:\ncos²(x) = 1 - sen²(x) = 1 - 9/25 = 16/25.\nComo x está no 2º quadrante, o cosseno é negativo: cos(x) = -4/5.\ntg(x) = sen(x) / cos(x) = (3/5) / (-4/5) = -3/4.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-mat-4",
        position: 4,
        title: "Capítulo IV — Geometria Espacial Métrica: Prismas, Cilindros, Pirâmides e Esferas",
        content: `1. PRISMAS E CILINDROS (SÓLIDOS DE SECÇÃO UNIFORME)\n- Volume de qualquer prisma ou cilindro: V = A_base * h.\n- Cilindro reto de raio R e altura h:\n  A_base = πR²\n  A_lateral = 2πRh\n  A_total = 2πR(R + h)\n  Volume = πR²h.\n\n2. PIRÂMIDES E CONES (SÓLIDOS DE VÉRTICE ÚNICO)\n- Volume: V = (1/3) * A_base * h.\n- Cone circular reto (raio da base R, altura h e geratriz g):\n  Relação pitagórica: g² = h² + R².\n  A_lateral = πRg.\n  Volume = (1/3)πR²h.\n\n3. ESFERA DE RAIO R\n- Área superficial: A = 4πR².\n- Volume: V = (4/3)πR³.\n\nQUESTÃO RESOLVIDA:\nUm reservatório em formato cilíndrico reto possui raio de base de 2 metros e altura de 5 metros. Adotando π = 3,14, qual é a capacidade em litros deste tanque quando completamente cheio?\nResolução:\n1. V = π * R² * h = 3,14 * (2)² * 5 = 3,14 * 4 * 5 = 62,8 m³.\n2. Como 1 m³ = 1.000 litros, a capacidade total é: 62,8 * 1.000 = 62.800 litros.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "curr-fisica-ensino-medio-completo",
    title: "Física Geral & Experimental: Mecânica, Termologia, Óptica e Eletricidade",
    subtitle: "Disciplina Curricular · 1º ao 3º Ano & Vestibulares",
    author: "Prof. Dr. Carlos Eduardo Diniz & Prof. Arthur Ramos",
    discipline: "Física",
    grade_level: "Ensino Médio & Pré-Vestibular",
    description: "Manual completo de Física cobrindo Cinemática Escalar e Vetorial, Leis de Newton, Trabalho e Energia Mecânica, Calorimetria e Termodinâmica, Óptica Geométrica, Eletrostática e Circuitos de Corrente Contínua.",
    cover_url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=1200&auto=format&fit=crop&q=80",
    year: 2026,
    read_time: 190,
    downloads: 21300,
    rating: 4.97,
    rating_count: 812,
    chapters: [
      {
        id: "chap-curr-fis-1",
        position: 1,
        title: "Capítulo I — Cinemática Escalar: MRU, MRUV e Queda Livre de Corpos",
        content: `1. MOVIMENTO RETILÍNEO UNIFORME (MRU)\nNo MRU, a velocidade instantânea é constante e diferente de zero, o que implica aceleração nula (a = 0).\n- Função horária da posição: S = S₀ + v * t.\n\n2. MOVIMENTO RETILÍNEO UNIFORMEMENTE VARIADO (MRUV)\nA aceleração tangencial é constante (a ≠ 0). A velocidade varia linearmente com o tempo.\n- Função horária da velocidade: v = v₀ + a * t.\n- Função horária da posição: S = S₀ + v₀ * t + (1/2) * a * t².\n- Equação de Torricelli (independente do tempo): v² = v₀² + 2 * a * ΔS.\n\n3. QUEDA LIVRE E LANÇAMENTO VERTICAL\nSob a ação exclusiva do campo gravitacional g (admitindo vácuo):\n- Queda livre a partir do repouso (v₀ = 0):\n  v = g * t\n  h = (1/2) * g * t²\n  v² = 2 * g * h.\n- Tempo de queda: t_q = √(2h / g).\n\nEXEMPLO PRÁTICO:\nUm veículo trafegando a 72 km/h (20 m/s) avista um obstáculo e o motorista aciona os freios, imprimindo uma desaceleração constante de 4 m/s². Calcule a distância percorrida pelo veículo até a imobilização completa.\n\nResolução:\nUsando Torricelli com v = 0, v₀ = 20 m/s e a = -4 m/s²:\n0² = 20² + 2 * (-4) * ΔS ⟹ 0 = 400 - 8ΔS ⟹ 8ΔS = 400 ⟹ ΔS = 50 metros.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-fis-2",
        position: 2,
        title: "Capítulo II — Leis de Newton, Atrito e Conservação da Energia Mecânica",
        content: `1. AS TRÊS LEIS DE NEWTON\n- 1ª Lei (Inércia): Todo corpo permanece em estado de repouso ou de MRU, a menos que seja compelido a mudar seu estado por forças externas resultantes aplicadas sobre ele.\n- 2ª Lei (Princípio Fundamental da Dinâmica): A força resultante que atua sobre um corpo de massa constante é proporcional à aceleração adquirida:\n  F_res = m * a (em Newtons: 1 N = 1 kg·m/s²).\n- 3ª Lei (Ação e Reação): Para toda força que um corpo A exerce sobre um corpo B, existe uma força de mesma intensidade, mesma direção e sentido oposto aplicada pelo corpo B sobre o corpo A (atuam em corpos distintos, nunca se anulam).\n\n2. FORÇAS DE ATRITO\n- Atrito Estático Máximo: f_e(max) = μ_e * N.\n- Atrito Cinético ou Dinâmico: f_c = μ_c * N (com μ_c < μ_e).\n\n3. TRABALHO E ENERGIA MECÂNICA\n- Energia Cinética: E_c = (1/2) * m * v².\n- Energia Potencial Gravitacional: E_pg = m * g * h.\n- Energia Potencial Elástica: E_pe = (1/2) * k * x².\n- Princípio da Conservação: Na ausência de forças dissipativas (atrito e resistência do ar), a energia mecânica total permanece constante: E_m(inicial) = E_m(final).`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-fis-3",
        position: 3,
        title: "Capítulo III — Eletrodinâmica: Corrente, Leis de Ohm, Potência e Associação de Resistores",
        content: `1. CORRENTE ELÉTRICA E LEI DE OHM\n- Intensidade de Corrente: i = ΔQ / Δt = (n * e) / Δt (1 A = 1 C/s).\n- 1ª Lei de Ohm: U = R * i (onde U é a d.d.p. em Volts, R é a resistência em Ohms e i é a corrente em Amperes).\n- 2ª Lei de Ohm: R = ρ * (L / A) (resistência em função da resistividade do material, comprimento do condutor e área de secção transversal).\n\n2. POTÊNCIA E ENERGIA ELÉTRICA\n- Potência instantânea dissipada por efeito Joule: P = U * i = R * i² = U² / R (em Watts).\n- Consumo de Energia Elétrica residencial: E = P * Δt (medida comercialmente em quilowatt-hora: 1 kWh = 3,6 x 10⁶ Joules).\n\n3. ASSOCIAÇÃO DE RESISTORES\n- Associação em Série: A mesma corrente percorre todos os resistores. R_eq = R₁ + R₂ + ... + R_n.\n- Associação em Paralelo: Todos os resistores estão submetidos à mesma d.d.p. U. 1/R_eq = 1/R₁ + 1/R₂ + ... + 1/R_n. (Para dois resistores: R_eq = (R₁ * R₂) / (R₁ + R₂)).`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "curr-quimica-geral-e-organica",
    title: "Química Essencial: Estrutura Atômica, Estequiometria, Equilíbrio e Funções Orgânicas",
    subtitle: "Disciplina Curricular · Ensino Médio & Pré-Vestibular",
    author: "Profª. Luciana Mendes & Prof. Tiago Barcellos",
    discipline: "Química",
    grade_level: "Ensino Médio & ENEM",
    description: "Tratado didático completo cobrindo Tabela Periódica, Ligações Químicas, Cálculo Estequiométrico, Termoquímica, Equilíbrio Químico (pH e pOH) e Química Orgânica com funções oxigenadas e nitrogenadas.",
    cover_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80",
    year: 2026,
    read_time: 175,
    downloads: 19800,
    rating: 4.96,
    rating_count: 760,
    chapters: [
      {
        id: "chap-curr-qui-1",
        position: 1,
        title: "Capítulo I — Estrutura Atômica, Tabela Periódica e Ligações Químicas",
        content: `1. MODELOS ATÔMICOS E DISTRIBUIÇÃO ELETRÔNICA\n- O modelo atômico atual (Schrödinger e Heisenberg) descreve os elétrons não em órbitas planetárias fixas, mas em orbitais probabilísticos.\n- Diagrama de Linus Pauling para distribuição por subníveis de energia: 1s, 2s 2p, 3s 3p 3d, 4s 4p 4d 4f, 5s...\n- Regra do Octeto: Átomos tendem a ganhar, perder ou compartilhar elétrons até completarem 8 elétrons na camada de valência (configuração estável de gás nobre).\n\n2. LIGAÇÕES QUÍMICAS\n- Ligação Iônica: Ocorre por transferência definitiva de elétrons entre metais (baixa eletronegatividade) e ametais (alta eletronegatividade), gerando atração eletrostática entre cátions e ânions (ex: NaCl).\n- Ligação Covalente: Ocorre por compartilhamento de pares eletrônicos entre ametais e/ou hidrogênio (ex: H₂O, CO₂).\n- Ligação Metálica: Modelo do 'mar de elétrons' deslocalizados em torno de cátions fixos na rede cristalina, conferindo alta condutibilidade térmica e elétrica.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-qui-2",
        position: 2,
        title: "Capítulo II — Cálculo Estequiométrico e Leis Ponderais",
        content: `1. CONSTANTE DE AVOGADRO E MASSA MOLAR\n- 1 mol = 6,02 x 10²³ partículas (átomos, moléculas ou íons).\n- Volume molar de gás ideal nas CNTP (0 °C e 1 atm): V_molar = 22,4 L/mol.\n\n2. PASSOS PARA O CÁLCULO ESTEQUIOMÉTRICO:\n1º Passo: Escrever e balancear corretamente a equação química.\n2º Passo: Identificar as substâncias envolvidas no enunciado e suas respectivas proporções molares.\n3º Passo: Converter mols para as grandezas solicitadas (massa em gramas, volume em litros ou número de moléculas).\n4º Passo: Montar e resolver a regra de três simples, considerando eventuais impurezas ou reagentes limitantes.\n\nEXEMPLO RESOLVIDO:\nCalcule a massa de dióxido de carbono (CO₂, massa molar = 44 g/mol) produzida pela combustão completa de 160 g de metano (CH₄, massa molar = 16 g/mol).\nEquação Balanceada: CH₄ + 2 O₂ → CO₂ + 2 H₂O.\nProporção: 1 mol de CH₄ (16 g) produz 1 mol de CO₂ (44 g).\nRegra de três:\n16 g CH₄ ─── 44 g CO₂\n160 g CH₄ ─── x g CO₂\nx = (160 * 44) / 16 = 440 gramas de CO₂.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-qui-3",
        position: 3,
        title: "Capítulo III — Funções Orgânicas: Hidrocarbonetos, Álcoois, Aldeídos, Cetonas e Ácidos",
        content: `1. POSTULADOS DE KEKULÉ\n- O carbono é tetravalente (realiza 4 ligações covalentes).\n- As quatro valências do carbono são quimicamente equivalentes.\n- Átomos de carbono ligam-se entre si formando longas cadeias carbônicas lineares, ramificadas ou cíclicas.\n\n2. PRINCIPAIS FUNÇÕES OXIGENADAS:\n- Hidrocarbonetos: Apenas C e H (alcanos, alcenos, alcinos, aromáticos).\n- Álcoois: Presença de hidroxila (-OH) ligada a carbono saturado (ex: etanol, CH₃CH₂OH).\n- Aldeídos: Presença de carbonila terminal (-CHO) (ex: metanal/formol, HCHO).\n- Cetonas: Presença de carbonila entre dois átomos de carbono (-CO-) (ex: propanona/acetona).\n- Ácidos Carboxílicos: Grupo carboxila (-COOH) na extremidade (ex: ácido etanoico/acético, CH₃COOH).\n- Ésteres: Derivados de ácidos por substituição de H por radical orgânico (-COO-R), responsáveis pelos aromas e fragrâncias artificiais.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "curr-biologia-ecologia-genetica",
    title: "Biologia Moderna: Da Célula aos Ecossistemas e Biotecnologia",
    subtitle: "Disciplina Curricular · Ensino Médio & ENEM",
    author: "Profª. Helena Nogueira & Prof. Gabriel Fontes",
    discipline: "Biologia",
    grade_level: "Ensino Médio & ENEM",
    description: "Manual didático abrangente cobrindo Citologia, Respiração Celular e Fotossíntese, Genética Mendeliana, Dogma Central da Biologia Molecular, Teoria da Evolução de Darwin-Wallace e Ecologia das Populações.",
    cover_url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop&q=80",
    year: 2026,
    read_time: 170,
    downloads: 23100,
    rating: 4.98,
    rating_count: 920,
    chapters: [
      {
        id: "chap-curr-bio-1",
        position: 1,
        title: "Capítulo I — Citologia: Membrana Plasmática, Organelas e Bioenergética Celular",
        content: `1. MODELO DO MOSAICO FLUIDO (SINGER & NICOLSON)\nA membrana celular é composta por uma bicamada lipídica fosfolipídica anfipática com proteínas integrais e periféricas inseridas que se deslocam lateralmente.\n- Transporte Passivo (sem gasto de ATP): Difusão simples, osmose e difusão facilitada através de carreadores proteicos e aquaporinas a favor do gradiente de concentração.\n- Transporte Ativo (com hidrólise de ATP): Bomba de Sódio e Potássio (3 Na⁺ para fora, 2 K⁺ para dentro da célula contra seus gradientes eletroquímicos).\n\n2. MITOCÔNDRIAS E RESPIRAÇÃO CELULAR AERÓBIA\nC₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ~30-32 ATP.\n- Glicólise (ocorre no hialoplasma/citosol): Quebra da glicose em dois piruvatos, com rendimento líquido de 2 ATP e 2 NADH.\n- Ciclo de Krebs (na matriz mitocondrial): Oxidação completa do acetil-CoA, gerando CO₂, NADH, FADH₂ e GTP.\n- Fosforilação Oxidativa (nas cristas mitocondriais): Cadeia transportadora de elétrons que gera um gradiente de prótons (H⁺) aproveitado pela ATP sintase.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-bio-2",
        position: 2,
        title: "Capítulo II — Genética Mendeliana, Heredogramas e Herança Ligada ao Sexo",
        content: `1. PRIMEIRA LEI DE MENDEL (LEI DA SEGREGAÇÃO DOS FATORES)\nCada característica de um organismo é determinada por um par de fatores (alelos) que se separam durante a formação dos gametas (meiose), de modo que cada gameta recebe apenas um alelo de cada par.\n- Genótipo: Constituição genética do indivíduo (homozigoto dominante AA, heterozigoto Aa, homozigoto recessivo aa).\n- Fenótipo: A manifestação observável do genótipo influenciada pelas condições ambientais.\n\n2. SISTEMA SANGUÍNEO ABO E FATOR RH\n- Polialelia (alelos múltiplos): Iᴬ, Iᴮ e i.\n  Grupo A: IᴬIᴬ ou Iᴬi (produz aglutinogênio A na hemácia e aglutinina anti-B no plasma).\n  Grupo B: IᴮIᴮ ou Iᴮi (produz aglutinogênio B na hemácia e aglutinina anti-A no plasma).\n  Grupo AB: IᴬIᴮ (codominância; receptor universal).\n  Grupo O: ii (doador universal de hemácias; não possui aglutinogênios).\n- Eritroblastose Fetal: Incompatibilidade de fator Rh (mãe Rh⁻ sensibilizada gerando feto Rh⁺).`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-bio-3",
        position: 3,
        title: "Capítulo III — Ecologia: Cadeias Alimentares, Ciclos Biogeoquímicos e Sucessão Ecológica",
        content: `1. NÍVEIS TRÓFICOS E FLUXO DE ENERGIA\n- Produtores (autótrofos fotossintetizantes ou quimiossintetizantes).\n- Consumidores Primários (herbívoros).\n- Consumidores Secundários, Terciários e Topo de Cadeia (carnívoros).\n- Decompositores (bactérias e fungos saprófitos responsáveis pela reciclagem dos nutrientes minerais).\n\nPrincípio Termodinâmico Fundamental: Ao contrário da matéria, que é ciclada indefinidamente, o fluxo de energia nos ecossistemas é UNIDIRECIONAL e decrescente a cada nível trófico devido à dissipação de calor metabólico (cerca de 10% de eficiência trófica).\n\n2. CICLO DO NITROGÊNIO\n- Fixação biológica: Bactérias Rhizobium associadas a leguminosas e cianobactérias convertem N₂ atmosférico em amônia (NH₃).\n- Nitrificação (ocorre no solo em duas etapas):\n  1. Nitrosação: Nitrosomonas oxidam amônia a nitrito (NO₂⁻).\n  2. Nitratação: Nitrobacter oxidam nitrito a nitrato assimilável (NO₃⁻).\n- Desnitrificação: Bactérias Pseudomonas reduzem nitratos de volta a gás N₂, fechando o ciclo global.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "curr-historia-geral-e-do-brasil",
    title: "História Integrada: Do Mundo Antigo ao Brasil Contemporâneo",
    subtitle: "Disciplina Curricular · Ensino Médio & Pré-Vestibular",
    author: "Prof. André Cavalcanti & Profª. Maria Luiza Fontoura",
    discipline: "História",
    grade_level: "Ensino Médio & ENEM",
    description: "Análise histórica aprofundada das transformações políticas, econômicas e sociais: Democracia Grega e República Romana, Feudalismo, Expansão Marítima e Brasil Colônia, Revolução Francesa, Império do Brasil, Era Vargas e Ditadura Militar.",
    cover_url: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80",
    year: 2026,
    read_time: 185,
    downloads: 18200,
    rating: 4.95,
    rating_count: 670,
    chapters: [
      {
        id: "chap-curr-hist-1",
        position: 1,
        title: "Capítulo I — Brasil Colônia: Ciclo do Açúcar, Escravidão e Sociedade Patriarcal",
        content: `1. O SISTEMA COLONIAL E O PACTO COLONIAL\nO modelo de colonização implantado por Portugal a partir de 1530 seguiu a lógica mercantilista de exclusivismo metropolitano. A colônia existia com a função precípua de fornecer gêneros tropicais de alto valor comercial ao mercado europeu e consumir os manufaturados da metrópole.\n\n2. A EMPRESA AÇUCAREIRA NORDESTINA (PLANTER SYSTEM)\nO cultivo da cana-de-açúcar assentou-se sobre o tripé do latifúndio monocultor, voltado para a exportação e sustentado pelo trabalho compulsório escravizado.\n- O Engenho como unidade socioeconômica: Casa-Grande (centro do poder senhorial patriarcal), Senzala (habitação coletiva dos escravizados) e a Moenda.\n- O tráfico transatlântico negreiro não era apenas fonte de mão de obra forçada, mas um dos negócios mais lucrativos do comércio triangular português, articulando as coroas europeias, enclaves na costa africana e o território colonial brasileiro.\n\n3. FORMAS DE RESISTÊNCIA ESCRAVA\nA escravização nunca ocorreu sem contestação permanente. As formas de resistência abrangeram desde a preservação de tradições religiosas sincréticas, negociações de pecúlio e alforria, até revoltas armadas e a formação de quilombos, sendo o Quilombo dos Palmares, na Serra da Barriga, a maior expressão de autonomia política da América colonial.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-hist-2",
        position: 2,
        title: "Capítulo II — Revoluções Burguesas, Iluminismo e a Era das Revoluções",
        content: `1. O ILUMINISMO (SÉCULO XVIII)\nO movimento intelectual que emergiu na Europa desafiou os pilares do Antigo Regime (Absolutismo Monárquico, Sociedade Estamental e Mercantilismo) através da primazia da Razão Crítica.\n- John Locke: Direitos naturais inalienáveis (vida, liberdade e propriedade).\n- Montesquieu: Tripartição dos poderes do Estado (Executivo, Legislativo e Judiciário) como mecanismo de freios e contrapesos.\n- Rousseau: Contrato social fundado na Soberania Popular e no conceito de Vontade Geral.\n- Voltaire: Defesa irrestrita da liberdade de expressão e tolerância religiosa.\n\n2. A REVOLUÇÃO FRANCESA (1789-1799)\nA profunda crise fiscal da monarquia de Luís XVI e as disparidades feudais que sobrecarregavam o Terceiro Estado deflagraram o processo revolucionário com a Tomada da Bastilha (14 de julho de 1789) e a proclamação da 'Declaração dos Direitos do Homem e do Cidadão'. O lema 'Liberdade, Igualdade e Fraternidade' redefiniu para sempre a arquitetura política ocidental.`,
        is_free_preview: true,
      },
    ],
  },
  {
    id: "curr-redacao-literatura-vestibulares",
    title: "Manual Definitivo de Redação Dissertativa-Argumentativa & Literatura Brasileira",
    subtitle: "Disciplina Curricular · Ensino Médio & Pré-Vestibular",
    author: "Profª. Vanessa Antunes & Prof. Marcelo Gusmão",
    discipline: "Língua Portuguesa & Redação",
    grade_level: "Ensino Médio & ENEM",
    description: "Guia completo para a nota 1000 na Redação do ENEM e grandes vestibulares: Competências do avaliador, repertório sociocultural produtivo, conectivos interparágrafos, proposta de intervenção completa e panorama das Escolas Literárias.",
    cover_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80",
    year: 2026,
    read_time: 160,
    downloads: 26800,
    rating: 4.99,
    rating_count: 1040,
    chapters: [
      {
        id: "chap-curr-red-1",
        position: 1,
        title: "Capítulo I — A Estrutura da Redação ENEM: As 5 Competências e o Projeto de Texto",
        content: `1. AS CINCO COMPETÊNCIAS DA BANCA EXAMINADORA\n- Competência 1: Domínio da modalidade escrita formal da Língua Portuguesa (desvios gramaticais, concordância, regência e pontuação).\n- Competência 2: Compreensão da proposta temática e aplicação de conceitos das várias áreas do conhecimento (repertório legitimado e produtivo).\n- Competência 3: Seleção, relação, organização e interpretação de informações, fatos e opiniões em defesa de um ponto de vista (projeto de texto estratégico).\n- Competência 4: Demonstração de conhecimento dos mecanismos linguísticos necessários para a construção da argumentação (coesão referencial e sequencial).\n- Competência 5: Elaboração de proposta de intervenção para o problema abordado que respeite os direitos humanos.\n\n2. ESTRUTURA DO TEXTO DISSERTATIVO-ARGUMENTATIVO EM 4 PARÁGRAFOS:\n- Parágrafo 1 (Introdução): Contextualização temática com repertório legítimo + Tese explícita contendo dois argumentos centrais (A1 e A2).\n- Parágrafo 2 (D1 - Desenvolvimento 1): Tópico frasal de A1 + Repertório de comprovação + Análise crítica dos impactos sociais.\n- Parágrafo 3 (D2 - Desenvolvimento 2): Conectivo interparágrafo de continuidade ou contraste + Tópico frasal de A2 + Relação causa-consequência.\n- Parágrafo 4 (Conclusão): Retomada da tese + Proposta de intervenção completa com os 5 elementos obrigatórios.`,
        is_free_preview: true,
      },
      {
        id: "chap-curr-red-2",
        position: 2,
        title: "Capítulo II — Os 5 Elementos da Proposta de Intervenção (Competência 5)",
        content: `Para garantir os 200 pontos integrais na Competência 5, o candidato deve formular uma proposta de intervenção detalhada que responda objetivamente às 5 perguntas obrigatórias:\n\n1. QUEM? (Agente Social): Ministério da Educação (MEC), Poder Legislativo, Meios de Comunicação, Secretarias Estaduais de Saúde, Organizações Não Governamentais.\n2. O QUE? (Ação): Criar programas itinerantes de conscientização, aprovar marcos regulatórios mais rigorosos, expandir a infraestrutura pública.\n3. COMO? (Modo / Meio): 'Por intermédio de...', 'mediante a destinação de verbas orçamentárias...', 'por meio de parcerias público-privadas...'\n4. PARA QUÊ? (Efeito / Finalidade): 'Com o fito de mitigar a evasão escolar...', 'a fim de assegurar o pleno exercício da cidadania...'\n5. DETALHAMENTO: Adição de uma oração explicativa ou exemplificação aprofundada de qualquer um dos quatro elementos anteriores (ex: 'especificando os setores com maior carência de recursos').\n\nEXEMPLO MODELO NOTA 1000:\n'Infere-se, portanto, a necessidade de intervenção do Ministério da Educação — órgão responsável pelas diretrizes pedagógicas nacionais — mediante a implementação de oficinas semanais de letramento midiático na grade curricular do Ensino Médio, com o objetivo de preparar os jovens contra a desinformação digital. Somente assim, o país avançará rumo a uma sociedade plenamente democrática e esclarecida.'`,
        is_free_preview: true,
      },
    ],
  },
];
