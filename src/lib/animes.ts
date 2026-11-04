export interface AnimeEpisode {
  id: string;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
  synopsis: string;
  isFree: boolean;
  videoUrl?: string;
}

export interface MangaChapter {
  id: string;
  number: number;
  title: string;
  pagesCount: number;
  pages: string[];
  description: string;
  releaseDate: string;
  isFree: boolean;
}

export interface MangaInfo {
  title: string;
  chaptersCount: number;
  author: string;
  artist: string;
  cover: string;
  status: "Em publicação" | "Completo";
  chapters: MangaChapter[];
}

export interface Anime {
  id: string;
  title: string;
  japaneseTitle: string;
  slug: string;
  synopsis: string;
  cover: string;
  banner: string;
  rating: number;
  ratingCount: number;
  episodesCount: number;
  genres: string[];
  status: "Em lançamento" | "Completo";
  season: string;
  studio: string;
  year: number;
  audio: string;
  trailerYoutubeId: string;
  broadcastDay?: "Segunda" | "Terça" | "Quarta" | "Quinta" | "Sexta" | "Sábado" | "Domingo";
  featured?: boolean;
  trending?: boolean;
  rank?: number;
  episodes: AnimeEpisode[];
  manga: MangaInfo;
}

export const ANIME_GENRES = [
  "Tudo",
  "Ação",
  "Fantasia",
  "Shonen",
  "Ficção Científica",
  "Drama",
  "Sobrenatural",
  "Comédia",
  "Romance",
  "Mistério",
];

const STANDARD_MANGA_PAGES = [
  "/covers/manga-kaze-p1.jpg",
  "/covers/manga-kaze-p2.jpg",
  "/covers/manga-kaze-p3.jpg",
  "/covers/manga-kaze-p4.jpg",
];

