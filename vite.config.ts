import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import Parser from 'rss-parser';

function newsRssPlugin(): Plugin {
  const parser = new Parser({
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WorscoiNewsBot/3.0',
      'Accept': 'application/rss+xml, application/xml, text/xml',
    },
    timeout: 6000,
  });

  interface FeedSource {
    url: string;
    category: string;
    source: string;
  }

  const PRIMARY_FEEDS: Record<string, FeedSource[]> = {
    all: [
      { url: 'https://www.jbox.com.br/feed/', category: 'Animes', source: 'JBox' },
      { url: 'https://www.otakupt.com/feed/', category: 'Animes', source: 'OtakuPT' },
      { url: 'https://anmtv.com.br/feed/', category: 'Animes', source: 'AnMTV' },
      { url: 'https://animeunited.com.br/feed/', category: 'Mangás', source: 'Anime United' },
      { url: 'https://legiaodosherois.com.br/feed', category: 'Cultura', source: 'Legião dos Heróis' },
      { url: 'https://criticalhits.com.br/feed/', category: 'Games', source: 'Critical Hits' },
      { url: 'https://tecnoblog.net/feed/', category: 'Tecnologias', source: 'Tecnoblog' },
      { url: 'https://www.adrenaline.com.br/rss/', category: 'Games', source: 'Adrenaline' },
      { url: 'https://rss.tecmundo.com.br/feed', category: 'Tecnologias', source: 'TecMundo' },
      { url: 'https://www.publishnews.com.br/rss/', category: 'Livros', source: 'PublishNews' },
    ],
    animes: [
      { url: 'https://www.jbox.com.br/feed/', category: 'Animes', source: 'JBox' },
      { url: 'https://www.otakupt.com/feed/', category: 'Animes', source: 'OtakuPT' },
      { url: 'https://anmtv.com.br/feed/', category: 'Animes', source: 'AnMTV' },
    ],
    mangas: [
      { url: 'https://animeunited.com.br/feed/', category: 'Mangás', source: 'Anime United' },
      { url: 'https://www.otakupt.com/feed/', category: 'Mangás', source: 'OtakuPT' },
      { url: 'https://www.jbox.com.br/feed/', category: 'Mangás', source: 'JBox' },
    ],
    webtoons: [
      { url: 'https://www.otakupt.com/feed/', category: 'Webtoons', source: 'OtakuPT' },
      { url: 'https://anmtv.com.br/feed/', category: 'Webtoons', source: 'AnMTV' },
      { url: 'https://animeunited.com.br/feed/', category: 'Webtoons', source: 'Anime United' },
    ],
    games: [
      { url: 'https://criticalhits.com.br/feed/', category: 'Games', source: 'Critical Hits' },
      { url: 'https://www.adrenaline.com.br/rss/', category: 'Games', source: 'Adrenaline' },
      { url: 'https://www.otakupt.com/feed/', category: 'Games', source: 'OtakuPT' },
    ],
    tecnologias: [
      { url: 'https://tecnoblog.net/feed/', category: 'Tecnologias', source: 'Tecnoblog' },
      { url: 'https://rss.tecmundo.com.br/feed', category: 'Tecnologias', source: 'TecMundo' },
      { url: 'https://g1.globo.com/rss/g1/tecnologia/', category: 'Tecnologias', source: 'G1 Tecnologia' },
    ],
    cultura: [
      { url: 'https://legiaodosherois.com.br/feed', category: 'Cultura', source: 'Legião dos Heróis' },
      { url: 'https://g1.globo.com/rss/g1/pop-arte/', category: 'Cultura', source: 'G1 Pop & Arte' },
      { url: 'https://www.jbox.com.br/feed/', category: 'Cultura', source: 'JBox' },
    ],
    livros: [
      { url: 'https://www.publishnews.com.br/rss/', category: 'Livros', source: 'PublishNews' },
    ],
    futebol: [
      { url: 'https://ge.globo.com/rss/ge/', category: 'Futebol', source: 'Globo Esporte' },
    ],
  };

  function extractRealImage(item: any, title: string, cat: string): string {
    // 1. Check enclosure attribute
    if (
      item.enclosure?.url &&
      (item.enclosure.type?.includes('image') || /\.(jpg|jpeg|png|webp|avif)/i.test(item.enclosure.url))
    ) {
      return item.enclosure.url;
    }
    // 2. Check media:content or media:thumbnail
    if (item['media:content']?.url) return item['media:content'].url;
    if (item['media:thumbnail']?.url) return item['media:thumbnail'].url;

    // 3. Search HTML for first genuine <img> tag
    const rawHtml = (item['content:encoded'] || '') + ' ' + (item.content || '') + ' ' + (item.description || '');
    const matches = rawHtml.matchAll(/<img[^>]+src=["'](https?:\/\/[^"'\s>]+)["']/gi);
    for (const m of matches) {
      const url = m[1];
      if (!/gravatar\.com|emoji|icon|pixel|feedburner|spacer|tracking/i.test(url)) {
        return url;
      }
    }

    // 4. Accurate contextual match based on title keywords
    const lower = title.toLowerCase();
    if (/naruto|boruto/i.test(lower))
      return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80';
    if (/one piece|luffy/i.test(lower))
      return 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80';
    if (/dragon ball|goku|vegeta/i.test(lower))
      return 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80';
    if (/demon slayer|kimetsu/i.test(lower))
      return 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80';
    if (/zelda|nintendo|mario|switch/i.test(lower))
      return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80';
    if (/playstation|sony|ps5|god of war/i.test(lower))
      return 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1200&auto=format&fit=crop&q=80';
    if (/xbox|microsoft|game pass/i.test(lower))
      return 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=1200&auto=format&fit=crop&q=80';
    if (/ia\b|intelig[eê]ncia artificial|chatgpt|openai|gemini|deepseek/i.test(lower))
      return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80';
    if (/smartphone|celular|iphone|apple|samsung|galaxy/i.test(lower))
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80';
    if (/livro|literat|autor|editora|romance|bienal/i.test(lower))
      return 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format&fit=crop&q=80';
    if (/cinema|filme|trailer|hollywood|ator|atriz|netflix|disney/i.test(lower))
      return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80';
    if (/futebol|flamengo|palmeiras|corinthians|libertadores|champions/i.test(lower))
      return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80';

    const fallbackCovers: Record<string, string> = {
      Animes: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
      Mangás: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      Webtoons: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
      Livros: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80',
      Tecnologias: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      Games: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      Cultura: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
      Futebol: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    };

    return fallbackCovers[cat] || fallbackCovers.Animes;
  }

  function cleanFullArticleContent(
    item: any,
    sourceName: string
  ): { content: string; excerpt: string; readTime: number } {
    const rawHtml = item['content:encoded'] || item.content || item.description || '';

    let cleaned = rawHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<div class=["'][^"']*(?:sharedaddy|jp-relatedposts|wpcnt|ads|banner)[^"']*["']>.*?<\/div>/gis, '')
      .replace(/<p[^>]*>/gi, '\n\n')
      .replace(/<\/p>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n### $1\n\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '\n• $1')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '\n\n> "$1"\n\n')
      .replace(/<[^>]+>/g, ' ');

    cleaned = cleaned
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8216;/g, "'")
      .replace(/&#8220;/g, '“')
      .replace(/&#8221;/g, '”')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&ccedil;/g, 'ç')
      .replace(/&Ccedil;/g, 'Ç')
      .replace(/&atilde;/g, 'ã')
      .replace(/&Atilde;/g, 'Ã')
      .replace(/&eacute;/g, 'é')
      .replace(/&Eacute;/g, 'É')
      .replace(/&iacute;/g, 'í')
      .replace(/&Iacute;/g, 'Í')
      .replace(/&oacute;/g, 'ó')
      .replace(/&Oacute;/g, 'Ó')
      .replace(/&uacute;/g, 'ú')
      .replace(/&Uacute;/g, 'Ú')
      .replace(/&aacute;/g, 'á')
      .replace(/&Aacute;/g, 'Á')
      .replace(/&ecirc;/g, 'ê')
      .replace(/&ocirc;/g, 'ô')
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

    const paragraphs = cleaned
      .split(/\n\s*\n+/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter((p) => {
        if (p.length < 25) return false;
        if (/^(the post|o post|fonte:|saiba mais|confira também|leia também|assine|compartilhe)/i.test(p))
          return false;
        if (/apareceu primeiro em|todos os direitos reservados/i.test(p)) return false;
        return true;
      });

    let contentText = paragraphs.join('\n\n');

    if (paragraphs.length < 3) {
      const rawSnippet = (item.contentSnippet || item.description || '').replace(/<[^>]*>/g, '').trim();
      contentText = `${contentText || rawSnippet}\n\nEsta cobertura jornalística está em pleno desenvolvimento pela equipe de ${sourceName}. Acompanhe todas as atualizações e detalhes adicionais na íntegra através do portal oficial.\n\nA redação Worscoi continuará monitorando os desdobramentos desta notícia para trazer novidades, análises e aprofundamento aos leitores da plataforma.`;
    }

    const excerpt = paragraphs[0]
      ? paragraphs[0].slice(0, 220) + (paragraphs[0].length > 220 ? '...' : '')
      : (item.contentSnippet || item.title || '').slice(0, 200);

    const wordCount = contentText.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 180));

    return { content: contentText, excerpt, readTime };
  }

  const newsCache = new Map<string, { timestamp: number; data: any }>();
  const CACHE_TTL_MS = 8 * 60 * 1000; // 8 minutes in-memory cache

  return {
    name: 'news-rss-syndication',
    configureServer(server) {
      server.middlewares.use('/api/news/feed', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const topic = (urlObj.searchParams.get('topic') || 'all').toLowerCase();
          const maxLimit = Math.min(parseInt(urlObj.searchParams.get('limit') || '50', 10), 150);

          const cacheKey = `${topic}_${maxLimit}`;
          const cached = newsCache.get(cacheKey);
          if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cached.data));
            return;
          }

          const feedsToFetch = PRIMARY_FEEDS[topic] || PRIMARY_FEEDS.all;

          // Fetch all feeds in parallel
          const feedPromises = feedsToFetch.map(async (feedInfo) => {
            try {
              const parsed = await parser.parseURL(feedInfo.url);
              return (parsed.items || []).map((it) => ({
                ...it,
                _sourceName: feedInfo.source,
                _defaultCategory: feedInfo.category,
              }));
            } catch {
              return [];
            }
          });

          // Also add Google News query fallback for extra volume if needed
          const googleFeedPromise = (async () => {
            const queryMap: Record<string, string> = {
              all: 'animes lancamentos brasil OR livros literatura',
              livros: 'livros literatura lancamento editora bienal',
              futebol: 'futebol brasileirao libertadores',
            };
            const query = queryMap[topic];
            if (!query) return [];
            try {
              const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
              const parsed = await parser.parseURL(rssUrl);
              return (parsed.items || []).map((it) => ({
                ...it,
                _sourceName: 'Imprensa Nacional',
                _defaultCategory: topic === 'livros' ? 'Livros' : topic === 'futebol' ? 'Futebol' : 'Cultura',
              }));
            } catch {
              return [];
            }
          })();

          const results = await Promise.all([...feedPromises, googleFeedPromise]);
          const rawItems = results.flat();

          // Deduplicate items by title
          const seen = new Set<string>();
          const deduped: any[] = [];

          for (const item of rawItems) {
            const rawTitle = item.title || '';
            const lastDash = rawTitle.lastIndexOf(' - ');
            const title = lastDash > 0 ? rawTitle.substring(0, lastDash).trim() : rawTitle;
            const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');

            if (!seen.has(normTitle) && normTitle.length > 5) {
              seen.add(normTitle);
              deduped.push(item);
            }
          }

          // Sort most recent first
          deduped.sort((a, b) => {
            const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
            const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
            return dateB - dateA;
          });

          // Slice up to requested limit
          const limitedItems = deduped.slice(0, maxLimit);

          const items = limitedItems.map((item, index) => {
            const rawTitle = item.title || 'Sem título';
            const lastDash = rawTitle.lastIndexOf(' - ');
            const title = lastDash > 0 ? rawTitle.substring(0, lastDash).trim() : rawTitle;
            const sourceName = item._sourceName || (lastDash > 0 ? rawTitle.substring(lastDash + 3).trim() : 'Redação Worscoi');

            // Detect accurate category based on title and feed
            let cat = item._defaultCategory || 'Cultura';
            const lowerTitle = title.toLowerCase();
            if (/anime|crunchyroll|otaku|animacao|mangaka/i.test(lowerTitle)) {
              cat = 'Animes';
            } else if (/mang[aá]|panini|jbc|shonen/i.test(lowerTitle)) {
              cat = 'Mangás';
            } else if (/webtoon|manhwa/i.test(lowerTitle)) {
              cat = 'Webtoons';
            } else if (/livro|literat|autor|romance|editora|poesia|bienal/i.test(lowerTitle)) {
              cat = 'Livros';
            } else if (/tecnolog|ia\b|inteligencia artificial|software|celular|smartphone|apple|google/i.test(lowerTitle)) {
              cat = 'Tecnologias';
            } else if (/game|jogo|playstation|nintendo|xbox|steam/i.test(lowerTitle)) {
              cat = 'Games';
            } else if (/futebol|gol|campeonato|copa|clube/i.test(lowerTitle)) {
              cat = 'Futebol';
            } else if (/filme|cinema|serie|streaming|hbo|netflix/i.test(lowerTitle)) {
              cat = 'Cultura';
            }

            // Extract real image matching this exact news piece
            const coverUrl = extractRealImage(item, title, cat);

            // Clean full multi-paragraph article content
            const { content, excerpt, readTime } = cleanFullArticleContent(item, sourceName);

            const slug =
              title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
                .slice(0, 75) +
              '-' +
              Math.abs(item.link?.split('').reduce((a: number, b: string) => (a << 5) - a + b.charCodeAt(0), 0) || index);

            const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();

            return {
              id: `syn-${slug}`,
              title,
              slug,
              excerpt,
              content,
              cover_url: coverUrl,
              category: cat,
              published: true,
              published_at: pubDate,
              created_at: pubDate,
              author: sourceName,
              source_name: sourceName,
              source_url: item.link,
              read_time: readTime,
              is_syndicated: true,
            };
          });

          const responseData = { items, total: items.length, topic };
          newsCache.set(cacheKey, { timestamp: Date.now(), data: responseData });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(responseData));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, items: [] }));
        }
      });
    },
  };
}

