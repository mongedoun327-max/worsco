import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Book } from "./useCatalog";

export type ContentType = "book" | "webtoon" | "news" | "academic";

export type Content = {
  id: string;
  type: ContentType;
  title: string;
  subtitle: string | null;
  description: string;
  body?: string;
  author: string;
  tags: string[];
  category: string;
  slug: string | null;
  cover: string | null;
  rating: number;
  rating_count: number;
  formats: string[];
  language: string;
  year: number | null;
  size: string | null;
  views: number;
  read_time: number | null;
  episode_count: number;
  price_cents: number;
  currency: string;
  published: boolean;
  featured: boolean;
  collection: string | null;
  created_at: string;
  /** Extra fields returned by the recommendation endpoints */
  similarity?: number;
  reason?: string;
  progress?: number;
  last_read_at?: string;
};

export type Episode = {
  id: string;
  content_id: string;
  number: number;
  title: string;
  body: string;
  images: string[];
  is_free: boolean;
  published_at: string;
};

export const CONTENT_LABELS: Record<ContentType, string> = {
  book: "Livro",
  webtoon: "Webtoon",
  news: "Notícia",
  academic: "Acadêmico",
};

/** Route for a given content item. */
export const contentHref = (item: Content) => {
  if (item.type === "book" || item.id.startsWith("guten-")) {
    return `/livros/${item.id}`;
  }
  if (item.type === "webtoon") {
    return `/webtoon/${item.id}`;
  }
  if (item.type === "news") {
    return `/noticias/${item.slug ?? item.id}`;
  }
  return `/conteudo/${item.id}`;
};

/** Adapter so the existing BookCard renders any content type unchanged. */
export const contentToBook = (item: Content): Book => ({
  id: item.id,
  title: item.title,
  author: item.author,
  description: item.description,
  cover_url: item.cover,
  price_cents: item.price_cents,
  currency: item.currency,
  category: item.category,
  published: item.published,
  featured: item.featured,
  created_at: item.created_at,
});

export const CONTENT_SELECT =
  "id,type,title,subtitle,description,author,tags,category,slug,cover,rating,rating_count,formats,language,year,size,views,read_time,episode_count,price_cents,currency,published,featured,collection,created_at";

const SELECT = CONTENT_SELECT;

export const useContents = (options?: { type?: ContentType; category?: string; limit?: number }) =>
  useQuery({
    queryKey: ["contents", options?.type ?? "all", options?.category ?? "all", options?.limit ?? 0],
    queryFn: async () => {
      let dbData: Content[] = [];
      try {
        let q = supabase.from("contents").select(SELECT).eq("published", true);
        if (options?.type) q = q.eq("type", options.type);
        if (options?.category && options.category !== "all") q = q.eq("category", options.category);
        q = q.order("created_at", { ascending: false });
        if (options?.limit) q = q.limit(options.limit);
        const { data, error } = await q;
        if (!error && data) dbData = data as unknown as Content[];
      } catch {}

      // If requested type is "book" or all, merge Modern bestsellers and Gutenberg classic books
      if (!options?.type || options.type === "book") {
        try {
          const { MODERN_BOOKS } = await import("@/lib/modernBooks");
          const { fetchGutenbergCatalog } = await import("@/lib/gutenbergBooks");
          const gutenList = await fetchGutenbergCatalog();

          const modernMapped: Content[] = MODERN_BOOKS
            .filter((b) => (options?.category && options.category !== "all" ? b.category === options.category : true))
            .map((b) => ({
              id: b.id,
              type: "book",
              title: b.title,
              subtitle: b.subtitle,
              description: b.description,
              author: b.author,
              tags: ["Bestseller", "Moderno", b.category, "Mais Influentes"],
              category: b.category,
              slug: b.id,
              cover: b.cover_url,
              rating: b.rating,
              rating_count: b.rating_count,
              formats: b.formats,
              language: "pt",
              year: b.year,
              size: "Guia Completo & Capítulos",
              views: b.downloads * 2,
              read_time: b.read_time,
              episode_count: b.chapters.length,
              price_cents: b.price_cents,
              currency: b.currency,
              published: b.published,
              featured: b.featured,
              collection: "Bestsellers Modernos",
              created_at: b.created_at,
            }));

          const gutenMapped: Content[] = gutenList
            .filter((b) => (options?.category && options.category !== "all" ? b.category === options.category : true))
            .map((b) => ({
              id: b.id,
              type: "book",
              title: b.title,
              subtitle: "Domínio Público · Leitura Completa",
              description: b.description,
              author: b.author,
              tags: ["Clássico", b.category, "Domínio Público", "Gutenberg"],
              category: b.category,
              slug: b.id,
              cover: b.cover_url,
              rating: 4.9,
              rating_count: b.downloads || 1200,
              formats: ["Leitura Online", "EPUB", "TXT"],
              language: "pt",
              year: b.year ?? 1890,
              size: "Texto Integral",
              views: b.downloads ? b.downloads * 3 : 5000,
              read_time: b.read_time ?? 300,
              episode_count: 1,
              price_cents: 0,
              currency: "BRL",
              published: true,
              featured: b.featured,
              collection: "Clássicos da Literatura",
              created_at: b.created_at,
            }));

          const map = new Map<string, Content>();
          // Modern blockbusters first, then classics, then db
          for (const item of [...modernMapped, ...gutenMapped, ...dbData]) {
            if (!map.has(item.id)) map.set(item.id, item);
          }
          const combined = Array.from(map.values());
          return options?.limit ? combined.slice(0, options.limit) : combined;
        } catch {}
      }

      return dbData;
    },
  });

