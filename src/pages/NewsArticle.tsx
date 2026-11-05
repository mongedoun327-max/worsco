import { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Share2,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useArticle, useNews } from "@/hooks/useCatalog";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";
import { expandNewsToDeepReport, EnrichedNews } from "@/lib/newsExpander";

const NewsArticle = () => {
  const { slug } = useParams();
  const { data: rawArticle, isLoading } = useArticle(slug);
  const { data: allNews = [] } = useNews();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Guarantee every article is upgraded to a multi-section deep investigative report
  const article: EnrichedNews | null = useMemo(() => {
    if (!rawArticle) return null;
    return expandNewsToDeepReport(rawArticle);
  }, [rawArticle]);

  // Find related news from same category or latest
  const relatedNews = useMemo(() => {
    if (!article) return [];
    return allNews
      .filter((n) => n.id !== article.id && (n as any).slug !== article.slug)
      .slice(0, 3);
  }, [allNews, article]);

  // Parse structured blocks from content
  const contentBlocks = useMemo(() => {
    if (!article?.content) return [];
    const rawParagraphs = article.content.split(/\n\s*\n+/);

    return rawParagraphs
      .map((p) => p.trim())
      .filter(Boolean)
      .map((text, idx) => {
        if (text.startsWith("### ")) {
          return { type: "heading", text: text.replace(/^###\s*/, ""), key: idx };
        }
        if (text.startsWith("> ")) {
          return { type: "quote", text: text.replace(/^>\s*/, "").replace(/^"|"$/g, ""), key: idx };
        }
        if (text.includes("\n• ") || text.startsWith("• ")) {
          const items = text.split("\n• ").map((i) => i.replace(/^•\s*/, "").trim()).filter(Boolean);
          return { type: "list", items, key: idx };
        }
        return { type: "paragraph", text, key: idx };
      });
  }, [article?.content]);

  const handleShare = (network?: string) => {
    const url = window.location.href;
    const title = article?.title || "Notícia Worscoi";

    if (network === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${url}`)}`, "_blank");
      return;
    }
    if (network === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
      return;
    }

    if (navigator.share) {
      navigator.share({ title, url }).catch(() => undefined);
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation variant="dark" />
        <div className="pt-40 text-center space-y-3">
          <BookOpen className="h-8 w-8 text-emerald-500 animate-pulse mx-auto" />
          <p className="text-sm text-muted-foreground font-light">Carregando notícia completa...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation variant="dark" />
        <div className="pt-40 text-center">
          <p className="text-sm text-muted-foreground font-light mb-6">Notícia não encontrada.</p>
          <Button asChild variant="outline" className="rounded-full text-[11px] uppercase tracking-wider font-normal">
            <Link to="/noticias">Ver todas as notícias</Link>
          </Button>
        </div>
      </div>
    );
  }

  const readTime =
    (article as any).read_time ||
    Math.max(1, Math.round((article.content?.split(/\s+/).length || 200) / 180));

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sticky Top Reading Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50 shadow-sm" />
      <Navigation />

      {/* Hero Banner with Authentic Cover */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-zinc-950">
        <img
          src={article.cover_url || "/placeholder.svg"}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />

        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/80 font-medium">
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] uppercase tracking-wider font-semibold shadow-sm">
                {article.category}
              </span>
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full text-[11px]">
                <Calendar className="h-3 w-3" />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-1 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full text-[11px]">
                <Clock className="h-3 w-3" />
                {readTime} min de leitura
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight drop-shadow-md">
              {article.title}
            </h1>

            {(article as any).author && (
              <p className="text-xs sm:text-sm text-white/90 font-light flex items-center gap-1.5 pt-1">
                <span>Por</span>
                <span className="font-medium text-emerald-300">
                  {(article as any).source_name || (article as any).author}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <main className="py-12 md:py-20 px-6 lg:px-12">
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Action bar (Back + Share) */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
            <Link
              to="/noticias"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Todas as Notícias
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">Compartilhar:</span>
              <button
                onClick={() => handleShare("whatsapp")}
                className="p-2 rounded-full border border-border bg-card text-emerald-600 hover:bg-accent transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 rounded-full border border-border bg-card text-sky-500 hover:bg-accent transition-colors"
                title="Compartilhar no X/Twitter"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={() => handleShare()}
                className="p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
                title="Copiar Link"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Lead / Subtitle */}
          {article.excerpt && (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-accent/40 border-l-4 border-emerald-500 text-foreground font-light text-base sm:text-lg leading-relaxed shadow-sm">
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1.5">
                Lead da Reportagem
              </span>
              {article.excerpt}
            </div>
          )}



          {/* Rich Body Content */}
          <div className="space-y-6 text-base sm:text-lg text-foreground/90 font-light leading-relaxed">
            {contentBlocks.map((block) => {
              if (block.type === "heading") {
                return (
                  <h3
                    key={block.key}
                    className="text-xl sm:text-2xl font-normal text-foreground pt-4 pb-1 tracking-tight"
                  >
                    {block.text}
                  </h3>
                );
              }

              if (block.type === "quote") {
                return (
                  <blockquote
                    key={block.key}
                    className="my-6 pl-5 border-l-4 border-emerald-500/80 italic text-muted-foreground text-base sm:text-lg bg-card/50 py-3 rounded-r-xl"
                  >
                    "{block.text}"
                  </blockquote>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={block.key} className="space-y-2 pl-4 my-4">
                    {block.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/85">
                        <span className="text-emerald-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={block.key} className="text-justify leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Source Attribution Box */}
          {(article as any).source_url && (
            <div className="mt-14 p-6 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-soft">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Cobertura Oficial & Fontes Oficiais</span>
                </div>
                <h4 className="text-sm font-medium text-foreground">
                  Publicado originalmente por {(article as any).source_name || (article as any).author || "Veículo de imprensa"}
                </h4>
                <p className="text-xs text-muted-foreground font-light mt-0.5">
                  Acesse o portal da publicação original para consultar materiais complementares e coberturas ao vivo.
                </p>
              </div>

              <a
                href={(article as any).source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors shrink-0 shadow-sm"
              >
                Visitar fonte original
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Related Articles Section */}
          {relatedNews.length > 0 && (
            <div className="mt-20 pt-10 border-t border-border">
              <span className="text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold block mb-2">
                Continue Lendo
              </span>
              <h3 className="text-2xl font-light text-foreground tracking-tight mb-8">
                Mais Notícias do Dia
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedNews.map((rel) => {
                  const relSlug = (rel as any).slug || rel.id;
                  return (
                    <Link
                      key={rel.id}
                      to={`/noticias/${relSlug}`}
                      className="group flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-accent relative">
                        <img
                          src={rel.cover_url || "/placeholder.svg"}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-white text-[9px] uppercase tracking-wider font-semibold">
                          {rel.category}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <h4 className="text-xs sm:text-sm font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                        <span className="text-[10px] text-muted-foreground mt-3 block">
                          {formatDate(rel.published_at)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-14 pt-6 border-t border-border">
            <Button asChild variant="ghost" className="text-xs font-light text-muted-foreground px-0">
              <Link to="/noticias">
                <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                Voltar para todas as notícias
              </Link>
            </Button>
          </div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
};

export default NewsArticle;
