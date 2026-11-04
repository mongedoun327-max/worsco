import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Tv,
  BookOpen,
  Sliders,
  Sparkles,
} from "lucide-react";
import {
  ANIMES_DATA,
  Anime,
  MangaChapter,
  saveMangaProgress,
  getMangaProgress,
} from "@/lib/animes";
import { useContentProtection } from "@/hooks/useContentProtection";
import { toast } from "sonner";

export const AnimeMangaReader = () => {
  useContentProtection();
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  const navigate = useNavigate();

  const anime: Anime | undefined = useMemo(() => {
    return ANIMES_DATA.find((a) => a.id === id || a.slug === id);
  }, [id]);

  const chapters = useMemo(() => anime?.manga?.chapters || [], [anime]);

  const currentChapter: MangaChapter | undefined = useMemo(() => {
    if (!chapters.length) return undefined;
    if (chapterId) {
      return (
        chapters.find((c) => c.id === chapterId || String(c.number) === chapterId) ||
        chapters[0]
      );
    }
    return chapters[0];
  }, [chapters, chapterId]);

  const chapterIndex = useMemo(() => {
    if (!currentChapter) return 0;
    return chapters.findIndex((c) => c.id === currentChapter.id);
  }, [chapters, currentChapter]);

  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  const [readingMode, setReadingMode] = useState<"vertical" | "single">("vertical");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved progress
  useEffect(() => {
    if (anime && currentChapter) {
      const saved = getMangaProgress(anime.id);
      if (saved && saved.chapterNumber === currentChapter.number) {
        setCurrentPageIndex(saved.pageIndex);
      }
    }
  }, [anime, currentChapter]);

  // Save progress on page or chapter change
  useEffect(() => {
    if (anime && currentChapter) {
      saveMangaProgress(anime.id, currentChapter.number, currentPageIndex);
    }
  }, [anime, currentChapter, currentPageIndex]);

  // Keyboard navigation for single page mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentChapter) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (currentPageIndex < currentChapter.pages.length - 1) {
          setCurrentPageIndex((p) => p + 1);
        } else if (nextChapter) {
          navigate(`/animes/${anime?.id}/manga/${nextChapter.id}`);
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (currentPageIndex > 0) {
          setCurrentPageIndex((p) => p - 1);
        } else if (prevChapter) {
          navigate(`/animes/${anime?.id}/manga/${prevChapter.id}`);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPageIndex, currentChapter, nextChapter, prevChapter, anime, navigate]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!anime || !currentChapter) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-light mb-2">Mangá não encontrado</h2>
        <p className="text-xs text-white/60 mb-6">
          Não foi possível carregar os capítulos deste mangá.
        </p>
        <button
          onClick={() => navigate("/animes")}
          className="px-6 py-2.5 rounded-full bg-primary text-white text-xs uppercase tracking-wider font-medium"
        >
          Voltar para Animes
        </button>
      </div>
    );
  }

  const pages = currentChapter.pages;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0d0f12] text-white flex flex-col justify-between selection:bg-primary selection:text-white"
    >
      {/* Sticky Reader Header */}
      <header className="sticky top-0 z-50 bg-[#12151a]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to={`/animes/${anime.id}`}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Voltar aos detalhes do anime"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">
                  Mangá
                </span>
                <span className="text-xs text-white/50 truncate font-light">
                  {anime.title}
                </span>
              </div>
              <h1 className="text-sm font-medium text-white truncate">
                {currentChapter.title}
              </h1>
            </div>
          </div>

          {/* Center / Right Controls */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Chapter Selector Dropdown */}
            <select
              value={currentChapter.id}
              onChange={(e) => navigate(`/animes/${anime.id}/manga/${e.target.value}`)}
              className="bg-white/10 border border-white/20 text-white text-xs rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer max-w-[140px] md:max-w-none truncate"
            >
              {chapters.map((c) => (
                <option key={c.id} value={c.id} className="bg-neutral-900 text-white">
                  Cap. {c.number} — {c.title}
                </option>
              ))}
            </select>

            {/* Reading Mode Switcher */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-full p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setReadingMode("vertical")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  readingMode === "vertical"
                    ? "bg-primary text-white font-medium"
                    : "text-white/60 hover:text-white"
                }`}
                title="Modo cascata contínua"
              >
                Cascata
              </button>
              <button
                type="button"
                onClick={() => setReadingMode("single")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  readingMode === "single"
                    ? "bg-primary text-white font-medium"
                    : "text-white/60 hover:text-white"
                }`}
                title="Modo página por página"
              >
                Página
              </button>
            </div>

            {/* Watch Anime Button */}
            <Link
              to={`/animes/${anime.id}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-light transition-colors"
              title="Assistir à versão em anime"
            >
              <Tv className="h-3.5 w-3.5 text-primary" />
              <span>Ver Anime</span>
            </Link>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Reader Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:py-8 max-w-4xl mx-auto w-full">
        {readingMode === "vertical" ? (
          /* Cascading Continuous Vertical Scroll Mode */
          <div className="w-full space-y-3 md:space-y-4">
            {pages.map((pageUrl, idx) => (
              <div
                key={idx}
                className="relative bg-black rounded-lg overflow-hidden shadow-2xl border border-white/5 mx-auto max-w-2xl"
              >
                <img
                  src={pageUrl}
                  alt={`Página ${idx + 1} de ${currentChapter.title}`}
                  className="w-full h-auto object-contain block select-none"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-white/70 font-mono">
                  {idx + 1} / {pages.length}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Single Page / Paginated Mode */
          <div className="w-full flex flex-col items-center">
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 max-w-2xl w-full aspect-[2/3] flex items-center justify-center group">
              <img
                src={pages[currentPageIndex]}
                alt={`Página ${currentPageIndex + 1}`}
                className="w-full h-full object-contain select-none cursor-pointer"
                onClick={() => {
                  if (currentPageIndex < pages.length - 1) {
                    setCurrentPageIndex((p) => p + 1);
                  }
                }}
              />

              {/* Side click hotspots */}
              <button
                type="button"
                onClick={() => setCurrentPageIndex((p) => Math.max(0, p - 1))}
                disabled={currentPageIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white disabled:opacity-20 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentPageIndex((p) => Math.min(pages.length - 1, p + 1))
                }
                disabled={currentPageIndex === pages.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white disabled:opacity-20 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs text-white/90 font-mono">
                Página {currentPageIndex + 1} de {pages.length}
              </div>
            </div>

            {/* Page Slider / Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => setCurrentPageIndex((p) => Math.max(0, p - 1))}
                disabled={currentPageIndex === 0}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs text-white disabled:opacity-30 transition-colors"
              >
                ← Página Anterior
              </button>

              <span className="text-xs text-white/70 font-mono">
                {currentPageIndex + 1} / {pages.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPageIndex((p) => Math.min(pages.length - 1, p + 1))
                }
                disabled={currentPageIndex === pages.length - 1}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs text-white disabled:opacity-30 transition-colors"
              >
                Próxima Página →
              </button>
            </div>
          </div>
        )}

        {/* Chapter Bottom Navigation Bar */}
        <div className="w-full max-w-2xl mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevChapter ? (
            <Link
              to={`/animes/${anime.id}/manga/${prevChapter.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-xs font-medium text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Capítulo Anterior ({prevChapter.number})</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          <div className="text-center">
            <span className="text-[11px] text-white/50 block mb-1">
              Você está lendo:
            </span>
            <span className="text-xs font-medium text-white">
              Capítulo {currentChapter.number} de {chapters.length}
            </span>
          </div>

          {nextChapter ? (
            <Link
              to={`/animes/${anime.id}/manga/${nextChapter.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-xs font-medium text-white transition-colors shadow-lg"
            >
              <span>Próximo Capítulo ({nextChapter.number})</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              to={`/animes/${anime.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-medium text-white transition-colors"
            >
              <span>Voltar aos Detalhes</span>
            </Link>
          )}
        </div>
      </main>

      {/* Footer bar with quick action to watch anime episode */}
      <footer className="bg-[#12151a]/95 border-t border-white/10 py-4 px-6 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>
              Curtiu a história? Assista à animação completa com áudio e legendas.
            </span>
          </div>

          <Link
            to={`/animes/${anime.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            <Tv className="h-3.5 w-3.5" />
            <span>Assistir Anime</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default AnimeMangaReader;
