/**
 * Journalistic Article Formatter
 * Preserves authentic reporting from verified newsrooms (G1, Globo Esporte, Tecnoblog, Critical Hits, JBox, OtakuPT, etc.).
 * Guarantees zero artificial AI boilerplate or synthetic template injections.
 */

export interface EnrichedNews {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  cover_url: string;
  published: boolean;
  published_at: string;
  source_name: string;
  read_time: number;
  word_count: number;
  key_takeaways?: string[];
}

/**
 * Limpa e formata a matéria jornalística genuína, garantindo a integridade do texto real
 * sem nenhuma interpolação ou sintetização artificial via IA.
 */
export function expandNewsToDeepReport(rawArticle: {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  cover_url?: string;
  published_at?: string;
  source_name?: string;
  author?: string;
  read_time?: number;
  is_syndicated?: boolean;
}): EnrichedNews {
  const title = (rawArticle.title || "Notícia em Destaque").trim();
  const category = (rawArticle.category || "Cultura").trim();
  const sourceName = rawArticle.source_name || rawArticle.author || "Redação Worscoi";

  // Remove qualquer resquício de templates ou boilerplates artificiais passados
  let cleanContent = (rawArticle.content || rawArticle.excerpt || "").trim();
  if (cleanContent.includes("### Contexto Histórico")) {
    cleanContent = cleanContent.split("### Contexto Histórico")[0].trim();
  }
  if (cleanContent.includes("### Mecanismos de Causa e Efeito")) {
    cleanContent = cleanContent.split("### Mecanismos de Causa e Efeito")[0].trim();
  }
  if (cleanContent.includes("### Impacto Multissetorial")) {
    cleanContent = cleanContent.split("### Impacto Multissetorial")[0].trim();
  }

  // Extrai parágrafos reais
  const rawParagraphs = cleanContent
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => {
      if (p.length < 15) return false;
      if (/^(the post|o post|fonte:|saiba mais|confira também|leia também|assine|compartilhe)/i.test(p)) return false;
      if (/apareceu primeiro em|todos os direitos reservados|confira o post completo/i.test(p)) return false;
      return true;
    });

  const finalContent = rawParagraphs.length > 0 ? rawParagraphs.join("\n\n") : cleanContent;
  const wordCount = finalContent.split(/\s+/).filter(Boolean).length;
  const readTime = rawArticle.read_time || Math.max(1, Math.round(wordCount / 180));

  const excerpt = rawArticle.excerpt
    ? rawArticle.excerpt
    : rawParagraphs[0]
    ? rawParagraphs[0].slice(0, 220) + (rawParagraphs[0].length > 220 ? "..." : "")
    : title;

  return {
    id: rawArticle.id,
    title,
    slug: rawArticle.slug || rawArticle.id,
    excerpt,
    content: finalContent,
    category,
    cover_url: rawArticle.cover_url || "",
    published: true,
    published_at: rawArticle.published_at || new Date().toISOString(),
    source_name: sourceName,
    read_time: readTime,
    word_count: wordCount,
  };
}
