/**
 * MangaDex & Tomato Manga Platform Client
 * Provides official manga metadata, dynamic chapter feeds, and at-home CDN page resolution
 * for all anime series on Worscoi.
 */

export interface MangaDexChapter {
  id: string;
  number: string;
  numericNumber: number;
  title: string;
  volume?: string;
  pagesCount: number;
  translatedLanguage: string;
  scanlationGroup: string;
  publishAt: string;
  isExternal?: boolean;
  externalUrl?: string | null;
  isFree: boolean;
}

export interface AnimeMangaHubConfig {
  animeId: string;
  mangadexId: string;
  canonicalTitle: string;
  japaneseTitle: string;
  author: string;
  artist: string;
  publisher: string;
  serialization: string;
  status: "Em publicação" | "Completo" | "Hiato";
  officialCover: string;
  totalChaptersEstimate: number;
  defaultLanguage: "pt-br" | "en" | "all";
  initialChapters: {
    id: string;
    number: number;
    title: string;
    pagesCount: number;
    pages?: string[];
    description: string;
    releaseDate: string;
    isFree: boolean;
    mangadexChapterId?: string;
  }[];
}

// Helper to generate local page paths
const localPages = (basePath: string, count: number): string[] => {
  return Array.from({ length: count }, (_, i) => `${basePath}/page-${i + 1}.jpg`);
};

