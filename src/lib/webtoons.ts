export type WebtoonDay =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado"
  | "Domingo"
  | "Concluído";

export interface WebtoonEpisode {
  id: string;
  webtoon_id: string;
  number: number;
  title: string;
  synopsis: string;
  cover: string;
  release_date: string;
  views: number;
  likes: number;
  panels: string[];
  is_free: boolean;
}

export interface Webtoon {
  id: string;
  title: string;
  korean_title?: string;
  slug: string;
  author: string;
  artist: string;
  description: string;
  cover: string;
  banner: string;
  rating: number;
  rating_count: number;
  views: number;
  genres: string[];
  status: "Em lançamento" | "Concluído";
  release_day: WebtoonDay;
  color_theme?: string;
  featured?: boolean;
  trending?: boolean;
  weekly_rank?: number;
  collection?: string;
  episodes_count: number;
  episodes: WebtoonEpisode[];
}

export const WEBTOON_GENRES = [
  "Todos",
  "Ação",
  "Fantasia",
  "Murim",
  "Isekai",
  "Sobrenatural",
  "Romance",
  "Comédia",
  "Sci-Fi",
  "Esportes",
  "Drama",
];

export const RELEASE_DAYS: Array<{ value: WebtoonDay | "Todos"; label: string; short: string }> = [
  { value: "Todos", label: "Todos os Dias", short: "Todos" },
  { value: "Segunda", label: "Segunda-feira", short: "Seg" },
  { value: "Terça", label: "Terça-feira", short: "Ter" },
  { value: "Quarta", label: "Quarta-feira", short: "Qua" },
  { value: "Quinta", label: "Quinta-feira", short: "Qui" },
  { value: "Sexta", label: "Sexta-feira", short: "Sex" },
  { value: "Sábado", label: "Sábado", short: "Sáb" },
  { value: "Domingo", label: "Domingo", short: "Dom" },
  { value: "Concluído", label: "Obras Completas", short: "Fim" },
];

// Helper to generate sequential pages
const generatePages = (basePath: string, count: number): string[] => {
  return Array.from({ length: count }, (_, i) => `${basePath}/page-${i + 1}.jpg`);
};