export const useTrending = (period: "today" | "week" | "month" = "week", limit = 8) =>
  useQuery({
    queryKey: ["contents", "trending", period, limit],
    queryFn: async () => {
      const days = period === "today" ? 1 : period === "week" ? 7 : 30;
      const since = new Date(Date.now() - days * 86400000).toISOString();
      try {
        const { data, error } = await supabase
          .from("contents")
          .select(SELECT)
          .eq("published", true)
          .gte("created_at", since)
          .order("views", { ascending: false })
          .limit(limit);
        if (!error && (data ?? []).length > 0) return data as unknown as Content[];
        const { data: fallback, error: err2 } = await supabase
          .from("contents")
          .select(SELECT)
          .eq("published", true)
          .order("views", { ascending: false })
          .limit(limit);
        if (!err2 && (fallback ?? []).length > 0) return (fallback ?? []) as unknown as Content[];
      } catch {}

      try {
        const { MODERN_BOOKS } = await import("@/lib/modernBooks");
        return MODERN_BOOKS.slice(0, limit).map((b) => ({
          id: b.id,
          type: "book" as ContentType,
          title: b.title,
          subtitle: b.subtitle,
          description: b.description,
          author: b.author,
          tags: ["Bestseller", "Moderno", b.category],
          category: b.category,
          slug: b.id,
          cover: b.cover_url,
          rating: b.rating,
          rating_count: b.rating_count,
          formats: b.formats,
          language: "pt",
          year: b.year,
          size: "Guia Completo & Capítulos",
          views: b.downloads * 2,
          read_time: b.read_time,
          episode_count: b.chapters.length,
          price_cents: b.price_cents,
          currency: b.currency,
          published: b.published,
          featured: b.featured,
          collection: "Bestsellers Modernos",
          created_at: b.created_at,
        }));
      } catch {
        return [];
      }
    },
  });

