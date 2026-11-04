import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url: string | null;
  price_cents: number;
  currency: string;
  category: string;
  published: boolean;
  featured: boolean;
  created_at: string;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  category: string;
  published: boolean;
  published_at: string;
};

export type Chapter = {
  id: string;
  book_id: string;
  title: string;
  content: string;
  position: number;
  is_free_preview: boolean;
};

export type Purchase = {
  id: string;
  user_id: string;
  book_id: string;
  amount_cents: number;
  currency: string;
  status: string;
  created_at: string;
};

export const useBooks = (search = "") =>
  useQuery({
    queryKey: ["books", search],
    queryFn: async () => {
      let dbBooks: Book[] = [];
      try {
        let q = supabase.from("books").select("*").order("created_at", { ascending: false });
        if (search) {
          q = q.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
        }
        const { data, error } = await q;
        if (!error && data) dbBooks = data as Book[];
      } catch {
        // Fallback gracefully
      }

      // Fetch modern bestsellers
      let modernBooks: Book[] = [];
      try {
        const { MODERN_BOOKS } = await import("@/lib/modernBooks");
        modernBooks = MODERN_BOOKS.filter((b) =>
          search
            ? b.title.toLowerCase().includes(search.toLowerCase()) ||
              b.author.toLowerCase().includes(search.toLowerCase()) ||
              b.description.toLowerCase().includes(search.toLowerCase())
            : true
        ).map((b) => ({
          id: b.id,
          title: b.title,
          author: b.author,
          description: b.description,
          cover_url: b.cover_url,
          price_cents: b.price_cents,
          currency: b.currency,
          category: b.category,
          published: b.published,
          featured: b.featured,
          created_at: b.created_at,
        }));
      } catch {
        // Fallback gracefully
      }

      // Fetch Gutenberg catalog
      let gutenBooks: Book[] = [];
      try {
        const { fetchGutenbergCatalog } = await import("@/lib/gutenbergBooks");
        const list = await fetchGutenbergCatalog(search);
        gutenBooks = list.map((b) => ({
          id: b.id,
          title: b.title,
          author: b.author,
          description: b.description,
          cover_url: b.cover_url,
          price_cents: 0,
          currency: b.currency,
          category: b.category,
          published: true,
          featured: b.featured,
          created_at: b.created_at,
        }));
      } catch {
        // Fallback gracefully
      }

      // Fetch auto-imported books from automation pipeline
      let autoBooks: Book[] = [];
      try {
        const { getAutoImportedBooks } = await import("@/lib/bookAutomation");
        const list = await getAutoImportedBooks();
        autoBooks = list
          .filter((b) =>
            search
              ? b.title.toLowerCase().includes(search.toLowerCase()) ||
                b.author.toLowerCase().includes(search.toLowerCase()) ||
                b.description.toLowerCase().includes(search.toLowerCase())
              : true
          )
          .map((b) => ({
            id: b.id,
            title: b.title,
            author: b.author,
            description: b.description,
            cover_url: b.cover_url,
            price_cents: b.price_cents,
            currency: b.currency,
            category: b.category,
            published: b.published,
            featured: b.featured,
            created_at: b.created_at,
          }));
      } catch {
        // Fallback gracefully
      }

      const map = new Map<string, Book>();
      // Auto-imported books first, then modern bestsellers, classic literature, then db
      for (const b of autoBooks) map.set(b.id, b);
      for (const b of modernBooks) {
        if (!map.has(b.id)) map.set(b.id, b);
      }
      for (const b of gutenBooks) {
        if (!map.has(b.id)) map.set(b.id, b);
      }
      for (const b of dbBooks) {
        if (!map.has(b.id)) map.set(b.id, b);
      }

      return Array.from(map.values());
    },
  });

export const useBook = (id?: string) =>
  useQuery({
    queryKey: ["book", id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) return null;

      // Check if it is an Auto-Imported book
      if (id.startsWith("auto-")) {
        try {
          const { getAutoImportedBooks } = await import("@/lib/bookAutomation");
          const list = await getAutoImportedBooks();
          const found = list.find((b) => b.id === id);
          if (found) {
            return {
              id: found.id,
              title: found.title,
              author: found.author,
              description: found.description,
              cover_url: found.cover_url,
              price_cents: found.price_cents,
              currency: found.currency,
              category: found.category,
              published: found.published,
              featured: found.featured,
              created_at: found.created_at,
            } as Book;
          }
        } catch {}
      }

      // Check if it is a Modern Bestseller book
      if (id.startsWith("mod-")) {
        const { MODERN_BOOKS } = await import("@/lib/modernBooks");
        const found = MODERN_BOOKS.find((b) => b.id === id);
        if (found) {
          return {
            id: found.id,
            title: found.title,
            author: found.author,
            description: found.description,
            cover_url: found.cover_url,
            price_cents: found.price_cents,
            currency: found.currency,
            category: found.category,
            published: found.published,
            featured: found.featured,
            created_at: found.created_at,
          } as Book;
        }
      }

      // Check if it is a Gutenberg book
      if (id.startsWith("guten-") || /^\d+$/.test(id)) {
        const { CURATED_GUTENBERG_BOOKS, fetchGutenbergCatalog } = await import("@/lib/gutenbergBooks");
        const cleanId = id.startsWith("guten-") ? id : `guten-${id}`;
        const found = CURATED_GUTENBERG_BOOKS.find((b) => b.id === cleanId);
        if (found) {
          return {
            id: found.id,
            title: found.title,
            author: found.author,
            description: found.description,
            cover_url: found.cover_url,
            price_cents: 0,
            currency: found.currency,
            category: found.category,
            published: true,
            featured: found.featured,
            created_at: found.created_at,
          } as Book;
        }

        const remote = await fetchGutenbergCatalog();
        const foundRemote = remote.find((b) => b.id === cleanId);
        if (foundRemote) {
          return {
            id: foundRemote.id,
            title: foundRemote.title,
            author: foundRemote.author,
            description: foundRemote.description,
            cover_url: foundRemote.cover_url,
            price_cents: 0,
            currency: foundRemote.currency,
            category: foundRemote.category,
            published: true,
            featured: foundRemote.featured,
            created_at: foundRemote.created_at,
          } as Book;
        }
      }

      // Supabase lookup
      try {
        const { data, error } = await supabase.from("books").select("*").eq("id", id).maybeSingle();
        if (!error && data) return data as Book;
      } catch {}

      // Fallback Gutenberg search
      try {
        const { CURATED_GUTENBERG_BOOKS } = await import("@/lib/gutenbergBooks");
        const found = CURATED_GUTENBERG_BOOKS.find((b) => b.id === id);
        if (found) {
          return {
            id: found.id,
            title: found.title,
            author: found.author,
            description: found.description,
            cover_url: found.cover_url,
            price_cents: 0,
            currency: found.currency,
            category: found.category,
            published: true,
            featured: found.featured,
            created_at: found.created_at,
          } as Book;
        }
      } catch {}

      return null;
    },
  });