export const ANIME_MANGA_CONFIGS: Record<string, AnimeMangaHubConfig> = {
  "solo-leveling": {
    animeId: "solo-leveling",
    mangadexId: "32d76d19-8a05-4db0-9fc2-e0b0648fe9d0",
    canonicalTitle: "Solo Leveling (Na Honjaman Level-Up)",
    japaneseTitle: "나 혼자만 레벨업",
    author: "Chugong",
    artist: "DUBU (REDICE Studio)",
    publisher: "D&C Media / KakaoPage",
    serialization: "KakaoPage Webtoon",
    status: "Completo",
    officialCover: "https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/dc37c1fb-5ead-4a7c-933f-811193c0cc7e.jpg",
    totalChaptersEstimate: 179,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "sl-cap-1",
        number: 1,
        title: "Capítulo 1: O Caçador Mais Fraco da Humanidade",
        pagesCount: 27,
        pages: localPages("/chapters/solo-leveling/ep-1", 27),
        description: "Sung Jinwoo e seu grupo entram na temida dungeon dupla no Templo de Cartenon, encarando as estátuas colossais.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "08bfe070-e9e6-4b61-a781-1ab708e9755a",
      },
      {
        id: "sl-cap-2",
        number: 2,
        title: "Capítulo 2: Os Mandamentos do Templo de Cartenon",
        pagesCount: 22,
        pages: localPages("/chapters/solo-leveling/ep-2", 22),
        description: "As regras do templo são reveladas enquanto as estátuas esmagam impiedosamente os caçadores desesperados.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "7252aa87-ac47-4bef-aa2f-3c4cac5f0885",
      },
      {
        id: "sl-cap-3",
        number: 3,
        title: "Capítulo 3: O Despertar do Único Jogador",
        pagesCount: 33,
        pages: localPages("/chapters/solo-leveling/ep-3", 33),
        description: "À beira do sacrifício final, a misteriosa tela de log do Sistema surge diante dos olhos de Jinwoo.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "e2f6b03c-9551-4ee5-8017-89bbc20c9952",
      },
    ],
  },
  "frieren-beyond-journeys-end": {
    animeId: "frieren-beyond-journeys-end",
    mangadexId: "b0b721ff-c388-4486-aa0f-c2b0bb321512",
    canonicalTitle: "Sousou no Frieren (Frieren e a Jornada Para o Além)",
    japaneseTitle: "葬送のフリーレン",
    author: "Kanehito Yamada",
    artist: "Tsukasa Abe",
    publisher: "Shogakukan",
    serialization: "Weekly Shōnen Sunday",
    status: "Em publicação",
    officialCover: "https://uploads.mangadex.org/covers/b0b721ff-c388-4486-aa0f-c2b0bb321512/b9a049b0-186b-4714-a83e-bb965458914a.jpg",
    totalChaptersEstimate: 145,
    defaultLanguage: "all",
    initialChapters: [
      {
        id: "fri-cap-1",
        number: 1,
        title: "Capítulo 1: O Fim da Aventura e a Passagem das Eras",
        pagesCount: 52,
        description: "Após derrotarem o Rei Demônio em uma marcha de 10 anos, a maga elfa Frieren testemunha a brevidade da vida de seus companheiros mortais.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "a1105d32-6fd4-4b42-bf29-3b69e6a6ffab",
      },
      {
        id: "fri-cap-2",
        number: 2,
        title: "Capítulo 2: A Mentira do Sacerdote e o Aprendizado de Fern",
        pagesCount: 28,
        description: "Heiter confia a jovem órfã Fern aos cuidados de Frieren para decifrar um grimório lendário.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "db0d5822-0a6f-4166-86bb-83985ecb8d7c",
      },
    ],
  },
  "jujutsu-kaisen-culling-game": {
    animeId: "jujutsu-kaisen-culling-game",
    mangadexId: "c52b2ce3-7f95-469c-96b0-479524fb7a1a",
    canonicalTitle: "Jujutsu Kaisen (Batalha de Feiticeiros)",
    japaneseTitle: "呪術廻戦",
    author: "Gege Akutami",
    artist: "Gege Akutami",
    publisher: "Shueisha",
    serialization: "Weekly Shōnen Jump",
    status: "Completo",
    officialCover: "https://uploads.mangadex.org/covers/c52b2ce3-7f95-469c-96b0-479524fb7a1a/6d9134b2-21ea-4d02-ac2b-7c0d1c6a2aaa.jpg",
    totalChaptersEstimate: 271,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "jjk-cap-1",
        number: 1,
        title: "Capítulo 1: Ryomen Sukuna",
        pagesCount: 54,
        description: "Yuji Itadori engole o dedo amaldiçoado de Ryomen Sukuna para salvar seus colegas de escola do ataque de maldições.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "a1477730-c9e2-4b34-b9f9-d28d7de7b8e5",
      },
      {
        id: "jjk-cap-2",
        number: 2,
        title: "Capítulo 2: Condenação Secreta",
        pagesCount: 24,
        description: "Satoru Gojo intervém junto aos superiores do Colégio Jujutsu de Tóquio para adiar a execução de Itadori.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "77a83406-d74a-4b95-a24c-9f8cefc2911b",
      },
    ],
  },
  "demon-slayer-infinity-castle": {
    animeId: "demon-slayer-infinity-castle",
    mangadexId: "789642f8-ca89-4e4e-8f7b-eee4d17ea08b",
    canonicalTitle: "Demon Slayer: Kimetsu no Yaiba",
    japaneseTitle: "鬼滅の刃",
    author: "Koyoharu Gotouge",
    artist: "Koyoharu Gotouge",
    publisher: "Shueisha",
    serialization: "Weekly Shōnen Jump",
    status: "Completo",
    officialCover: "https://uploads.mangadex.org/covers/789642f8-ca89-4e4e-8f7b-eee4d17ea08b/60530e72-f76f-45d5-b6f9-f95e05058fc3.png",
    totalChaptersEstimate: 205,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "kmy-cap-1",
        number: 1,
        title: "Capítulo 1: Crueldade na Neve",
        pagesCount: 55,
        description: "Tanjiro Kamado encontra sua família assassinada na montanha e sua irmã Nezuko transformada em demônio faminto.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "39b285bd-6cd1-467e-9cf5-80c45603abdd",
      },
      {
        id: "kmy-cap-2",
        number: 2,
        title: "Capítulo 2: O Estranho da Montanha",
        pagesCount: 24,
        description: "O Hashira da Água Giyu Tomioka poupa Nezuko e envia Tanjiro ao treinamento de Sakonji Urokodaki.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "a9be1a5d-4f18-498c-9a4f-50608fa8bfcb",
      },
    ],
  },
  "tower-of-god": {
    animeId: "tower-of-god",
    mangadexId: "c0ee660b-f9f2-45c3-8068-5123ff53f84a",
    canonicalTitle: "Tower of God (Sin-ui Tap)",
    japaneseTitle: "신의 탑",
    author: "SIU",
    artist: "SIU",
    publisher: "Naver / Webtoon",
    serialization: "Naver Webtoon",
    status: "Em publicação",
    officialCover: "https://uploads.mangadex.org/covers/c0ee660b-f9f2-45c3-8068-5123ff53f84a/311cf373-290a-47f6-a3f1-5d7c4085c5b2.jpg",
    totalChaptersEstimate: 600,
    defaultLanguage: "all",
    initialChapters: [
      {
        id: "tog-cap-1",
        number: 1,
        title: "Capítulo 1: O Andar de Headon — O Guardião da Torre",
        pagesCount: 45,
        description: "Vinte-e-Quinto Bam abre os portões colossais da Torre para seguir Rachel e encara o teste mortal da enguia de ferro.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "4fa83460-705b-43fb-bfd7-e23a41e9c5aa",
      },
    ],
  },
  "kaiju-no-8": {
    animeId: "kaiju-no-8",
    mangadexId: "237d527f-adb5-420e-8e6e-b7dd006fbe47",
    canonicalTitle: "Kaiju No. 8 (Monster #8)",
    japaneseTitle: "怪獣8号",
    author: "Naoya Matsumoto",
    artist: "Naoya Matsumoto",
    publisher: "Shueisha",
    serialization: "Shōnen Jump+",
    status: "Em publicação",
    officialCover: "https://uploads.mangadex.org/covers/237d527f-adb5-420e-8e6e-b7dd006fbe47/f48790fc-547c-4a10-8bef-56a373ddbb1c.jpg",
    totalChaptersEstimate: 115,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "kj8-cap-1",
        number: 1,
        title: "Capítulo 1: O Faxineiro e o Monstro Interior",
        pagesCount: 56,
        description: "Kafka Hibino, trabalhador de limpeza de carcaças de monstros, é infectado por uma criatura parasita e se transforma no Kaiju No. 8.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "b84a5faa-0b5b-4d66-926f-05d2cb9a49b8",
      },
    ],
  },
  "spy-x-family": {
    animeId: "spy-x-family",
    mangadexId: "6b958848-c885-4735-9201-12ee77abcb3c",
    canonicalTitle: "SPY×FAMILY (Espião e Família)",
    japaneseTitle: "スパイファミリー",
    author: "Tatsuya Endo",
    artist: "Tatsuya Endo",
    publisher: "Shueisha",
    serialization: "Shōnen Jump+",
    status: "Em publicação",
    officialCover: "https://uploads.mangadex.org/covers/6b958848-c885-4735-9201-12ee77abcb3c/165260a4-6d0e-4164-966a-b7412a5b8a15.jpg",
    totalChaptersEstimate: 105,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "sxf-cap-1",
        number: 1,
        title: "Missão 1: Operação Família Strix",
        pagesCount: 71,
        description: "O lendário espião Twilight precisa adotar uma criança para se infiltrar na Academia Eden, sem desconfiar que a pequena Anya lê pensamentos.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "c0d15a9c-815f-4efa-887d-2db6a9463f6c",
      },
    ],
  },
  "chainsaw-man": {
    animeId: "chainsaw-man",
    mangadexId: "a77742b1-befd-49a4-bff5-1ad4e6b0ef7b",
    canonicalTitle: "Chainsaw Man (O Homem-Motosserra)",
    japaneseTitle: "チェンソーマン",
    author: "Tatsuki Fujimoto",
    artist: "Tatsuki Fujimoto",
    publisher: "Shueisha",
    serialization: "Weekly Shōnen Jump / Shōnen Jump+",
    status: "Em publicação",
    officialCover: "https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/6e518bd1-5f60-446b-8832-bfe6bf74834b.jpg",
    totalChaptersEstimate: 185,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "csm-cap-1",
        number: 1,
        title: "Capítulo 1: Cão e Motosserra",
        pagesCount: 56,
        description: "Denji vive na miséria vendendo partes do corpo para a Yakuza, até que o Demônio da Motosserra Pochita se funde ao seu coração.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "16b99098-f939-45f5-abc7-f4dc1e5e222a",
      },
    ],
  },
};

