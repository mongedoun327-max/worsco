/**
 * MangaDex, MangaPill & Webtoon Multi-Source Integration Engine
 * Provides authentic official manga metadata, dynamic chapter feeds, and high-speed proxied page streams
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
  chapterUrl?: string;
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
    chapterUrl?: string;
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    totalChaptersEstimate: 152,
    defaultLanguage: "all",
    initialChapters: [
      {
        id: "fri-cap-1",
        number: 1,
        title: "Capítulo 1: O Fim da Aventura e a Passagem das Eras",
        pagesCount: 35,
        chapterUrl: "/chapters/5035-10001000/sousou-no-frieren-chapter-1",
        description: "Após derrotarem o Rei Demônio em uma marcha de 10 anos, a maga elfa Frieren testemunha a brevidade da vida de seus companheiros mortais.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "5035-10001000-sousou-no-frieren-chapter-1",
      },
      {
        id: "fri-cap-2",
        number: 2,
        title: "Capítulo 2: A Mentira do Sacerdote e o Aprendizado de Fern",
        pagesCount: 28,
        chapterUrl: "/chapters/5035-10002000/sousou-no-frieren-chapter-2",
        description: "Heiter confia a jovem órfã Fern aos cuidados de Frieren para decifrar um grimório lendário.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "5035-10002000-sousou-no-frieren-chapter-2",
      },
      {
        id: "fri-cap-3",
        number: 3,
        title: "Capítulo 3: Flores de Lua Azul",
        pagesCount: 30,
        chapterUrl: "/chapters/5035-10003000/sousou-no-frieren-chapter-3",
        description: "Frieren e Fern chegam à vila de Turck procurando pelas raras flores azuis favoritas do herói Himmel.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "5035-10003000-sousou-no-frieren-chapter-3",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    totalChaptersEstimate: 277,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "jjk-cap-1",
        number: 1,
        title: "Capítulo 1: Ryomen Sukuna",
        pagesCount: 58,
        chapterUrl: "/chapters/2085-10001000/jujutsu-kaisen-chapter-1",
        description: "Yuji Itadori engole o dedo amaldiçoado de Ryomen Sukuna para salvar seus colegas de escola do ataque de maldições.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "2085-10001000-jujutsu-kaisen-chapter-1",
      },
      {
        id: "jjk-cap-2",
        number: 2,
        title: "Capítulo 2: Condenação Secreta",
        pagesCount: 26,
        chapterUrl: "/chapters/2085-10002000/jujutsu-kaisen-chapter-2",
        description: "Satoru Gojo intervém junto aos superiores do Colégio Jujutsu de Tóquio para adiar a execução de Itadori.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "2085-10002000-jujutsu-kaisen-chapter-2",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgLd.jpg",
    totalChaptersEstimate: 205,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "kmy-cap-1",
        number: 1,
        title: "Capítulo 1: Crueldade na Neve",
        pagesCount: 60,
        chapterUrl: "/chapters/2285-10001000/kimetsu-no-yaiba-chapter-1",
        description: "Tanjiro Kamado encontra sua família assassinada na montanha e sua irmã Nezuko transformada em demônio faminto.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "2285-10001000-kimetsu-no-yaiba-chapter-1",
      },
      {
        id: "kmy-cap-2",
        number: 2,
        title: "Capítulo 2: O Estranho da Montanha",
        pagesCount: 24,
        chapterUrl: "/chapters/2285-10002000/kimetsu-no-yaiba-chapter-2",
        description: "O Hashira da Água Giyu Tomioka poupa Nezuko e envia Tanjiro ao treinamento de Sakonji Urokodaki.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "2285-10002000-kimetsu-no-yaiba-chapter-2",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx115230-0h8rB89fK5c9.jpg",
    totalChaptersEstimate: 600,
    defaultLanguage: "all",
    initialChapters: [
      {
        id: "tog-cap-1",
        number: 1,
        title: "Capítulo 1: O Andar de Headon — O Guardião da Torre",
        pagesCount: 8,
        description: "Vinte-e-Quinto Bam abre os portões colossais da Torre para seguir Rachel e encara o teste mortal da enguia de ferro.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "tower-of-god-ep-1",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-c7X0d1a49E5Z.jpg",
    totalChaptersEstimate: 130,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "kj8-cap-1",
        number: 1,
        title: "Capítulo 1: O Faxineiro e o Monstro Interior",
        pagesCount: 54,
        chapterUrl: "/chapters/5098-10001000/kaijuu-8-gou-chapter-1",
        description: "Kafka Hibino, trabalhador de limpeza de carcaças de monstros, é infectado por uma criatura parasita e se transforma no Kaiju No. 8.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "5098-10001000-kaijuu-8-gou-chapter-1",
      },
      {
        id: "kj8-cap-2",
        number: 2,
        title: "Capítulo 2: O Despertar do Kaiju No. 8",
        pagesCount: 26,
        chapterUrl: "/chapters/5098-10002000/kaijuu-8-gou-chapter-2",
        description: "Kafka e Reno tentam escapar do hospital sem serem descobertos pela Força de Defesa Anti-Kaiju.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "5098-10002000-kaijuu-8-gou-chapter-2",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-YrkSD4SQF9iL.jpg",
    totalChaptersEstimate: 174,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "sxf-cap-1",
        number: 1,
        title: "Missão 1: Operação Família Strix",
        pagesCount: 72,
        chapterUrl: "/chapters/4143-10001000/spy-x-family-chapter-1",
        description: "O lendário espião Twilight precisa adotar uma criança para se infiltrar na Academia Eden, sem desconfiar que a pequena Anya lê pensamentos.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "4143-10001000-spy-x-family-chapter-1",
      },
      {
        id: "sxf-cap-2",
        number: 2,
        title: "Missão 2: Em Busca de uma Esposa",
        pagesCount: 28,
        chapterUrl: "/chapters/4143-10002000/spy-x-family-chapter-2",
        description: "Para comparecer à entrevista formal da escola, Twilight precisa encontrar urgentemente uma esposa para completar o disfarce familiar.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "4143-10002000-spy-x-family-chapter-2",
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
    officialCover: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-NuZtFpmDuUeJ.png",
    totalChaptersEstimate: 232,
    defaultLanguage: "pt-br",
    initialChapters: [
      {
        id: "csm-cap-1",
        number: 1,
        title: "Capítulo 1: Cão e Motosserra",
        pagesCount: 58,
        chapterUrl: "/chapters/723-10001000/chainsaw-man-chapter-1",
        description: "Denji vive na miséria vendendo partes do corpo para a Yakuza, até que o Demônio da Motosserra Pochita se funde ao seu coração.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "723-10001000-chainsaw-man-chapter-1",
      },
      {
        id: "csm-cap-2",
        number: 2,
        title: "Capítulo 2: O Lugar Onde Fica Pochita",
        pagesCount: 26,
        chapterUrl: "/chapters/723-10002000/chainsaw-man-chapter-2",
        description: "Makima leva Denji para o quartel-general da Segurança Pública de Tóquio como Caçador de Demônios oficial.",
        releaseDate: "2024",
        isFree: true,
        mangadexChapterId: "723-10002000-chainsaw-man-chapter-2",
      },
    ],
  },
};

// In-memory cache for chapters and pages to ensure lightning speed
const chaptersMemoryCache = new Map<string, MangaDexChapter[]>();
const pagesMemoryCache = new Map<string, { baseUrl: string; hash: string; pages: string[] }>();

/**
 * Universal anime manga chapter fetcher with multi-source fallback
 */