export const ANIMES_DATA: Anime[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling: ReAwakening",
    japaneseTitle: "俺だけレベルアップな件",
    slug: "solo-leveling",
    synopsis: "Em um mundo onde caçadores humanos despertam habilidades mágicas para combater monstros mortais, Sung Jinwoo é conhecido como o caçador mais fraco de toda a humanidade. À beira da morte em uma masmorra dupla implacável, ele aceita uma misteriosa missão que o transforma no único capaz de subir de nível sem limites.",
    cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    rating: 9.3,
    ratingCount: 48200,
    episodesCount: 24,
    genres: ["Ação", "Fantasia", "Sobrenatural", "Shonen"],
    status: "Em lançamento",
    season: "Temporada de Outono",
    studio: "A-1 Pictures",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "916nW3F1Yv8",
    broadcastDay: "Sábado",
    featured: true,
    trending: true,
    rank: 1,
    episodes: [
      {
        id: "sl-ep-1",
        number: 1,
        title: "Eu Já Estou Acostumado",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
        synopsis: "Jinwoo lidera uma incursão de classificação baixa que rapidamente se transforma em um pesadelo dentro de um templo com estátuas gigantes.",
        isFree: true,
      },
      {
        id: "sl-ep-2",
        number: 2,
        title: "Se Eu Tivesse Mais Uma Chance",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
        synopsis: "Jinwoo acorda no hospital e percebe uma tela flutuante diante de seus olhos que apenas ele consegue ver: o Sistema.",
        isFree: true,
      },
      {
        id: "sl-ep-3",
        number: 3,
        title: "É Como Um Jogo",
        duration: "23m",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        synopsis: "Treinando dia e noite para cumprir as missões diárias, Jinwoo aceita o desafio de entrar na masmorra da estação de metrô.",
        isFree: false,
      },
      {
        id: "sl-ep-4",
        number: 4,
        title: "Eu Preciso Ficar Mais Forte",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
        synopsis: "Confrontando a fera lendária Kasaka dos dentes azuis, Jinwoo descobre seu verdadeiro potencial de sobrevivência.",
        isFree: false,
      },
    ],
    manga: {
      title: "Solo Leveling (Manhwa Oficial)",
      chaptersCount: 179,
      author: "Chugong",
      artist: "DUBU (REDICE Studio)",
      cover: "/covers/manga-sigilo.jpg",
      status: "Completo",
      chapters: [
        {
          id: "sl-cap-1",
          number: 1,
          title: "Capítulo 1: O Caçador Rank E",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Sung Jinwoo adentra uma misteriosa dungeon rank D com seu grupo, sem saber que uma câmara dupla oculta mudará seu destino para sempre.",
          releaseDate: "2024",
          isFree: true,
        },
        {
          id: "sl-cap-2",
          number: 2,
          title: "Capítulo 2: O Templo de Cartenon",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Os mandamentos gravados no templo ganham vida quando as estátuas gigantes iniciam um massacre impiedoso.",
          releaseDate: "2024",
          isFree: true,
        },
        {
          id: "sl-cap-3",
          number: 3,
          title: "Capítulo 3: O Despertar do Jogador",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Jinwoo abre os olhos e se depara com a interface do Sistema concedendo a ele missões diárias de fortalecimento.",
          releaseDate: "2024",
          isFree: true,
        },
        {
          id: "sl-cap-4",
          number: 4,
          title: "Capítulo 4: Subindo de Nível",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Jinwoo enfrenta monstros na estação abandonada e percebe que seus pontos de atributo aumentam em tempo real.",
          releaseDate: "2024",
          isFree: false,
        },
      ],
    },
  },
  {
    id: "frieren-beyond-journeys-end",
    title: "Frieren e a Jornada Para o Além",
    japaneseTitle: "葬送のフリーレン",
    slug: "frieren",
    synopsis: "A maga elfa Frieren e seus corajosos companheiros derrotaram o Rei Demônio e trouxeram paz à terra. Como elfa, Frieren assiste seus companheiros envelhecerem e falecerem. Ao lamentar não ter conhecido melhor seus amigos humanos, ela embarca em uma nova jornada de auto-descoberta e compreensão dos laços mortais.",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    rating: 9.5,
    ratingCount: 62400,
    episodesCount: 28,
    genres: ["Fantasia", "Drama", "Aventura"],
    status: "Completo",
    season: "Inverno Clássico",
    studio: "Madhouse",
    year: 2025,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "qgQunxD0qMo",
    broadcastDay: "Sexta",
    featured: false,
    trending: true,
    rank: 2,
    episodes: [
      {
        id: "fri-ep-1",
        number: 1,
        title: "O Fim da Jornada",
        duration: "25m",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        synopsis: "Após uma década derrotando o mal, o grupo comemora a Era da Paz e assiste à chuva de meteoros da Era da Luz.",
        isFree: true,
      },
      {
        id: "fri-ep-2",
        number: 2,
        title: "Não Era Para Ser Mágico",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
        synopsis: "Frieren acolhe Fern como sua aprendiz após o pedido emocionante do sacerdote Heiter.",
        isFree: true,
      },
    ],
    manga: {
      title: "Sousou no Frieren (Mangá Oficial)",
      chaptersCount: 135,
      author: "Kanehito Yamada",
      artist: "Tsukasa Abe",
      cover: "/covers/manga-estrela.jpg",
      status: "Em publicação",
      chapters: [
        {
          id: "fri-cap-1",
          number: 1,
          title: "Capítulo 1: O Fim da Aventura",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "O Rei Demônio foi derrotado. O grupo de heróis retorna à capital real celebrando uma vitória memorável.",
          releaseDate: "2023",
          isFree: true,
        },
        {
          id: "fri-cap-2",
          number: 2,
          title: "Capítulo 2: A Mentira do Sacerdote",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Frieren reencontra Heiter anos mais tarde e aceita ensinar magia à jovem órfã Fern.",
          releaseDate: "2023",
          isFree: true,
        },
        {
          id: "fri-cap-3",
          number: 3,
          title: "Capítulo 3: A Flor da Lua Azul",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Fern e Frieren buscam uma flor extinta que Himmel admirava em suas viagens pelo norte.",
          releaseDate: "2023",
          isFree: true,
        },
      ],
    },
  },
  {
    id: "jujutsu-kaisen-culling-game",
    title: "Jujutsu Kaisen: Jogo do Abate",
    japaneseTitle: "呪術廻戦 死滅回游",
    slug: "jujutsu-kaisen",
    synopsis: "Após o Incidente de Shibuya, o Japão mergulhou no caos sob a influência de Kenjaku e suas barreiras mortais. Yuji Itadori, Megumi Fushiguro e Yuta Okkotsu devem entrar nas colônias perigosas do Jogo do Abate para tentar salvar Tsumiki e libertar Satoru Gojo do Reino da Prisão.",
    cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1600&auto=format&fit=crop&q=80",
    rating: 9.1,
    ratingCount: 71000,
    episodesCount: 24,
    genres: ["Ação", "Sobrenatural", "Shonen", "Fantasia"],
    status: "Em lançamento",
    season: "Primavera 2026",
    studio: "MAPPA",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "pkKu9hLT-t8",
    broadcastDay: "Quinta",
    featured: false,
    trending: true,
    rank: 3,
    episodes: [
      {
        id: "jjk-ep-1",
        number: 1,
        title: "Execução Iminente",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
        synopsis: "Yuta Okkotsu retorna ao Japão com uma missão atribuída pelos altos escalões do mundo jujutsu.",
        isFree: true,
      },
      {
        id: "jjk-ep-2",
        number: 2,
        title: "As Regras do Abate",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
        synopsis: "Megumi e Yuji elaboram uma estratégia para recrutar Hakari Kinji antes de adentrar a barreira de Tóquio Nº 1.",
        isFree: true,
      },
    ],
    manga: {
      title: "Jujutsu Kaisen (Mangá Shonen Jump)",
      chaptersCount: 271,
      author: "Gege Akutami",
      artist: "Gege Akutami",
      cover: "/covers/manga-kaze.jpg",
      status: "Completo",
      chapters: [
        {
          id: "jjk-cap-1",
          number: 1,
          title: "Capítulo 1: Ryomen Sukuna",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Yuji Itadori engole o dedo amaldiçoado de Ryomen Sukuna para salvar seus amigos do colégio Sugisawa.",
          releaseDate: "2024",
          isFree: true,
        },
        {
          id: "jjk-cap-2",
          number: 2,
          title: "Capítulo 2: Condenação Secreta",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Gojo Satoru propõe aos superiores uma suspensão da pena de morte de Itadori até que ele consuma todos os 20 dedos.",
          releaseDate: "2024",
          isFree: true,
        },
      ],
    },
  },
  {
    id: "demon-slayer-infinity-castle",
    title: "Demon Slayer: Castelo Infinito",
    japaneseTitle: "鬼滅の刃 無限城編",
    slug: "demon-slayer",
    synopsis: "A batalha final decisiva entre o Esquadrão de Exterminadores de Demônios e Muzan Kibutsuji começa quando todo o quartel-general é sugado para a colossal fortaleza dimensional do Castelo Infinito governada por Nakime.",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80",
    rating: 9.4,
    ratingCount: 89000,
    episodesCount: 18,
    genres: ["Ação", "Fantasia", "Shonen", "Sobrenatural"],
    status: "Em lançamento",
    season: "Verão 2026",
    studio: "Ufotable",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "t6MXHxeB3pA",
    broadcastDay: "Domingo",
    featured: false,
    trending: true,
    rank: 4,
    episodes: [
      {
        id: "kmy-ep-1",
        number: 1,
        title: "Queda no Abismo",
        duration: "45m",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        synopsis: "Os Pilares e Tanjiro se veem separados nas infinitas salas móveis contra as Luas Superiores restantes.",
        isFree: true,
      },
    ],
    manga: {
      title: "Demon Slayer: Kimetsu no Yaiba",
      chaptersCount: 205,
      author: "Koyoharu Gotouge",
      artist: "Koyoharu Gotouge",
      cover: "/covers/manga-ramen.jpg",
      status: "Completo",
      chapters: [
        {
          id: "kmy-cap-1",
          number: 1,
          title: "Capítulo 1: Crueldade",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Tanjiro Kamado descobre que sua família foi dizimada e sua irmã Nezuko transformada em oni.",
          releaseDate: "2024",
          isFree: true,
        },
        {
          id: "kmy-cap-2",
          number: 2,
          title: "Capítulo 2: O Estranho da Montanha",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Giyu Tomioka envia Tanjiro ao monte Sagiri para treinar com o ex-Pilar da Água, Sakonji Urokodaki.",
          releaseDate: "2024",
          isFree: true,
        },
      ],
    },
  },
  {
    id: "tower-of-god",
    title: "Tower of God: O Retorno de Viole",
    japaneseTitle: "神之塔 -Tower of God-",
    slug: "tower-of-god",
    synopsis: "Alcance o topo e tudo será seu. Quem conseguir subir a Torre ganhará riqueza, fama e o poder de remodelar o próprio universo. Seis anos após o teste fatal, um novo candidato surge misteriosamente sob a bandeira da FUG: Jyu Viole Grace.",
    cover: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    rating: 8.8,
    ratingCount: 34100,
    episodesCount: 26,
    genres: ["Ação", "Fantasia", "Mistério"],
    status: "Em lançamento",
    season: "Temporada Atual",
    studio: "Telecom Animation Film",
    year: 2025,
    audio: "Legendado PT-BR",
    trailerYoutubeId: "apIIF_jLwV8",
    broadcastDay: "Domingo",
    featured: false,
    trending: false,
    rank: 5,
    episodes: [
      {
        id: "tog-ep-1",
        number: 1,
        title: "O 20º Andar",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
        synopsis: "Ja Wangnan tenta desesperadamente passar no exame de subida no 20º andar quando um monstro em forma de candidato aparece.",
        isFree: true,
      },
    ],
    manga: {
      title: "Tower of God (Webtoon Original)",
      chaptersCount: 620,
      author: "SIU",
      artist: "SIU",
      cover: "/covers/manga-sigilo.jpg",
      status: "Em publicação",
      chapters: [
        {
          id: "tog-cap-1",
          number: 1,
          title: "Capítulo 1: O Andar de Headon",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Bam abre sozinho as portas da Torre para seguir Rachel e é submetido ao teste da enguia de aço.",
          releaseDate: "2024",
          isFree: true,
        },
      ],
    },
  },
  {
    id: "kaiju-no-8",
    title: "Kaiju No. 8",
    japaneseTitle: "怪獣8号",
    slug: "kaiju-no-8",
    synopsis: "No Japão, os ataques de kaiju monstruosos são eventos rotineiros. Kafka Hibino trabalha limpando os restos dessas criaturas gigantes, após ter desistido de seu sonho de entrar para as Forças de Defesa. No entanto, após um parasita misterioso invadir seu corpo, Kafka ganha a habilidade de se transformar no lendário Kaiju Nº 8.",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    rating: 8.9,
    ratingCount: 42000,
    episodesCount: 12,
    genres: ["Ação", "Ficção Científica", "Comédia"],
    status: "Completo",
    season: "Temporada Passada",
    studio: "Production I.G",
    year: 2025,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "h4K4qE5_v30",
    broadcastDay: "Sábado",
    featured: false,
    trending: false,
    rank: 6,
    episodes: [
      {
        id: "kj8-ep-1",
        number: 1,
        title: "O Homem Que Se Tornou um Kaiju",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        synopsis: "Kafka Hibino e seu jovem parceiro Reno enfrentam uma reviravolta chocante no hospital após um ataque de kaiju menor.",
        isFree: true,
      },
    ],
    manga: {
      title: "Kaiju No. 8 (Mangá Jump+)",
      chaptersCount: 110,
      author: "Naoya Matsumoto",
      artist: "Naoya Matsumoto",
      cover: "/covers/manga-kaze.jpg",
      status: "Em publicação",
      chapters: [
        {
          id: "kj8-cap-1",
          number: 1,
          title: "Capítulo 1: O Faxineiro e o Monstro",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Kafka Hibino lida com as vísceras de monstros urbanos até que um kaiju parasita entra por sua boca.",
          releaseDate: "2024",
          isFree: true,
        },
      ],
    },
  },
  {
    id: "spy-x-family",
    title: "SPY x FAMILY",
    japaneseTitle: "スパイファミリー",
    slug: "spy-x-family",
    synopsis: "O mestre espião codinome 'Twilight' precisa criar uma família falsa para se infiltrar em uma escola de elite e manter a paz entre duas nações rivais. O que ele não imagina é que sua noiva escolhida é uma assassina de aluguel profissional e sua filha adotiva é uma telepata capaz de ler mentes.",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    rating: 8.7,
    ratingCount: 56300,
    episodesCount: 37,
    genres: ["Comédia", "Ação", "Drama"],
    status: "Completo",
    season: "Coleção Família",
    studio: "Wit Studio & CloverWorks",
    year: 2024,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "ofXigq9aIpo",
    broadcastDay: "Sábado",
    featured: false,
    trending: false,
    rank: 7,
    episodes: [
      {
        id: "sxf-ep-1",
        number: 1,
        title: "Operação Strix",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        synopsis: "Twilight adota uma doce garotinha chamada Anya para ajudá-lo a ingressar na prestigiada Academia Eden.",
        isFree: true,
      },
    ],
    manga: {
      title: "SPY x FAMILY (Mangá Oficial)",
      chaptersCount: 105,
      author: "Tatsuya Endo",
      artist: "Tatsuya Endo",
      cover: "/covers/manga-estrela.jpg",
      status: "Em publicação",
      chapters: [
        {
          id: "sxf-cap-1",
          number: 1,
          title: "Missão 1: Operação Família",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Twilight precisa encontrar uma criança inteligente para aprovação na Academia Eden em menos de sete dias.",
          releaseDate: "2024",
          isFree: true,
        },
      ],
    },
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man: Arco da Reze",
    japaneseTitle: "チェンソーマン レゼ篇",
    slug: "chainsaw-man",
    synopsis: "Denji é um jovem que vive na miséria pagando dívidas com seu demônio Pochita. Após um pacto de sangue, renasce com o poder de transformar seus membros em motosserras assassinas para a Segurança Pública. Quando conhece uma doce garota chamada Reze em uma cafeteria num dia chuvoso, seu coração volta a bater com novas chamas.",
    cover: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80",
    rating: 9.0,
    ratingCount: 68000,
    episodesCount: 12,
    genres: ["Ação", "Sobrenatural", "Terror", "Drama"],
    status: "Em lançamento",
    season: "Temporada Especial",
    studio: "MAPPA",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "v4yLeNt-kCU",
    broadcastDay: "Terça",
    featured: false,
    trending: false,
    rank: 8,
    episodes: [
      {
        id: "csm-ep-1",
        number: 1,
        title: "Cão e Motosserra",
        duration: "24m",
        thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
        synopsis: "Traído pela Yakuza, Denji faz um pacto com seu fiel companheiro Pochita e renasce como o Homem-Motosserra.",
        isFree: true,
      },
    ],
    manga: {
      title: "Chainsaw Man (Mangá Oficial)",
      chaptersCount: 180,
      author: "Tatsuki Fujimoto",
      artist: "Tatsuki Fujimoto",
      cover: "/covers/manga-ramen.jpg",
      status: "Em publicação",
      chapters: [
        {
          id: "csm-cap-1",
          number: 1,
          title: "Capítulo 1: Cão e Motosserra",
          pagesCount: 4,
          pages: STANDARD_MANGA_PAGES,
          description: "Denji e seu amigo canino Pochita ganham a vida caçando demônios para pagar os juros da máfia.",
          releaseDate: "2024",
          isFree: true,
        },
      ],
    },
  },
];