// In-memory cache for chapters and pages to ensure lightning speed
const chaptersMemoryCache = new Map<string, MangaDexChapter[]>();
const pagesMemoryCache = new Map<string, { baseUrl: string; hash: string; pages: string[] }>();

/**
 * Fetches chapters directly from MangaDex API with language filtering and smart sorting
 */
export async function fetchMangaDexChapters(
  mangadexId: string,
  languageFilter: "pt-br" | "en" | "all" = "all"
): Promise<MangaDexChapter[]> {
  const cacheKey = `${mangadexId}-${languageFilter}`;
  if (chaptersMemoryCache.has(cacheKey)) {
    return chaptersMemoryCache.get(cacheKey)!;
  }

  try {
    let res: Response | null = null;
    try {
      res = await fetch(`/api/mangadex/feed?mangaId=${mangadexId}&lang=${languageFilter}&limit=100`);
    } catch {
      res = null;
    }

    if (!res || !res.ok) {
      let directUrl = `https://api.mangadex.org/manga/${mangadexId}/feed?order[chapter]=asc&limit=100&includes[]=scanlation_group`;
      if (languageFilter === "pt-br") {
        directUrl += "&translatedLanguage[]=pt-br&translatedLanguage[]=pt";
      } else if (languageFilter === "en") {
        directUrl += "&translatedLanguage[]=en";
      }
      res = await fetch(directUrl);
    }

    if (!res.ok) {
      if (languageFilter !== "all") {
        return await fetchMangaDexChapters(mangadexId, "all");
      }
      throw new Error(`MangaDex feed error ${res.status}`);
    }

    const data = await res.json();
    const rawChapters = data.data || [];

    // Deduplicate and map
    const chapterMap = new Map<string, MangaDexChapter>();
    for (const item of rawChapters) {
      const attrs = item.attributes || {};
      const chNum = attrs.chapter || "1";
      const groupRel = item.relationships?.find((r: any) => r.type === "scanlation_group");
      const groupName = groupRel?.attributes?.name || "Oficial / Scan";

      const chapterObj: MangaDexChapter = {
        id: item.id,
        number: chNum,
        numericNumber: parseFloat(chNum) || 0,
        title: attrs.title || `Capítulo ${chNum}`,
        volume: attrs.volume || undefined,
        pagesCount: attrs.pages || 0,
        translatedLanguage: attrs.translatedLanguage || "en",
        scanlationGroup: groupName,
        publishAt: attrs.publishAt ? new Date(attrs.publishAt).toLocaleDateString("pt-BR") : "2024",
        isExternal: !!attrs.externalUrl,
        externalUrl: attrs.externalUrl || null,
        isFree: true,
      };

      const existing = chapterMap.get(chNum);
      if (!existing || attrs.translatedLanguage === "pt-br" || attrs.translatedLanguage === "pt") {
        chapterMap.set(chNum, chapterObj);
      }
    }

    const chapters = Array.from(chapterMap.values()).sort(
      (a, b) => a.numericNumber - b.numericNumber
    );

    chaptersMemoryCache.set(cacheKey, chapters);
    return chapters;
  } catch (err) {
    console.warn("MangaDex chapter fetch fallback:", err);
    return [];
  }
}

