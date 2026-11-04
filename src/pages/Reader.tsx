import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  List,
  Type,
  Palette,
  Bookmark,
  Check,
  BookOpen,
  Sparkles,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBook, useChapters } from "@/hooks/useCatalog";
import { toast } from "sonner";

type ThemeMode = "light" | "sepia" | "dark" | "oled";
type FontSizeMode = "sm" | "md" | "lg" | "xl";
type FontFamilyMode = "serif" | "sans";

const THEMES: Record<
  ThemeMode,
  { label: string; bg: string; text: string; card: string; border: string; accent: string }
> = {
  light: {
    label: "Claro",
    bg: "bg-white",
    text: "text-zinc-900",
    card: "bg-zinc-50",
    border: "border-zinc-200",
    accent: "text-emerald-700",
  },
  sepia: {
    label: "Sépia",
    bg: "bg-[#fbf0d9]",
    text: "text-[#3f3123]",
    card: "bg-[#f2e4c8]",
    border: "border-[#e5d4b3]",
    accent: "text-[#8c501c]",
  },
  dark: {
    label: "Escuro",
    bg: "bg-[#18181b]",
    text: "text-zinc-100",
    card: "bg-[#27272a]",
    border: "border-zinc-800",
    accent: "text-emerald-400",
  },
  oled: {
    label: "Noturno",
    bg: "bg-black",
    text: "text-zinc-300",
    card: "bg-zinc-900",
    border: "border-zinc-900",
    accent: "text-zinc-100",
  },
};

const FONT_SIZES: Record<FontSizeMode, { label: string; textClass: string; leadingClass: string }> = {
  sm: { label: "Pequeno", textClass: "text-base", leadingClass: "leading-relaxed" },
  md: { label: "Médio", textClass: "text-lg", leadingClass: "leading-loose" },
  lg: { label: "Grande", textClass: "text-xl", leadingClass: "leading-loose" },
  xl: { label: "Extra", textClass: "text-2xl", leadingClass: "leading-loose" },
};