export async function fetchAnimeMangaChapters(animeId: string): Promise<MangaDexChapter[]> {
  const cacheKey = `anime_${animeId}`;
  if (chaptersMemoryCache.has(cacheKey)) {
    return chaptersMemoryCache.get(cacheKey)!;
  }

  // Special Case 1: Tower of God on Webtoon
  if (animeId === "tower-of-god") {
    try {
      const res = await fetch("/api/webtoon/official-chapters?titleNo=95&genre=fantasy&slug=tower-of-god");
      if (res.ok) {
        const data = await res.json();
        const chaps: MangaDexChapter[] = (data.chapters || []).map((c: any) => ({
          id: c.id,
          number: String(c.number),
          numericNumber: c.number,
          title: c.title,
          pagesCount: c.panels_count || 12,
          translatedLanguage: "PT-BR / OFICIAL",
          scanlationGroup: "Webtoon Oficial",
          publishAt: c.release_date || "2024",
          isFree: true,
          externalUrl: c.viewer_url || null,
        }));
        if (chaps.length > 0) {
          chaps.sort((a, b) => a.numericNumber - b.numericNumber);
          chaptersMemoryCache.set(cacheKey, chaps);
          return chaps;
        }
      }
    } catch (err) {
      console.warn("Tower of god chapters fallback:", err);
    }
  }

  // Primary Path: High-speed Manga catalog (/api/manga/chapters)
  try {
    const res = await fetch(`/api/manga/chapters?animeId=${animeId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.chapters) && data.chapters.length > 0) {
        const chaps: MangaDexChapter[] = data.chapters.map((c: any) => ({
          id: c.id,
          number: String(c.number),
          numericNumber: c.number,
          title: c.title || `Capítulo ${c.number}`,
          pagesCount: 35,
          translatedLanguage: "PT-BR / OFICIAL",
          scanlationGroup: "Edição Oficial",
          publishAt: "2024",
          isFree: true,
          chapterUrl: c.chapterUrl,
        }));
        chaps.sort((a, b) => a.numericNumber - b.numericNumber);
        chaptersMemoryCache.set(cacheKey, chaps);
        return chaps;
      }
    }
  } catch (err) {
    console.warn("Multi-source manga chapter fetch error:", err);
  }

  // Fallback: Initial pre-configured chapters
  const config = ANIME_MANGA_CONFIGS[animeId];
  if (config && config.initialChapters.length > 0) {
    const fallbackList: MangaDexChapter[] = config.initialChapters.map((ch) => ({
      id: ch.id,
      number: String(ch.number),
      numericNumber: ch.number,
      title: ch.title,
      pagesCount: ch.pagesCount,
      translatedLanguage: "PT-BR",
      scanlationGroup: "Oficial",
      publishAt: ch.releaseDate,
      isFree: ch.isFree,
      chapterUrl: ch.chapterUrl,
    }));
    return fallbackList;
  }

  return [];
}

/**
 * Universal anime manga pages resolver with multi-source fallback
 */
export async function fetchAnimeMangaPages(
  animeId: string,
  chapterIdentifier: string,
  chapterNumber?: number
): Promise<{ baseUrl: string; hash: string; pages: string[] }> {
  const cacheKey = `${animeId}-${chapterIdentifier}-${chapterNumber || 1}`;
  if (pagesMemoryCache.has(cacheKey)) {
    return pagesMemoryCache.get(cacheKey)!;
  }

  // Check if it matches a pre-configured initial chapter with local pages (e.g. Solo Leveling)
  const config = ANIME_MANGA_CONFIGS[animeId];
  if (config) {
    const matchedInitial = config.initialChapters.find(
      (c) =>
        c.id === chapterIdentifier ||
        c.chapterUrl === chapterIdentifier ||
        c.number === chapterNumber ||
        c.mangadexChapterId === chapterIdentifier
    );
    if (matchedInitial?.pages && matchedInitial.pages.length > 0) {
      const result = { baseUrl: "", hash: "local", pages: matchedInitial.pages };
      pagesMemoryCache.set(cacheKey, result);
      return result;
    }
  }

  // Special Case: Tower of God on Webtoon
  if (animeId === "tower-of-god") {
    try {
      const epNum = chapterNumber || 1;
      const res = await fetch(`/api/webtoon/pages?titleNo=95&genre=fantasy&slug=tower-of-god&episodeNo=${epNum}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.pages) && data.pages.length > 0) {
          const proxied = data.pages.map((p: string) =>
            p.startsWith("/api/proxy/") ? p : `/api/proxy/webtoon-image?url=${encodeURIComponent(p)}`
          );
          const result = { baseUrl: "", hash: "webtoon", pages: proxied };
          pagesMemoryCache.set(cacheKey, result);
          return result;
        }
      }
    } catch (err) {
      console.warn("Tower of God pages fetch error:", err);
    }
  }

  // Primary Path: Scrape high-res manga chapter pages via /api/manga/pages
  try {
    let query = "";
    if (chapterIdentifier.startsWith("/chapters/") || chapterIdentifier.includes("-chapter-")) {
      const cleanUrl = chapterIdentifier.startsWith("/chapters/")
        ? chapterIdentifier
        : `/chapters/${chapterIdentifier.replace(/-/g, "/")}`;
      query = `chapterUrl=${encodeURIComponent(cleanUrl)}`;
    } else {
      query = `animeId=${encodeURIComponent(animeId)}&chapterNumber=${chapterNumber || 1}`;
    }

    const res = await fetch(`/api/manga/pages?${query}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.pages) && data.pages.length > 0) {
        const result = { baseUrl: "", hash: "manga", pages: data.pages };
        pagesMemoryCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (err) {
    console.warn("Manga pages API fetch error:", err);
  }

  // Fallback to legacy MangaDex at-home proxy if an authentic UUID is passed
  if (chapterIdentifier.length === 36 && chapterIdentifier.includes("-")) {
    try {
      const res = await fetch(`/api/mangadex/server?chapterId=${chapterIdentifier}`);
      if (res.ok) {
        const json = await res.json();
        if (json.result === "ok" && json.baseUrl && json.chapter) {
          const { baseUrl, chapter } = json;
          const hash = chapter.hash;
          const files: string[] = chapter.data || chapter.dataSaver || [];
          const pages = files.map(
            (file) => `/api/proxy/manga-image?url=${encodeURIComponent(`${baseUrl}/data/${hash}/${file}`)}`
          );
          if (pages.length > 0) {
            const result = { baseUrl, hash, pages };
            pagesMemoryCache.set(cacheKey, result);
            return result;
          }
        }
      }
    } catch {}
  }

  throw new Error("Não foi possível carregar as páginas do capítulo selecionado.");
}

/**
 * Backward-compatible MangaDex chapter fetcher that delegates to universal multi-source engine
 */
export async function fetchMangaDexChapters(
  mangadexId: string,
  languageFilter: "pt-br" | "en" | "all" = "all"
): Promise<MangaDexChapter[]> {
  // Check if mangadexId corresponds to any known anime
  let matchedAnimeId = "";
  for (const [animeId, conf] of Object.entries(ANIME_MANGA_CONFIGS)) {
    if (conf.mangadexId === mangadexId || animeId === mangadexId) {
      matchedAnimeId = animeId;
      break;
    }
  }

  if (matchedAnimeId) {
    return await fetchAnimeMangaChapters(matchedAnimeId);
  }

  // Otherwise query MangaDex feed proxy
  try {
    const res = await fetch(`/api/mangadex/feed?mangaId=${mangadexId}&lang=${languageFilter}&limit=100`);
    if (res.ok) {
      const data = await res.json();
      const rawChapters = data.data || [];
      const chapterMap = new Map<string, MangaDexChapter>();
      for (const item of rawChapters) {
        const attrs = item.attributes || {};
        const chNum = attrs.chapter || "1";
        const chapterObj: MangaDexChapter = {
          id: item.id,
          number: chNum,
          numericNumber: parseFloat(chNum) || 0,
          title: attrs.title || `Capítulo ${chNum}`,
          volume: attrs.volume || undefined,
          pagesCount: attrs.pages || 0,
          translatedLanguage: attrs.translatedLanguage || "en",
          scanlationGroup: "Scan Oficial",
          publishAt: attrs.publishAt ? new Date(attrs.publishAt).toLocaleDateString("pt-BR") : "2024",
          isFree: true,
        };
        chapterMap.set(chNum, chapterObj);
      }
      return Array.from(chapterMap.values()).sort((a, b) => a.numericNumber - b.numericNumber);
    }
  } catch {}

  return [];
}

/**
 * Backward-compatible MangaDex pages resolver that delegates to universal multi-source engine
 */
export async function fetchMangaDexChapterPages(
  chapterId: string,
  quality: "data" | "dataSaver" = "data"
): Promise<{ baseUrl: string; hash: string; pages: string[] }> {
  // Check if this chapterId belongs to any known anime config
  for (const [animeId, conf] of Object.entries(ANIME_MANGA_CONFIGS)) {
    const found = conf.initialChapters.find(
      (c) => c.id === chapterId || c.mangadexChapterId === chapterId || c.chapterUrl === chapterId
    );
    if (found) {
      return await fetchAnimeMangaPages(animeId, found.chapterUrl || chapterId, found.number);
    }
  }

  // Delegate directly to universal fetcher
  return await fetchAnimeMangaPages("", chapterId);
}