export const useContent = (id?: string) =>
  useQuery({
    queryKey: ["content", id],
    enabled: !!id,
    queryFn: async () => {
      // Check Modern Bestsellers
      if (id.startsWith("mod-")) {
        const { MODERN_BOOKS } = await import("@/lib/modernBooks");
        const found = MODERN_BOOKS.find((b) => b.id === id);
        if (found) {
          return {
            id: found.id,
            type: "book" as ContentType,
            title: found.title,
            subtitle: found.subtitle,
            description: found.description,
            body: found.description,
            author: found.author,
            tags: ["Bestseller", "Moderno", found.category, "Mais Influentes"],
            category: found.category,
            slug: found.id,
            cover: found.cover_url,
            rating: found.rating,
            rating_count: found.rating_count,
            formats: found.formats,
            language: "pt",
            year: found.year,
            size: "Guia Completo & Capítulos",
            views: found.downloads * 2,
            read_time: found.read_time,
            episode_count: found.chapters.length,
            price_cents: found.price_cents,
            currency: found.currency,
            published: found.published,
            featured: found.featured,
            collection: "Bestsellers Modernos",
            created_at: found.created_at,
          } as Content;
        }
      }

      // Check Gutenberg
      if (id.startsWith("guten-") || /^\d+$/.test(id)) {
        const { CURATED_GUTENBERG_BOOKS, fetchGutenbergCatalog } = await import("@/lib/gutenbergBooks");
        const cleanId = id.startsWith("guten-") ? id : `guten-${id}`;
        let found = CURATED_GUTENBERG_BOOKS.find((b) => b.id === cleanId);
        if (!found) {
          const list = await fetchGutenbergCatalog();
          found = list.find((b) => b.id === cleanId);
        }
        if (found) {
          return {
            id: found.id,
            type: "book" as ContentType,
            title: found.title,
            subtitle: "Domínio Público · Leitura Completa",
            description: found.description,
            body: found.description,
            author: found.author,
            tags: ["Clássico", found.category, "Domínio Público", "Gutenberg"],
            category: found.category,
            slug: found.id,
            cover: found.cover_url,
            rating: 4.9,
            rating_count: found.downloads || 1500,
            formats: ["Leitura Online", "EPUB", "TXT"],
            language: "pt",
            year: found.year ?? 1890,
            size: "Texto Integral",
            views: found.downloads ? found.downloads * 3 : 5000,
            read_time: found.read_time ?? 300,
            episode_count: 1,
            price_cents: 0,
            currency: "BRL",
            published: true,
            featured: found.featured,
            collection: "Clássicos da Literatura",
            created_at: found.created_at,
          } as Content;
        }
      }

      try {
        const { data, error } = await supabase
          .from("contents")
          .select(`${SELECT},body`)
          .eq("id", id!)
          .maybeSingle();
        if (!error && data) return data as unknown as Content | null;
      } catch {}

      return null;
    },
  });

export const useEpisodes = (contentId?: string) =>
  useQuery({
    queryKey: ["episodes", contentId],
    enabled: !!contentId,
    queryFn: async () => {
      if (!contentId) return [];

      if (contentId.startsWith("guten-") || /^\d+$/.test(contentId)) {
        const { fetchGutenbergChapters } = await import("@/lib/gutenbergBooks");
        const chapters = await fetchGutenbergChapters(contentId);
        return chapters.map((ch) => ({
          id: ch.id,
          content_id: contentId,
          number: ch.position,
          title: ch.title,
          body: ch.content,
          images: [],
          is_free: true,
          published_at: new Date().toISOString(),
        })) as Episode[];
      }

      try {
        const { data, error } = await supabase
          .from("content_episodes")
          .select("*")
          .eq("content_id", contentId!)
          .order("number", { ascending: true });
        if (!error && data) return (data ?? []) as Episode[];
      } catch {}

      return [] as Episode[];
    },
  });

/** Records a user interaction (view, read, download, like, rate, progress). */
export const useTrackInteraction = () => {
  const { user } = useAuth();
  return async (contentId: string, action: string, progress = 0) => {
    if (!user) return;
    await supabase.from("user_interactions").insert({
      user_id: user.id,
      content_id: contentId,
      action,
      progress,
    });
  };
};

export const useProgress = (contentId?: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["progress", user?.id, contentId],
    enabled: !!user && !!contentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user!.id)
        .eq("content_id", contentId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
};

export const useSaveProgress = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { contentId: string; percentage: number; episodeId?: string | null }) => {
      if (!user) return null;
      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: user.id,
          content_id: input.contentId,
          episode_id: input.episodeId ?? null,
          progress_percentage: Math.max(0, Math.min(100, Math.round(input.percentage))),
          last_read_at: new Date().toISOString(),
        },
        { onConflict: "user_id,content_id" },
      );
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["progress"] });
      qc.invalidateQueries({ queryKey: ["recommendations", "continue-reading"] });
    },
  });
};