const Reader = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const capParam = searchParams.get("cap");
  const { data: book, isLoading: isBookLoading } = useBook(id);
  const { data: chapters = [], isLoading: isChaptersLoading } = useChapters(id);

  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem("worscoi_reader_theme") as ThemeMode) || "light";
  });
  const [fontSize, setFontSize] = useState<FontSizeMode>(() => {
    return (localStorage.getItem("worscoi_reader_font_size") as FontSizeMode) || "md";
  });
  const [fontFamily, setFontFamily] = useState<FontFamilyMode>(() => {
    return (localStorage.getItem("worscoi_reader_font_family") as FontFamilyMode) || "serif";
  });

  const [showChaptersModal, setShowChaptersModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Restore saved chapter position or prioritize ?cap parameter
  useEffect(() => {
    if (chapters.length > 0) {
      if (capParam !== null) {
        const parsedCap = parseInt(capParam, 10);
        if (!isNaN(parsedCap) && parsedCap >= 0 && parsedCap < chapters.length) {
          setIndex(parsedCap);
          return;
        }
      }
      if (id) {
        const savedIndex = localStorage.getItem(`worscoi_reading_pos_${id}`);
        if (savedIndex !== null) {
          const parsed = parseInt(savedIndex, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed < chapters.length) {
            setIndex(parsed);
          }
        }
      }
    }
  }, [id, capParam, chapters.length]);

  // Save progress when index changes
  useEffect(() => {
    if (id && chapters.length > 0) {
      localStorage.setItem(`worscoi_reading_pos_${id}`, String(index));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index, id, chapters.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showChaptersModal || showSettingsModal) return;
      if (e.key === "ArrowLeft" || e.key === "j") {
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight" || e.key === "k") {
        setIndex((i) => Math.min(chapters.length - 1, i + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chapters.length, showChaptersModal, showSettingsModal]);

  const currentTheme = THEMES[theme];
  const currentSize = FONT_SIZES[fontSize];
  const chapter = chapters[index];

  const readingPercentage = useMemo(() => {
    if (chapters.length <= 1) return 100;
    return Math.round(((index + 1) / chapters.length) * 100);
  }, [index, chapters.length]);

  const changeTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem("worscoi_reader_theme", newTheme);
  };

  const changeFontSize = (newSize: FontSizeMode) => {
    setFontSize(newSize);
    localStorage.setItem("worscoi_reader_font_size", newSize);
  };

  const changeFontFamily = (newFont: FontFamilyMode) => {
    setFontFamily(newFont);
    localStorage.setItem("worscoi_reader_font_family", newFont);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${book?.title} - ${chapter?.title}`,
        url: window.location.href,
      }).catch(() => undefined);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link do capítulo copiado para a área de transferência!");
    }
  };

  const cleanParagraphs = useMemo(() => {
    if (!chapter?.content) return [];
    return chapter.content
      .split(/\r?\n\r?\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }, [chapter?.content]);

  const isPublicDomain = id?.startsWith("guten-") || id?.includes("gutenberg") || !book?.price_cents;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${readingPercentage}%` }}
        />
      </div>

      {/* Reader Sticky Header */}
      <header
        className={`sticky top-0 z-40 border-b ${currentTheme.border} ${currentTheme.bg}/95 backdrop-blur px-4 sm:px-6 py-3 transition-colors duration-200`}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <Link
            to={`/livros/${id}`}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium opacity-80 hover:opacity-100 transition-opacity truncate max-w-[200px] sm:max-w-xs"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">{book?.title ?? "Voltar"}</span>
          </Link>

          {chapters.length > 0 && (
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Chapter selector button */}
              <button
                onClick={() => setShowChaptersModal(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${currentTheme.border} ${currentTheme.card} hover:opacity-90 transition-all`}
                title="Índice de Capítulos"
              >
                <List className="h-3.5 w-3.5" />
                <span>
                  Cap. {index + 1}/{chapters.length}
                </span>
              </button>

              {/* Reader Appearance Settings */}
              <button
                onClick={() => setShowSettingsModal(!showSettingsModal)}
                className={`p-2 rounded-full border ${currentTheme.border} ${currentTheme.card} hover:opacity-90 transition-all`}
                title="Configurações de Leitura (Fonte, Cor, Tamanho)"
              >
                <Type className="h-4 w-4" />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className={`hidden sm:flex p-2 rounded-full border ${currentTheme.border} ${currentTheme.card} hover:opacity-90 transition-all`}
                title="Compartilhar"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Floating Settings Dropdown */}
        {showSettingsModal && (
          <div
            className={`mt-3 p-4 mx-auto max-w-md rounded-2xl border shadow-xl ${currentTheme.card} ${currentTheme.border} transition-all`}
          >
            <div className="space-y-4">
              {/* Themes */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold opacity-70 block mb-2">
                  Tema de Leitura
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(Object.keys(THEMES) as ThemeMode[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => changeTheme(t)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
                        theme === t ? "ring-2 ring-emerald-500 font-bold" : "opacity-80 hover:opacity-100"
                      } ${THEMES[t].bg} ${THEMES[t].text} ${THEMES[t].border}`}
                    >
                      <span>{THEMES[t].label}</span>
                      {theme === t && <Check className="h-3 w-3 mt-1 text-emerald-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold opacity-70 block mb-2">
                  Tamanho da Letra
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(Object.keys(FONT_SIZES) as FontSizeMode[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => changeFontSize(s)}
                      className={`py-1.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                        fontSize === s
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : `border ${currentTheme.border} ${currentTheme.bg} opacity-80 hover:opacity-100`
                      }`}
                    >
                      {FONT_SIZES[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold opacity-70 block mb-2">
                  Tipografia
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => changeFontFamily("serif")}
                    className={`py-2 px-3 rounded-xl border font-serif text-sm transition-all ${
                      fontFamily === "serif"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : `border ${currentTheme.border} ${currentTheme.bg} opacity-80`
                    }`}
                  >
                    Serifada Clássica
                  </button>
                  <button
                    onClick={() => changeFontFamily("sans")}
                    className={`py-2 px-3 rounded-xl border font-sans text-sm transition-all ${
                      fontFamily === "sans"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : `border ${currentTheme.border} ${currentTheme.bg} opacity-80`
                    }`}
                  >
                    Sem Serifa Moderna
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Chapter Selection Modal */}
      {showChaptersModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-xl max-h-[80vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${currentTheme.card} ${currentTheme.border}`}
          >
            <div className={`p-4 border-b ${currentTheme.border} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-base">Índice da Obra ({chapters.length} partes)</h3>
              </div>
              <button
                onClick={() => setShowChaptersModal(false)}
                className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border opacity-70 hover:opacity-100"
              >
                Fechar
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-1.5 divide-y divide-black/5">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id || idx}
                  onClick={() => {
                    setIndex(idx);
                    setShowChaptersModal(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-sm flex items-center justify-between transition-all ${
                    idx === index
                      ? "bg-emerald-600 text-white font-medium"
                      : `hover:${currentTheme.bg} opacity-80 hover:opacity-100`
                  }`}
                >
                  <span className="truncate pr-4">
                    {ch.position}. {ch.title}
                  </span>
                  {idx === index && <Check className="h-4 w-4 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Canvas */}
      <main className="mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-16">
        {isChaptersLoading || isBookLoading ? (
          <div className="py-24 text-center">
            <BookOpen className="mx-auto h-8 w-8 animate-pulse text-emerald-500 mb-4" />
            <h2 className="text-xl font-medium">Carregando obra completa...</h2>
            <p className="mt-2 text-xs opacity-60">
              Conectando aos arquivos de alta fidelidade do Projeto Gutenberg
            </p>
          </div>
        ) : chapters.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
            <h1 className="mt-4 text-2xl font-display">Texto em processamento</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm opacity-70">
              Não foi possível carregar os capítulos desta obra no momento.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link to={`/livros/${id}`}>Voltar ao detalhe</Link>
            </Button>
          </div>
        ) : (
          <article className={fontFamily === "serif" ? "font-serif" : "font-sans"}>
            {/* Chapter Header */}
            <header className="mb-12 pb-8 border-b border-black/10 dark:border-white/10 text-center">
              <span className="text-xs uppercase tracking-widest opacity-60 font-medium">
                {book?.title} · Capítulo {chapter.position} de {chapters.length}
              </span>
              <h1 className="mt-4 text-2xl sm:text-4xl font-normal tracking-tight">
                {chapter.title}
              </h1>

              {id?.startsWith("mod-") ? (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Bestseller Moderno Mais Influente · Guia & Capítulos Integrais</span>
                </div>
              ) : isPublicDomain && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Obra Completa de Domínio Público · Leitura Livre</span>
                </div>
              )}
            </header>

            {/* Chapter Body */}
            <div className={`space-y-6 ${currentSize.textClass} ${currentSize.leadingClass} tracking-normal`}>
              {cleanParagraphs.map((paragraph, i) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={i}
                      className="text-xl sm:text-2xl font-semibold tracking-tight mt-10 mb-4 text-emerald-700 dark:text-emerald-400"
                    >
                      {paragraph.replace(/^###\s+/, "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("#### ")) {
                  return (
                    <h4 key={i} className="text-lg sm:text-xl font-medium tracking-tight mt-8 mb-3 opacity-90">
                      {paragraph.replace(/^####\s+/, "")}
                    </h4>
                  );
                }
                if (paragraph.startsWith("> ")) {
                  return (
                    <blockquote
                      key={i}
                      className="my-6 pl-5 border-l-4 border-emerald-500 italic opacity-95 text-base sm:text-lg bg-emerald-500/5 py-4 rounded-r-xl"
                    >
                      {paragraph.replace(/^>\s*"?/, "").replace(/"?\s*$/, "")}
                    </blockquote>
                  );
                }
                if (paragraph.includes("\n* ") || paragraph.startsWith("* ")) {
                  const items = paragraph.split("\n").filter((l) => l.trim().startsWith("* "));
                  return (
                    <ul key={i} className="my-4 space-y-2 list-disc list-inside">
                      {items.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item.replace(/^\*\s+/, "")}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="text-justify indent-6">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Bottom Chapter Navigation */}
            <div className="mt-20 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium border ${currentTheme.border} ${currentTheme.card} ${
                  index === 0 ? "opacity-30 cursor-not-allowed" : "hover:opacity-100 opacity-80"
                }`}
              >
                <ChevronLeft className="h-4 w-4" /> Capítulo Anterior
              </button>

              <span className="text-xs opacity-60 font-mono">
                {index + 1} de {chapters.length} ({readingPercentage}%)
              </span>

              <button
                disabled={index >= chapters.length - 1}
                onClick={() => setIndex((i) => Math.min(chapters.length - 1, i + 1))}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-all ${
                  index >= chapters.length - 1 ? "opacity-30 cursor-not-allowed" : ""
                }`}
              >
                Próximo Capítulo <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Floating chapter shortcuts note */}
            <div className="mt-8 text-center text-xs opacity-50">
              Dica: Você também pode usar as setas do teclado (← e →) para alternar entre os capítulos.
            </div>
          </article>
        )}
      </main>
    </div>
  );
};

export default Reader;