export const CURATED_WEBTOONS: Webtoon[] = [
  {
    id: "wt-solo-leveling",
    title: "Solo Leveling: ReAwakening",
    korean_title: "나 혼자만 레벨업",
    slug: "solo-leveling",
    author: "Chugong",
    artist: "DUBU (REDICE Studio)",
    description:
      "Em um mundo onde caçadores humanos despertam habilidades mágicas para combater monstros mortais, Sung Jinwoo é conhecido como 'o caçador mais fraco da humanidade'. À beira da morte em uma masmorra dupla implacável, ele aceita uma misteriosa missão que o transforma no único ser humano capaz de subir de nível sem limites. A obra pioneira que redefiniu o gênero de caçadores e sistemas mundiais.",
    cover: "/covers/webtoons/solo-leveling-cover.jpg",
    banner: "/covers/webtoons/solo-leveling-cover.jpg",
    rating: 9.9,
    rating_count: 64200,
    views: 489000,
    genres: ["Ação", "Sobrenatural", "Fantasia"],
    status: "Em lançamento",
    release_day: "Sábado",
    featured: true,
    trending: true,
    weekly_rank: 1,
    collection: "Sistemas & Caçadores",
    episodes_count: 3,
    episodes: [
      {
        id: "wt-solo-ep-1",
        webtoon_id: "wt-solo-leveling",
        number: 1,
        title: "Capítulo 1 — O Caçador Mais Fraco da Humanidade",
        synopsis: "Sung Jinwoo e sua equipe adentram uma masmorra de rank D comum e descobrem a passagem secreta para o Templo de Cártem.",
        cover: "/chapters/solo-leveling/ep-1/page-1.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 124500,
        likes: 18200,
        panels: generatePages("/chapters/solo-leveling/ep-1", 27),
        is_free: true,
      },
      {
        id: "wt-solo-ep-2",
        webtoon_id: "wt-solo-leveling",
        number: 2,
        title: "Capítulo 2 — Os Três Mandamentos de Cártem",
        synopsis: "As estátuas colossais ganham vida e Jinwoo decifra os três mandamentos sagrados para manter seus companheiros vivos.",
        cover: "/chapters/solo-leveling/ep-2/page-1.jpg",
        release_date: "2026-11-02T00:00:00Z",
        views: 108300,
        likes: 15400,
        panels: generatePages("/chapters/solo-leveling/ep-2", 22),
        is_free: true,
      },
      {
        id: "wt-solo-ep-3",
        webtoon_id: "wt-solo-leveling",
        number: 3,
        title: "Capítulo 3 — O Sacrifício e o Despertar do Jogador",
        synopsis: "Abandonado pelos sobreviventes ao redor do altar em chamas, a janela misteriosa do Sistema surge diante de seus olhos.",
        cover: "/chapters/solo-leveling/ep-3/page-1.jpg",
        release_date: "2026-11-03T00:00:00Z",
        views: 95400,
        likes: 14100,
        panels: generatePages("/chapters/solo-leveling/ep-3", 33),
        is_free: true,
      },
    ],
  },
  {
    id: "wt-omniscient-reader",
    title: "O Ponto de Vista do Leitor Onisciente",
    korean_title: "전지적 독자 시점",
    slug: "omniscient-reader",
    author: "sing N song",
    artist: "Sleepy-C (REDICE Studio)",
    description:
      "Kim Dokja era um funcionário comum cujo único prazer na vida era ler uma webnovel impopular de 3.149 capítulos chamada 'Três Maneiras de Sobreviver em um Mundo Apocalíptico'. No momento exato em que ele termina o capítulo final, o mundo real se quebra e a história da novel ganha vida. Dokja é a única pessoa na Terra que sabe como o apocalipse começa e onde ele termina.",
    cover: "/covers/webtoons/orv-cover.jpg",
    banner: "/covers/webtoons/orv-cover.jpg",
    rating: 9.8,
    rating_count: 53100,
    views: 412000,
    genres: ["Ação", "Fantasia", "Sobrenatural"],
    status: "Em lançamento",
    release_day: "Terça",
    featured: true,
    trending: true,
    weekly_rank: 2,
    collection: "Sistemas & Caçadores",
    episodes_count: 2,
    episodes: [
      {
        id: "wt-orv-ep-1",
        webtoon_id: "wt-omniscient-reader",
        number: 1,
        title: "Capítulo 1 — Prólogo do Fim do Mundo",
        synopsis: "No metrô de Seul voltando do trabalho, Kim Dokja termina o capítulo 3.149 de TWSA e o dokkaebi Bihyung surge iniciando o primeiro cenário.",
        cover: "/chapters/omniscient-reader/ep-1/page-1.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 98000,
        likes: 16100,
        panels: generatePages("/chapters/omniscient-reader/ep-1", 42),
        is_free: true,
      },
      {
        id: "wt-orv-ep-2",
        webtoon_id: "wt-omniscient-reader",
        number: 2,
        title: "Capítulo 2 — Iniciando o Serviço Pago",
        synopsis: "O relógio começa a correr: cada pessoa no vagão deve matar uma criatura viva antes de expirar o tempo. O caos toma conta de Seul.",
        cover: "/chapters/omniscient-reader/ep-2/page-1.jpg",
        release_date: "2026-11-02T00:00:00Z",
        views: 89400,
        likes: 14700,
        panels: generatePages("/chapters/omniscient-reader/ep-2", 31),
        is_free: true,
      },
    ],
  },
  {
    id: "wt-the-beginning-after-the-end",
    title: "The Beginning After the End",
    korean_title: "끝이 아닌 시작",
    slug: "the-beginning-after-the-end",
    author: "TurtleMe",
    artist: "Fuyuki23",
    description:
      "O Rei Grey possui riqueza sem paralelo, prestígio e força militar formidável em um mundo governado pelo poder das artes marciais. No entanto, a solidão profunda corrompe seu coração. Reencarnado como Arthur Leywin em um novo continente mágico povoado por feras míticas, magos e elfos, ele tem uma segunda chance de aprender o valor do amor, da família e de proteger os que ama.",
    cover: "/covers/webtoons/tbate-cover.jpg",
    banner: "/covers/webtoons/tbate-cover.jpg",
    rating: 9.8,
    rating_count: 49800,
    views: 395000,
    genres: ["Fantasia", "Isekai", "Ação"],
    status: "Em lançamento",
    release_day: "Sexta",
    featured: true,
    trending: true,
    weekly_rank: 3,
    collection: "Isekai & Realeza",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-tbate-ep-1",
        webtoon_id: "wt-the-beginning-after-the-end",
        number: 1,
        title: "Capítulo 1 — O Despertar da Centelha de Mana",
        synopsis: "O Rei Grey renasce como Arthur Leywin e descobre as partículas de mana que dançam pelo ar no novo reino.",
        cover: "/chapters/tbate/ep-1/page-1.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 84300,
        likes: 14200,
        panels: generatePages("/chapters/tbate/ep-1", 55),
        is_free: true,
      },
    ],
  },
  {
    id: "wt-nano-machine",
    title: "Nano Machine",
    korean_title: "나노 마신",
    slug: "nano-machine",
    author: "Jeolmu Hyeon",
    artist: "GGBG (REDICE Studio)",
    description:
      "Cheon Yeo-woon é o filho ilegítimo do Lorde do Culto Demoníaco, perseguido implacavelmente pelos seis clãs rivais que desejam aniquilá-lo antes que ele dispute a sucessão. Prestes a ser assassinado em uma emboscada noturna, um descendente vindo do futuro distante injeta em seu corpo uma máquina de nanotecnologia de sétima geração que recalcula seus meridianos marciais e concede poder sobre-humano.",
    cover: "/covers/webtoons/nano-machine-cover.jpg",
    banner: "/covers/webtoons/nano-machine-cover.jpg",
    rating: 9.7,
    rating_count: 38400,
    views: 341000,
    genres: ["Murim", "Ação", "Sci-Fi"],
    status: "Em lançamento",
    release_day: "Quinta",
    featured: true,
    trending: true,
    weekly_rank: 4,
    collection: "Murim & Artes Marciais",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-nano-ep-1",
        webtoon_id: "wt-nano-machine",
        number: 1,
        title: "Capítulo 1 — A Injeção da Máquina do Século XXI",
        synopsis: "Sangrando na sarjeta do Grande Culto Demoníaco, Yeo-woon recebe a injeção misteriosa e o sistema artificial Nano ativa a varredura biológica.",
        cover: "/chapters/nano-machine/ep-1/page-1.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 74200,
        likes: 12100,
        panels: generatePages("/chapters/nano-machine/ep-1", 21),
        is_free: true,
      },
    ],
  },
  {
    id: "wt-tower-of-god",
    title: "Tower of God",
    korean_title: "신의 탑",
    slug: "tower-of-god",
    author: "SIU",
    artist: "SIU",
    description:
      "O que você mais deseja? Dinheiro e riqueza? Glória e honra? Poder e autoridade? Vingança? Ou algo que transcenda tudo isso? Seja o que for que você procure, 'está aqui', no topo da Torre de Deus. Bam, um jovem ingênuo que nunca conheceu a luz do sol, adentra os portões proibidos da Torre arriscando sua própria vida para reencontrar Rachel, sua única amiga.",
    cover: "/covers/webtoons/tower-of-god-cover.jpg",
    banner: "/covers/webtoons/tower-of-god-cover.jpg",
    rating: 9.6,
    rating_count: 58200,
    views: 472000,
    genres: ["Fantasia", "Ação", "Sobrenatural"],
    status: "Em lançamento",
    release_day: "Segunda",
    featured: true,
    trending: true,
    weekly_rank: 5,
    collection: "Fantasia Épica",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-tog-ep-1",
        webtoon_id: "wt-tower-of-god",
        number: 1,
        title: "Capítulo 1 — O Andar de Headon: A Enguia de Aço",
        synopsis: "O misterioso zelador da Torre propõe a Bam um teste mortal em uma jaula submarina com uma enguia blindada colossal.",
        cover: "/covers/webtoons/tower-of-god-cover.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 71000,
        likes: 11500,
        panels: ["/covers/webtoons/tower-of-god-cover.jpg"],
        is_free: true,
      },
    ],
  },
  {
    id: "wt-return-mount-hua",
    title: "O Retorno da Seita do Monte Hua",
    korean_title: "화산귀환",
    slug: "return-mount-hua",
    author: "Biga",
    artist: "LICO (Studio LICO)",
    description:
      "Chung Myung, o Santo da Espada da Flor de Ameixa do Monte Hua, sacrifica sua própria vida para decapitar o Demônio Celestial supremo e salvar a humanidade. Cem anos depois, ele renasce no corpo de um garoto mendigo e corre empolgado para o Monte Hua, apenas para descobrir que sua outrora gloriosa seita foi reduzida a ruínas empoeiradas e esquecida pelo mundo. Munido de gênio e sarcasmo incomparáveis, ele decide reconstruir a seita do zero.",
    cover: "/covers/webtoons/mount-hua-cover.jpg",
    banner: "/covers/webtoons/mount-hua-cover.jpg",
    rating: 9.8,
    rating_count: 42100,
    views: 367000,
    genres: ["Murim", "Comédia", "Ação"],
    status: "Em lançamento",
    release_day: "Quarta",
    featured: true,
    trending: true,
    weekly_rank: 6,
    collection: "Murim & Artes Marciais",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-mthua-ep-1",
        webtoon_id: "wt-return-mount-hua",
        number: 1,
        title: "Capítulo 1 — O Último Golpe da Flor de Ameixa",
        synopsis: "No cume da Cordilheira dos Cem Picos, o Santo da Espada Chung Myung desafia o soberano das trevas para o duelo derradeiro.",
        cover: "/covers/webtoons/mount-hua-cover.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 69800,
        likes: 11800,
        panels: ["/covers/webtoons/mount-hua-cover.jpg"],
        is_free: true,
      },
    ],
  },
  {
    id: "wt-lore-olympus",
    title: "Lore Olympus",
    korean_title: "로어 올림푸스",
    slug: "lore-olympus",
    author: "Rachel Smythe",
    artist: "Rachel Smythe",
    description:
      "Vencedor dos prêmios Eisner e Harvey. Uma releitura moderna, estilosa e comovente do mito grego de Perséfone e Hades. Perséfone, jovem deusa da primavera protegida com rigor por sua mãe Deméter no reino mortal, muda-se para o reluzente Olimpo moderno para estudar e acaba chamando a atenção do discreto e solitário regente do Submundo.",
    cover: "/covers/webtoons/lore-olympus-cover.jpg",
    banner: "/covers/webtoons/lore-olympus-cover.jpg",
    rating: 9.7,
    rating_count: 51200,
    views: 420000,
    genres: ["Romance", "Drama", "Fantasia"],
    status: "Concluído",
    release_day: "Domingo",
    featured: true,
    trending: true,
    weekly_rank: 7,
    collection: "Romance & Emoção",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-lo-ep-1",
        webtoon_id: "wt-lore-olympus",
        number: 1,
        title: "Capítulo 1 — A Festa no Palácio dos Deuses",
        synopsis: "Perséfone estreia nos eventos sociais do Olimpo acompanhada por Artemis e seus olhos se cruzam com o rei das sombras pela primeira vez.",
        cover: "/covers/webtoons/lore-olympus-cover.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 67100,
        likes: 13200,
        panels: ["/covers/webtoons/lore-olympus-cover.jpg"],
        is_free: true,
      },
    ],
  },
  {
    id: "wt-eleceed",
    title: "Eleceed",
    korean_title: "일렉시드",
    slug: "eleceed",
    author: "Jeho Son",
    artist: "ZHENA",
    description:
      "Jiwoo é um estudante do ensino médio bondoso que resgata todos os gatos vadios do bairro e esconde um segredo perigoso: ele tem o dom da supervelocidade felina. Kayden é um agente secreto despertado e o usuário de eletricidade mais forte do mundo que, gravemente ferido em fuga, se disfarça no corpo de um gato gordo e peludo. Juntos, essa dupla improvável enfrenta o submundo das batalhas de despertados.",
    cover: "/covers/webtoons/eleceed-cover.jpg",
    banner: "/covers/webtoons/eleceed-cover.jpg",
    rating: 9.9,
    rating_count: 36700,
    views: 320000,
    genres: ["Ação", "Comédia", "Sobrenatural"],
    status: "Em lançamento",
    release_day: "Terça",
    featured: true,
    trending: true,
    weekly_rank: 8,
    collection: "Sistemas & Caçadores",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-ele-ep-1",
        webtoon_id: "wt-eleceed",
        number: 1,
        title: "Capítulo 1 — O Gato Mais Poderoso do Mundo",
        synopsis: "Jiwoo encontra um gato corpulento e mal-humorado ferido na chuva, sem desconfiar que se trata do terror supremo das organizações mundiais.",
        cover: "/covers/webtoons/eleceed-cover.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 59200,
        likes: 11200,
        panels: ["/covers/webtoons/eleceed-cover.jpg"],
        is_free: true,
      },
    ],
  },
  {
    id: "wt-villainess-marionette",
    title: "A Vilã É Uma Marionete",
    korean_title: "악녀는 마리오네트",
    slug: "villainess-marionette",
    author: "Han Yi-rim",
    artist: "Manggle",
    description:
      "A princesa Cayena Hill sempre viveu como uma marionete descartável nos jogos de poder de seu irmão tirano Regef, culminando em sua execução brutal. Ao renascer com as memórias de sua vida anterior, ela corta as cordas invisíveis que a controlavam. Com inteligência magistral, elegância fatal e o apoio estratégico do misterioso Duque Raffaello Kidrey, ela assume o xadrez do império.",
    cover: "/covers/webtoons/villainess-marionette-cover.jpg",
    banner: "/covers/webtoons/villainess-marionette-cover.jpg",
    rating: 9.7,
    rating_count: 31200,
    views: 295000,
    genres: ["Romance", "Isekai", "Drama"],
    status: "Em lançamento",
    release_day: "Segunda",
    featured: true,
    trending: true,
    weekly_rank: 9,
    collection: "Isekai & Realeza",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-vm-ep-1",
        webtoon_id: "wt-villainess-marionette",
        number: 1,
        title: "Capítulo 1 — O Despertar da Princesa de Porcelana",
        synopsis: "Cayena abre os olhos em seus aposentos de seda imperial e percebe que retornou antes de seu casamento arranjado mortal.",
        cover: "/covers/webtoons/villainess-marionette-cover.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 52400,
        likes: 9900,
        panels: ["/covers/webtoons/villainess-marionette-cover.jpg"],
        is_free: true,
      },
    ],
  },
  {
    id: "wt-wind-breaker",
    title: "Wind Breaker",
    korean_title: "윈드브레이커",
    slug: "wind-breaker",
    author: "Yongseok Jo",
    artist: "Yongseok Jo",
    description:
      "Jay é o presidente perfeito do grêmio estudantil do Colégio Taeyang, focado 100% nas notas e nas expectativas de sua família. Mas quando ele monta em sua bicicleta de marcha fixa (fixie) pelas ladeiras da cidade à noite, ele corta os ventos com velocidade e reflexos insanos. Ao ser desafiado pela equipe Hummingbird, Jay descobre a paixão pura pelas competições de ciclismo de rua do torneio League of Street.",
    cover: "/covers/webtoons/wind-breaker-cover.jpg",
    banner: "/covers/webtoons/wind-breaker-cover.jpg",
    rating: 9.8,
    rating_count: 44200,
    views: 380000,
    genres: ["Esportes", "Drama", "Ação"],
    status: "Concluído",
    release_day: "Concluído",
    featured: true,
    trending: true,
    weekly_rank: 10,
    collection: "Maratonar Obras Completas",
    episodes_count: 1,
    episodes: [
      {
        id: "wt-wb-ep-1",
        webtoon_id: "wt-wind-breaker",
        number: 1,
        title: "Capítulo 1 — O Desafio na Ladeira da Meia-Noite",
        synopsis: "Jay desce a curva da morte com sua bicicleta sem freios e deixa os veteranos da Hummingbird boquiabertos com sua técnica de derrapagem.",
        cover: "/covers/webtoons/wind-breaker-cover.jpg",
        release_date: "2026-11-01T00:00:00Z",
        views: 61200,
        likes: 11500,
        panels: ["/covers/webtoons/wind-breaker-cover.jpg"],
        is_free: true,
      },
    ],
  },
];

import { getFullWebtoonChapters } from "./webtoonSyncEngine";

export function getCuratedWebtoons(): Webtoon[] {
  return CURATED_WEBTOONS.map((w) => {
    const fullEpisodes = getFullWebtoonChapters(w.id);
    return {
      ...w,
      episodes_count: fullEpisodes.length,
      episodes: fullEpisodes,
    };
  });
}

export function getWebtoonById(id: string): Webtoon | undefined {
  const found = CURATED_WEBTOONS.find((w) => w.id === id || w.slug === id);
  if (!found) return undefined;
  const fullEpisodes = getFullWebtoonChapters(found.id);
  return {
    ...found,
    episodes_count: fullEpisodes.length,
    episodes: fullEpisodes,
  };
}

export function getWebtoonsByDay(day: WebtoonDay | "Todos"): Webtoon[] {
  const all = getCuratedWebtoons();
  if (day === "Todos") return all;
  return all.filter((w) => w.release_day === day);
}

export function getTrendingWebtoons(): Webtoon[] {
  return [...getCuratedWebtoons()].sort((a, b) => b.views - a.views);
}

export function getWebtoonsByCollection(collectionName: string): Webtoon[] {
  return getCuratedWebtoons().filter((w) => w.collection === collectionName);
}
