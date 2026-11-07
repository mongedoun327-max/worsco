import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NewsItem } from "./useCatalog";
import { syncDailyNews, getCachedNews } from "@/lib/newsSyndication";
import { queryNewsArchive } from "@/lib/newsArchiveEngine";

const PAGE_SIZE = 16;

export interface NewsFilters {
  category?: string;
  q?: string;
  order?: "recent" | "oldest";
  year?: string;
  month?: string;
}

/** Infinite news feed combining real-time syndicated RSS, Supabase DB and Permanent Historical Archive */
export const useNewsFeed = (filters: NewsFilters) =>
  useInfiniteQuery({
    queryKey: ["news-feed", filters],
    initialPageParam: 0 as number,
    queryFn: async ({ pageParam = 0 }) => {
      // 1. Fetch live syndicated daily news
      let syndicated: NewsItem[] = [];
      try {
        syndicated = await syncDailyNews();
      } catch {
        syndicated = getCachedNews();
      }

      // 2. Fetch from Permanent Archive Engine (guarantees historical persistence & genre coverage)
      let archiveItems: NewsItem[] = [];
      try {
        const res = await queryNewsArchive({
          category: filters.category && filters.category !== "all" ? filters.category : undefined,
          q: filters.q,
          year: filters.year && filters.year !== "all" ? parseInt(filters.year) : undefined,
          month: filters.month && filters.month !== "all" ? parseInt(filters.month) : undefined,
          pageSize: 250,
        });
        archiveItems = res.items as NewsItem[];
      } catch {
        // Fallback gracefully
      }

      // 3. Fetch Supabase news
      let dbNews: NewsItem[] = [];
      try {
        const { data, error } = await supabase
          .from("news")
          .select("id,title,slug,excerpt,content,cover_url,category,published,published_at,created_at")
          .eq("published", true);
        if (!error && data) dbNews = data as NewsItem[];
      } catch {
        // Fallback gracefully
      }

      // 4. Merge & Deduplicate
      const seen = new Set<string>();
      let all: NewsItem[] = [];

      for (const item of [...syndicated, ...archiveItems, ...dbNews]) {
        const key = (item.slug || item.title || "").toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          all.push(item);
        }
      }

      // 4. Apply Category Filter
      if (filters.category && filters.category !== "all") {
        const cat = filters.category.toLowerCase();
        all = all.filter((i) => i.category?.toLowerCase() === cat);
      }

      // 5. Apply Search Query Filter
      if (filters.q?.trim()) {
        const term = filters.q.trim().toLowerCase();
        all = all.filter(
          (i) =>
            i.title?.toLowerCase().includes(term) ||
            i.excerpt?.toLowerCase().includes(term) ||
            i.category?.toLowerCase().includes(term)
        );
      }

      // 6. Apply Historical Year & Month Filters
      if (filters.year && filters.year !== "all") {
        all = all.filter((i) => {
          const d = new Date(i.published_at);
          return !isNaN(d.getTime()) && String(d.getFullYear()) === filters.year;
        });
      }
      if (filters.month && filters.month !== "all") {
        all = all.filter((i) => {
          const d = new Date(i.published_at);
          return !isNaN(d.getTime()) && String(d.getMonth() + 1).padStart(2, "0") === filters.month;
        });
      }

      // 7. Sort
      const ascending = filters.order === "oldest";
      all.sort((a, b) => {
        const diff = new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        return ascending ? -diff : diff;
      });

      // 7. Paginate
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageItems = all.slice(start, end);
      const hasNext = end < all.length;

      return {
        items: pageItems,
        nextPage: hasNext ? pageParam + 1 : null,
      };
    },
    getNextPageParam: (last) => last.nextPage,
  });
