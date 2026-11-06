import { ANIME_MANGA_CONFIGS } from "./mangadex";

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
  mangadexChapterId?: string;
  translatedLanguage?: string;
}

export interface MangaInfo {
  title: string;
  chaptersCount: number;
  author: string;
  artist: string;
  cover: string;
  status: "Em publicação" | "Completo";
  mangadexId?: string;
  serialization?: string;
  publisher?: string;
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

export const ANIMES_DATA: Anime[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling: ReAwakening",
    japaneseTitle: "俺だけレベルアップな件 (나 혼자만 레벨업)",
    slug: "solo-leveling",
    synopsis: "Em um mundo onde caçadores humanos despertam habilidades mágicas para combater monstros mortais, Sung Jinwoo é conhecido como o caçador mais fraco de toda a humanidade. À beira da morte em uma masmorra dupla implacável, ele aceita uma misteriosa missão que o transforma no único capaz de subir de nível sem limites.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg",
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
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg",
        synopsis: "Jinwoo lidera uma incursão de classificação baixa que rapidamente se transforma em um pesadelo dentro de um templo com estátuas gigantes.",
        isFree: true,
      },
      {
        id: "sl-ep-2",
        number: 2,
        title: "Se Eu Tivesse Mais Uma Chance",
        duration: "24m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
        synopsis: "Jinwoo acorda no hospital e percebe uma tela flutuante diante de seus olhos que apenas ele consegue ver: o Sistema.",
        isFree: true,
      },
      {
        id: "sl-ep-3",
        number: 3,
        title: "É Como Um Jogo",
        duration: "23m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg",
        synopsis: "Treinando dia e noite para cumprir as missões diárias, Jinwoo aceita o desafio de entrar na masmorra da estação de metrô.",
        isFree: false,
      },
      {
        id: "sl-ep-4",
        number: 4,
        title: "Eu Preciso Ficar Mais Forte",
        duration: "24m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
        synopsis: "Confrontando a fera lendária Kasaka dos dentes azuis, Jinwoo descobre seu verdadeiro potencial de sobrevivência.",
        isFree: false,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["solo-leveling"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["solo-leveling"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["solo-leveling"].author,
      artist: ANIME_MANGA_CONFIGS["solo-leveling"].artist,
      cover: ANIME_MANGA_CONFIGS["solo-leveling"].officialCover,
      status: "Completo",
      mangadexId: ANIME_MANGA_CONFIGS["solo-leveling"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["solo-leveling"].serialization,
      publisher: ANIME_MANGA_CONFIGS["solo-leveling"].publisher,
      chapters: ANIME_MANGA_CONFIGS["solo-leveling"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "frieren-beyond-journeys-end",
    title: "Frieren e a Jornada Para o Além",
    japaneseTitle: "葬送のフリーレン",
    slug: "frieren-beyond-journeys-end",
    synopsis: "A maga elfa Frieren e seus valorosos companheiros derrotaram o Rei Demônio e trouxeram paz à terra. Mas após o fim da grande aventura, Frieren, cuja vida se estende por milênios, precisa encarar a mortalidade e o legado de seus amigos humanos.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg",
    rating: 9.4,
    ratingCount: 52100,
    episodesCount: 28,
    genres: ["Ação", "Fantasia", "Drama", "Shonen"],
    status: "Completo",
    season: "Temporada de Inverno",
    studio: "Madhouse",
    year: 2024,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "ZEkwCGJ3o7M",
    broadcastDay: "Sexta",
    featured: true,
    trending: true,
    rank: 2,
    episodes: [
      {
        id: "fri-ep-1",
        number: 1,
        title: "O Fim da Jornada",
        duration: "25m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg",
        synopsis: "Após uma década derrotando o mal, o grupo comemora a Era da Paz e assiste à chuva de meteoros da Era da Luz.",
        isFree: true,
      },
      {
        id: "fri-ep-2",
        number: 2,
        title: "Não Era Para Ser Mágico",
        duration: "24m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
        synopsis: "Frieren acolhe Fern como sua aprendiz após o pedido emocionante do sacerdote Heiter.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].author,
      artist: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].artist,
      cover: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].officialCover,
      status: "Em publicação",
      mangadexId: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].serialization,
      publisher: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].publisher,
      chapters: ANIME_MANGA_CONFIGS["frieren-beyond-journeys-end"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "jujutsu-kaisen-culling-game",
    title: "Jujutsu Kaisen: Jogo do Abate",
    japaneseTitle: "呪術廻戦 死滅回游",
    slug: "jujutsu-kaisen-culling-game",
    synopsis: "Após o devastador Incidente de Shibuya, o misterioso feiticeiro milenar Kenjaku orquestra o temido Jogo do Abate. Feiticeiros modernos e do passado colidem em uma carnificina ritualística por todo o território japonês.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    rating: 9.1,
    ratingCount: 63400,
    episodesCount: 24,
    genres: ["Ação", "Sobrenatural", "Fantasia", "Shonen"],
    status: "Em lançamento",
    season: "Temporada de Outono",
    studio: "MAPPA",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "pkZXflMmgyE",
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
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
        synopsis: "Yuta Okkotsu retorna ao Japão com ordens severas do conselho superior de Jujutsu para caçar e executar Yuji Itadori.",
        isFree: true,
      },
      {
        id: "jjk-ep-2",
        number: 2,
        title: "As Regras do Abate",
        duration: "24m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
        synopsis: "Megumi Fushiguro e Yuji buscam aliados para libertar Satoru Gojo do Reino da Prisão e salvar Tsumiki.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].author,
      artist: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].artist,
      cover: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].officialCover,
      status: "Completo",
      mangadexId: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].serialization,
      publisher: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].publisher,
      chapters: ANIME_MANGA_CONFIGS["jujutsu-kaisen-culling-game"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "demon-slayer-infinity-castle",
    title: "Demon Slayer: Castelo Infinito",
    japaneseTitle: "鬼滅の刃 無限城編",
    slug: "demon-slayer-infinity-castle",
    synopsis: "O confronto supremo entre os Caçadores de Demônios e o progenitor Muzan Kibutsuji atinge seu ápice. Sugados para a dimensão espacial distorcida do Castelo Infinito, os Hashiras e Tanjiro travam batalhas mortais contra os Luas Superiores.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg",
    rating: 9.5,
    ratingCount: 71200,
    episodesCount: 3,
    genres: ["Ação", "Sobrenatural", "Fantasia", "Shonen"],
    status: "Em lançamento",
    season: "Trilogia Cinematográfica",
    studio: "ufotable",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "V0Q_41m5Vn8",
    broadcastDay: "Domingo",
    featured: true,
    trending: true,
    rank: 4,
    episodes: [
      {
        id: "kmy-ep-1",
        number: 1,
        title: "Queda no Abismo",
        duration: "95m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg",
        synopsis: "O ataque surpresa de Muzan à residência Ubuyashiki desencadeia a explosão e a queda de todos os Caçadores no Castelo Infinito.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].author,
      artist: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].artist,
      cover: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].officialCover,
      status: "Completo",
      mangadexId: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].serialization,
      publisher: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].publisher,
      chapters: ANIME_MANGA_CONFIGS["demon-slayer-infinity-castle"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "tower-of-god",
    title: "Tower of God: O Retorno de Viole",
    japaneseTitle: "神之塔 -Tower of God- (신의 탑)",
    slug: "tower-of-god",
    synopsis: "O que você deseja? Fortuna? Glória? Autoridade? Vingança? Ou algo que supere tudo isso? Qualquer que seja o seu desejo, ele pode ser realizado no topo da Torre. Vinte-e-Quinto Bam renasce como o implacável candidato a matador Jyu Viole Grace.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx115230-QHOdSN7yt8ab.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/115230-wjDIxW77TLv3.jpg",
    rating: 8.7,
    ratingCount: 31200,
    episodesCount: 26,
    genres: ["Ação", "Fantasia", "Mistério", "Sobrenatural"],
    status: "Em lançamento",
    season: "Temporada de Verão",
    studio: "The Answer Studio",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "O9-n56s74L8",
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
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/115230-wjDIxW77TLv3.jpg",
        synopsis: "Ja Wangnan tenta desesperadamente passar no teste de ascensão do 20º andar quando cruza o caminho do misterioso e temível Viole.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["tower-of-god"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["tower-of-god"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["tower-of-god"].author,
      artist: ANIME_MANGA_CONFIGS["tower-of-god"].artist,
      cover: ANIME_MANGA_CONFIGS["tower-of-god"].officialCover,
      status: "Em publicação",
      mangadexId: ANIME_MANGA_CONFIGS["tower-of-god"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["tower-of-god"].serialization,
      publisher: ANIME_MANGA_CONFIGS["tower-of-god"].publisher,
      chapters: ANIME_MANGA_CONFIGS["tower-of-god"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "kaiju-no-8",
    title: "Kaiju No. 8",
    japaneseTitle: "怪獣8号",
    slug: "kaiju-no-8",
    synopsis: "No Japão, monstros conhecidos como Kaiju atacam constantemente a população civil. Kafka Hibino, que sonhava em se alistar na Força de Defesa, ganha subitamente a habilidade de se transformar em um poderoso Kaiju após ingerir um parasita misterioso.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg",
    rating: 8.9,
    ratingCount: 38900,
    episodesCount: 12,
    genres: ["Ação", "Sci-Fi", "Comédia", "Shonen"],
    status: "Completo",
    season: "Temporada de Primavera",
    studio: "Production I.G",
    year: 2024,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "Cmx_Xh8Gz_U",
    broadcastDay: "Sábado",
    featured: false,
    trending: true,
    rank: 6,
    episodes: [
      {
        id: "kj8-ep-1",
        number: 1,
        title: "O Homem Que Se Tornou um Kaiju",
        duration: "24m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg",
        synopsis: "Kafka Hibino trabalha na limpeza pesada de carcaças de monstros gigantes até que um encontro hospitalar muda seu destino para sempre.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["kaiju-no-8"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["kaiju-no-8"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["kaiju-no-8"].author,
      artist: ANIME_MANGA_CONFIGS["kaiju-no-8"].artist,
      cover: ANIME_MANGA_CONFIGS["kaiju-no-8"].officialCover,
      status: "Em publicação",
      mangadexId: ANIME_MANGA_CONFIGS["kaiju-no-8"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["kaiju-no-8"].serialization,
      publisher: ANIME_MANGA_CONFIGS["kaiju-no-8"].publisher,
      chapters: ANIME_MANGA_CONFIGS["kaiju-no-8"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "spy-x-family",
    title: "SPY x FAMILY",
    japaneseTitle: "スパイファミリー",
    slug: "spy-x-family",
    synopsis: "Para manter a frágil paz entre nações rivais, o agente de elite Twilight precisa forjar uma família de mentira. O que ele não sabe é que sua esposa de fachada é uma assassina profissional e sua filha adotiva é uma telepata capaz de ler mentes.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg",
    rating: 9.0,
    ratingCount: 58400,
    episodesCount: 25,
    genres: ["Comédia", "Ação", "Shonen"],
    status: "Completo",
    season: "Temporada de Outono",
    studio: "WIT Studio & CloverWorks",
    year: 2024,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "CCXLMq4vWng",
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
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg",
        synopsis: "Twilight adota a pequena Anya no orfanato sem desconfiar que ela conhece sua verdadeira identidade secreta.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["spy-x-family"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["spy-x-family"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["spy-x-family"].author,
      artist: ANIME_MANGA_CONFIGS["spy-x-family"].artist,
      cover: ANIME_MANGA_CONFIGS["spy-x-family"].officialCover,
      status: "Em publicação",
      mangadexId: ANIME_MANGA_CONFIGS["spy-x-family"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["spy-x-family"].serialization,
      publisher: ANIME_MANGA_CONFIGS["spy-x-family"].publisher,
      chapters: ANIME_MANGA_CONFIGS["spy-x-family"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
    },
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man: Arco da Reze",
    japaneseTitle: "チェンソーマン 劇場版 レゼ篇",
    slug: "chainsaw-man",
    synopsis: "Denji é um jovem empobrecido que vive caçando demônios ao lado de seu companheiro canino Pochita. Após ser traído e fatiado pela máfia, ele renasce como o lendário Homem-Motosserra e cruza caminho com Reze, uma misteriosa garota de cafeteria.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg",
    rating: 9.2,
    ratingCount: 66300,
    episodesCount: 12,
    genres: ["Ação", "Sobrenatural", "Drama", "Shonen"],
    status: "Em lançamento",
    season: "Filme Cinematográfico",
    studio: "MAPPA",
    year: 2026,
    audio: "Dublado & Legendado PT-BR",
    trailerYoutubeId: "v4yLeNt-kCU",
    broadcastDay: "Quarta",
    featured: false,
    trending: true,
    rank: 8,
    episodes: [
      {
        id: "csm-ep-1",
        number: 1,
        title: "Cão e Motosserra",
        duration: "24m",
        thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg",
        synopsis: "Traído pela Yakuza, Denji faz um pacto com seu fiel companheiro Pochita e renasce como o Homem-Motosserra.",
        isFree: true,
      },
    ],
    manga: {
      title: ANIME_MANGA_CONFIGS["chainsaw-man"].canonicalTitle,
      chaptersCount: ANIME_MANGA_CONFIGS["chainsaw-man"].totalChaptersEstimate,
      author: ANIME_MANGA_CONFIGS["chainsaw-man"].author,
      artist: ANIME_MANGA_CONFIGS["chainsaw-man"].artist,
      cover: ANIME_MANGA_CONFIGS["chainsaw-man"].officialCover,
      status: "Em publicação",
      mangadexId: ANIME_MANGA_CONFIGS["chainsaw-man"].mangadexId,
      serialization: ANIME_MANGA_CONFIGS["chainsaw-man"].serialization,
      publisher: ANIME_MANGA_CONFIGS["chainsaw-man"].publisher,
      chapters: ANIME_MANGA_CONFIGS["chainsaw-man"].initialChapters.map((ch) => ({
        ...ch,
        pages: ch.pages || [],
      })),
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