export const useChapters = (bookId?: string) =>
  useQuery({
    queryKey: ["chapters", bookId],
    enabled: !!bookId,
    queryFn: async () => {
      if (!bookId) return [];

      // Check Auto-Imported chapters
      if (bookId.startsWith("auto-")) {
        try {
          const { getAutoImportedBooks } = await import("@/lib/bookAutomation");
          const list = await getAutoImportedBooks();
          const found = list.find((b) => b.id === bookId);
          if (found && found.chapters) {
            return found.chapters as Chapter[];
          }
        } catch {}
      }

      // Check Modern Bestsellers chapters
      if (bookId.startsWith("mod-")) {
        const { MODERN_BOOKS } = await import("@/lib/modernBooks");
        const found = MODERN_BOOKS.find((b) => b.id === bookId);
        if (found && found.chapters) {
          return found.chapters as Chapter[];
        }
      }

      // Check Gutenberg chapters
      if (bookId.startsWith("guten-") || /^\d+$/.test(bookId)) {
        const { fetchGutenbergChapters } = await import("@/lib/gutenbergBooks");
        const chaps = await fetchGutenbergChapters(bookId);
        return chaps as Chapter[];
      }

      try {
        const { data, error } = await supabase
          .from("chapters")
          .select("*")
          .eq("book_id", bookId!)
          .order("position", { ascending: true });
        if (!error && data && data.length > 0) return data as Chapter[];
      } catch {}

      // Check if it's a Gutenberg book without prefix
      try {
        const { fetchGutenbergChapters } = await import("@/lib/gutenbergBooks");
        const chaps = await fetchGutenbergChapters(bookId);
        if (chaps && chaps.length > 0) return chaps as Chapter[];
      } catch {}

      return [] as Chapter[];
    },
  });

export const useNews = () =>
  useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      let dbNews: NewsItem[] = [];
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("published_at", { ascending: false });
        if (!error && data) dbNews = data as NewsItem[];
      } catch {
        // Fallback if supabase connection is offline
      }

      // Automatically sync and get live daily RSS news
      let syndicated: any[] = [];
      try {
        const { syncDailyNews, getCachedNews } = await import("@/lib/newsSyndication");
        syndicated = await syncDailyNews();
        if (!syndicated || syndicated.length === 0) {
          syndicated = getCachedNews();
        }
      } catch {
        // Fallback gracefully
      }

      // Merge and deduplicate by slug or title
      const seen = new Set<string>();
      const combined: NewsItem[] = [];

      for (const item of [...syndicated, ...dbNews]) {
        const key = (item.slug || item.title || "").toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      }

      combined.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      return combined;
    },
  });

export const useArticle = (slug?: string) =>
  useQuery({
    queryKey: ["news", slug],
    enabled: !!slug,
    queryFn: async () => {
      if (!slug) return null;
      try {
        const { data, error } = await supabase.from("news").select("*").eq("slug", slug).maybeSingle();
        if (!error && data) return data as NewsItem;
      } catch {}

      try {
        const { getCachedNews, syncDailyNews } = await import("@/lib/newsSyndication");
        let cached = getCachedNews();
        let found = cached.find((it) => it.slug === slug || it.id === slug);
        if (!found) {
          cached = await syncDailyNews();
          found = cached.find((it) => it.slug === slug || it.id === slug);
        }
        if (found) return found;

        // Direct fetch from /api/news/feed?topic=all&limit=150
        const res = await fetch("/api/news/feed?topic=all&limit=150");
        if (res.ok) {
          const data = await res.json();
          const match = (data.items || []).find((it: any) => it.slug === slug || it.id === slug);
          if (match) return match as NewsItem;
        }
      } catch {}

      return null;
    },
  });

export const usePurchases = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["purchases", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Purchase[];
    },
  });
};