/**
 * Resolves high resolution page images for a MangaDex chapter
 */
export async function fetchMangaDexChapterPages(
  chapterId: string,
  quality: "data" | "dataSaver" = "data"
): Promise<{ baseUrl: string; hash: string; pages: string[] }> {
  const cacheKey = `${chapterId}-${quality}`;
  if (pagesMemoryCache.has(cacheKey)) {
    return pagesMemoryCache.get(cacheKey)!;
  }

  let res: Response | null = null;
  try {
    res = await fetch(`/api/mangadex/server?chapterId=${chapterId}`);
  } catch {
    res = null;
  }

  if (!res || !res.ok) {
    res = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
  }

  if (!res.ok) {
    throw new Error(`Failed to resolve MangaDex at-home server for chapter ${chapterId}`);
  }

  const json = await res.json();
  if (json.result !== "ok" || !json.baseUrl || !json.chapter) {
    throw new Error("Invalid response from MangaDex at-home network");
  }

  const { baseUrl, chapter } = json;
  const hash = chapter.hash;
  const files: string[] = quality === "dataSaver" ? (chapter.dataSaver || chapter.data) : (chapter.data || chapter.dataSaver);

  const pages = files.map((file) => `${baseUrl}/${quality === "dataSaver" ? "data-saver" : "data"}/${hash}/${file}`);

  const result = { baseUrl, hash, pages };
  pagesMemoryCache.set(cacheKey, result);
  return result;
}