/** LocalStorage Watchlist helper to save user favorites */
const WATCHLIST_STORAGE_KEY = "worscoi_anime_watchlist";
const MANGA_PROGRESS_KEY = "worscoi_manga_progress";

export const getAnimeWatchlist = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleAnimeWatchlist = (animeId: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const list = getAnimeWatchlist();
    const exists = list.includes(animeId);
    const updated = exists ? list.filter((id) => id !== animeId) : [...list, animeId];
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("worscoi_watchlist_updated"));
    return !exists;
  } catch {
    return false;
  }
};

export const isAnimeInWatchlist = (animeId: string): boolean => {
  return getAnimeWatchlist().includes(animeId);
};

export interface MangaReadingProgress {
  animeId: string;
  chapterNumber: number;
  pageIndex: number;
  updatedAt: string;
}

export const saveMangaProgress = (animeId: string, chapterNumber: number, pageIndex: number) => {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(MANGA_PROGRESS_KEY);
    const map: Record<string, MangaReadingProgress> = raw ? JSON.parse(raw) : {};
    map[animeId] = {
      animeId,
      chapterNumber,
      pageIndex,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(MANGA_PROGRESS_KEY, JSON.stringify(map));
  } catch {
    // Ignore error
  }
};

export const getMangaProgress = (animeId: string): MangaReadingProgress | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MANGA_PROGRESS_KEY);
    const map: Record<string, MangaReadingProgress> = raw ? JSON.parse(raw) : {};
    return map[animeId] || null;
  } catch {
    return null;
  }
};
