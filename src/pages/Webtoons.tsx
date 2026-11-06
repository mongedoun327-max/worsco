import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flame,
  Calendar,
  Search,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Star,
  Eye,
  Heart,
  Play,
  RotateCcw,
  CheckCircle2,
  X,
  Compass,
  Layers,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WebtoonHero from "@/components/WebtoonHero";
import WebtoonCard, { WebtoonGrid } from "@/components/WebtoonCard";
import { Button } from "@/components/ui/button";
import CreatorFeed from "@/components/CreatorFeed";
import { useContents, Content, contentHref } from "@/hooks/useContents";
import { useContentProtection } from "@/hooks/useContentProtection";
import { useLibraryStore } from "@/store/useLibraryStore";
import {
  CURATED_WEBTOONS,
  WEBTOON_GENRES,
  RELEASE_DAYS,
  WebtoonDay,
  Webtoon,
} from "@/lib/webtoons";

export const Webtoons = () => {
  useContentProtection();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState<WebtoonDay | "Todos">("Todos");
  const [selectedGenre, setSelectedGenre] = useState<string>("Todos");
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    setVisibleCount(30);
  }, [search, selectedGenre, selectedDay]);

  // Fetch all webtoons from hook (which merges curated webtoons)
  const { data: allWebtoons = [], isLoading } = useContents({ type: "webtoon" });

  // Fallback to local curated list if hook is empty
  const webtoonList = useMemo(() => {
    if (allWebtoons.length > 0) return allWebtoons;
    return CURATED_WEBTOONS.map((w) => ({
      id: w.id,
      type: "webtoon" as const,
      title: w.title,
      subtitle: `${w.status} · ${w.release_day}`,
      description: w.description,
      author: `${w.author} / ${w.artist}`,
      tags: [...w.genres, w.release_day, w.status],
      category: w.genres[0] || "Ação",
      slug: w.slug,
      cover: w.cover,
      rating: w.rating,
      rating_count: w.rating_count,
      formats: ["Tira Vertical", "Webtoon"],
      language: "pt",
      year: 2026,
      size: `${w.episodes_count} Episódios`,
      views: w.views,
      read_time: 15,
      episode_count: w.episodes_count,
      price_cents: 0,
      currency: "BRL",
      published: true,
      featured: !!w.featured,
      collection: w.collection || "Webtoons em Destaque",
      created_at: new Date().toISOString(),
    }));
  }, [allWebtoons]);

  // Top featured webtoon for the hero banner
  const featuredItem = useMemo(() => {
    return webtoonList.find((w) => w.id === "wt-solo-leveling") ?? webtoonList[0];
  }, [webtoonList]);

  // Trending & Top 10 rankings
  const topRanked = useMemo(() => {
    return [...webtoonList].sort((a, b) => b.views - a.views).slice(0, 10);
  }, [webtoonList]);

  // Check Continue Reading progress from store
  const progressMap = useLibraryStore((s) => s.progressMap);
  const continueWebtoon = useMemo(() => {
    for (const w of webtoonList) {
      const pct = progressMap[w.id];
      if (pct !== undefined && pct > 0 && pct < 100) {
        return { item: w, progress: pct };
      }
    }
    return null;
  }, [webtoonList, progressMap]);

  // Weekly Schedule items
  const scheduledItems = useMemo(() => {
    if (selectedDay === "Todos") return webtoonList;
    return webtoonList.filter((w) => w.tags?.includes(selectedDay) || w.subtitle?.includes(selectedDay));
  }, [webtoonList, selectedDay]);

  // Catalog filtered items (by search, genre and schedule)
  const filteredCatalog = useMemo(() => {
    let list = [...webtoonList];

    if (selectedGenre === "⚡ Leitura Imediata") {
      list = list.filter((w) =>
        ["wt-solo-leveling", "wt-omniscient-reader", "wt-the-beginning-after-the-end", "wt-nano-machine"].includes(w.id) ||
        (w.episode_count && w.episode_count > 0)
      );
    } else if (selectedGenre !== "Todos") {
      const g = selectedGenre.toLowerCase();
      list = list.filter(
        (w) =>
          w.category?.toLowerCase() === g ||
          w.tags?.some((t) => t.toLowerCase() === g)
      );
    }

    if (selectedDay !== "Todos") {
      list = list.filter((w) => w.tags?.includes(selectedDay) || w.subtitle?.includes(selectedDay));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (w) =>
          w.title?.toLowerCase().includes(q) ||
          w.author?.toLowerCase().includes(q) ||
          w.description?.toLowerCase().includes(q) ||
          w.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [webtoonList, selectedGenre, selectedDay, search]);

  const displayedCatalog = useMemo(() => {
    return filteredCatalog.slice(0, visibleCount);
  }, [filteredCatalog, visibleCount]);

  // Collections groupings
  const hunterCollection = useMemo(
    () => webtoonList.filter((w) => w.tags?.includes("Ação") || w.tags?.includes("Sobrenatural")).slice(0, 4),
    [webtoonList]
  );
  const murimCollection = useMemo(
    () => webtoonList.filter((w) => w.tags?.includes("Murim")).slice(0, 4),
    [webtoonList]
  );
  const isekaiCollection = useMemo(
    () => webtoonList.filter((w) => w.tags?.includes("Isekai") || w.collection?.includes("Isekai")).slice(0, 4),
    [webtoonList]
  );
  const romanceCollection = useMemo(
    () => webtoonList.filter((w) => w.tags?.includes("Romance") || w.tags?.includes("Drama")).slice(0, 4),
    [webtoonList]
  );
  const sportsCollection = useMemo(
    () => webtoonList.filter((w) => w.tags?.includes("Esportes") || w.tags?.includes("Escolar")).slice(0, 4),
    [webtoonList]
  );
  const scifiCollection = useMemo(
    () => webtoonList.filter((w) => w.tags?.includes("Sci-Fi") || w.tags?.includes("Terror")).slice(0, 4),
    [webtoonList]
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      <Navigation />

      {/* 1. Hero Showcase */}
      <WebtoonHero item={featuredItem} />

      {/* 2. Continue Reading Bar (if user has active progress) */}
      {continueWebtoon && (
        <section className="bg-emerald-950/20 border-y border-emerald-500/20 py-4 px-6 lg:px-12">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <RotateCcw className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Continuar Leitura
                </span>
                <span className="text-white font-medium">{continueWebtoon.item.title}</span>
                <span className="text-muted-foreground ml-2">({continueWebtoon.progress}% lido)</span>
              </div>
            </div>

            <Button
              asChild
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs px-5 shadow-soft"
            >
              <Link to={`/webtoon/${continueWebtoon.item.id}/ler`}>
                <span>Retomar Episódio</span>
                <Play className="h-3 w-3 ml-1.5 fill-current" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* 2.5. Dedicated Shelf for Full-Scan In-App Readable Manhwas */}
      <section className="py-12 bg-gradient-to-b from-emerald-950/20 via-background to-background border-b border-border/60">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-500 font-bold mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Scans Verificados · 100% Páginas Originais
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                Leitura Imediata no App
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl font-light">
                Obras completas com tiras verticais autênticas de alta definição. Sem capas repetidas ou capítulos fictícios.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedGenre("⚡ Leitura Imediata");
                const el = document.getElementById("catalogo");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs rounded-full border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 self-start sm:self-auto"
            >
              Filtrar no Catálogo Geral →
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                id: "wt-solo-leveling",
                title: "Solo Leveling: ReAwakening",
                cover: "/covers/webtoons/solo-leveling-cover.jpg",
                episodesInfo: "200 Capítulos Oficiais",
                description: "Sung Jin-woo e o Exército das Sombras na íntegra.",
                genre: "Ação & Caçadores",
                readUrl: "/webtoon/wt-solo-leveling/ler",
              },
              {
                id: "wt-omniscient-reader",
                title: "O Ponto de Vista do Leitor Onisciente",
                cover: "/covers/webtoons/orv-cover.jpg",
                episodesInfo: "235 Capítulos Oficiais",
                description: "Kim Dokja e a Companhia em todos os cenários apocalípticos.",
                genre: "Fantasia & Sistemas",
                readUrl: "/webtoon/wt-omniscient-reader/ler",
              },
              {
                id: "wt-the-greatest-estate-developer",
                title: "O Maior Desenvolvedor Imobiliário",
                cover: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140228-E6gO1FfSg5Wb.jpg",
                episodesInfo: "175 Capítulos Oficiais",
                description: "Lloyd Frontera e a engenharia civil medieval mais hilária.",
                genre: "Comédia & Isekai",
                readUrl: "/webtoon/wt-the-greatest-estate-developer/ler",
              },
              {
                id: "wt-lookism",
                title: "Lookism (Aparências)",
                cover: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86377-O71x1h6mYn8S.jpg",
                episodesInfo: "480 Capítulos Oficiais",
                description: "Daniel Park e os segredos do corpo duplo no submundo de Seul.",
                genre: "Ação & Drama",
                readUrl: "/webtoon/wt-lookism/ler",
              },
              {
                id: "wt-tower-of-god",
                title: "Tower of God (Torre de Deus)",
                cover: "/covers/webtoons/tower-of-god-cover.jpg",
                episodesInfo: "350+ Capítulos Oficiais",
                description: "A escalada de Bam pelos andares misteriosos da Torre.",
                genre: "Fantasia Épica",
                readUrl: "/webtoon/wt-tower-of-god/ler",
              },
              {
                id: "wt-return-mount-hua",
                title: "O Retorno da Seita do Monte Hua",
                cover: "/covers/webtoons/mount-hua-cover.jpg",
                episodesInfo: "180 Capítulos Oficiais",
                description: "Chung Myung reconstruindo a glória das flores de ameixa.",
                genre: "Murim & Artes Marciais",
                readUrl: "/webtoon/wt-return-mount-hua/ler",
              },
              {
                id: "wt-eleceed",
                title: "Eleceed",
                cover: "/covers/webtoons/eleceed-cover.jpg",
                episodesInfo: "250 Capítulos Oficiais",
                description: "Jiwoo e o lendário Kayden no corpo de um gato peludo.",
                genre: "Ação & Comédia",
                readUrl: "/webtoon/wt-eleceed/ler",
              },
              {
                id: "wt-sss-class-suicide-hunter",
                title: "Caçador Suicida de Rank SSS",
                cover: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx128039-PqI0x1h6mYn8S.jpg",
                episodesInfo: "120 Capítulos Oficiais",
                description: "Gongja Kim e a regressão de 24 horas a cada sacrifício.",
                genre: "Psicológico & Fantasia",
                readUrl: "/webtoon/wt-sss-class-suicide-hunter/ler",
              },
            ].map((m) => (
              <div
                key={m.id}
                className="group p-3.5 rounded-2xl bg-card border border-border hover:border-emerald-500/50 shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-accent mb-3">
                    <img
                      src={m.cover}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>Scans Oficiais</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block mb-1">
                    {m.genre}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground tracking-tight line-clamp-1 group-hover:text-emerald-500 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 font-light">
                    {m.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    {m.episodesInfo}
                  </span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs px-3.5 h-7 shadow-soft"
                  >
                    <Link to={m.readUrl}>
                      Ler Agora
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Weekly Release Schedule Section */}
      <section className="py-16 lg:py-20 bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-500 font-medium mb-2 block flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Atualizações Diárias
              </span>
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                Cronograma Semanal de Lançamentos
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-md font-light">
                Acompanhe os dias exatos em que cada obra ganha novos capítulos e tiras verticais.
              </p>
            </div>

            {/* Release Days Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
              {RELEASE_DAYS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDay(d.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    selectedDay === d.value
                      ? "bg-emerald-600 text-white shadow-soft"
                      : "bg-card hover:bg-accent text-muted-foreground border border-border"
                  }`}
                >
                  {d.short}
                </button>
              ))}
            </div>
          </div>

          {/* Scheduled Webtoons Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {scheduledItems.slice(0, 5).map((w) => (
              <Link
                key={w.id}
                to={contentHref(w)}
                className="group p-2.5 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/50 shadow-soft transition-all flex flex-col"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-accent mb-2.5">
                  <img
                    src={w.cover || "/placeholder.svg"}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    {w.tags?.[1] || "Novo Ep"}
                  </span>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/60 text-amber-300">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{w.rating}</span>
                  </div>
                </div>
                <h4 className="text-xs font-medium text-foreground truncate group-hover:text-emerald-500 transition-colors">
                  {w.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">{w.author}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/80 mt-2 pt-2 border-t border-border/50">
                  <span>{w.category}</span>
                  <span className="text-emerald-500 font-medium">{w.size}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top 10 Ranking do Worscoi */}
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-wider text-rose-500 font-medium mb-2 block flex items-center justify-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-rose-500" />
              Os Mais Populares da Semana
            </span>
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-foreground">
              Top 10 Webtoons em Alta
            </h2>
            <p className="text-xs text-muted-foreground mt-2 font-light">
              As histórias com maior audiência, notas e engajamento da comunidade de leitores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {topRanked.slice(0, 8).map((item, idx) => (
              <Link
                key={item.id}
                to={contentHref(item)}
                className="group p-4 rounded-2xl bg-card border border-border/80 hover:border-emerald-500/50 shadow-soft transition-all flex items-center gap-4 relative overflow-hidden"
              >
                {/* Giant Stylized Rank Number */}
                <div className="w-12 flex-shrink-0 text-center">
                  <span
                    className={`text-4xl sm:text-5xl font-extrabold italic tracking-tighter ${
                      idx === 0
                        ? "text-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
                        : idx === 1
                        ? "text-slate-400 drop-shadow-[0_2px_8px_rgba(148,163,184,0.4)]"
                        : idx === 2
                        ? "text-amber-700 drop-shadow-[0_2px_8px_rgba(180,83,9,0.4)]"
                        : "text-muted-foreground/30"
                    }`}
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* Cover thumbnail */}
                <img
                  src={item.cover || "/placeholder.svg"}
                  alt={item.title}
                  className="w-16 h-22 sm:w-20 sm:h-28 object-cover rounded-xl shadow-md flex-shrink-0 border border-border/60 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Information */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-medium text-foreground truncate group-hover:text-emerald-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">{item.author}</p>
                  <p className="text-[11px] text-muted-foreground/80 line-clamp-1 mt-1 font-light">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 mt-2.5 text-[11px] text-muted-foreground font-light">
                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {(item.views / 1000).toFixed(0)}k views
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{item.size}</span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end justify-center pr-2">
                  <div className="w-8 h-8 rounded-full bg-accent group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center text-muted-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Curated Channels / Tropes (Murim, Hunters, Romance, Isekai) */}
      <section className="py-16 lg:py-20 bg-secondary/20 border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12 space-y-16">
          {/* Sistemas & Caçadores Tray */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-light text-foreground tracking-tight">
                    Sistemas, Masmorras & Caçadores
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Protagonistas que sobem de nível em mundos apocalípticos.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hunterCollection.map((w) => (
                <WebtoonCard key={w.id} item={w} />
              ))}
            </div>
          </div>

          {/* Murim & Artes Marciais Supremas Tray */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-light text-foreground tracking-tight">
                    O Melhor do Murim & Artes Marciais
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Cultivação de Qi, clãs lendários e espadas transcendentais.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {murimCollection.map((w) => (
                <WebtoonCard key={w.id} item={w} />
              ))}
            </div>
          </div>

          {/* Isekai & Realeza Tray */}
          {isekaiCollection.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-light text-foreground tracking-tight">
                      Isekai, Reencarnação & Vilãs Nobres
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Segundas chances, intrigas palacianas e estratégias brilhantes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isekaiCollection.map((w) => (
                  <WebtoonCard key={w.id} item={w} />
                ))}
              </div>
            </div>
          )}

          {/* Romance & Emoção Tray */}
          {romanceCollection.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-light text-foreground tracking-tight">
                      Romance, Drama & Emoção
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Paixões intensas, encontros do destino e laços inesquecíveis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {romanceCollection.map((w) => (
                  <WebtoonCard key={w.id} item={w} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Complete Catalog Search & Genre Filter */}
      <section id="catalogo" className="py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-2 block">
              Explorar Catálogo ({webtoonList.length}+ Obras)
            </span>
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-foreground">
              Catálogo Geral de Webtoons
            </h2>
            <p className="text-xs text-muted-foreground mt-2 font-light">
              Mais de {webtoonList.length} obras selecionadas entre todos os gêneros: Ação, Murim, Isekai, Romance, Esportes, Terror e Sci-Fi com episódios completos.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, criador ou palavra-chave (ex: Solo Leveling, Dokja, Murim, Magia)..."
              className="w-full pl-11 pr-10 py-3.5 rounded-full border border-border bg-card text-foreground text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Genre Pills Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedGenre("⚡ Leitura Imediata")}
              className={`text-xs px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
                selectedGenre === "⚡ Leitura Imediata"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm font-medium"
                  : "bg-card text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>Leitura Imediata (Scans Completos)</span>
            </button>
            {WEBTOON_GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  selectedGenre === genre
                    ? "bg-foreground text-background border-foreground shadow-sm font-medium"
                    : "bg-card text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Results Grid */}
          {filteredCatalog.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-3xl max-w-lg mx-auto">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-medium text-foreground">Nenhum webtoon encontrado</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Tente buscar com outro termo ou selecione outro gênero.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedGenre("Todos");
                  setSelectedDay("Todos");
                }}
                className="mt-4 rounded-full text-xs"
              >
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4 px-1 text-xs text-muted-foreground">
                <span>
                  Exibindo <strong className="text-foreground">{displayedCatalog.length}</strong> de <strong className="text-foreground">{filteredCatalog.length}</strong> webtoons
                </span>
                {filteredCatalog.length > displayedCatalog.length && (
                  <span>
                    +{filteredCatalog.length - displayedCatalog.length} obras restantes
                  </span>
                )}
              </div>
              <WebtoonGrid>
                {displayedCatalog.map((item) => (
                  <WebtoonCard key={item.id} item={item} />
                ))}
              </WebtoonGrid>
              {displayedCatalog.length < filteredCatalog.length && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + 30)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs px-8 shadow-soft"
                  >
                    Carregar Mais Obras (+30)
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setVisibleCount(filteredCatalog.length)}
                    className="rounded-full text-xs px-6"
                  >
                    Exibir Todos ({filteredCatalog.length})
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 7. Community Feed */}
      <section className="py-16 lg:py-24 bg-secondary/40 border-t border-border/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4 block">
              Comunidade & Lançamentos
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
              Feed dos Criadores de Webtoon
            </h2>
          </div>
          <CreatorFeed items={webtoonList} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Webtoons;
