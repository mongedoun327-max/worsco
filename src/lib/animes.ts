import { ANIME_MANGA_CONFIGS } from "./mangadex";
import { generateContentHash } from "./animeMetadataSync";

export interface AnimeSource {
  id: string;
  quality: "1080p" | "720p" | "480p";
  streamUrl: string;
  format: "hls" | "mp4" | "embed";
  provider: string;
  isDefault?: boolean;
}

export interface AnimeEpisode {
  id: string;
  animeId: string;
  seasonId: string;
  seasonNumber: number;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
  synopsis: string;
  isFree: boolean;
  contentHash: string;
  streamUrl: string;
  sources?: AnimeSource[];
  airDate?: string;
  /** Campo mantido para retrocompatibilidade */
  videoUrl?: string;
}

export interface AnimeSeason {
  id: string;
  animeId: string;
  seasonNumber: number;
  title: string;
  year: number;
  synopsis: string;
  episodesCount: number;
  poster: string;
  banner?: string;
  trailerYoutubeId: string;
  episodes: AnimeEpisode[];
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
  chapterUrl?: string;
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
  malId?: number;
  tmdbId?: number;
  anilistId?: number;
  /** Hierarquia Completa Estrita: Temporadas com seus respectivos episódios */
  seasons: AnimeSeason[];
  /** Array unificado para retrocompatibilidade com componentes existentes */
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

// Helper para instanciar episódios garantindo integridade estrita e hashes únicos
function createEpisode(
  animeId: string,
  seasonId: string,
  seasonNumber: number,
  number: number,
  title: string,
  duration: string,
  thumbnail: string,
  synopsis: string,
  embedYoutubeId: string,
  isFree = true
): AnimeEpisode {
  const streamUrl = `https://www.youtube-nocookie.com/embed/${embedYoutubeId}?rel=0`;
  const contentHash = generateContentHash(animeId, seasonNumber, number, streamUrl);

  return {
    id: `${animeId}-s${seasonNumber}-ep${number}`,
    animeId,
    seasonId,
    seasonNumber,
    number,
    title,
    duration,
    thumbnail,
    synopsis,
    isFree,
    contentHash,
    streamUrl,
    videoUrl: streamUrl,
    sources: [
      {
        id: `${animeId}-s${seasonNumber}-ep${number}-1080p`,
        quality: "1080p",
        streamUrl,
        format: "embed",
        provider: "official-secure-stream",
        isDefault: true,
      },
      {
        id: `${animeId}-s${seasonNumber}-ep${number}-720p`,
        quality: "720p",
        streamUrl: `${streamUrl}&vq=hd720`,
        format: "embed",
        provider: "official-secure-stream",
      },
    ],
  };
}

// ============================================================================
// BASE DE DADOS OFICIAL - HIERARQUIA COMPLETA DE ANIMES & TEMPORADAS
// ============================================================================

export const ANIMES_DATA: Anime[] = [
  // 1. SOLO LEVELING (2 Temporadas)
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
    malId: 52299,
    anilistId: 151807,
    seasons: [
      {
        id: "solo-leveling-s1",
        animeId: "solo-leveling",
        seasonNumber: 1,
        title: "Temporada 1: O Despertar do Mais Fraco",
        year: 2024,
        synopsis: "Sung Jinwoo sobrevive ao teste da masmorra dupla no Templo de Cartenon e adquire o misterioso Sistema.",
        episodesCount: 12,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
        trailerYoutubeId: "916nW3F1Yv8",
        episodes: [
          createEpisode("solo-leveling", "solo-leveling-s1", 1, 1, "Eu Já Estou Acostumado", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg", "Jinwoo lidera uma incursão de classificação baixa que rapidamente se transforma em um pesadelo dentro de um templo com estátuas gigantes.", "916nW3F1Yv8"),
          createEpisode("solo-leveling", "solo-leveling-s1", 1, 2, "Se Eu Tivesse Mais Uma Chance", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png", "Jinwoo acorda no hospital e percebe uma tela flutuante diante de seus olhos que apenas ele consegue ver: o Sistema.", "F1V6qfQ-vA4"),
          createEpisode("solo-leveling", "solo-leveling-s1", 1, 3, "É Como Um Jogo", "23m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg", "Treinando dia e noite para cumprir as missões diárias, Jinwoo aceita o desafio de entrar na masmorra da estação de metrô.", "vM_o8pU60kE"),
          createEpisode("solo-leveling", "solo-leveling-s1", 1, 4, "Eu Preciso Ficar Mais Forte", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png", "Confrontando a fera lendária Kasaka dos dentes azuis, Jinwoo descobre seu verdadeiro potencial de sobrevivência.", "ZfL-x1r2d9Q"),
          createEpisode("solo-leveling", "solo-leveling-s1", 1, 5, "Uma Boa Proposta", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg", "Jinwoo se junta ao esquadrão de Hwang Dongsuk para desbravar uma masmorra de Rank C repleta de segredos letais.", "k4aV9dJm8eE"),
          createEpisode("solo-leveling", "solo-leveling-s1", 1, 6, "O Início da Verdadeira Caçada", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png", "Traídos dentro da câmara do chefe, Jinwoo é forçado pelo Sistema a tomar uma decisão fatal sobre seus companheiros.", "B_7uK1o9P0w"),
        ],
      },
      {
        id: "solo-leveling-s2",
        animeId: "solo-leveling",
        seasonNumber: 2,
        title: "Temporada 2: Arise from the Shadow",
        year: 2025,
        synopsis: "Agora como Monarca das Sombras, Sung Jinwoo comanda um exército de soldados renascidos e encara masmorras de Rank S.",
        episodesCount: 12,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
        trailerYoutubeId: "F1V6qfQ-vA4",
        episodes: [
          createEpisode("solo-leveling", "solo-leveling-s2", 2, 1, "Surjam das Sombras", "25m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg", "O confronto com o Comandante Igris nas profundezas da missão de mudança de classe desafia a alma de Jinwoo.", "cT_u8N2kL1M"),
          createEpisode("solo-leveling", "solo-leveling-s2", 2, 2, "O Portal Vermelho", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png", "Um portal de treinamento do clã Tigre Branco se converte subitamente em uma zona letal de gelo infinito.", "wP4x8T9mQ2V"),
          createEpisode("solo-leveling", "solo-leveling-s2", 2, 3, "Ilha de Jeju", "25m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg", "A associação dos caçadores convoca os maiores Rank S da Ásia para o expurgo da temível rainha formiga.", "l0T9F6vN9kQ"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 2. FRIEREN (2 Temporadas)
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
    malId: 52991,
    anilistId: 154587,
    seasons: [
      {
        id: "frieren-s1",
        animeId: "frieren-beyond-journeys-end",
        seasonNumber: 1,
        title: "Temporada 1: O Fim da Grande Aventura",
        year: 2023,
        synopsis: "A jornada de Frieren com Fern e Stark rumo a Aureole, o lugar onde repousam as almas no extremo norte.",
        episodesCount: 28,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
        trailerYoutubeId: "ZEkwCGJ3o7M",
        episodes: [
          createEpisode("frieren-beyond-journeys-end", "frieren-s1", 1, 1, "O Fim da Jornada", "25m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg", "Após uma década derrotando o mal, o grupo comemora a Era da Paz e assiste à chuva de meteoros da Era da Luz.", "ZEkwCGJ3o7M"),
          createEpisode("frieren-beyond-journeys-end", "frieren-s1", 1, 2, "Não Era Para Ser Mágico", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg", "Frieren acolhe Fern como sua aprendiz após o pedido emocionante do sacerdote Heiter.", "q7i0w8YhF2c"),
          createEpisode("frieren-beyond-journeys-end", "frieren-s1", 1, 3, "Magia Assassina (Zoltraak)", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg", "Fern e Frieren testam seus conhecimentos arcanos contra os demônios remanescentes nas fronteiras.", "dE4k_P0w9u1"),
          createEpisode("frieren-beyond-journeys-end", "frieren-s1", 1, 4, "A Terra Onde as Almas Descansam", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg", "Stark se une ao grupo após enfrentar o temível dragão solar na garganta das montanhas.", "jF9i0eT_p8A"),
        ],
      },
      {
        id: "frieren-s2",
        animeId: "frieren-beyond-journeys-end",
        seasonNumber: 2,
        title: "Temporada 2: O Exame de Primeira Classe & O Platô",
        year: 2025,
        synopsis: "Frieren e seus aprendizes enfrentam magos veteranos no exame imperial e desbravam as terras proibidas.",
        episodesCount: 16,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
        trailerYoutubeId: "ZEkwCGJ3o7M",
        episodes: [
          createEpisode("frieren-beyond-journeys-end", "frieren-s2", 2, 1, "O Labirinto da Tumba do Rei", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg", "Os magos enfrentam réplicas exatas de si mesmos criadas pela mítica criatura Spiegel.", "xM8P3dJ7k9Q"),
          createEpisode("frieren-beyond-journeys-end", "frieren-s2", 2, 2, "A Magia da Época dos Mitos", "25m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg", "A grande instrutora Serie testa pessoalmente as aptidões dos candidatos sobreviventes.", "wO1t8P_X8aQ"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 3. JUJUTSU KAISEN (3 Temporadas)
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
    malId: 40748,
    anilistId: 113415,
    seasons: [
      {
        id: "jjk-s1",
        animeId: "jujutsu-kaisen-culling-game",
        seasonNumber: 1,
        title: "Temporada 1: O Receptáculo de Sukuna",
        year: 2020,
        synopsis: "Yuji Itadori engole o dedo amaldiçoado de Ryomen Sukuna e ingressa na Escola Técnica de Jujutsu de Tóquio.",
        episodesCount: 24,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
        trailerYoutubeId: "pkZXflMmgyE",
        episodes: [
          createEpisode("jujutsu-kaisen-culling-game", "jjk-s1", 1, 1, "Ryomen Sukuna", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg", "Para salvar seus amigos de um espírito amaldiçoado no colégio, Yuji ingere um amuleto mortal de classe especial.", "pkZXflMmgyE"),
          createEpisode("jujutsu-kaisen-culling-game", "jjk-s1", 1, 2, "Por Mim Mesmo", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg", "Gojo Satoru apresenta Yuji aos anciãos do mundo Jujutsu com um ultimato inescapável.", "v8bEzf76F2A"),
        ],
      },
      {
        id: "jjk-s2",
        animeId: "jujutsu-kaisen-culling-game",
        seasonNumber: 2,
        title: "Temporada 2: Inventário Oculto & Incidente de Shibuya",
        year: 2023,
        synopsis: "A juventude trágica de Gojo e Geto colide com o maior cerco terrorista sobrenatural da história no metrô de Shibuya.",
        episodesCount: 23,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
        trailerYoutubeId: "O6qVieflwQs",
        episodes: [
          createEpisode("jujutsu-kaisen-culling-game", "jjk-s2", 2, 1, "Inventário Oculto", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg", "A missão de escoltar o Receptáculo de Plasma Estelar, Riko Amanai, coloca Gojo frente a frente com Toji Fushiguro.", "O6qVieflwQs"),
          createEpisode("jujutsu-kaisen-culling-game", "jjk-s2", 2, 2, "Portão Aberto em Shibuya", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg", "Uma cortina é erguida sobre Shibuya e a prisão seladora do Reino da Prisão é ativada contra Gojo.", "z6N5wL0_vY8"),
        ],
      },
      {
        id: "jjk-s3",
        animeId: "jujutsu-kaisen-culling-game",
        seasonNumber: 3,
        title: "Temporada 3: O Jogo do Abate (Culling Game)",
        year: 2026,
        synopsis: "Kenjaku ativa as barreiras de massacre por todo o Japão enquanto Yuta Okkotsu assume a vanguarda.",
        episodesCount: 24,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
        trailerYoutubeId: "pkZXflMmgyE",
        episodes: [
          createEpisode("jujutsu-kaisen-culling-game", "jjk-s3", 3, 1, "Execução Iminente", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg", "Yuta Okkotsu retorna ao Japão com ordens severas do conselho superior de Jujutsu para caçar e executar Yuji Itadori.", "k2fS-l3Pz6I"),
          createEpisode("jujutsu-kaisen-culling-game", "jjk-s3", 3, 2, "As Regras do Abate", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg", "Megumi Fushiguro e Yuji buscam aliados para libertar Satoru Gojo do Reino da Prisão e salvar Tsumiki.", "m_1bV9f_vE0"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 4. DEMON SLAYER (5 Temporadas / Arcos)
  {
    id: "demon-slayer-infinity-castle",
    title: "Demon Slayer: Kimetsu no Yaiba",
    japaneseTitle: "鬼滅の刃 無限城編",
    slug: "demon-slayer-infinity-castle",
    synopsis: "Tanjiro Kamado luta incansavelmente para curar sua irmã Nezuko transformada em demônio e vingar sua família chacinada. Percorrendo o caminho dos Caçadores de Demônios ao lado dos nobres Hashiras, ele alcança o ápice da batalha final nas entranhas do Castelo Infinito.",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
    banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg",
    rating: 9.5,
    ratingCount: 71200,
    episodesCount: 66,
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
    malId: 38000,
    anilistId: 101922,
    seasons: [
      {
        id: "ds-s1",
        animeId: "demon-slayer-infinity-castle",
        seasonNumber: 1,
        title: "Temporada 1: Resolução de Tanjiro Kamado",
        year: 2019,
        synopsis: "O treinamento árduo sob mestre Urokodaki e a seleção final na montanha Fujikasane.",
        episodesCount: 26,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
        trailerYoutubeId: "VQGCKyvzIM4",
        episodes: [
          createEpisode("demon-slayer-infinity-castle", "ds-s1", 1, 1, "Crueldade", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg", "Tanjiro retorna para casa e descobre sua família assassinada por um demônio faminto.", "VQGCKyvzIM4"),
          createEpisode("demon-slayer-infinity-castle", "ds-s1", 1, 19, "Hinokami", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg", "Na montanha Natagumo, a Dança do Deus do Fogo desperta na lâmina de Tanjiro contra Rui.", "d9MyW72ELq0"),
        ],
      },
      {
        id: "ds-s2",
        animeId: "demon-slayer-infinity-castle",
        seasonNumber: 2,
        title: "Temporada 2: Trem Infinito & Distrito do Entretenimento",
        year: 2021,
        synopsis: "O Hashira das Chamas Kyojuro Rengoku e a missão infiltração com o Hashira do Som Tengen Uzui.",
        episodesCount: 18,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
        trailerYoutubeId: "t6MXHse6-Ro",
        episodes: [
          createEpisode("demon-slayer-infinity-castle", "ds-s2", 2, 1, "O Hashira das Chamas", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg", "Rengoku embarca no Trem Infinito onde mais de 40 passageiros desapareceram misteriosamente.", "t6MXHse6-Ro"),
          createEpisode("demon-slayer-infinity-castle", "ds-s2", 2, 8, "Infiltração no Distrito das Flores", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg", "Tengen Uzui convoca Tanjiro, Zenitsu e Inosuke para resgatar suas esposas shinobi.", "pZf3Y_u8Q2k"),
        ],
      },
      {
        id: "ds-s3",
        animeId: "demon-slayer-infinity-castle",
        seasonNumber: 3,
        title: "Temporada 3: Vila dos Ferreiros",
        year: 2023,
        synopsis: "Tanjiro viaja à vila secreta das espadas Nichirin e defende o local ao lado dos Hashiras Muichiro e Mitsuri.",
        episodesCount: 11,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
        trailerYoutubeId: "G9h3qX_B5vQ",
        episodes: [
          createEpisode("demon-slayer-infinity-castle", "ds-s3", 3, 1, "O Sonho de Alguém", "49m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg", "A reunião das Luas Superiores na dimensão infinita e a busca pela lâmina secreta ancestral.", "G9h3qX_B5vQ"),
        ],
      },
      {
        id: "ds-s4",
        animeId: "demon-slayer-infinity-castle",
        seasonNumber: 4,
        title: "Temporada 4: Treinamento dos Hashiras",
        year: 2024,
        synopsis: "Todos os Caçadores passam por um treinamento de resistência e força extrema sob a tutela de cada Hashira.",
        episodesCount: 8,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
        trailerYoutubeId: "0b_p6gU8Z8Q",
        episodes: [
          createEpisode("demon-slayer-infinity-castle", "ds-s4", 4, 1, "Para Derrotar Muzan Kibutsuji", "44m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg", "Sanemi e Iguro encontram o portal dimensional enquanto a reunião de emergência dos Hashiras é convocada.", "0b_p6gU8Z8Q"),
        ],
      },
      {
        id: "ds-s5",
        animeId: "demon-slayer-infinity-castle",
        seasonNumber: 5,
        title: "Temporada 5: O Castelo Infinito (Trilogia Final)",
        year: 2026,
        synopsis: "O confronto supremo entre os Caçadores de Demônios e Muzan Kibutsuji na dimensão do Castelo Infinito.",
        episodesCount: 3,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
        trailerYoutubeId: "V0Q_41m5Vn8",
        episodes: [
          createEpisode("demon-slayer-infinity-castle", "ds-s5", 5, 1, "Queda no Abismo Infinito", "95m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg", "O ataque surpresa de Muzan à residência Ubuyashiki desencadeia a queda de todos os Caçadores no Castelo Infinito.", "V0Q_41m5Vn8"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 5. TOWER OF GOD (2 Temporadas)
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
    episodesCount: 39,
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
    malId: 40221,
    anilistId: 115230,
    seasons: [
      {
        id: "tog-s1",
        animeId: "tower-of-god",
        seasonNumber: 1,
        title: "Temporada 1: O Andar de Testes de Evankhell",
        year: 2020,
        synopsis: "Bam abre os portões da Torre em busca de Rachel e supera as provas com o auxílio de Khun Aguero e Rak.",
        episodesCount: 13,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx115230-QHOdSN7yt8ab.jpg",
        trailerYoutubeId: "O9-n56s74L8",
        episodes: [
          createEpisode("tower-of-god", "tog-s1", 1, 1, "A Bola do Dragão", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/115230-wjDIxW77TLv3.jpg", "O guardião Headon desafia o jovem irregular Bam no primeiro andar em troca da lendária Março Negro.", "O9-n56s74L8"),
        ],
      },
      {
        id: "tog-s2",
        animeId: "tower-of-god",
        seasonNumber: 2,
        title: "Temporada 2: O Retorno do Príncipe & Batalha da Oficina",
        year: 2024,
        synopsis: "Ja Wangnan e os regulares do 20º andar se deparam com Jyu Viole Grace, o misterioso assassino da FUG.",
        episodesCount: 26,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx115230-QHOdSN7yt8ab.jpg",
        trailerYoutubeId: "uK7p0w8M2qE",
        episodes: [
          createEpisode("tower-of-god", "tog-s2", 2, 1, "O 20º Andar", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/115230-wjDIxW77TLv3.jpg", "Ja Wangnan tenta desesperadamente passar no teste de ascensão do 20º andar quando cruza o caminho de Viole.", "uK7p0w8M2qE"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 6. KAIJU NO. 8 (2 Temporadas)
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
    episodesCount: 24,
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
    malId: 52588,
    anilistId: 153288,
    seasons: [
      {
        id: "kj8-s1",
        animeId: "kaiju-no-8",
        seasonNumber: 1,
        title: "Temporada 1: O Homem Que Se Tornou um Kaiju",
        year: 2024,
        synopsis: "Kafka Hibino tenta ingressar na Terceira Divisão da Força de Defesa sob o comando de Mina Ashiro.",
        episodesCount: 12,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg",
        trailerYoutubeId: "Cmx_Xh8Gz_U",
        episodes: [
          createEpisode("kaiju-no-8", "kj8-s1", 1, 1, "O Homem Que Se Tornou um Kaiju", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg", "Kafka Hibino trabalha na limpeza pesada de carcaças de monstros gigantes até que um encontro hospitalar muda seu destino.", "Cmx_Xh8Gz_U"),
        ],
      },
      {
        id: "kj8-s2",
        animeId: "kaiju-no-8",
        seasonNumber: 2,
        title: "Temporada 2: O Julgamento de Kafka",
        year: 2025,
        synopsis: "A diretoria geral da Força de Defesa decide se Kafka será tratado como arma ou executado como criatura hostil.",
        episodesCount: 12,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg",
        trailerYoutubeId: "Cmx_Xh8Gz_U",
        episodes: [
          createEpisode("kaiju-no-8", "kj8-s2", 2, 1, "Arma Humana", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg", "O Comandante Shinomiya testa o limite do coração de Kafka em um combate de vida ou morte.", "w8k0N_j2P1Q"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 7. SPY X FAMILY (2 Temporadas)
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
    episodesCount: 37,
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
    malId: 50265,
    anilistId: 140960,
    seasons: [
      {
        id: "sxf-s1",
        animeId: "spy-x-family",
        seasonNumber: 1,
        title: "Temporada 1: Operação Strix",
        year: 2022,
        synopsis: "Twilight adota Anya e se casa com Yor Forger para matricular a menina no prestigioso Colégio Eden.",
        episodesCount: 25,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg",
        trailerYoutubeId: "CCXLMq4vWng",
        episodes: [
          createEpisode("spy-x-family", "sxf-s1", 1, 1, "Operação Strix", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg", "Twilight adota a pequena Anya no orfanato sem desconfiar que ela conhece sua verdadeira identidade secreta.", "CCXLMq4vWng"),
        ],
      },
      {
        id: "sxf-s2",
        animeId: "spy-x-family",
        seasonNumber: 2,
        title: "Temporada 2: Aventura no Cruzeiro Princess Lorelei",
        year: 2023,
        synopsis: "Yor assume a guarda de uma família alvo de assassinos profissionais a bordo de um cruzeiro de luxo.",
        episodesCount: 12,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg",
        trailerYoutubeId: "CCXLMq4vWng",
        episodes: [
          createEpisode("spy-x-family", "sxf-s2", 2, 1, "Seguindo os Passos da Mãe", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg", "Anya e Loid tentam desfrutar as atrações do navio enquanto Yor protege sua cliente nas sombras.", "HqWpZ3tqA_0"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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

  // 8. CHAINSAW MAN (2 Temporadas)
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
    episodesCount: 13,
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
    malId: 44511,
    anilistId: 127230,
    seasons: [
      {
        id: "csm-s1",
        animeId: "chainsaw-man",
        seasonNumber: 1,
        title: "Temporada 1: Divisão Especial de Segurança Pública 4",
        year: 2022,
        synopsis: "Makima recruta Denji para a Segurança Pública ao lado de Aki Hayakawa e a demônio do sangue Power.",
        episodesCount: 12,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png",
        trailerYoutubeId: "v4yLeNt-kCU",
        episodes: [
          createEpisode("chainsaw-man", "csm-s1", 1, 1, "Cão e Motosserra", "24m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg", "Traído pela Yakuza, Denji faz um pacto com seu fiel companheiro Pochita e renasce como o Homem-Motosserra.", "v4yLeNt-kCU"),
        ],
      },
      {
        id: "csm-s2",
        animeId: "chainsaw-man",
        seasonNumber: 2,
        title: "Temporada 2: O Demônio da Bomba (Arco da Reze)",
        year: 2025,
        synopsis: "Denji conhece Reze em uma cafeteria durante uma tempestade sem desconfiar das explosões que estão por vir.",
        episodesCount: 1,
        poster: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png",
        trailerYoutubeId: "q15CRdE5Bv0",
        episodes: [
          createEpisode("chainsaw-man", "csm-s2", 2, 1, "Garota da Chuva", "98m", "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg", "A relação inocente entre Denji e Reze se transforma na mais violenta batalha pirotécnica da cidade.", "q15CRdE5Bv0"),
        ],
      },
    ],
    get episodes() {
      return this.seasons.flatMap((s) => s.episodes);
    },
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
