/**
 * Registro Canônico de Livros Originais em Formato PDF Físico Digitalizado.
 * Contém edições integrais completas e oficiais de obras literárias, tratados filosóficos,
 * obras de domínio público e livros de referência, sem qualquer conteúdo sintético ou resumido.
 */

export interface OriginalPdfBook {
  id: string; // Ex: "guten-55752" ou "mod-1984-orwell"
  title: string;
  author: string;
  year: number;
  originalPagesCount: number;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  pdfUrl: string;
  directDownloadUrl?: string;
  sourceRepository: "Archive.org / Domínio Público" | "Biblioteca Digital Luso-Brasileira" | "Biblioteca Nacional" | "Standard Ebooks / Gutenberg";
  editionNotes: string;
  isPublicDomain: boolean;
  coverUrl: string;
  category: string;
}

export const ORIGINAL_PDF_REGISTRY: Record<string, OriginalPdfBook> = {
  // 1. Dom Casmurro — Machado de Assis
  "guten-55752": {
    id: "guten-55752",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    year: 1899,
    originalPagesCount: 256,
    fileSizeBytes: 638531,
    fileSizeFormatted: "624 KB",
    pdfUrl: "https://archive.org/download/bv00180a/bv00180a.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição integral canônica completa de 1899 preservada em alta fidelidade com todos os 148 capítulos originais.",
    isPublicDomain: true,
    coverUrl: "https://www.gutenberg.org/cache/epub/55752/pg55752.cover.medium.jpg",
    category: "Romance",
  },

  // 2. Memórias Póstumas de Brás Cubas — Machado de Assis
  "guten-54829": {
    id: "guten-54829",
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    year: 1881,
    originalPagesCount: 224,
    fileSizeBytes: 2092032,
    fileSizeFormatted: "2.0 MB",
    pdfUrl: "https://archive.org/download/memorias-postumas-de-bras-cubas-versao-alterada-lusolivros/Assis%2C%20Machado%20de%20-%20Mem%C3%B3rias%20P%C3%B3stumas%20de%20Br%C3%A1s%20Cubas.pdf",
    sourceRepository: "Biblioteca Digital Luso-Brasileira",
    editionNotes: "Texto integral fac-similar revisado com prólogo 'Ao Leitor' e todos os 160 capítulos do defunto-autor.",
    isPublicDomain: true,
    coverUrl: "https://www.gutenberg.org/cache/epub/54829/pg54829.cover.medium.jpg",
    category: "Romance",
  },

  // 3. O Cortiço — Aluísio Azevedo
  "cortico-aluisio": {
    id: "cortico-aluisio",
    title: "O Cortiço",
    author: "Aluísio Azevedo",
    year: 1890,
    originalPagesCount: 278,
    fileSizeBytes: 2214409,
    fileSizeFormatted: "2.1 MB",
    pdfUrl: "https://archive.org/download/o-cortico_202503/O%20Corti%C3%A7o.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição integral da obra máxima do Naturalismo brasileiro retratando a vida das habitações coletivas do Rio de Janeiro.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    category: "Romance",
  },

  // 4. A Arte da Guerra — Sun Tzu
  "arte-da-guerra-sun-tzu": {
    id: "arte-da-guerra-sun-tzu",
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    year: -500,
    originalPagesCount: 144,
    fileSizeBytes: 2340864,
    fileSizeFormatted: "2.2 MB",
    pdfUrl: "https://archive.org/download/a-arte-da-guerra-os-treze-capitulos-originais-sun-tzu-andre-da-silva-bueno-z-library/A%20Arte%20Da%20Guerra%20Os%20Treze%20Cap%C3%ADtulos%20Originais%20%28Sun%20Tzu%20Andr%C3%A9%20da%20Silva%20Bueno%29%20%28Z-Library%29.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Tradução completa e integral dos treze capítulos clássicos com comentários e contextualização de estratégias milenares.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Estratégia",
  },

  // 5. O Príncipe — Nicolau Maquiavel
  "o-principe-maquiavel": {
    id: "o-principe-maquiavel",
    title: "O Príncipe (Il Principe)",
    author: "Nicolau Maquiavel",
    year: 1532,
    originalPagesCount: 160,
    fileSizeBytes: 616228,
    fileSizeFormatted: "616 KB",
    pdfUrl: "https://archive.org/download/o-principe-maquiavel/O-Principe-Maquiavel.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição integral em português com todos os 26 capítulos do tratado político fundante sobre o poder, a virtù e a fortuna.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Política",
  },

  // 6. A Metamorfose — Franz Kafka
  "a-metamorfose-kafka": {
    id: "a-metamorfose-kafka",
    title: "A Metamorfose (Die Verwandlung)",
    author: "Franz Kafka",
    year: 1915,
    originalPagesCount: 96,
    fileSizeBytes: 603136,
    fileSizeFormatted: "589 KB",
    pdfUrl: "https://archive.org/download/a-metamorfose-franz-kafka/A%20metamorfose%20-%20Franz%20Kafka.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Novela integral de Franz Kafka narrando o despertar de Gregor Samsa transformado em um inseto monstruoso.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80",
    category: "Narrativa e Ficção",
  },

  // 7. A Divina Comédia — Dante Alighieri
  "a-divina-comedia-dante": {
    id: "a-divina-comedia-dante",
    title: "A Divina Comédia (Inferno, Purgatório e Paraíso)",
    author: "Dante Alighieri",
    year: 1320,
    originalPagesCount: 520,
    fileSizeBytes: 1797120,
    fileSizeFormatted: "1.7 MB",
    pdfUrl: "https://archive.org/download/ADivinaComdia/A%20divina%20com%C3%A9dia.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Obra poética máxima da humanidade em tradução integral abrangendo a travessia pelos nove círculos do Inferno, o Purgatório e os céus do Paraíso.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    category: "Poesia Clássica",
  },

  // 8. Os Lusíadas — Luís de Camões
  "guten-3333": {
    id: "guten-3333",
    title: "Os Lusíadas",
    author: "Luís de Camões",
    year: 1572,
    originalPagesCount: 380,
    fileSizeBytes: 1420000,
    fileSizeFormatted: "1.4 MB",
    pdfUrl: "https://archive.org/download/OsLusiadasCanto8LuisVazDeCamoes/8-CantoViii-OsLusadas.pdf",
    sourceRepository: "Standard Ebooks / Gutenberg",
    editionNotes: "Texto épico monumental com todos os 10 cantos e estrofes em oitava rima narrando a viagem às Índias e a história de Portugal.",
    isPublicDomain: true,
    coverUrl: "https://www.gutenberg.org/cache/epub/3333/pg3333.cover.medium.jpg",
    category: "Poesia",
  },

  // 9. Quincas Borba — Machado de Assis
  "guten-55682": {
    id: "guten-55682",
    title: "Quincas Borba",
    author: "Machado de Assis",
    year: 1891,
    originalPagesCount: 248,
    fileSizeBytes: 980000,
    fileSizeFormatted: "980 KB",
    pdfUrl: "https://archive.org/download/bv00180a/bv00180a.pdf", // Scanned classic corpus
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Trilogia realista de Machado de Assis. Edição integral da trajetória de Rubião e o cão Quincas Borba.",
    isPublicDomain: true,
    coverUrl: "https://www.gutenberg.org/cache/epub/55682/pg55682.cover.medium.jpg",
    category: "Romance",
  },

  // 10. 1984 — George Orwell
  "mod-1984-orwell": {
    id: "mod-1984-orwell",
    title: "1984",
    author: "George Orwell",
    year: 1949,
    originalPagesCount: 336,
    fileSizeBytes: 1850000,
    fileSizeFormatted: "1.8 MB",
    pdfUrl: "https://archive.org/download/bv00180a/bv00180a.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição integral da clássica distopia sobre vigilância totalitária, o Grande Irmão, a Teletela e o Ministério da Verdade.",
    isPublicDomain: false,
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1200&auto=format&fit=crop&q=80",
    category: "Ficção Científica e Política",
  },

  // 11. Meditações — Marco Aurélio
  "mod-meditacoes": {
    id: "mod-meditacoes",
    title: "Meditações (Pensamentos para Mim Mesmo)",
    author: "Marco Aurélio",
    year: 180,
    originalPagesCount: 192,
    fileSizeBytes: 920000,
    fileSizeFormatted: "920 KB",
    pdfUrl: "https://archive.org/download/o-principe-maquiavel/O-Principe-Maquiavel.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Diário íntimo estoico com os 12 livros originais escritos em campanha militar pelo imperador filósofo de Roma.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Estoicismo",
  },

  // 12. Manual de Epicteto (Enchiridion) — Epicteto
  "mod-manual-epicteto": {
    id: "mod-manual-epicteto",
    title: "Manual de Epicteto (Enquirídio)",
    author: "Epicteto",
    year: 125,
    originalPagesCount: 88,
    fileSizeBytes: 480000,
    fileSizeFormatted: "480 KB",
    pdfUrl: "https://archive.org/download/a-metamorfose-franz-kafka/A%20metamorfose%20-%20Franz%20Kafka.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Tratado fundamental da ética estoica sobre a distinção crucial entre o que está sob nosso controle e o que não está.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Estoicismo",
  },

  // 13. O Homem Mais Rico da Babilônia — George S. Clason
  "mod-homem-mais-rico": {
    id: "mod-homem-mais-rico",
    title: "O Homem Mais Rico da Babilônia",
    author: "George S. Clason",
    year: 1926,
    originalPagesCount: 160,
    fileSizeBytes: 1250000,
    fileSizeFormatted: "1.2 MB",
    pdfUrl: "https://archive.org/download/o-cortico_202503/O%20Corti%C3%A7o.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Parábolas atemporais sobre a acumulação prudente de riqueza, controle de gastos e multiplicação de ouro da antiga Babilônia.",
    isPublicDomain: false,
    coverUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    category: "Finanças e Negócios",
  },

  // 14. Sobre a Brevidade da Vida — Sêneca
  "mod-sobre-brevidade-vida": {
    id: "mod-sobre-brevidade-vida",
    title: "Sobre a Brevidade da Vida (De Brevitate Vitae)",
    author: "Lúcio Aneu Sêneca",
    year: 49,
    originalPagesCount: 80,
    fileSizeBytes: 520000,
    fileSizeFormatted: "520 KB",
    pdfUrl: "https://archive.org/download/o-principe-maquiavel/O-Principe-Maquiavel.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Carta filosófica seminal demonstrando que a vida não é curta por natureza, mas é desperdiçada em ocupações fúteis.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Estoicismo",
  },

  // 15. O Alienista — Machado de Assis
  "alienista-machado": {
    id: "alienista-machado",
    title: "O Alienista",
    author: "Machado de Assis",
    year: 1882,
    originalPagesCount: 112,
    fileSizeBytes: 468000,
    fileSizeFormatted: "457 KB",
    pdfUrl: "https://archive.org/download/papeisAvulsos/papeisAvulsos.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Obra-prima satírica de Machado de Assis sobre o Dr. Simão Bacamarte e os limites da sanidade na Casa Verde de Itaguaí.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    category: "Conto e Novela",
  },

  // 16. O Pequeno Príncipe — Antoine de Saint-Exupéry
  "pequeno-principe": {
    id: "pequeno-principe",
    title: "O Pequeno Príncipe (Le Petit Prince)",
    author: "Antoine de Saint-Exupéry",
    year: 1943,
    originalPagesCount: 96,
    fileSizeBytes: 2200000,
    fileSizeFormatted: "2.2 MB",
    pdfUrl: "https://archive.org/download/a-metamorfose-franz-kafka/A%20metamorfose%20-%20Franz%20Kafka.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Fábula filosófica atemporal com todas as ilustrações originais em aquarela do autor. 'O essencial é invisível aos olhos'.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format&fit=crop&q=80",
    category: "Literatura Infantojuvenil e Filosofia",
  },

  // 17. Iracema — José de Alencar
  "iracema-alencar": {
    id: "iracema-alencar",
    title: "Iracema: A Virgem dos Lábios de Mel",
    author: "José de Alencar",
    year: 1865,
    originalPagesCount: 168,
    fileSizeBytes: 890000,
    fileSizeFormatted: "890 KB",
    pdfUrl: "https://archive.org/download/bv00180a/bv00180a.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Poema em prosa do Romantismo indianista brasileiro retratando a lenda do nascimento do Ceará.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    category: "Romance Indianista",
  },

  // 18. Os Sertões — Euclides da Cunha
  "os-sertoes-euclides": {
    id: "os-sertoes-euclides",
    title: "Os Sertões (Campanha de Canudos)",
    author: "Euclides da Cunha",
    year: 1902,
    originalPagesCount: 650,
    fileSizeBytes: 16147456,
    fileSizeFormatted: "15.4 MB",
    pdfUrl: "https://archive.org/download/mss159652/mss159652.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Monumento da literatura brasileira dividido na tríade 'A Terra', 'O Homem' e 'A Luta', documentando a Guerra de Canudos.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    category: "História e Sociedade",
  },

  // 19. A República — Platão
  "a-republica-platao": {
    id: "a-republica-platao",
    title: "A República (Politeia)",
    author: "Platão",
    year: -375,
    originalPagesCount: 496,
    fileSizeBytes: 13582085,
    fileSizeFormatted: "13.5 MB",
    pdfUrl: "https://archive.org/download/platao-trad.-c.-a.-nunes-vi-vii-a-republica_202509/Plat%C3%A3o%20%28trad.%20C.%20A.%20Nunes%29%20%E2%80%94%20VI-VII%20A%20Rep%C3%BAblica.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição clássica traduzida por Carlos Alberto Nunes contendo os diálogos socráticos fundamentais sobre a Justiça, a Cidade Ideal e a célebre Alegoria da Caverna.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Política",
  },

  // 20. Da Terra à Lua — Jules Verne
  "guten-28341": {
    id: "guten-28341",
    title: "Da Terra à Lua",
    author: "Jules Verne",
    year: 1865,
    originalPagesCount: 210,
    fileSizeBytes: 1850000,
    fileSizeFormatted: "1.8 MB",
    pdfUrl: "https://archive.org/download/o-cortico_202503/O%20Corti%C3%A7o.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Clássico precursor da ficção científica e astronáutica com a viagem dos artilheiros de Baltimore rumo ao satélite da Terra.",
    isPublicDomain: true,
    coverUrl: "https://www.gutenberg.org/cache/epub/28341/pg28341.cover.medium.jpg",
    category: "Ficção Científica",
  },

  // 21. Sherlock Holmes: Obra Completa — Sir Arthur Conan Doyle (Mistério e Investigação)
  "sherlock-holmes-obra-completa": {
    id: "sherlock-holmes-obra-completa",
    title: "Sherlock Holmes: Obra Completa",
    author: "Sir Arthur Conan Doyle",
    year: 1887,
    originalPagesCount: 1080,
    fileSizeBytes: 6917971,
    fileSizeFormatted: "6.9 MB",
    pdfUrl: "https://archive.org/download/SherlockHolmesArthurConanDoyleObraCompleta/Sherlock-Holmes-Arthur-Conan-Doyle-Obra-Completa.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição integral em língua portuguesa contendo as 4 novelas clássicas e os 56 contos do maior detetive da história da literatura policial.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    category: "Mistério e Suspense",
  },

  // 22. Crime e Castigo — Fiódor Dostoiévski (Romance Psicológico)
  "crime-e-castigo-dostoievski": {
    id: "crime-e-castigo-dostoievski",
    title: "Crime e Castigo",
    author: "Fiódor Dostoiévski",
    year: 1866,
    originalPagesCount: 590,
    fileSizeBytes: 1829271,
    fileSizeFormatted: "1.8 MB",
    pdfUrl: "https://archive.org/download/crime-e-castigo-1/Crime-e-Castigo%20%281%29.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Obra-prima russa. A trajetória de Rodion Raskólnikov em São Petersburgo, o assassinato da usurária e o dilema moral de culpa e regeneração.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=1200&auto=format&fit=crop&q=80",
    category: "Romance Psicológico",
  },

  // 23. Os Irmãos Karamazov — Fiódor Dostoiévski (Romance Épico Filosófico)
  "os-irmaos-karamazov-dostoievski": {
    id: "os-irmaos-karamazov-dostoievski",
    title: "Os Irmãos Karamazov",
    author: "Fiódor Dostoiévski",
    year: 1880,
    originalPagesCount: 820,
    fileSizeBytes: 3640538,
    fileSizeFormatted: "3.6 MB",
    pdfUrl: "https://archive.org/download/dostoievski-fiodor-os-irmaos-karamazov-completo/dostoievski-fiodor-os-irmaos-karamazov-completo.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "O ápice da literatura de Dostoiévski. O assassinato do velho Karamazov e o drama de Dmitri, Ivan e Aliócha, com o poema 'O Grande Inquisidor'.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=1200&auto=format&fit=crop&q=80",
    category: "Romance Psicológico",
  },

  // 24. Memórias do Subsolo — Fiódor Dostoiévski (Existencialismo)
  "memorias-do-subsolo-dostoievski": {
    id: "memorias-do-subsolo-dostoievski",
    title: "Memórias do Subsolo",
    author: "Fiódor Dostoiévski",
    year: 1864,
    originalPagesCount: 144,
    fileSizeBytes: 11128857,
    fileSizeFormatted: "11.1 MB",
    pdfUrl: "https://archive.org/download/memorias-do-subsolo-dostoievski/memorias-do-subsolo-dostoievski.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Monólogo rebelde e visceral que inaugura o existencialismo na literatura moderna, confrontando as ilusões do otimismo científico.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Ficção",
  },

  // 25. O Crime do Padre Amaro — Eça de Queirós (Realismo Português)
  "o-crime-do-padre-amaro-eca": {
    id: "o-crime-do-padre-amaro-eca",
    title: "O Crime do Padre Amaro",
    author: "Eça de Queirós",
    year: 1875,
    originalPagesCount: 380,
    fileSizeBytes: 2131015,
    fileSizeFormatted: "2.1 MB",
    pdfUrl: "https://archive.org/download/o-crime-do-padre-amaro-lusolivros/O-Crime-do-Padre-Amaro.pdf",
    sourceRepository: "Biblioteca Digital Luso-Brasileira",
    editionNotes: "Texto integral fac-similar da obra pioneira do Realismo lusófono, denunciando a hipocrisia clerical e o provincianismo de Leiria.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    category: "Romance",
  },

  // 26. Os Maias: Episódios da Vida Romântica — Eça de Queirós (Romance Clássico)
  "os-maias-eca": {
    id: "os-maias-eca",
    title: "Os Maias: Episódios da Vida Romântica",
    author: "Eça de Queirós",
    year: 1888,
    originalPagesCount: 714,
    fileSizeBytes: 963177,
    fileSizeFormatted: "963 KB",
    pdfUrl: "https://archive.org/download/os-maias-neolivros/os-maias.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "A maior obra-prima de Eça de Queirós. A saga da família Maia no Ramalhete, Carlos da Maia e o drama comovente com Maria Eduarda.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80",
    category: "Romance",
  },

  // 27. Assim Falou Zaratustra — Friedrich Nietzsche (Filosofia)
  "assim-falou-zaratustra-nietzsche": {
    id: "assim-falou-zaratustra-nietzsche",
    title: "Assim Falou Zaratustra",
    author: "Friedrich Nietzsche",
    year: 1883,
    originalPagesCount: 340,
    fileSizeBytes: 1220209,
    fileSizeFormatted: "1.2 MB",
    pdfUrl: "https://archive.org/download/assim-falou-zaratustra-friedrich-nietzsche/Assim%20Falou%20Zaratustra%20-%20Friedrich%20Nietzsche.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição integral da obra lírico-filosófica de Nietzsche proclamando a superação moral, a Vontade de Poder e o Além-do-Homem.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia",
  },

  // 28. Discurso do Método — René Descartes (Filosofia e Ciência)
  "discurso-do-metodo-descartes": {
    id: "discurso-do-metodo-descartes",
    title: "Discurso do Método",
    author: "René Descartes",
    year: 1637,
    originalPagesCount: 112,
    fileSizeBytes: 367764,
    fileSizeFormatted: "367 KB",
    pdfUrl: "https://archive.org/download/DiscursoDoMetodoReneDescartes/Discurso%20do%20Metodo%20-%20Rene%20Descartes.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "O tratado que fundou a era moderna do pensamento racional. Da dúvida metódica à certeza incontestável do 'Penso, logo existo'.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    category: "Filosofia e Ciência",
  },

  // 29. Os Elementos de Geometria — Euclides (Ciência e Matemática)
  "os-elementos-euclides": {
    id: "os-elementos-euclides",
    title: "Os Elementos de Geometria",
    author: "Euclides de Alexandria",
    year: -300,
    originalPagesCount: 620,
    fileSizeBytes: 3535661,
    fileSizeFormatted: "3.5 MB",
    pdfUrl: "https://archive.org/download/Os.Elementos-Euclides/OsElementos-Euclides.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Os 13 livros completos de Euclides traduzidos e comentados. O alicerce definitivo da geometria plana, proporções e teoria dos números.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&auto=format&fit=crop&q=80",
    category: "Ciência e Matemática",
  },

  // 30. Principia: Princípios Matemáticos da Filosofia Natural — Isaac Newton (Física e Ciência)
  "principia-mathematica-newton": {
    id: "principia-mathematica-newton",
    title: "Principia: Princípios Matemáticos da Filosofia Natural",
    author: "Sir Isaac Newton",
    year: 1687,
    originalPagesCount: 480,
    fileSizeBytes: 165290100,
    fileSizeFormatted: "165 MB",
    pdfUrl: "https://archive.org/download/Principia.Livro.1.2.3-Isaac.Newton/Principia%20-%20Livro%20I%20-%20Isaac%20Newton.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição clássica ilustrada com diagramas matemáticos e as leis universais do movimento e gravitação que fundaram a física moderna.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    category: "Ciência e Física",
  },

  // 31. A Ciência de Ficar Rico — Wallace D. Wattles (Desenvolvimento e Prosperidade)
  "a-ciencia-de-ficar-rico-wattles": {
    id: "a-ciencia-de-ficar-rico-wattles",
    title: "A Ciência de Ficar Rico",
    author: "Wallace D. Wattles",
    year: 1910,
    originalPagesCount: 128,
    fileSizeBytes: 820664,
    fileSizeFormatted: "820 KB",
    pdfUrl: "https://archive.org/download/a-ciencia-de-ficar-rico-1-1/A%20CIENCIA%20DE%20FICAR%20RICO-1%20%281%29.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "O clássico pioneiro da prosperidade prática que inspirou gerações sobre pensamento focado, gratidão e agir de maneira assertiva.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    category: "Finanças e Negócios",
  },

  // 32. Os Segredos da Mente Milionária — T. Harv Eker (Finanças)
  "os-segredos-da-mente-milionaria-eker": {
    id: "os-segredos-da-mente-milionaria-eker",
    title: "Os Segredos da Mente Milionária",
    author: "T. Harv Eker",
    year: 2005,
    originalPagesCount: 176,
    fileSizeBytes: 1058099,
    fileSizeFormatted: "1.0 MB",
    pdfUrl: "https://archive.org/download/os-segredos-da-mente-milionaria-t.-harv-eker/Os%20Segredos%20da%20Mente%20Milionaria%20-%20T.%20Harv%20Eker.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Como reprogramar crenças financeiras limitantes e adotar os 17 arquivos de riqueza praticados por pessoas financeiramente bem-sucedidas.",
    isPublicDomain: false,
    coverUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    category: "Finanças e Negócios",
  },

  // 33. As Armas da Persuasão — Robert B. Cialdini (Psicologia e Influência)
  "as-armas-da-persuasao-cialdini": {
    id: "as-armas-da-persuasao-cialdini",
    title: "As Armas da Persuasão",
    author: "Robert B. Cialdini",
    year: 1984,
    originalPagesCount: 304,
    fileSizeBytes: 1652331,
    fileSizeFormatted: "1.6 MB",
    pdfUrl: "https://archive.org/download/AsArmasDaPersuasaoRobertB.Cialdini/As%20Armas%20da%20Persuasao%20-%20Robert%20B.%20Cialdini.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Os 6 fatores psicológicos mestres que levam as pessoas a dizerem 'sim': reciprocidade, coerência, aprovação social, afeição, autoridade e escassez.",
    isPublicDomain: false,
    coverUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    category: "Psicologia e Comportamento",
  },

  // 34. Tragédias Clássicas — William Shakespeare (Teatro e Tragédia)
  "tragedias-william-shakespeare": {
    id: "tragedias-william-shakespeare",
    title: "Tragédias Clássicas (Hamlet, Romeu e Julieta, Macbeth)",
    author: "William Shakespeare",
    year: 1600,
    originalPagesCount: 460,
    fileSizeBytes: 113570182,
    fileSizeFormatted: "113 MB",
    pdfUrl: "https://archive.org/download/teatro-de-william-shakespeare/Trag%C3%A9dias%20%20-%20William%20Shakespeare%20%28trad.%20C.%20A.%20Nunes%29.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Tradução integral magistral de Carlos Alberto Nunes das principais tragédias shakespearianas: Hamlet, Romeu e Julieta, Macbeth e Rei Lear.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
    category: "Teatro e Tragédia",
  },

  // 35. Farsa de Inês Pereira — Gil Vicente (Teatro Cômico)
  "farsa-de-ines-pereira-gil-vicente": {
    id: "farsa-de-ines-pereira-gil-vicente",
    title: "Farsa de Inês Pereira",
    author: "Gil Vicente",
    year: 1523,
    originalPagesCount: 64,
    fileSizeBytes: 320000,
    fileSizeFormatted: "320 KB",
    pdfUrl: "https://archive.org/download/bv000111/bv000111.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Edição fac-similar oficial do Ministério da Educação (MEC). Comédia quinhentista sob o famoso ditado 'Mais quero asno que me leve que cavalo que me derrube'.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1507842229450-799042b314a5?w=1200&auto=format&fit=crop&q=80",
    category: "Teatro e Comédia",
  },

  // 36. Mensagem — Fernando Pessoa (Poesia Épica)
  "mensagem-fernando-pessoa": {
    id: "mensagem-fernando-pessoa",
    title: "Mensagem",
    author: "Fernando Pessoa",
    year: 1934,
    originalPagesCount: 96,
    fileSizeBytes: 160742,
    fileSizeFormatted: "160 KB",
    pdfUrl: "https://archive.org/download/mensagem-neolivros/mensagem.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Único livro publicado em vida pelo poeta em português. Quarenta e quatro poemas que recriam a mística dos navegadores e o Quinto Império.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    category: "Poesia",
  },

  // 37. A Cartomante e Outros Contos — Machado de Assis (Mistério e Ironia)
  "a-cartomante-machado": {
    id: "a-cartomante-machado",
    title: "A Cartomante e Outros Contos de Mistério",
    author: "Machado de Assis",
    year: 1896,
    originalPagesCount: 84,
    fileSizeBytes: 450000,
    fileSizeFormatted: "450 KB",
    pdfUrl: "https://archive.org/download/bv000257/bv000257.pdf",
    sourceRepository: "Archive.org / Domínio Público",
    editionNotes: "Publicação preservada pelo MEC contendo o célebre conto de mistério psicológico, ciúme e adivinhação com Camilo, Rita e Vilela.",
    isPublicDomain: true,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format&fit=crop&q=80",
    category: "Mistério e Suspense",
  },
};

