import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Search, RefreshCw, Radio, Archive, Calendar, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsHero from "@/components/news/NewsHero";
import CategoryPills from "@/components/news/CategoryPills";
import EditorialCard from "@/components/news/EditorialCard";
import MissedCarousel from "@/components/news/MissedCarousel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import bannerImage from "@/assets/hero-news.jpg";
import { useNews } from "@/hooks/useCatalog";
import { useNewsFeed } from "@/hooks/useNewsFeed";
import { useContentProtection } from "@/hooks/useContentProtection";
import { NEWS_CATEGORIES, pickFeatured, type CuratedNews } from "@/lib/news";
import { syncDailyNews } from "@/lib/newsSyndication";
import { fetchArchiveTimeline, type ArchiveTimelineEntry } from "@/lib/newsArchiveEngine";

const MONTH_NAMES: Record<string, string> = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
};

const News = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [params, setParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);
  const [timeline, setTimeline] = useState<ArchiveTimelineEntry[]>([]);
  const [totalArchived, setTotalArchived] = useState<number>(0);
  useContentProtection();

  useEffect(() => {
    fetchArchiveTimeline().then((res) => {
      setTimeline(res.timeline || []);
      setTotalArchived(res.totalArticles || 0);
    });
  }, []);

  const category = params.get("categoria") ?? "all";
  const order = (params.get("ordem") as "recent" | "oldest") ?? "recent";
  const year = params.get("ano") ?? "all";
  const month = params.get("mes") ?? "all";
  const q = params.get("q") ?? "";

  const setParam = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const feed = useNewsFeed({ category, order, q, year, month });
  const items = useMemo(
    () => (feed.data?.pages.flatMap((p) => p.items) ?? []) as CuratedNews[],
    [feed.data],
  );

  const { data: all = [] } = useNews();
  const published = useMemo(() => all.filter((n) => n.published) as CuratedNews[], [all]);

  /** Available years in archive */
  const availableYears = useMemo(() => {
    const yrs = new Set<string>();
    timeline.forEach((t) => yrs.add(String(t.year)));
    published.forEach((p) => {
      const d = new Date(p.published_at);
      if (!isNaN(d.getFullYear())) yrs.add(String(d.getFullYear()));
    });
    if (yrs.size === 0) yrs.add("2026");
    return Array.from(yrs).sort().reverse();
  }, [timeline, published]);

  /** Curation: Top Story flag → engajamento do dia → mais recente. */
  const featured = useMemo(() => pickFeatured(published), [published]);
  const isFilteringHistory = year !== "all" || month !== "all";
  const gridItems = useMemo(
    () => items.filter((i) => (!featured || i.id !== featured.id || category !== "all" || q) || isFilteringHistory),
    [items, featured, category, q, isFilteringHistory],
  );

  const categories = useMemo(() => {
    const fromData = published.map((n) => n.category).filter(Boolean);
    return Array.from(new Set([...NEWS_CATEGORIES, ...fromData]));
  }, [published]);

  const missed = useMemo(
    () => published.filter((n) => !featured || n.id !== featured.id).slice(0, 10),
    [published, featured],
  );

  const { ref, inView } = useInView({ rootMargin: "600px 0px" });
  useEffect(() => {
    if (inView && feed.hasNextPage && !feed.isFetchingNextPage) feed.fetchNextPage();
  }, [inView, feed]);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const updated = await syncDailyNews(true);
      await queryClient.invalidateQueries({ queryKey: ["news-feed"] });
      await queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("Feeds atualizados com sucesso!", {
        description: `${updated.length} notícias foram sincronizadas automaticamente.`,
      });
    } catch {
      toast.error("Erro ao sincronizar os feeds de notícias.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      <div className="relative w-full h-[50vh] overflow-hidden">
        <motion.img
          src={bannerImage}
          alt="Jornal sobre a mesa"
          style={{ y }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-[120%] object-cover select-none [-webkit-user-drag:none]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <main className="py-24 lg:py-32 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-[11px] font-medium text-foreground mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Feeds Diários Automáticos • RSS & Google News</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">Portal de Notícias Worscoi</h1>
            <p className="text-sm text-muted-foreground font-light max-w-xl mx-auto">
              Cobertura contínua e aprofundada: futebol, mercado, tendências virais, listas, política, geografia, ciência, literatura e entretenimento global
            </p>
          </div>

          {featured && !q && category === "all" && <NewsHero item={featured} />}

          <div className="mb-10 space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  defaultValue={q}
                  onChange={(e) => setParam("q", e.target.value)}
                  placeholder="Buscar notícias por título ou assunto..."
                  className="pl-9 text-sm font-light rounded-full"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card hover:bg-accent text-xs font-medium text-foreground transition-all disabled:opacity-50"
                  title="Atualizar feeds de notícias agora"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin text-primary" : ""}`} />
                  <span>{isSyncing ? "Sincronizando..." : "Atualizar Notícias"}</span>
                </button>

                  <Select value={order} onValueChange={(v) => setParam("ordem", v === "recent" ? undefined : v)}>
                  <SelectTrigger className="w-[140px] text-xs font-light rounded-full">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Banner de Arquivo Histórico Permanente & Filtros Cronológicos */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-card/70 border border-border/80 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs text-foreground/80">
                <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Archive className="h-4 w-4" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Arquivo Permanente Ativo:</span>{" "}
                  <span className="text-muted-foreground">
                    {totalArchived || published.length} matérias preservadas no histórico imutável (sem expiração ou links quebrados)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-light mr-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Histórico:</span>
                </div>

                <Select value={year} onValueChange={(v) => setParam("ano", v === "all" ? undefined : v)}>
                  <SelectTrigger className="w-[110px] h-8 text-xs font-light rounded-full bg-background">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os anos</SelectItem>
                    {availableYears.map((yr) => (
                      <SelectItem key={yr} value={yr}>
                        {yr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={month} onValueChange={(v) => setParam("mes", v === "all" ? undefined : v)}>
                  <SelectTrigger className="w-[130px] h-8 text-xs font-light rounded-full bg-background">
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os meses</SelectItem>
                    {Object.entries(MONTH_NAMES).map(([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isFilteringHistory && (
                  <button
                    type="button"
                    onClick={() => {
                      setParam("ano", undefined);
                      setParam("mes", undefined);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-full border border-border hover:bg-muted transition-all"
                    title="Limpar filtro histórico"
                  >
                    <X className="h-3 w-3" />
                    <span>Limpar</span>
                  </button>
                )}
              </div>
            </div>

            <CategoryPills categories={categories} value={category} onChange={(v) => setParam("categoria", v)} />
          </div>

          {feed.isLoading ? (
            <p className="text-sm text-muted-foreground font-light text-center py-16">Carregando notícias...</p>
          ) : gridItems.length === 0 ? (
            <p className="text-sm text-muted-foreground font-light text-center py-16">Nenhuma notícia encontrada.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {gridItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.06 }}
                  >
                    <EditorialCard item={item} />
                  </motion.div>
                ))}
              </div>
              <div ref={ref} className="h-12" />
              {feed.isFetchingNextPage && (
                <p className="text-center text-sm text-muted-foreground font-light">Carregando mais…</p>
              )}
            </>
          )}

          <MissedCarousel items={missed} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
