import type { NewsItem } from "@/hooks/useCatalog";
import { expandNewsToDeepReport } from "./newsExpander";

export interface SyndicatedNewsItem extends NewsItem {
  source_name?: string;
  source_url?: string;
  read_time?: number;
  is_syndicated?: boolean;
  word_count?: number;
  key_takeaways?: string[];
}

const STORAGE_KEY = "worscoi_syndicated_news_v7";
const LAST_SYNC_KEY = "worscoi_news_last_sync_v7";
const SYNC_INTERVAL_MS = 8 * 60 * 1000; // 8 minutes cache TTL

/** Clear legacy versions from localStorage */
const clearLegacyCache = () => {
  if (typeof window === "undefined") return;
  try {
    for (let i = 1; i <= 6; i++) {
      localStorage.removeItem(`worscoi_syndicated_news_v${i}`);
      localStorage.removeItem(`worscoi_news_last_sync_v${i}`);
    }
    localStorage.removeItem("worscoi_news_last_sync");
  } catch {}
};

/** Get cached news from localStorage */
export const getCachedNews = (): SyndicatedNewsItem[] => {
  if (typeof window === "undefined") return [];
  clearLegacyCache();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item) => {
        // Guarantee every item has deep report depth
        if (!item.content || item.content.length < 1200 || !item.content.includes("### ")) {
          return expandNewsToDeepReport(item);
        }
        return item;
      });
    }
    return [];
  } catch {
    return [];
  }
};

/** Save news to localStorage */
export const setCachedNews = (items: SyndicatedNewsItem[]) => {
  if (typeof window === "undefined") return;
  try {
    const enriched = items.map((it) => expandNewsToDeepReport(it));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
    localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
    window.dispatchEvent(new Event("worscoi_news_synced"));
  } catch {
    // Ignore storage quota
  }
};

export const getLastSyncTime = (): Date | null => {
  if (typeof window === "undefined") return null;
  const time = localStorage.getItem(LAST_SYNC_KEY);
  return time ? new Date(parseInt(time, 10)) : null;
};

/**
 * Fetch automatic daily news with authentic matching covers and multi-paragraph content.
 */
export async function syncDailyNews(force = false): Promise<SyndicatedNewsItem[]> {
  const lastSync = getLastSyncTime();
  const cached = getCachedNews();

  // Return cached if still fresh and not forcing refresh
  if (!force && cached.length > 0 && lastSync && Date.now() - lastSync.getTime() < SYNC_INTERVAL_MS) {
    return cached;
  }

  const topics = [
    { topic: "animes", limit: 30 },
    { topic: "mangas", limit: 25 },
    { topic: "webtoons", limit: 20 },
    { topic: "games", limit: 30 },
    { topic: "tecnologias", limit: 35 },
    { topic: "cultura", limit: 25 },
    { topic: "livros", limit: 25 },
  ];

  const allItems: SyndicatedNewsItem[] = [];

  // Call the Vite server /api/news/feed endpoint in parallel
  try {
    const fetchPromises = topics.map(async (t) => {
      try {
        const res = await fetch(`/api/news/feed?topic=${t.topic}&limit=${t.limit}`);
        if (res.ok) {
          const data = await res.json();
          return (Array.isArray(data.items) ? data.items : []) as SyndicatedNewsItem[];
        }
      } catch {
        return [] as SyndicatedNewsItem[];
      }
      return [] as SyndicatedNewsItem[];
    });

    const results = await Promise.all(fetchPromises);
    const seen = new Set<string>();

    for (const batch of results) {
      for (const item of batch) {
        const key = (item.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        if (!seen.has(key) && key.length > 5) {
          seen.add(key);
          allItems.push(item);
        }
      }
    }
  } catch {
    // Fallback if endpoint fails
  }

  if (allItems.length > 0) {
    // Sort most recent first
    allItems.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    setCachedNews(allItems);
    return allItems;
  }

  return cached;
}