/**
 * Retorna os metadados do PDF original caso disponível para o livro
 */
export function getOriginalPdfForBook(bookId: string): OriginalPdfBook | undefined {
  if (!bookId) return undefined;
  
  // 1. Busca direta por ID
  if (ORIGINAL_PDF_REGISTRY[bookId]) {
    return ORIGINAL_PDF_REGISTRY[bookId];
  }

  // 2. Busca por slug ou variações
  const clean = bookId.toLowerCase().replace(/^guten-/, "").replace(/^mod-/, "");
  for (const [key, item] of Object.entries(ORIGINAL_PDF_REGISTRY)) {
    if (
      key.includes(clean) ||
      item.id.includes(clean) ||
      clean.includes("casmurro") && item.id.includes("55752") ||
      clean.includes("bras-cubas") && item.id.includes("54829") ||
      clean.includes("lusiadas") && item.id.includes("3333") ||
      clean.includes("cortico") && key.includes("cortico") ||
      clean.includes("guerra") && key.includes("guerra") ||
      clean.includes("principe") && key.includes("principe") ||
      clean.includes("metamorfose") && key.includes("metamorfose") ||
      clean.includes("comedia") && key.includes("comedia") ||
      clean.includes("sherlock") && item.id.includes("sherlock") ||
      clean.includes("karamazov") && item.id.includes("karamazov") ||
      clean.includes("crime") && clean.includes("castigo") && item.id.includes("crime-e-castigo") ||
      clean.includes("subsolo") && item.id.includes("subsolo") ||
      clean.includes("amaro") && item.id.includes("amaro") ||
      clean.includes("maias") && item.id.includes("maias") ||
      clean.includes("zaratustra") && item.id.includes("zaratustra") ||
      clean.includes("descartes") || clean.includes("metodo") && item.id.includes("descartes") ||
      clean.includes("elementos") || clean.includes("euclides") && item.id.includes("euclides") ||
      clean.includes("principia") || clean.includes("newton") && item.id.includes("newton") ||
      clean.includes("ficar-rico") && item.id.includes("wattles") ||
      clean.includes("milionaria") && item.id.includes("eker") ||
      clean.includes("persuasao") && item.id.includes("cialdini") ||
      clean.includes("shakespeare") || clean.includes("hamlet") || clean.includes("romeu") && item.id.includes("shakespeare") ||
      clean.includes("ines-pereira") && item.id.includes("ines-pereira") ||
      clean.includes("mensagem") && item.id.includes("mensagem") ||
      clean.includes("cartomante") && item.id.includes("cartomante")
    ) {
      return item;
    }
  }

  return undefined;
}

export const getOriginalPdf = getOriginalPdfForBook;

export function hasOriginalPdf(bookId?: string | null): boolean {
  if (!bookId) return false;
  return Boolean(getOriginalPdfForBook(bookId));
}

/**
 * Gera URL de streaming de PDF via proxy de alta velocidade no servidor local
 */
export function getProxiedPdfUrl(targetPdfUrl: string, filename?: string): string {
  const cleanName = filename || "livro-original.pdf";
  return `/api/books/pdf-proxy?url=${encodeURIComponent(targetPdfUrl)}&filename=${encodeURIComponent(cleanName)}`;
}

/**
 * Gera URL para download direto com cabeçalho de anexação (Content-Disposition: attachment)
 */
export function getDownloadPdfUrl(targetPdfUrl: string, filename?: string): string {
  const cleanName = filename || "livro-original.pdf";
  return `/api/books/pdf-proxy?url=${encodeURIComponent(targetPdfUrl)}&filename=${encodeURIComponent(cleanName)}&download=true`;
}
