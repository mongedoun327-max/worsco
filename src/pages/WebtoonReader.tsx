import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  List,
  Sparkles,
  Heart,
  Flame,
  Laugh,
  Eye,
  Maximize2,
  Minimize2,
  ChevronUp,
  Share2,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { useContent, useEpisodes, useSaveProgress, useTrackInteraction } from "@/hooks/useContents";
import { useLibraryStore } from "@/store/useLibraryStore";
import { fetchOfficialChapterPanels, getProxiedWebtoonImageUrl } from "@/lib/webtoonOfficialSync";

export const WebtoonReader = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>();
  const navigate = useNavigate();

  const { data: webtoon, isLoading: isWebtoonLoading } = useContent(id);
  const { data: episodes = [], isLoading: isEpisodesLoading } = useEpisodes(id);

  // Active episode
  const activeEpisode = useMemo(() => {
    if (!episodes.length) return null;
    if (!episodeId) return episodes[0];
    return episodes.find((e) => e.id === episodeId || String(e.number) === episodeId) ?? episodes[0];
  }, [episodes, episodeId]);

  const currentIndex = useMemo(() => {
    if (!activeEpisode) return -1;
    return episodes.findIndex((e) => e.id === activeEpisode.id);
  }, [episodes, activeEpisode]);

  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex >= 0 && currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;

  // Reading UI settings
  const [containerWidth, setContainerWidth] = useState<"compact" | "normal" | "wide">("normal");
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(2);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Live official panels state
  const [livePanels, setLivePanels] = useState<string[]>([]);
  const [isFetchingPanels, setIsFetchingPanels] = useState(false);

  useEffect(() => {
    setLivePanels([]);
    if (!activeEpisode) return;

    if (activeEpisode.images && activeEpisode.images.length > 1) {
      setLivePanels(activeEpisode.images);
      return;
    }

    const viewerUrl = (activeEpisode as any).viewer_url;
    if (viewerUrl) {
      setIsFetchingPanels(true);
      fetchOfficialChapterPanels(viewerUrl)
        .then((pages) => {
          if (pages && pages.length > 0) {
            setLivePanels(pages);
          }
        })
        .finally(() => {
          setIsFetchingPanels(false);
        });
    }
  }, [activeEpisode?.id, (activeEpisode as any)?.viewer_url]);

  const currentPanels = useMemo(() => {
    if (livePanels.length > 0) return livePanels;
    return activeEpisode?.images && activeEpisode.images.length > 1 ? activeEpisode.images : [];
  }, [livePanels, activeEpisode?.images]);

  // Community reactions
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    fire: 1420,
    mindblown: 890,
    laugh: 450,
    cry: 210,
  });
  const [userReacted, setUserReacted] = useState<string | null>(null);
  const [superLiked, setSuperLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(3840);

  const saveProgress = useSaveProgress();
  const track = useTrackInteraction();
  const updateStoreProgress = useLibraryStore((s) => s.updateProgressOptimistic);

  // Track view
  useEffect(() => {
    if (id) track(id, "read");
  }, [id, episodeId, track]);

  // Scroll listener for header auto-hide and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(100, Math.round((currentScrollY / scrollHeight) * 100)) : 0;

      setScrollProgress(progress);

      // Auto-hide header when scrolling down, show when scrolling up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY + 15) {
          setShowHeader(false);
        } else if (currentScrollY < lastScrollY - 15) {
          setShowHeader(true);
        }
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);

      // Persist progress to store and server
      if (id && progress % 10 === 0) {
        updateStoreProgress(id, progress);
        saveProgress.mutate({
          contentId: id,
          percentage: progress,
          episodeId: activeEpisode?.id,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, id, activeEpisode, updateStoreProgress, saveProgress]);

  // Auto-scroller engine
  useEffect(() => {
    if (!isAutoScrolling) return;
    const interval = setInterval(() => {
      window.scrollBy({ top: autoScrollSpeed, behavior: "auto" });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20) {
        setIsAutoScrolling(false);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isAutoScrolling, autoScrollSpeed]);

  const handleReact = (type: string) => {
    if (userReacted === type) return;
    setUserReacted(type);
    setReactions((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    toast({
      title: "Reação enviada!",
      description: "Sua avaliação foi somada à comunidade deste episódio.",
    });
  };

  const handleSuperLike = () => {
    if (superLiked) return;
    setSuperLiked(true);
    setLikesCount((prev) => prev + 1);
    toast({
      title: "❤️ Super Like enviado!",
      description: "Obrigado por apoiar a produção e os criadores deste webtoon.",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const widthClasses = {
    compact: "max-w-[640px]",
    normal: "max-w-[800px]",
    wide: "max-w-[1000px]",
  };

  if (isWebtoonLoading || isEpisodesLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-light text-zinc-400">Carregando painéis do webtoon...</p>
      </div>
    );
  }

  if (!webtoon || !activeEpisode) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <p className="text-lg font-light text-zinc-300 mb-4">Episódio não encontrado ou indisponível.</p>
        <Button asChild variant="outline" className="text-white border-zinc-700 hover:bg-zinc-800">
          <Link to="/webtoons">Voltar para o catálogo de Webtoons</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Floating Top Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#12131a]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4 min-w-0">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Link to={`/webtoon/${webtoon.id}`}>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>

              <div className="min-w-0">
                <p className="text-xs text-emerald-400 font-medium truncate flex items-center gap-1.5">
                  <span>{webtoon.title}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">Capítulo {activeEpisode.number}</span>
                  {activeEpisode.images?.length > 0 && (
                    <>
                      <span className="text-zinc-600">·</span>
                      <span className="text-emerald-500 font-mono text-[11px]">{activeEpisode.images.length} págs</span>
                    </>
                  )}
                </p>
                <h2 className="text-sm font-medium text-white truncate max-w-md">{activeEpisode.title}</h2>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-2">
              {/* Width toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setContainerWidth("compact")}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    containerWidth === "compact" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Formato Compacto / Celular"
                >
                  640px
                </button>
                <button
                  onClick={() => setContainerWidth("normal")}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    containerWidth === "normal" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Formato Padrão"
                >
                  800px
                </button>
                <button
                  onClick={() => setContainerWidth("wide")}
                  className={`px-2 py-1 rounded text-[11px] transition-colors ${
                    containerWidth === "wide" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
                  }`}
                  title="Formato Expandido"
                >
                  1000px
                </button>
              </div>

              {/* Auto Scroll Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`text-xs h-8 px-2.5 border-zinc-700 ${
                  isAutoScrolling
                    ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
                title={isAutoScrolling ? "Pausar rolagem automática" : "Iniciar rolagem contínua automática"}
              >
                {isAutoScrolling ? <Pause className="h-3.5 w-3.5 mr-1" /> : <Play className="h-3.5 w-3.5 mr-1" />}
                <span className="hidden md:inline">{isAutoScrolling ? "Pausar" : "Auto-Rolagem"}</span>
              </Button>

              {/* Episodes Drawer Trigger */}
              <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 px-3 border-zinc-700 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-800"
                  >
                    <List className="h-3.5 w-3.5 mr-1.5" />
                    <span>Capítulos ({episodes.length})</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#12131a] border-zinc-800 text-zinc-100 w-[340px] sm:w-[400px]">
                  <SheetHeader className="pb-4 border-b border-zinc-800">
                    <SheetTitle className="text-white text-base font-medium flex items-center justify-between">
                      <span>Lista de Episódios</span>
                      <span className="text-xs text-emerald-400 font-normal">{webtoon.title}</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)] pr-1">
                    {episodes.map((ep) => {
                      const isActive = ep.id === activeEpisode.id;
                      return (
                        <div
                          key={ep.id}
                          onClick={() => {
                            navigate(`/webtoon/${webtoon.id}/ler/${ep.id}`);
                            setIsDrawerOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                            isActive
                              ? "bg-emerald-500/15 border-emerald-500/50 text-white"
                              : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300"
                          }`}
                        >
                          <img
                            src={ep.images?.[0] || webtoon.cover}
                            alt={ep.title}
                            className="w-12 h-14 object-cover rounded-md flex-shrink-0 border border-zinc-800"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-semibold text-emerald-400">Ep. {ep.number}</span>
                              {isActive && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-black font-bold uppercase">
                                  Lendo
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-medium text-white truncate mt-0.5">{ep.title}</h4>
                            <p className="text-[10px] text-zinc-400 truncate mt-0.5">{ep.body}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Thin Reading Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Continuous Canvas / Vertical Strip */}
      <main className="flex-1 pt-16 pb-24 flex flex-col items-center">
        {/* Episode Title Header Card */}
        <div className={`w-full ${widthClasses[containerWidth]} px-4 py-8 text-center border-b border-zinc-900/80`}>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-2">
            <Sparkles className="h-3 w-3" />
            {webtoon.title} · Episódio {activeEpisode.number}
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">{activeEpisode.title}</h1>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto mt-3 font-light leading-relaxed">
            {activeEpisode.body}
          </p>
        </div>

        {/* Continuous Illustrated Manhwa Strip OR Official Chapter Showcase Card */}
        {activeEpisode.images && activeEpisode.images.length > 1 ? (
          <div className={`w-full ${widthClasses[containerWidth]} flex flex-col items-center gap-0 shadow-2xl bg-black overflow-hidden`}>
            {activeEpisode.images.map((panelUrl, index) => (
              <div key={index} className="w-full relative group bg-black">
                <img
                  src={panelUrl}
                  alt={`Página ${index + 1} de ${activeEpisode.images.length} — ${activeEpisode.title}`}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                  className="w-full h-auto block select-none pointer-events-auto"
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/70 text-zinc-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {index + 1} / {activeEpisode.images.length}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Official Chapter Overview & Showcase Card for cataloged entries */
          <div className={`w-full ${widthClasses[containerWidth]} px-4 py-8`}>
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-[#12131a] p-6 sm:p-10 shadow-2xl">
              {/* Subtle background glow from webtoon cover */}
              <div
                className="absolute inset-0 opacity-15 blur-3xl pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url(${webtoon.cover})` }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                {/* Official Cover Card with Badge */}
                <div className="relative w-48 sm:w-56 shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/80 group">
                  <img
                    src={webtoon.cover}
                    alt={webtoon.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-500/90 backdrop-blur-md text-black font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    Capa Oficial
                  </div>
                </div>

                {/* Chapter Story Narrative & Information */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Edição Oficial do Manhwa</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {activeEpisode.title}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-zinc-400">
                    <span className="bg-zinc-800/80 px-2.5 py-1 rounded-md text-zinc-300">
                      Capítulo {activeEpisode.number} de {episodes.length}
                    </span>
                    <span className="bg-zinc-800/80 px-2.5 py-1 rounded-md text-zinc-300">
                      {webtoon.tags?.slice(0, 3).join(" • ") || webtoon.category}
                    </span>
                    <span className="bg-zinc-800/80 px-2.5 py-1 rounded-md text-zinc-300">
                      {webtoon.subtitle || "Webtoon Oficial"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/80 text-sm text-zinc-300 leading-relaxed font-light text-left">
                    <p className="font-medium text-xs uppercase tracking-wider text-emerald-400 mb-1">
                      Sinopse do Episódio:
                    </p>
                    {activeEpisode.body || webtoon.description}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    {nextEpisode ? (
                      <Button
                        asChild
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                      >
                        <Link to={`/webtoon/${webtoon.id}/ler/${nextEpisode.id}`}>
                          <span>Avançar para Episódio {nextEpisode.number}</span>
                          <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Você está no capítulo mais recente desta obra!</span>
                      </div>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      className="w-full sm:w-auto border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200"
                    >
                      <Link to={`/webtoon/${webtoon.id}`}>Ver Ficha Completa da Obra</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Informative footnote for readers */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
                <p className="text-xs text-zinc-400 font-light max-w-2xl mx-auto">
                  Este webtoon possui sua capa e metadados oficiais devidamente catalogados no sistema. Para desfrutar de capítulos com rolagens verticais completas de dezenas de páginas em alta resolução, confira também obras como <strong className="text-zinc-200">Solo Leveling</strong> (Eps 1-3), <strong className="text-zinc-200">Omniscient Reader</strong> (Eps 1-2), <strong className="text-zinc-200">The Beginning After the End</strong> (Ep 1) e <strong className="text-zinc-200">Nano Machine</strong> (Ep 1).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Episode Actions & Community Interaction Section */}
        <div className={`w-full ${widthClasses[containerWidth]} px-6 py-12 mt-12 space-y-10 border-t border-zinc-900`}>
          {/* Reaction Bar */}
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-6 text-center space-y-4">
            <h3 className="text-sm font-medium text-white">O que você achou deste episódio?</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleReact("fire")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-all ${
                  userReacted === "fire"
                    ? "bg-rose-500/20 border-rose-500 text-rose-400 scale-105"
                    : "bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                <Flame className="h-4 w-4 text-rose-500" />
                <span>Épico</span>
                <span className="text-zinc-500 font-mono text-[11px]">{reactions.fire}</span>
              </button>

              <button
                onClick={() => handleReact("mindblown")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-all ${
                  userReacted === "mindblown"
                    ? "bg-amber-500/20 border-amber-500 text-amber-400 scale-105"
                    : "bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Chocante</span>
                <span className="text-zinc-500 font-mono text-[11px]">{reactions.mindblown}</span>
              </button>

              <button
                onClick={() => handleReact("laugh")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-all ${
                  userReacted === "laugh"
                    ? "bg-blue-500/20 border-blue-500 text-blue-400 scale-105"
                    : "bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                <Laugh className="h-4 w-4 text-blue-400" />
                <span>Demais</span>
                <span className="text-zinc-500 font-mono text-[11px]">{reactions.laugh}</span>
              </button>

              <button
                onClick={handleSuperLike}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-medium transition-all ${
                  superLiked
                    ? "bg-red-500 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-105"
                    : "bg-zinc-800/80 border-zinc-700/80 text-zinc-300 hover:border-red-500/60 hover:text-white"
                }`}
              >
                <Heart className={`h-4 w-4 ${superLiked ? "fill-white" : "text-red-500"}`} />
                <span>Super Like</span>
                <span className={superLiked ? "text-white/90" : "text-zinc-500 font-mono text-[11px]"}>
                  {likesCount}
                </span>
              </button>
            </div>
          </div>

          {/* Episode Jump Navigation (Prev / Next) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevEpisode ? (
              <Button
                asChild
                variant="outline"
                className="h-auto py-4 px-5 border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-left flex items-center justify-between group"
              >
                <Link
                  to={`/webtoon/${webtoon.id}/ler/${prevEpisode.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <div className="flex items-center gap-3">
                    <ArrowLeft className="h-4 w-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Episódio Anterior</span>
                      <span className="text-xs font-medium text-white truncate block max-w-[180px]">
                        Ep. {prevEpisode.number} — {prevEpisode.title}
                      </span>
                    </div>
                  </div>
                </Link>
              </Button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextEpisode ? (
              <Button
                asChild
                className="h-auto py-4 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-right flex items-center justify-between group shadow-lg shadow-emerald-950/50"
              >
                <Link
                  to={`/webtoon/${webtoon.id}/ler/${nextEpisode.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-200 block">Próximo Episódio</span>
                    <span className="text-xs font-semibold text-white truncate block max-w-[200px]">
                      Ep. {nextEpisode.number} — {nextEpisode.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            ) : (
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1" />
                <span className="text-xs font-medium text-white">Você está em dia com esta obra!</span>
                <span className="text-[11px] text-zinc-500 mt-0.5">Novo episódio em breve no cronograma.</span>
              </div>
            )}
          </div>

          {/* Quick Return to Overview */}
          <div className="flex items-center justify-center gap-4 pt-4 text-xs">
            <Link to={`/webtoon/${webtoon.id}`} className="text-zinc-400 hover:text-white transition-colors">
              Página do Webtoon
            </Link>
            <span className="text-zinc-700">·</span>
            <Link to="/webtoons" className="text-zinc-400 hover:text-white transition-colors">
              Catálogo de Webtoons
            </Link>
            <span className="text-zinc-700">·</span>
            <button onClick={scrollToTop} className="text-emerald-400 hover:underline flex items-center gap-1">
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-zinc-900/90 hover:bg-emerald-600 text-white border border-zinc-800 shadow-xl transition-all duration-300"
        title="Voltar ao Topo"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  );
};

export default WebtoonReader;
