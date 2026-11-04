import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { NewsItem } from "./useCatalog";
import { syncDailyNews, getCachedNews } from "@/lib/newsSyndication";

const PAGE_SIZE = 16;

export interface NewsFilters {
  category?: string;
  q?: string;
  order?: "recent" | "oldest";
}

/** Infinite news feed combining real-time syndicated RSS and Supabase database articles */
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

      // 2. Fetch Supabase news
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

      // 3. Merge & Deduplicate
      const seen = new Set<string>();
      let all: NewsItem[] = [];

      for (const item of [...syndicated, ...dbNews]) {
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

      // 6. Sort
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