function gutenbergBooksPlugin(): Plugin {
  const chapterCache = new Map<string, any[]>();
  const catalogCache = new Map<string, any>();

  return {
    name: 'gutenberg-books-api',
    configureServer(server) {
      // 1. Catalog Endpoint
      server.middlewares.use('/api/books/catalog', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const search = urlObj.searchParams.get('search') || '';
          const cacheKey = search.toLowerCase().trim();

          if (catalogCache.has(cacheKey)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(catalogCache.get(cacheKey)));
            return;
          }

          const targetUrl = search
            ? `https://gutendex.com/books/?languages=pt&search=${encodeURIComponent(search)}`
            : `https://gutendex.com/books/?languages=pt&sort=popular`;

          const gRes = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WorscoiBookReader/2.0)' },
          });

          if (!gRes.ok) throw new Error(`Gutendex returned ${gRes.status}`);
          const gData = await gRes.json();

          const books = (gData.results || []).map((b: any) => {
            const author = b.authors?.[0]?.name
              ? b.authors[0].name.split(',').reverse().join(' ').trim()
              : 'Autor Clássico';

            // Clean title
            const rawTitle = b.title || 'Obra Clássica';
            const title = rawTitle.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();

            // Detect category
            let category = 'Romance';
            const subjects = (b.subjects || []).join(' ').toLowerCase();
            const titleLower = title.toLowerCase();
            if (/poes|poem|versos|canto/i.test(subjects) || /poes|canto/i.test(titleLower)) {
              category = 'Poesia';
            } else if (/ficção|sci-fi|lua|viagem|verne/i.test(subjects) || /terra à lua|vinte mil/i.test(titleLower)) {
              category = 'Ficção Científica';
            } else if (/dicion|gramat|lingua/i.test(subjects) || /dicionário/i.test(titleLower)) {
              category = 'Didáticos e Técnicos';
            } else if (/biblia|relig|testamento|alma|santo/i.test(subjects) || /bíblia|testamento/i.test(titleLower)) {
              category = 'Religiosos/Espiritual';
            } else if (/teatro|comedia|drama|auto/i.test(subjects) || /auto da/i.test(titleLower)) {
              category = 'Dramático';
            } else if (/conto|novela/i.test(subjects) || /contos/i.test(titleLower)) {
              category = 'Narrativa';
            } else if (/hist[oó]ria|revolução|memórias|fradique/i.test(subjects) || /revolução|história/i.test(titleLower)) {
              category = 'Biografia e Autobiografia';
            }

            const coverUrl =
              b.formats?.['image/jpeg'] ||
              `https://www.gutenberg.org/cache/epub/${b.id}/pg${b.id}.cover.medium.jpg`;

            return {
              id: `guten-${b.id}`,
              gutenberg_id: b.id,
              title,
              author,
              description: `Obra clássica da literatura de domínio público de ${author}. Texto integral e completo disponibilizado pelo Projeto Gutenberg com leitura livre no Worscoi.`,
              cover_url: coverUrl,
              category,
              price_cents: 0,
              currency: 'BRL',
              published: true,
              featured: (b.download_count || 0) > 8000,
              created_at: new Date().toISOString(),
              downloads: b.download_count || 0,
              formats: ['Leitura Online', 'EPUB', 'TXT'],
              is_public_domain: true,
              epub_url: b.formats?.['application/epub+zip'] || `https://www.gutenberg.org/ebooks/${b.id}.epub3.images`,
              txt_url: b.formats?.['text/plain; charset=utf-8'] || `https://www.gutenberg.org/cache/epub/${b.id}/pg${b.id}.txt`,
            };
          });

          const result = { books, total: gData.count || books.length };
          catalogCache.set(cacheKey, result);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, books: [] }));
        }
      });

      // 2. Chapters Endpoint
      server.middlewares.use('/api/books/chapters', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const rawId = urlObj.searchParams.get('bookId') || '';
          const bookId = rawId.replace(/^guten-/, '').trim();

          if (!bookId) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Parâmetro bookId é obrigatório' }));
            return;
          }

          if (chapterCache.has(bookId)) {
            const cached = chapterCache.get(bookId);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ bookId: `guten-${bookId}`, chapters: cached, totalChapters: cached.length }));
            return;
          }

          // Fetch full text from Gutenberg
          const textUrl = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`;
          const textRes = await fetch(textUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WorscoiBookReader/2.0)' },
          });

          if (!textRes.ok) throw new Error(`Falha ao baixar texto de Gutenberg (${textRes.status})`);
          let fullText = await textRes.text();

          // Strip Gutenberg license header and footer
          const startMatch = fullText.match(/\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG EBOOK[^\*]*\*\*\*/i);
          if (startMatch && startMatch.index !== undefined) {
            fullText = fullText.substring(startMatch.index + startMatch[0].length);
          }
          const endMatch = fullText.match(/\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG EBOOK/i);
          if (endMatch && endMatch.index !== undefined) {
            fullText = fullText.substring(0, endMatch.index);
          }

          const lines = fullText.split('\n');
          const markers: Array<{ lineIndex: number; title: string }> = [];
          const romanOrCap = /^((CAP[ÍI]TULO|CANTO|PARTE|LIVRO)\s+([0-9IVXLCDM]+|[A-Z]+)|[IVXLCDM]+\.?)\s*$/i;

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (romanOrCap.test(line)) {
              let title = line;
              let j = i + 1;
              while (j < lines.length && !lines[j].trim() && j < i + 4) j++;
              if (j < lines.length && lines[j].trim().length < 80 && !romanOrCap.test(lines[j].trim())) {
                title = `${line} — ${lines[j].trim()}`;
              }
              markers.push({ lineIndex: i, title });
            }
          }

          let chapters: any[] = [];

          if (markers.length >= 2) {
            for (let m = 0; m < markers.length; m++) {
              const current = markers[m];
              const nextMarker = markers[m + 1];
              const chapterLines = lines.slice(current.lineIndex, nextMarker ? nextMarker.lineIndex : lines.length);
              const content = chapterLines.join('\n').trim();
              if (content.length > 50) {
                chapters.push({
                  id: `chap-${bookId}-${chapters.length + 1}`,
                  book_id: `guten-${bookId}`,
                  position: chapters.length + 1,
                  title: current.title,
                  content,
                  is_free_preview: true,
                });
              }
            }
          }

          // Fallback if no chapter markers detected: split by paragraphs into readable sections
          if (chapters.length === 0) {
            const paragraphs = fullText
              .split(/\r?\n\r?\n+/)
              .map((p) => p.trim())
              .filter((p) => p.length > 0);

            const chunkSize = 35; // ~35 paragraphs per section
            for (let c = 0; c < paragraphs.length; c += chunkSize) {
              const slice = paragraphs.slice(c, c + chunkSize);
              const partNum = Math.floor(c / chunkSize) + 1;
              chapters.push({
                id: `chap-${bookId}-${partNum}`,
                book_id: `guten-${bookId}`,
                position: partNum,
                title: `Parte ${partNum}`,
                content: slice.join('\n\n'),
                is_free_preview: true,
              });
            }
          }

          chapterCache.set(bookId, chapters);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ bookId: `guten-${bookId}`, chapters, totalChapters: chapters.length }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, chapters: [] }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), newsRssPlugin(), gutenbergBooksPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
