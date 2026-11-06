import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimeCard from "@/components/AnimeCard";
import AnimePlayerModal from "@/components/AnimePlayerModal";
import {
  ANIMES_DATA,
  Anime,
  isAnimeInWatchlist,
  toggleAnimeWatchlist,
} from "@/lib/animes";
import { fetchMangaDexChapters, MangaDexChapter } from "@/lib/mangadex";
import { useContentProtection } from "@/hooks/useContentProtection";
import {
  Play,
  Star,
  Bookmark,
  BookmarkCheck,
  Share2,
  Tv,
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle2,
  Volume2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Globe,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export const AnimeDetail = () => {
  useContentProtection();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const anime = useMemo(() => {
    return ANIMES_DATA.find((a) => a.id === id || a.slug === id);
  }, [id]);

  const [inWatchlist, setInWatchlist] = useState(false);
  const [activeTab, setActiveTab] = useState<"episodes" | "manga">("episodes");
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState(1);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [playerAnime, setPlayerAnime] = useState<Anime | null>(null);

  // MangaDex & Tomato Live Chapter State
  const [onlineChapters, setOnlineChapters] = useState<MangaDexChapter[]>([]);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);
  const [mangaLangFilter, setMangaLangFilter] = useState<"pt-br" | "en" | "all">("pt-br");

  useEffect(() => {
    if (anime) {
      setInWatchlist(isAnimeInWatchlist(anime.id));
      const handleUpdate = () => setInWatchlist(isAnimeInWatchlist(anime.id));
      window.addEventListener("worscoi_watchlist_updated", handleUpdate);
      return () => window.removeEventListener("worscoi_watchlist_updated", handleUpdate);
    }
  }, [anime]);

  // Fetch real chapters from MangaDex and Tomato engine
  useEffect(() => {
    if (!anime?.manga?.mangadexId) return;
    let isMounted = true;
    setIsLoadingChapters(true);

    fetchMangaDexChapters(anime.manga.mangadexId, mangaLangFilter)
      .then((chList) => {
        if (!isMounted) return;
        setOnlineChapters(chList);
      })
      .catch((err) => {
        console.warn("Failed to load MangaDex chapters:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingChapters(false);
      });

    return () => {
      isMounted = false;
    };
  }, [anime?.manga?.mangadexId, mangaLangFilter]);

  const relatedAnimes = useMemo(() => {
    if (!anime) return [];
    return ANIMES_DATA.filter((a) => a.id !== anime.id && a.genres.some((g) => anime.genres.includes(g))).slice(0, 4);
  }, [anime]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navigation />
        <div className="container mx-auto px-6 py-32 text-center">
          <h2 className="text-2xl font-light mb-4 text-foreground">Anime não encontrado</h2>
          <p className="text-sm text-muted-foreground mb-6">
            O anime solicitado não foi localizado em nosso catálogo.
          </p>
          <button
            onClick={() => navigate("/animes")}
            className="px-6 py-2.5 bg-foreground text-background rounded-full text-xs uppercase tracking-wider font-medium"
          >
            Voltar para Animes
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWatchlist = () => {
    const next = toggleAnimeWatchlist(anime.id);
    setInWatchlist(next);
    if (next) {
      toast.success("Adicionado à sua lista!", {
        description: `"${anime.title}" foi salvo na sua lista.`,
      });
    } else {
      toast.info("Removido da sua lista", {
        description: `"${anime.title}" foi removido da sua lista.`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: anime.title,
          text: anime.synopsis,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!", {
        description: "O link deste anime foi copiado para a área de transferência.",
      });
    }
  };

  const activeEpisode = anime.episodes.find((ep) => ep.number === activeEpisodeNumber) ?? anime.episodes[0];
  const firstMangaChapter = anime.manga?.chapters[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Cinematic Banner Header */}
      <div className="relative w-full h-[55vh] min-h-[380px] overflow-hidden" data-protected-media>
        <img
          src={anime.banner}
          alt={anime.title}
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

        <div className="relative h-full container mx-auto px-6 lg:px-12 flex flex-col justify-end pb-8">
          <Link
            to="/animes"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para catálogo de animes</span>
          </Link>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="container mx-auto px-6 lg:px-12 -mt-24 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Poster + Meta Actions */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start">
            <div className="w-56 md:w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-2 border-border/80 bg-accent mb-6 relative group">
              <img
                src={anime.cover}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white flex items-center justify-between">
                <span>Anime & Mangá</span>
                <span className="text-primary font-medium">Disponível</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("episodes");
                  setIsPlayingTrailer(true);
                }}
                className="w-full py-3 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-soft transition-colors"
              >
                <Play className="h-4 w-4 fill-current" />
                Assistir Anime
              </button>

              {firstMangaChapter && (
                <Link
                  to={`/animes/${anime.id}/manga/${firstMangaChapter.id}`}
                  className="w-full py-2.5 px-4 rounded-full bg-primary text-white hover:bg-primary/90 font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-soft transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Ler Mangá Online
                </Link>
              )}

              <button
                type="button"
                onClick={handleWatchlist}
                className={`w-full py-2.5 px-4 rounded-full border text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                  inWatchlist
                    ? "bg-primary/10 border-primary text-primary font-medium"
                    : "bg-card border-border hover:bg-accent text-foreground font-light"
                }`}
              >
                {inWatchlist ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 fill-current" />
                    Salvo na Minha Lista
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Salvar na Lista
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="w-full py-2.5 px-4 rounded-full border border-border bg-card hover:bg-accent text-xs tracking-wider uppercase text-foreground font-light flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Compartilhar
              </button>
            </div>

            {/* Quick Metadata Box */}
            <div className="w-full mt-6 p-4 rounded-xl bg-card border border-border space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Status Anime:</span>
                <span className="font-medium text-primary">{anime.status}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Estúdio:</span>
                <span className="font-medium text-foreground">{anime.studio}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Episódios:</span>
                <span className="font-medium text-foreground">{anime.episodesCount}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Capítulos Mangá:</span>
                <span className="font-medium text-foreground">{anime.manga?.chaptersCount || 0}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Autor da Obra:</span>
                <span className="font-medium text-foreground">{anime.manga?.author || anime.studio}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground font-light">Áudio:</span>
                <span className="font-medium text-foreground">{anime.audio}</span>
              </div>
              {anime.broadcastDay && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-light">Exibição:</span>
                  <span className="font-medium text-foreground">{anime.broadcastDay}s</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Synopsis, Tabs (Watch or Read) */}
          <div className="md:col-span-8 lg:col-span-9">
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-primary/10 text-primary font-medium">
                {anime.status}
              </span>
              <div className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{anime.rating.toFixed(1)}</span>
                <span className="text-muted-foreground font-light">
                  ({anime.ratingCount.toLocaleString()} avaliações)
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                <Volume2 className="h-3.5 w-3.5 text-primary" />
                <span>{anime.audio}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-light text-foreground tracking-tight mb-1">
              {anime.title}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground italic mb-6">
              {anime.japaneseTitle} • {anime.studio} ({anime.year})
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-light"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Sinopse
              </h3>
              <p className="text-sm md:text-base text-foreground/80 font-light leading-relaxed">
                {anime.synopsis}
              </p>
            </div>

            {/* Section Switcher Tabs: Watch Anime vs Read Manga */}
            <div className="flex items-center gap-3 p-1.5 bg-secondary/60 rounded-xl mb-8 border border-border">
              <button
                type="button"
                onClick={() => setActiveTab("episodes")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all ${
                  activeTab === "episodes"
                    ? "bg-card text-foreground shadow-soft border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Tv className="h-4 w-4 text-primary" />
                <span>Assistir Anime ({anime.episodesCount} Episódios)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("manga")}
                className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all ${
                  activeTab === "manga"
                    ? "bg-card text-foreground shadow-soft border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Ler Mangá Original ({anime.manga?.chaptersCount || 0} Capítulos)</span>
              </button>
            </div>

            {/* TAB 1: WATCH ANIME (Episodes Player & List) */}
            {activeTab === "episodes" && (
              <div>
                {/* Inline Video Player */}
                <div className="mb-10 rounded-2xl overflow-hidden border border-border bg-card shadow-soft">
                  <div className="p-4 bg-secondary/50 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tv className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Player de Reprodução • Episódio {activeEpisode.number}: {activeEpisode.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-light">
                      Duração: {activeEpisode.duration}
                    </span>
                  </div>

                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${anime.trailerYoutubeId}?rel=0`}
                      title={`${anime.title} - Episódio ${activeEpisode.number}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-card">
                    <p className="text-muted-foreground font-light">
                      {activeEpisode.synopsis}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-1 rounded bg-green-500/10 text-green-600 font-medium text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        HD 1080p
                      </span>
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary font-medium text-[11px]">
                        Legendas PT-BR
                      </span>
                    </div>
                  </div>
                </div>

                {/* Episodes List Section */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-light text-foreground">
                        Lista de Episódios
                      </h3>
                      <p className="text-xs text-muted-foreground font-light">
                        {anime.episodes.length} episódios disponíveis para assistir
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {anime.episodes.map((ep) => {
                      const isActive = ep.number === activeEpisodeNumber;
                      return (
                        <div
                          key={ep.id}
                          onClick={() => setActiveEpisodeNumber(ep.number)}
                          className={`group p-3 md:p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4 ${
                            isActive
                              ? "bg-accent border-primary shadow-soft"
                              : "bg-card border-border hover:bg-accent/40"
                          }`}
                        >
                          <div className="relative w-full sm:w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                            <img
                              src={ep.thumbnail}
                              alt={ep.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                  isActive
                                    ? "bg-primary text-white"
                                    : "bg-white/80 text-foreground group-hover:bg-primary group-hover:text-white"
                                } transition-colors`}
                              >
                                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                              </div>
                            </div>
                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono">
                              {ep.duration}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono font-medium text-primary">
                                Ep. {ep.number}
                              </span>
                              {ep.isFree && (
                                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-green-500/10 text-green-600 font-medium">
                                  Grátis
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                              {ep.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1 font-light">
                              {ep.synopsis}
                            </p>
                          </div>

                          <div className="sm:self-center">
                            <button
                              type="button"
                              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                isActive
                                  ? "bg-primary text-white"
                                  : "bg-secondary text-foreground group-hover:bg-primary group-hover:text-white"
                              }`}
                            >
                              {isActive ? "Reproduzindo" : "Assistir"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: READ MANGA (Chapters List & Viewer) */}
            {activeTab === "manga" && (
              <div>
                {/* Manga Headline Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/80 via-accent/40 to-transparent border border-border mb-8 flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src={anime.manga?.cover || anime.cover}
                    alt={anime.manga?.title || anime.title}
                    className="w-32 aspect-[3/4] object-cover rounded-xl shadow-xl border border-border flex-shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                      <span className="text-[11px] uppercase tracking-wider text-primary font-medium px-2 py-0.5 rounded bg-primary/10">
                        Obra Original • {anime.manga?.status}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-500 font-medium px-2 py-0.5 rounded bg-emerald-500/10 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        MangaDex & Tomato Hub
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-light text-foreground tracking-tight mb-2">
                      {anime.manga?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light mb-1">
                      Roteiro: <strong className="text-foreground">{anime.manga?.author}</strong> • Arte: <strong className="text-foreground">{anime.manga?.artist}</strong>
                    </p>
                    {anime.manga?.serialization && (
                      <p className="text-xs text-muted-foreground font-light mb-4">
                        Serialização: <strong className="text-foreground">{anime.manga.serialization}</strong>
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      {firstMangaChapter && (
                        <Link
                          to={`/animes/${anime.id}/manga/${onlineChapters[0]?.id || firstMangaChapter.id}`}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-soft"
                        >
                          <BookOpen className="h-4 w-4" />
                          Começar do Capítulo 1
                        </Link>
                      )}
                      {anime.manga?.mangadexId && (
                        <a
                          href={`https://mangadex.org/title/${anime.manga.mangadexId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-light transition-colors"
                        >
                          <Globe className="h-3.5 w-3.5 text-primary" />
                          <span>Ver no MangaDex</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chapters List Section */}
                <div className="mb-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-light text-foreground flex items-center gap-2">
                        <span>Capítulos do Mangá</span>
                        {isLoadingChapters && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                      </h3>
                      <p className="text-xs text-muted-foreground font-light">
                        {onlineChapters.length > 0
                          ? `${onlineChapters.length} capítulos oficiais sincronizados via MangaDex & Tomato`
                          : `${anime.manga?.chapters.length || 0} capítulos preparados para leitura imediata`}
                      </p>
                    </div>

                    {/* Language Filter */}
                    <div className="flex items-center gap-1 bg-card border border-border p-1 rounded-full text-xs">
                      <button
                        type="button"
                        onClick={() => setMangaLangFilter("pt-br")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          mangaLangFilter === "pt-br"
                            ? "bg-primary text-white font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        🇧🇷 Português (PT-BR)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMangaLangFilter("en")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          mangaLangFilter === "en"
                            ? "bg-primary text-white font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        🇺🇸 Inglês (EN)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMangaLangFilter("all")}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          mangaLangFilter === "all"
                            ? "bg-primary text-white font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        🌐 Todos
                      </button>
                    </div>
                  </div>

                  {isLoadingChapters && onlineChapters.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                      <p className="text-sm font-light text-foreground">
                        Sincronizando capítulos oficiais com servidores MangaDex e Tomato...
                      </p>
                      <span className="text-xs text-muted-foreground mt-1">
                        Carregando volumes, scans e páginas traduzidas
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Priority: If Online Chapters exist, render them */}
                      {onlineChapters.length > 0 ? (
                        onlineChapters.map((chapter) => (
                          <div
                            key={chapter.id}
                            className="p-4 rounded-xl border border-border bg-card hover:bg-accent/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 font-mono font-medium text-sm">
                                #{chapter.number}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                    {chapter.title}
                                  </h4>
                                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-primary/10 text-primary font-medium flex-shrink-0">
                                    {chapter.translatedLanguage.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-light line-clamp-1">
                                  Scan / Grupo: <strong className="text-foreground">{chapter.scanlationGroup}</strong>
                                </p>
                                <span className="text-[10px] text-muted-foreground/80 mt-1 block">
                                  {chapter.pagesCount > 0 ? `${chapter.pagesCount} páginas • ` : ""}
                                  Lançamento: {chapter.publishAt}
                                </span>
                              </div>
                            </div>

                            <div className="flex-shrink-0 self-end sm:self-center">
                              <Link
                                to={`/animes/${anime.id}/manga/${chapter.id}`}
                                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-secondary hover:bg-primary hover:text-white text-foreground text-xs font-medium transition-colors"
                              >
                                <span>Ler Capítulo</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        /* Fallback to local chapters */
                        (anime.manga?.chapters || []).map((chapter) => (
                          <div
                            key={chapter.id}
                            className="p-4 rounded-xl border border-border bg-card hover:bg-accent/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 font-mono font-medium text-sm">
                                #{chapter.number}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                    {chapter.title}
                                  </h4>
                                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-green-500/10 text-green-600 font-medium flex-shrink-0">
                                    HD Original
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-light line-clamp-1">
                                  {chapter.description}
                                </p>
                                <span className="text-[10px] text-muted-foreground/80 mt-1 block">
                                  {chapter.pagesCount} páginas • {chapter.releaseDate}
                                </span>
                              </div>
                            </div>

                            <div className="flex-shrink-0 self-end sm:self-center">
                              <Link
                                to={`/animes/${anime.id}/manga/${chapter.id}`}
                                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-secondary hover:bg-primary hover:text-white text-foreground text-xs font-medium transition-colors"
                              >
                                <span>Ler Capítulo</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Related Animes */}
            {relatedAnimes.length > 0 && (
              <div className="pt-8 border-t border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-foreground">
                    Animes & Mangás Relacionados
                  </h3>
                  <Link
                    to="/animes"
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    Ver catálogo completo →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedAnimes.map((item) => (
                    <AnimeCard
                      key={item.id}
                      item={item}
                      onOpenPlayer={(it) => setPlayerAnime(it)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimePlayerModal
        anime={playerAnime || (isPlayingTrailer ? anime : null)}
        isOpen={!!playerAnime || isPlayingTrailer}
        onClose={() => {
          setPlayerAnime(null);
          setIsPlayingTrailer(false);
        }}
      />

      <Footer />
    </div>
  );
};

export default AnimeDetail;
