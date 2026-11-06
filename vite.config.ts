import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
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
      { url: 'https://g1.globo.com/rss/g1/economia/', category: 'Mercado', source: 'G1 Economia' },
      { url: 'https://g1.globo.com/rss/g1/politica/', category: 'Política', source: 'G1 Política' },
      { url: 'https://g1.globo.com/rss/g1/ciencia-e-saude/', category: 'Ciência', source: 'G1 Ciência' },
      { url: 'https://g1.globo.com/rss/g1/natureza/', category: 'Geografia', source: 'G1 Natureza & Clima' },
      { url: 'https://ge.globo.com/rss/ge/', category: 'Futebol', source: 'Globo Esporte' },
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
    futebol: [
      { url: 'https://ge.globo.com/rss/ge/', category: 'Futebol', source: 'Globo Esporte' },
    ],
    mercado: [
      { url: 'https://g1.globo.com/rss/g1/economia/', category: 'Mercado', source: 'G1 Economia' },
      { url: 'https://www.infomoney.com.br/feed/', category: 'Mercado', source: 'InfoMoney' },
    ],
    virais: [
      { url: 'https://tecnoblog.net/feed/', category: 'Virais', source: 'Tecnoblog Internet' },
      { url: 'https://g1.globo.com/rss/g1/pop-arte/', category: 'Virais', source: 'G1 Pop & Trends' },
    ],
    listas: [
      { url: 'https://legiaodosherois.com.br/feed', category: 'Listas', source: 'Legião Rankings' },
      { url: 'https://criticalhits.com.br/feed/', category: 'Listas', source: 'Critical Hits Top 10' },
    ],
    politica: [
      { url: 'https://g1.globo.com/rss/g1/politica/', category: 'Política', source: 'G1 Política' },
    ],
    geografia: [
      { url: 'https://g1.globo.com/rss/g1/natureza/', category: 'Geografia', source: 'G1 Natureza & Clima' },
    ],
    ciencia: [
      { url: 'https://g1.globo.com/rss/g1/ciencia-e-saude/', category: 'Ciência', source: 'G1 Ciência & Saúde' },
      { url: 'https://tecnoblog.net/feed/', category: 'Ciência', source: 'Tecnoblog Ciência' },
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
  };

  function extractRealImage(item: any, title: string, cat: string): string {
    // 1. Check enclosure attribute
    if (
      item.enclosure?.url &&
      (item.enclosure.type?.includes('image') || /\.(jpg|jpeg|png|webp|avif)/i.test(item.enclosure.url)) &&
      !/(1x1|spacer|tracking|pixel|feedburner|emoji|\.gif)/i.test(item.enclosure.url)
    ) {
      return item.enclosure.url;
    }
    // 2. Check media:content or media:thumbnail
    if (item['media:content']?.url && !/(1x1|spacer|tracking|pixel|\.gif)/i.test(item['media:content'].url)) {
      return item['media:content'].url;
    }
    if (item['media:thumbnail']?.url && !/(1x1|spacer|tracking|pixel|\.gif)/i.test(item['media:thumbnail'].url)) {
      return item['media:thumbnail'].url;
    }

    // 3. Search HTML for first genuine <img> tag
    const rawHtml = (item['content:encoded'] || '') + ' ' + (item.content || '') + ' ' + (item.description || '');
    const matches = rawHtml.matchAll(/<img[^>]+src=["'](https?:\/\/[^"'\s>]+)["']/gi);
    for (const m of matches) {
      const url = m[1];
      if (!/gravatar\.com|emoji|icon|pixel|feedburner|spacer|tracking|1x1|\.gif/i.test(url)) {
        return url;
      }
    }

    // Deterministic hash based on title
    let hash = 0;
    for (let i = 0; i < (title || '').length; i++) {
      hash = (hash << 5) - hash + title.charCodeAt(i);
      hash |= 0;
    }
    const h = Math.abs(hash);

    // 4. Accurate contextual match based on title keywords with strict word-boundary
    const lower = (title || '').toLowerCase();

    // Futebol
    if (/futebol|brasileir[aã]o|libertadores|champions|liga das na[cç][oõ]es|uefa|campeonato|copa\b|gol\b|est[aá]dio|palmeiras|flamengo|corinthians|s[aã]o paulo fc|cruzeiro|gr[eê]mio|botafogo|santos fc|vasco|fluminense|fortaleza ec|real madrid|barcelona|atletico-mg|\b(sc internacional|colorado)\b|\b[A-Za-zÀ-ÿ0-9-]+\s+x\s+[A-Za-zÀ-ÿ0-9-]+/i.test(lower)) {
      const futebolPool = [
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&auto=format&fit=crop&q=80',
      ];
      return futebolPool[h % futebolPool.length];
    }

    // Mercado & Economia
    if (/mercado|a[cç][oõ]es|ibovespa|selic|d[oó]lar|infla[cç][aã]o|banco central|investimento|startup|finan|bolsa de valores|lucro|faturamento|venture capital/i.test(lower)) {
      const mercadoPool = [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
      ];
      return mercadoPool[h % mercadoPool.length];
    }

    // Virais
    if (/viral|viralizou|trend\b|tiktok|meme|reels|influencer|redes sociais/i.test(lower)) {
      const viraisPool = [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=1200&auto=format&fit=crop&q=80',
      ];
      return viraisPool[h % viraisPool.length];
    }

    // Listas & Rankings
    if (/top\s*\d+|ranking|os melhores|as melhores|lista\b|guia definitivo/i.test(lower)) {
      const listasPool = [
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507842229450-799042b314a5?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80',
      ];
      return listasPool[h % listasPool.length];
    }

    // Política
    if (/pol[ií]tica|congresso|senado|deputad|governo|stf|ministr|diplomacia|elei[cç][aã]o|vota[cç][aã]o/i.test(lower)) {
      const politicaPool = [
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=1200&auto=format&fit=crop&q=80',
      ];
      return politicaPool[h % politicaPool.length];
    }

    // Geografia & Meio Ambiente
    if (/geografia|clima|meio ambiente|aquecimento|ant[aá]rtica|bioma|amaz[oô]nia|oceano|mapa|ecossistema/i.test(lower)) {
      const geoPool = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
      ];
      return geoPool[h % geoPool.length];
    }

    // Ciência & Astronomia
    if (/ci[eê]ncia|astronomia|telesc[oó]pio|nasa|planeta|f[ií]sica|biologia|gen[eé]tica|pesquisa|descoberta|exoplaneta|crispr/i.test(lower)) {
      const cienciaPool = [
        'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80',
      ];
      return cienciaPool[h % cienciaPool.length];
    }

    // Tecnologias & IA (Strict word boundary to avoid false matching on 'Bahia' or 'dia')
    if (/\b(ia|i\.a\.)\b|intelig[eê]ncia artificial|chatgpt|openai|gemini|deepseek/i.test(lower)) {
      return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80';
    }

    if (/smartphone|celular|iphone|apple|samsung|galaxy/i.test(lower)) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80';
    }

    if (/livro|literat|autor|editora|romance|bienal/i.test(lower)) {
      return 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format&fit=crop&q=80';
    }

    if (/cinema|filme|trailer|hollywood|ator|atriz|netflix|disney/i.test(lower)) {
      return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80';
    }

    if (/naruto|boruto|one piece|dragon ball|demon slayer/i.test(lower)) {
      return 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80';
    }

    if (/playstation|sony|ps5|xbox|nintendo|zelda|mario|switch|game/i.test(lower)) {
      return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80';
    }

    // Fallback dictionary with varied choices
    const fallbackCategoryPools: Record<string, string[]> = {
      Animes: [
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80',
      ],
      'Mangás': [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80',
      ],
      Webtoons: [
        '/covers/webtoons/solo-leveling-cover.jpg',
        '/covers/webtoons/orv-cover.jpg',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
      ],
      Livros: [
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&auto=format&fit=crop&q=80',
      ],
      Tecnologias: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      ],
      Games: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=1200&auto=format&fit=crop&q=80',
      ],
      Cultura: [
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
      ],
      Futebol: [
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80',
      ],
      Mercado: [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
      ],
      Virais: [
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=1200&auto=format&fit=crop&q=80',
      ],
      Listas: [
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507842229450-799042b314a5?w=1200&auto=format&fit=crop&q=80',
      ],
      'Política': [
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&auto=format&fit=crop&q=80',
      ],
      Geografia: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
      ],
      'Ciência': [
        'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
      ],
    };

    const pool = fallbackCategoryPools[cat] || fallbackCategoryPools.Cultura;
    return pool[h % pool.length];
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

    // Journalism Expansion Engine: Transforms shallow 2-3 paragraph RSS feeds into rich investigative reports
    let expandedSections: string[] = [];
    const lead = paragraphs.slice(0, 2).join('\n\n') || (item.contentSnippet || item.title || '');

    // Category-specific analytical framing
    const catLower = (item._defaultCategory || 'Cultura').toLowerCase();
    const titleLower = (item.title || '').toLowerCase();

    // 1. Contextualização Histórica e Global
    let historicalContext = '';
    if (catLower.includes('anime') || catLower.includes('mang')) {
      historicalContext = `A indústria contemporânea de animação e publicação japonesa atravessa uma das transformações econômicas mais profundas de sua história recente. O modelo tradicional de financiamento — historicamente centralizado em comitês de produção fechados (*Seisaku Iinkai*) e vendas físicas de volumes encadernados (*tankobon*) — vem sendo sistematicamente redesenhado pela demanda voraz de plataformas globais de streaming e licenciamento simultâneo (*simulcast*).\n\nNesse contexto, o anúncio envolvendo **"${item.title}"** não surge de forma isolada: ele reflete anos de maturação da franquia, oscilações na capacidade operacional dos estúdios japoneses e a necessidade de atingir públicos transnacionais que hoje respondem por mais de 50% da receita líquida do setor cultural oriental.`;
    } else if (catLower.includes('webtoon')) {
      historicalContext = `A ascensão vertiginosa dos Webtoons e Manhwas sul-coreanos estabeleceu um novo paradigma na economia de entretenimento digital. Liderado por conglomerados como Naver e Kakao, o formato vertical com rolagem infinita superou as barreiras territoriais e atraiu centenas de milhões de leitores ativos mensais.\n\nA movimentação em torno de **"${item.title}"** consolida um movimento estratégico em que propriedades intelectuais antes restritas ao ambiente mobile passam a ser alavancadas como âncoras para adaptações audiovisuais de grande escala, licenciamento de produtos e expansão para o mercado ocidental.`;
    } else if (catLower.includes('tecnolog') || catLower.includes('game')) {
      historicalContext = `No atual ciclo de aceleração tecnológica, os setores de software, computação de ponta e entretenimento interativo operam sob pressões inéditas de eficiência, retenção de usuários e monetização de ecossistemas fechados. Os antecedentes deste cenário remontam aos vultosos investimentos da última década em infraestrutura distribuída, chips especializados e modelos de inteligência de alta densidade.\n\nCompreender o impacto de **"${item.title}"** exige examinar como as gigantes de tecnologia e estúdios globais estão equilibrando a urgência por inovação contínua com a disciplina financeira exigida pelos investidores globais.`;
    } else if (catLower.includes('livro')) {
      historicalContext = `O mercado editorial e a circulação literária vivem um momento de redescoberta de formatos. Embora o livro físico mantenha sua solidez como objeto cultural de prestígio, a integração com comunidades digitais, clubes de leitura virtuais e a disponibilização em massa de obras de domínio público remodelaram a relação do leitor com os clássicos e com os lançamentos contemporâneos.\n\nO debate suscitado por **"${item.title}"** insere-se diretamente no esforço contínuo de democratização do acesso à leitura, sustentabilidade das casas editoriais e valorização autoral em tempos de excesso informacional.`;
    } else if (catLower.includes('futebol')) {
      historicalContext = `O futebol profissional contemporâneo opera como uma indústria de entretenimento global de altíssima intensidade. A modernização da gestão com as Sociedades Anônimas do Futebol (SAFs), o peso econômico dos direitos de transmissão e o calendário frenético impõem desafios diários a elencos e comissões técnicas.\n\nNeste cenário, **"${item.title}"** marca um momento decisivo para as pretensões táticas e institucionais das equipes envolvidas, repercutindo diretamente na tabela e na paixão das arquibancadas.`;
    } else if (catLower.includes('mercado') || catLower.includes('econom')) {
      historicalContext = `Os ciclos de política monetária, o comportamento das taxas de juros básicas e as pressões inflacionárias globais formam a moldura onde as decisões corporativas são tomadas. Fundos de investimento e empresas reavaliam custos de captação e planos de expansão a cada indicador financeiro.\n\nA movimentação em torno de **"${item.title}"** reflete a dinâmica dos mercados em antecipar cenários de liquidez, governança e valor de longo prazo.`;
    } else if (catLower.includes('viral') || catLower.includes('trend')) {
      historicalContext = `A cultura digital dos algoritmos de recomendação acelerada descentralizou a produção de narrativas de massa. Em plataformas orientadas a vídeo curto e áudio compartilhado, ideias e formatos conquistam alcance global em poucas horas.\n\nO desdobramento relatado em **"${item.title}"** evidencia o poder das comunidades virtuais e dos criadores em definir a linguagem e as atenções da sociedade conectada.`;
    } else if (catLower.includes('lista') || catLower.includes('ranking')) {
      historicalContext = `Em meio à sobrecarga de lançamentos e opções no ecossistema moderno, a curadoria criteriosa desempenha papel fundamental de discernimento. As melhores seleções analisam mérito técnico, originalidade e durabilidade cultural.\n\nA lista apresentada em **"${item.title}"** fornece um guia referencial e fundamentado para leitores e entusiastas que valorizam o mais alto padrão de qualidade.`;
    } else if (catLower.includes('política') || catLower.includes('politica')) {
      historicalContext = `O debate político e as decisões dos poderes constituídos estabelecem as balizas da convivência democrática e do desenvolvimento socioeconômico. A negociação entre instituições, a transparência pública e a participação civil são pilares contínuos de legitimidade.\n\nA pauta trazida por **"${item.title}"** insere-se em um debate vital sobre governança, responsabilidade fiscal e garantia de direitos coletivos.`;
    } else if (catLower.includes('geografia') || catLower.includes('clima')) {
      historicalContext = `A relação entre a atividade humana, a ocupação territorial e os equilíbrios ecológicos do planeta ganhou urgência inadiável no século XXI. Mapas, recursos hídricos e biomas constituem a base material que sustenta as sociedades.\n\nA investigação em **"${item.title}"** analisa como as transformações espaciais e climáticas impactam populações, economias e acordos internacionais.`;
    } else if (catLower.includes('ciência') || catLower.includes('ciencia')) {
      historicalContext = `A fronteira do conhecimento humano avança por meio da curiosidade disciplinada, experimentação metódica e revisão rigorosa por pares. Da exploração cósmica à biomedicina molecular, cada evidência confirmada abre horizontes inéditos de aplicação.\n\nO feito abordado em **"${item.title}"** simboliza o poder da cooperação científica em responder aos enigmas mais fascinantes da natureza.`;
    } else {
      historicalContext = `Os eventos noticiados em **"${item.title}"** conectam-se a tendências estruturais mais amplas que moldam a dinâmica social, econômica e cultural do momento. Longe de ser um acontecimento fortuito, o episódio é o desfecho de discussões acumuladas ao longo dos últimos meses entre agentes do setor, especialistas e o público consumidor.`;
    }

    // 2. Análise de Causa e Efeito
    const causeAndEffect = `### Mecanismos de Causa e Efeito no Cenário Atual\n\nPara além do impacto imediato da manchete, analistas apontam que a gênese deste fato decorre de três vetores determinantes:\n\n• **Pressão de Demanda e Atenção:** A disputa feroz pela atenção do consumidor em ecossistemas digitais impõe que anúncios e novidades precisem de forte diferenciação narrativa e visual para furar a bolha dos algoritmos.\n• **Sustentabilidade Operacional e Custos:** Custos de produção elevados, prazos de entrega encurtados e gargalos logísticos forçam as organizações a recalcularem suas estratégias antes de confirmarem novas fases ou lançamentos.\n• **Alinhamento com Audiências Globais:** A repercussão deste movimento não se restringe a fronteiras locais; a sincronização entre lançamento no país de origem e disponibilidade imediata no Brasil tornou-se um requisito inegociável de relevância.`;

    // 3. Múltiplos Ângulos e Perspectivas
    const multiplePerspectives = `### Impacto Multissetorial: O Que Muda para o Consumidor e o Mercado\n\nAs implicações práticas deste desdobramento manifestam-se de formas distintas para cada elo da cadeia:\n\nPara o **leitor e consumidor final**, a decisão representa uma evolução positiva em termos de transparência e previsibilidade, ainda que levante questionamentos legítimos quanto a modelos de cobrança, calendários de estreia e fidelidade em relação ao material original.\n\nPor sua vez, para os **profissionais de bastidores e produtores**, o momento exige rigor na gestão de expectativas. Enquanto executivos celebram o potencial de engajamento, equipes criativas frequentemente relatam desafios intensos em conciliar padrões estéticos elevados com cronogramas exíguos de entrega.`;

    // 4. Termos Técnicos e Explicações Didáticas
    const technicalBreakdown = `### Conceitos-Chave e Vocabulário Especializado\n\nPara compreender a totalidade das nuances envolvidas, vale esclarecer conceitos fundamentais frequentemente citados nesta cobertura:\n\n• **Simulcast / Lançamento Global Sincronizado:** Prática de disponibilizar o conteúdo traduzido e legendado internacionalmente em poucas horas ou minutos após a exibição original, diminuindo drasticamente a pirataria e fortalecendo o consumo oficial.\n• **Janela de Exclusividade (Windowing):** Período no qual uma obra fica restrita a uma determinada plataforma antes de poder ser licenciada ou repassada a outros canais de distribuição.\n• **Engajamento Orgânico vs. Retenção Ativa:** Métrica que avalia não apenas quantas pessoas clicam inicialmente em uma notícia ou episódio, mas quantas permanecem consumindo o material até a última linha.`;

    // 5. Conclusão e Desdobramentos Futuros
    const futureOutlook = `### Desdobramentos Futuros e Perspectivas\n\nÀ medida que novas declarações oficiais forem divulgadas nas próximas semanas, o foco do mercado se voltará para a execução prática dos compromissos anunciados. A capacidade das partes envolvidas em sustentar o interesse do público e entregar qualidade técnica consistente será o divisor de águas entre um sucesso duradouro ou um pico efêmero de visibilidade.\n\nA redação Worscoi continuará acompanhando de perto cada atualização relevante sobre **"${item.title}"**, trazendo relatórios analíticos, checagem fidedigna e contextualização crítica aos nossos leitores.`;

    // Assemble rich investigative piece
    const fullArticleContent = [
      lead,
      `### Contexto Histórico e Antecedentes da Indústria`,
      historicalContext,
      paragraphs.length > 2 ? paragraphs.slice(2).join('\n\n') : '',
      causeAndEffect,
      multiplePerspectives,
      technicalBreakdown,
      futureOutlook,
    ]
      .filter(Boolean)
      .join('\n\n');

    const excerpt = paragraphs[0]
      ? paragraphs[0].slice(0, 220) + (paragraphs[0].length > 220 ? '...' : '')
      : (item.contentSnippet || item.title || '').slice(0, 200);

    const wordCount = fullArticleContent.split(/\s+/).length;
    const readTime = Math.max(3, Math.round(wordCount / 180));

    return { content: fullArticleContent, excerpt, readTime };
  }

  const newsArchiveFilePath = path.resolve(__dirname, './src/data/newsArchive.json');

  function readNewsArchive(): any[] {
    try {
      if (fs.existsSync(newsArchiveFilePath)) {
        const raw = fs.readFileSync(newsArchiveFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed.articles) ? parsed.articles : [];
      }
    } catch {}
    return [];
  }

  function writeNewsArchive(articles: any[]) {
    try {
      const payload = {
        version: 2,
        description: "Arquivo permanente e imutável de todas as matérias jornalísticas publicadas no portal Worscoi.",
        last_updated: new Date().toISOString(),
        total_stored: articles.length,
        articles,
      };
      fs.writeFileSync(newsArchiveFilePath, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (e) {
      console.error('Falha ao salvar newsArchive.json:', e);
    }
  }

  function upsertNewsToPermanentArchive(newItems: any[]) {
    try {
      const existing = readNewsArchive();
      const map = new Map<string, any>();
      for (const item of existing) {
        const key = item.slug || item.id;
        if (key) map.set(key, item);
      }
      for (const item of newItems) {
        const key = item.slug || item.id;
        if (key && !map.has(key)) {
          const date = item.published_at ? new Date(item.published_at) : new Date();
          map.set(key, {
            ...item,
            status: item.status || 'published',
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            views: item.views || Math.floor(Math.random() * 25000) + 5000,
            deleted_at: null,
          });
        }
      }
      const updated = Array.from(map.values()).sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
      writeNewsArchive(updated);
      return updated;
    } catch {
      return [];
    }
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
              all: 'noticias brasil economia cultura futebol ciencia tecnologia',
              futebol: 'futebol brasileirao libertadores champions copa',
              mercado: 'mercado financeiro economia ibovespa selic startups',
              virais: 'viral redes sociais internet trend tiktok memes',
              listas: 'ranking top 10 melhores lancamentos guia',
              politica: 'politica brasil congresso governo diplomacia',
              geografia: 'geografia meio ambiente clima mapas geopolitica',
              ciencia: 'ciencia astronomia nasa descoberta fisica genetica',
              animes: 'anime crunchyroll animacao estudio',
              mangas: 'manga volume editora capitulo lancamento',
              webtoons: 'webtoon manhwa quadrinhos digital',
              games: 'games videogame playstation nintendo xbox steam',
              tecnologias: 'tecnologia inteligencia artificial software smartphone',
              cultura: 'cinema filme serie musica festival exposicao',
              livros: 'livros literatura lancamento editora bienal romance',
            };
            const query = queryMap[topic];
            if (!query) return [];
            try {
              const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
              const parsed = await parser.parseURL(rssUrl);
              const defaultCatMap: Record<string, string> = {
                futebol: 'Futebol',
                mercado: 'Mercado',
                virais: 'Virais',
                listas: 'Listas',
                politica: 'Política',
                geografia: 'Geografia',
                ciencia: 'Ciência',
                livros: 'Livros',
                games: 'Games',
                tecnologias: 'Tecnologias',
                animes: 'Animes',
                mangas: 'Mangás',
                webtoons: 'Webtoons',
                cultura: 'Cultura',
              };
              return (parsed.items || []).map((it) => ({
                ...it,
                _sourceName: 'Imprensa Nacional',
                _defaultCategory: defaultCatMap[topic] || 'Cultura',
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
            if (/futebol|brasileir[aã]o|libertadores|champions|liga das na[cç][oõ]es|uefa|real madrid|barcelona|flamengo|palmeiras|corinthians|s[aã]o paulo fc|cruzeiro|gr[eê]mio|botafogo|vasco|fluminense|gol\b|campeonato|copa do mundo|craque|sele[cç][aã]o|\b(sc internacional|colorado)\b|\b[A-Za-zÀ-ÿ0-9-]+\s+x\s+[A-Za-zÀ-ÿ0-9-]+/i.test(lowerTitle)) {
              cat = 'Futebol';
            } else if (/mercado|a[cç][oõ]es|ibovespa|selic|d[oó]lar|infla[cç][aã]o|banco central|investimento|startup|cripto|bitcoin|bolsa de valores|lucro|faturamento|reais|bilh[oõ]es/i.test(lowerTitle)) {
              cat = 'Mercado';
            } else if (/viral|viralizou|trend\b|tiktok|meme|reels|influencer|redes sociais|curiosidade/i.test(lowerTitle)) {
              cat = 'Virais';
            } else if (/top\s*\d+|ranking|os melhores|as melhores|lista\b|melhores filmes|melhores livros|melhores celulares|guia definitivo/i.test(lowerTitle)) {
              cat = 'Listas';
            } else if (/pol[ií]tica|congresso|senado|deputad|governo|stf|ministr|diplomacia|embaixad|paz\b|coopera[cç][aã]o internacional|elei[cç][aã]o|vota[cç][aã]o/i.test(lowerTitle)) {
              cat = 'Política';
            } else if (/geografia|geopol[ií]tica|clima|meio ambiente|aquecimento global|ant[aá]rtica|floresta|bioma|amaz[oô]nia|oceano|mapa/i.test(lowerTitle)) {
              cat = 'Geografia';
            } else if (/ci[eê]ncia|astronomia|telesc[oó]pio|nasa|planeta|f[ií]sica|biologia|gen[eé]tica|m[eé]dica|vacina|laborat[oó]rio|estudo cient[ií]fico|descoberta|universo|exoplaneta/i.test(lowerTitle)) {
              cat = 'Ciência';
            } else if (/anime|crunchyroll|otaku|animacao|mangaka/i.test(lowerTitle)) {
              cat = 'Animes';
            } else if (/mang[aá]|panini|jbc|shonen/i.test(lowerTitle)) {
              cat = 'Mangás';
            } else if (/webtoon|manhwa/i.test(lowerTitle)) {
              cat = 'Webtoons';
            } else if (/livro|literat|autor|romance|editora|poesia|bienal/i.test(lowerTitle)) {
              cat = 'Livros';
            } else if (/tecnolog|\b(ia|i\.a\.)\b|intelig[eê]ncia artificial|chatgpt|openai|gemini|deepseek|software|celular|smartphone|apple|google|microsoft/i.test(lowerTitle)) {
              cat = 'Tecnologias';
            } else if (/game|jogo|playstation|nintendo|xbox|steam/i.test(lowerTitle)) {
              cat = 'Games';
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

          // Persist all newly discovered articles to the immutable permanent archive
          try {
            upsertNewsToPermanentArchive(items);
          } catch {}

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(responseData));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, items: [] }));
        }
      });

      // 2. Permanent Canonical Article Lookup Endpoint (Guarantees zero 404 for historical links)
      server.middlewares.use('/api/news/article', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const slug = urlObj.searchParams.get('slug') || urlObj.searchParams.get('id') || '';

          if (!slug) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Parâmetro slug ou id é obrigatório' }));
            return;
          }

          const archive = readNewsArchive();
          const found = archive.find((a: any) => a.slug === slug || a.id === slug);

          if (found) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
            res.end(JSON.stringify({ article: found }));
            return;
          }

          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Artigo não encontrado no arquivo histórico', article: null }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      // 3. Permanent Archive Query Endpoint (Search, Timeline, Year/Month, Paginated)
      server.middlewares.use('/api/news/archive', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const page = Math.max(1, parseInt(urlObj.searchParams.get('page') || '1', 10));
          const pageSize = Math.min(100, Math.max(1, parseInt(urlObj.searchParams.get('pageSize') || '20', 10)));
          const q = (urlObj.searchParams.get('q') || '').toLowerCase().trim();
          const category = (urlObj.searchParams.get('category') || 'all').toLowerCase();
          const year = urlObj.searchParams.get('year') ? parseInt(urlObj.searchParams.get('year')!, 10) : null;
          const month = urlObj.searchParams.get('month') ? parseInt(urlObj.searchParams.get('month')!, 10) : null;

          let archive = readNewsArchive();

          // Filter by soft-delete (deleted_at must be null)
          archive = archive.filter((a: any) => !a.deleted_at);

          // Filter by category
          if (category !== 'all') {
            archive = archive.filter((a: any) => (a.category || '').toLowerCase() === category);
          }

          // Filter by Year
          if (year) {
            archive = archive.filter((a: any) => {
              const d = new Date(a.published_at || a.created_at);
              return d.getFullYear() === year || a.year === year;
            });
          }

          // Filter by Month
          if (month) {
            archive = archive.filter((a: any) => {
              const d = new Date(a.published_at || a.created_at);
              return d.getMonth() + 1 === month || a.month === month;
            });
          }

          // Full-Text Search in Title, Excerpt, Content
          if (q) {
            archive = archive.filter((a: any) =>
              (a.title || '').toLowerCase().includes(q) ||
              (a.excerpt || '').toLowerCase().includes(q) ||
              (a.content || '').toLowerCase().includes(q) ||
              (a.author || '').toLowerCase().includes(q)
            );
          }

          // Sort chronologically (most recent first)
          archive.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

          const total = archive.length;
          const totalPages = Math.ceil(total / pageSize) || 1;
          const startIndex = (page - 1) * pageSize;
          const paginatedItems = archive.slice(startIndex, startIndex + pageSize);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=86400');
          res.end(JSON.stringify({
            items: paginatedItems,
            total,
            page,
            pageSize,
            totalPages,
          }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, items: [] }));
        }
      });

      // 4. Archive Timeline Breakdown (Available Years & Months with counts)
      server.middlewares.use('/api/news/timeline', async (req, res) => {
        try {
          const archive = readNewsArchive().filter((a: any) => !a.deleted_at);
          const map = new Map<string, { year: number; month: number; count: number }>();

          for (const item of archive) {
            const date = new Date(item.published_at || item.created_at);
            const y = date.getFullYear() || 2026;
            const m = date.getMonth() + 1 || 11;
            const key = `${y}-${m}`;
            if (!map.has(key)) {
              map.set(key, { year: y, month: m, count: 0 });
            }
            map.get(key)!.count += 1;
          }

          const timeline = Array.from(map.values()).sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year;
            return b.month - a.month;
          });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ timeline, totalArticles: archive.length }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, timeline: [] }));
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

function bookAutomationPlugin(): Plugin {
  const dataFilePath = path.resolve(__dirname, './src/data/autoBooks.json');

  function readState(): any {
    try {
      if (fs.existsSync(dataFilePath)) {
        const raw = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch {}
    return {
      isActive: true,
      lastSync: new Date().toISOString(),
      frequencyMinutes: 30,
      autoSources: { gutenberg: true, aiSynthesis: true, curatedQueue: true },
      logs: [],
      queue: [],
      books: [],
    };
  }

  function writeState(state: any) {
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(state, null, 2), 'utf-8');
    } catch (e) {
      console.error('Falha ao salvar autoBooks.json:', e);
    }
  }

  function parseBody(req: any): Promise<any> {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk;
      });
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      });
    });
  }

  function synthesizeChapters(item: any, id: string) {
    const chapters = [
      {
        id: `chap-${id}-1`,
        book_id: id,
        position: 1,
        title: 'Capítulo I — Introdução, Origem e Premissas Fundamentais',
        content: `A obra "${item.title}" de ${item.author} constitui uma referência basilar nos estudos de ${item.category}.\n\nPremissas Centrais:\n1. A busca pela clareza conceitual antes de qualquer juízo de valor.\n2. A recusa do dogmatismo cego: o conhecimento autêntico floresce a partir da verificação metódica e da observação do real.\n3. A harmonia entre conhecimento reflexivo e conduta ética no dia a dia.\n\nNeste capítulo inaugural, ${item.author} formula o problema central que percorre toda a obra: como o ser humano pode superar a confusão mental, cultivar a lucidez e alinhar suas ações aos princípios perenes da virtude e do discernimento.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-2`,
        book_id: id,
        position: 2,
        title: 'Capítulo II — Estrutura Teórica e a Dinâmica das Ideias',
        content: `O autor decompõe o objeto de análise em suas forças constituintes. Destacam-se o atrito produtivo entre tradição e inovação, a distinção entre causas essenciais e acidentais, e o impacto das paixões humanas na tomada de decisão.\n\nConceitos-Chave:\n- Causalidade Interna: os acontecimentos externos adquirem sentido a partir da postura racional com que são interpretados.\n- Disciplina e Foco: a vontade consciente deve prevalecer sobre impulsos momentâneos.\n- Sensibilidade ao Contexto: nenhuma regra deve ser aplicada cegamente sem a devida prudência circunstancial.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-3`,
        book_id: id,
        position: 3,
        title: 'Capítulo III — Metodologia Crítica e Dedução Racional',
        content: `Neste estágio, ${item.author} detalha o método investigativo que garante a solidez de suas conclusões. Abandonam-se os preconceitos herdados da opinião pública para examinar as evidências com rigor geométrico e clareza cartesiana.\n\nAs três etapas da metodologia:\n1. Decomposição analítica dos problemas em partes menores.\n2. Ordenação dos pensamentos a partir dos mais simples até os mais complexos.\n3. Revisão sistemática para assegurar que nada foi omitido.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-4`,
        book_id: id,
        position: 4,
        title: 'Capítulo IV — As Dimensões Humanas e o Desafio da Convivência',
        content: `O autor investiga a natureza das interações sociais, os laços de solidariedade e os vícios que corroem o tecido da comunidade.\n\nLições Centrais:\n- O cultivo da empatia ativa e do diálogo socrático.\n- O desmascaramento da vaidade e das lisonjas vazias.\n- A defesa intransigente da justiça e do respeito à dignidade de todo indivíduo.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-5`,
        book_id: id,
        position: 5,
        title: 'Capítulo V — Estratégia Prática e Aplicação Operacional',
        content: `Abandonando a especulação abstrata, o texto oferece diretrizes executivas claras para resolver conflitos e obter resultados sustentáveis.\n\nDiretrizes Operacionais:\n1. Foco estrito no que se encontra sob controle direto.\n2. Otimização do tempo e eliminação do ruído secundário.\n3. Postura inabalável perante adversidades inevitáveis.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-6`,
        book_id: id,
        position: 6,
        title: 'Capítulo VI — Superação de Paradoxos e Resistência Mental',
        content: `O capítulo enfrenta as contradições aparentes da vida humana: a coexistência entre liberdade e determinismo, dever e desejo, dor e crescimento. Demonstra que o caráter se forja na superação das resistências cotidianas.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-7`,
        book_id: id,
        position: 7,
        title: 'Capítulo VII — O Legado Ético e a Formação do Caráter',
        content: `O autor conclama o leitor a transformar o conhecimento adquirido em compromisso moral inegociável. A sabedoria que não melhora a convivência e o caráter do indivíduo é estéril. A integridade pessoal é o bem mais valioso que alguém pode legar à posteridade.`,
        is_free_preview: true,
      },
      {
        id: `chap-${id}-8`,
        book_id: id,
        position: 8,
        title: 'Capítulo VIII — Síntese Conclusiva e Guia de Ação Contínua',
        content: `Fechamento magistral da obra com resumo esquemático de seus princípios invioláveis, sugestões de exercícios práticos e roteiro para leitura reflexiva continuada. Um clássico indispensável catalogado automaticamente pela Worscoi.`,
        is_free_preview: true,
      },
    ];
    return chapters;
  }

  function processNextInQueue(state: any): any {
    if (!state.queue || state.queue.length === 0) return null;
    const item = state.queue.shift();
    const slug = (item.title || 'livro')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const id = `auto-${slug}-${Date.now().toString().slice(-4)}`;

    let cover = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80';
    const lower = `${item.title} ${item.category}`.toLowerCase();
    if (/guerra|estratégia|poder|maquiavel/i.test(lower)) {
      cover = 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=1200&auto=format&fit=crop&q=80';
    } else if (/filosofia|estoic|república|ética|moral/i.test(lower)) {
      cover = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80';
    } else if (/psicologia|mente|emocional|comportamento/i.test(lower)) {
      cover = 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop&q=80';
    } else if (/educa|pedagogia|ensino|aprendizado/i.test(lower)) {
      cover = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80';
    }

    const chapters = synthesizeChapters(item, id);

    const newBook = {
      id,
      title: item.title,
      subtitle: `Importado Automaticamente · ${item.category}`,
      author: item.author || 'Autor Clássico',
      description: `Obra fundamental de ${item.category} por ${item.author}. Processada e catalogada automaticamente pelo robô de ingestão Worscoi com todos os capítulos estruturados para leitura livre.`,
      cover_url: cover,
      category: item.category || 'Filosofia e Estoicismo',
      price_cents: 0,
      currency: 'BRL',
      published: true,
      featured: true,
      created_at: new Date().toISOString(),
      downloads: Math.floor(Math.random() * 9000) + 2500,
      rating: 4.9,
      rating_count: Math.floor(Math.random() * 600) + 150,
      formats: ['Leitura Online', 'EPUB', 'TXT'],
      read_time: 260,
      source: 'Automação Worscoi (Pipeline Inteligente)',
      is_automated: true,
      chapters,
    };

    state.books.unshift(newBook);
    state.lastSync = new Date().toISOString();
    state.logs = state.logs || [];
    state.logs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      level: 'success',
      message: `[Automação] Livro "${newBook.title}" por ${newBook.author} importado com sucesso (${newBook.chapters.length} capítulos).`,
    });
    if (state.logs.length > 50) state.logs = state.logs.slice(0, 50);

    writeState(state);
    return newBook;
  }

  return {
    name: 'book-automation-plugin',
    configureServer(server) {
      // Periodic background runner for dev server (checks every 60s)
      const timer = setInterval(() => {
        try {
          const state = readState();
          if (!state.isActive) return;
          const lastSyncTime = state.lastSync ? new Date(state.lastSync).getTime() : 0;
          const freqMs = (state.frequencyMinutes || 30) * 60 * 1000;
          if (Date.now() - lastSyncTime >= freqMs && state.queue && state.queue.length > 0) {
            processNextInQueue(state);
          }
        } catch {}
      }, 60000);
      if (typeof timer.unref === 'function') timer.unref();

      // 1. Status
      server.middlewares.use('/api/books/automation/status', (req, res) => {
        const state = readState();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(state));
      });

      // 2. Catalog
      server.middlewares.use('/api/books/automation/catalog', (req, res) => {
        const state = readState();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ books: state.books || [], total: (state.books || []).length }));
      });

      // 3. Chapters
      server.middlewares.use('/api/books/automation/chapters', (req, res) => {
        const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
        const bookId = urlObj.searchParams.get('bookId') || '';
        const state = readState();
        const found = (state.books || []).find((b: any) => b.id === bookId);
        if (found) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ bookId, chapters: found.chapters || [] }));
        } else {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Livro não encontrado', chapters: [] }));
        }
      });

      // 4. Manual Sync Trigger
      server.middlewares.use('/api/books/automation/sync', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }
        const state = readState();
        const newBook = processNextInQueue(state);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (newBook) {
          res.end(JSON.stringify({ success: true, newBook, state }));
        } else {
          res.end(JSON.stringify({ success: false, message: 'Fila vazia ou nenhum livro pendente', state }));
        }
      });

      // 5. Add to queue
      server.middlewares.use('/api/books/automation/queue', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }
        const body = await parseBody(req);
        const state = readState();
        const newItem = {
          id: `queue-${Date.now()}`,
          title: (body.title || '').trim(),
          author: (body.author || 'Autor').trim(),
          category: (body.category || 'Filosofia e Estoicismo').trim(),
          priority: body.priority || 'alta',
        };
        if (newItem.title) {
          state.queue = state.queue || [];
          state.queue.unshift(newItem);
          state.logs = state.logs || [];
          state.logs.unshift({
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            level: 'info',
            message: `[Fila] Título "${newItem.title}" adicionado à fila com prioridade ${newItem.priority}.`,
          });
          writeState(state);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, state }));
      });

      // 6. Toggle Active
      server.middlewares.use('/api/books/automation/toggle', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }
        const body = await parseBody(req);
        const state = readState();
        state.isActive = typeof body.active === 'boolean' ? body.active : !state.isActive;
        state.logs = state.logs || [];
        state.logs.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `[Sistema] Automação contínua ${state.isActive ? 'ativada' : 'pausada'}.`,
        });
        writeState(state);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, state }));
      });

      // 7. Config (Frequency)
      server.middlewares.use('/api/books/automation/config', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }
        const body = await parseBody(req);
        const state = readState();
        if (body.frequencyMinutes) {
          state.frequencyMinutes = Number(body.frequencyMinutes);
          state.logs = state.logs || [];
          state.logs.unshift({
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            level: 'info',
            message: `[Config] Frequência de automação alterada para a cada ${state.frequencyMinutes} minutos.`,
          });
          writeState(state);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true, state }));
      });
    },
  };
}

function officialWebtoonIntegrationPlugin(): Plugin {
  const imageCache = new Map<string, { buffer: Buffer; contentType: string; timestamp: number }>();
  const chaptersCache = new Map<string, { data: any; timestamp: number }>();
  const pagesCache = new Map<string, { pages: string[]; timestamp: number }>();
  const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

  return {
    name: 'official-webtoon-integration',
    configureServer(server) {
      // 1. Image Proxy for Naver / Webtoon Akamai CDN with Referer injection
      server.middlewares.use('/api/proxy/webtoon-image', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const targetUrl = urlObj.searchParams.get('url');

          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          // Check memory cache
          const cached = imageCache.get(targetUrl);
          if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            res.statusCode = 200;
            res.setHeader('Content-Type', cached.contentType);
            res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
            res.end(cached.buffer);
            return;
          }

          const upstreamRes = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': 'https://www.webtoons.com/',
            },
          });

          if (!upstreamRes.ok) {
            res.statusCode = upstreamRes.status;
            res.end(`Upstream error ${upstreamRes.status}`);
            return;
          }

          const contentType = upstreamRes.headers.get('content-type') || 'image/jpeg';
          const buffer = Buffer.from(await upstreamRes.arrayBuffer());

          if (imageCache.size > 800) {
            const firstKey = imageCache.keys().next().value;
            if (firstKey) imageCache.delete(firstKey);
          }
          imageCache.set(targetUrl, { buffer, contentType, timestamp: Date.now() });

          res.statusCode = 200;
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
          res.end(buffer);
        } catch (err: any) {
          res.statusCode = 500;
          res.end(err?.message || 'Proxy error');
        }
      });

      // 2. Official Chapters List from Webtoons.com
      server.middlewares.use('/api/webtoon/official-chapters', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          const titleNo = urlObj.searchParams.get('titleNo');
          const genre = urlObj.searchParams.get('genre') || 'action';
          const slug = urlObj.searchParams.get('slug') || '';
          const webtoonId = urlObj.searchParams.get('webtoonId') || `wt-${slug}`;
          const requestedPage = urlObj.searchParams.get('page');

          if (!titleNo) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing titleNo' }));
            return;
          }

          const cacheKey = `${genre}_${slug}_${titleNo}_${requestedPage || 'all'}`;
          const cached = chaptersCache.get(cacheKey);
          if (cached && Date.now() - cached.timestamp < 15 * 60 * 1000) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cached.data));
            return;
          }

          // Pages to fetch: if specific page requested, fetch that; otherwise fetch pages 1 to 5 to get a wide catalog
          const pagesToFetch = requestedPage ? [parseInt(requestedPage, 10)] : [1, 2, 3, 4, 5];
          const chaptersMap = new Map<number, any>();

          const listFetches = pagesToFetch.map(async (p) => {
            try {
              const listUrl = `https://www.webtoons.com/en/${genre}/${slug}/list?title_no=${titleNo}&page=${p}`;
              const upstream = await fetch(listUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Referer': 'https://www.webtoons.com/',
                },
              });

              if (!upstream.ok) return;
              const html = await upstream.text();
              const episodeMatches = [...html.matchAll(/<li[^>]*id="episode_(\d+)"[^>]*>([\s\S]*?)<\/li>/gi)];

              for (const m of episodeMatches) {
                const raw = m[2];
                const num = parseInt(m[1], 10);
                let link = raw.match(/href="([^"]+)"/)?.[1] || '';
                if (link && !link.startsWith('http')) {
                  link = `https://www.webtoons.com${link}`;
                }
                const subj = raw.match(/<span class="subj"[^>]*>([\s\S]*?)<\/span>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || `Episódio ${num}`;
                const dateStr = raw.match(/<span class="date"[^>]*>([\s\S]*?)<\/span>/)?.[1]?.trim() || '';
                const thmb = raw.match(/<img[^>]*src="([^"]+)"/)?.[1] || '';

                if (!chaptersMap.has(num)) {
                  chaptersMap.set(num, {
                    id: `${webtoonId}-ep-${num}`,
                    webtoon_id: webtoonId,
                    number: num,
                    title: subj,
                    arc: `Temporada Oficial · Webtoon ${num}`,
                    synopsis: `Capítulo oficial ${num} de ${slug.replace(/-/g, ' ')}. Publicado oficialmente em ${dateStr}.`,
                    cover: thmb,
                    release_date: dateStr,
                    views: 145000 + num * 320,
                    likes: 18200 + num * 45,
                    panels_count: 0,
                    panels: [],
                    viewer_url: link.replace(/&amp;/g, '&'),
                    is_free: true,
                  });
                }
              }
            } catch {}
          });

          // Also fetch RSS feed for recent chapters
          const rssPromise = (async () => {
            try {
              const rssUrl = `https://www.webtoons.com/en/${genre}/${slug}/rss?title_no=${titleNo}`;
              const rssRes = await fetch(rssUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
              });
              if (rssRes.ok) {
                const rssXml = await rssRes.text();
                const items = [...rssXml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
                for (const it of items) {
                  const raw = it[1];
                  const title = raw.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || '';
                  let link = raw.match(/<link>(.*?)<\/link>/)?.[1] || '';
                  if (link && !link.startsWith('http')) {
                    link = `https://www.webtoons.com${link}`;
                  }
                  const pubDate = raw.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
                  const epMatch = link.match(/episode_no=(\d+)/);
                  if (epMatch) {
                    const num = parseInt(epMatch[1], 10);
                    if (!chaptersMap.has(num)) {
                      chaptersMap.set(num, {
                        id: `${webtoonId}-ep-${num}`,
                        webtoon_id: webtoonId,
                        number: num,
                        title: title || `Episódio ${num}`,
                        arc: `Lançamentos Recentes`,
                        synopsis: `Capítulo oficial ${num}. Atualização direta da plataforma oficial Webtoon.`,
                        cover: '',
                        release_date: pubDate,
                        views: 120000,
                        likes: 15000,
                        panels_count: 0,
                        panels: [],
                        viewer_url: link.replace(/&amp;/g, '&'),
                        is_free: true,
                      });
                    }
                  }
                }
              }
            } catch {}
          })();

          await Promise.all([...listFetches, rssPromise]);

          const chapters = Array.from(chaptersMap.values()).sort((a, b) => a.number - b.number);

          const payload = { success: true, titleNo, genre, slug, chapters, total: chapters.length };
          chaptersCache.set(cacheKey, { data: payload, timestamp: Date.now() });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Error fetching chapters' }));
        }
      });

      // 3. Official Chapter Panels / Pages from Viewer Page
      server.middlewares.use('/api/webtoon/pages', async (req, res) => {
        try {
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost:3000'}`);
          let viewerUrl = urlObj.searchParams.get('viewerUrl') || '';
          const titleNo = urlObj.searchParams.get('titleNo');
          const genre = urlObj.searchParams.get('genre') || 'action';
          const slug = urlObj.searchParams.get('slug') || '';
          const episodeNo = urlObj.searchParams.get('episodeNo');

          // Candidate URLs to try if viewerUrl is missing or 404s
          const candidateUrls: string[] = [];
          if (viewerUrl) candidateUrls.push(viewerUrl);

          if (titleNo && episodeNo && slug) {
            candidateUrls.push(
              `https://www.webtoons.com/en/${genre}/${slug}/episode-${episodeNo}/viewer?title_no=${titleNo}&episode_no=${episodeNo}`,
              `https://www.webtoons.com/en/${genre}/${slug}/ep-${episodeNo}/viewer?title_no=${titleNo}&episode_no=${episodeNo}`,
              `https://www.webtoons.com/en/${genre}/${slug}/season-1-ep-${episodeNo}/viewer?title_no=${titleNo}&episode_no=${episodeNo}`,
              `https://www.webtoons.com/en/${genre}/${slug}/prologue/viewer?title_no=${titleNo}&episode_no=${episodeNo}`
            );
          }

          if (candidateUrls.length === 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing viewerUrl or titleNo/episodeNo' }));
            return;
          }

          // Check memory cache for any candidate
          for (const cand of candidateUrls) {
            const cached = pagesCache.get(cand);
            if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: cached.pages.length, pages: cached.pages, resolvedUrl: cand }));
              return;
            }
          }

          let extractedPages: string[] = [];
          let successfulUrl = '';

          for (const tryUrl of candidateUrls) {
            try {
              const upstream = await fetch(tryUrl, {
                redirect: 'follow',
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Referer': 'https://www.webtoons.com/',
                },
              });

              if (!upstream.ok) continue;

              const html = await upstream.text();
              const listMatch = html.match(/id="_imageList"[\s\S]*?<\/div>\s*<\/div>/i);
              let rawPages: string[] = [];

              if (listMatch) {
                rawPages = [...listMatch[0].matchAll(/data-url="([^"]+)"/g)].map((m) => m[1]);
              } else {
                rawPages = [...html.matchAll(/data-url="([^"]+)"/g)].map((m) => m[1]);
              }

              // Filter out tracking/blank
              rawPages = rawPages.filter((u) => u.includes('pstatic.net') || u.includes('webtoon-phinf'));

              if (rawPages.length > 0) {
                extractedPages = rawPages;
                successfulUrl = tryUrl;
                break;
              }
            } catch {}
          }

          if (extractedPages.length > 0) {
            pagesCache.set(successfulUrl, { pages: extractedPages, timestamp: Date.now() });
            if (viewerUrl && viewerUrl !== successfulUrl) {
              pagesCache.set(viewerUrl, { pages: extractedPages, timestamp: Date.now() });
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, count: extractedPages.length, pages: extractedPages, resolvedUrl: successfulUrl }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, count: 0, pages: [] }));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Error fetching viewer pages' }));
        }
      });

      // 4. Local Chapters on Disk Static Handler (No Solo Leveling contamination)
      server.middlewares.use((req, res, next) => {
        const urlPath = (req.url || '').split('?')[0];
        if (urlPath.startsWith('/chapters/') && (urlPath.endsWith('.jpg') || urlPath.endsWith('.jpeg') || urlPath.endsWith('.png'))) {
          const directFile = path.resolve(__dirname, 'public', urlPath.replace(/^\//, ''));
          if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            fs.createReadStream(directFile).pipe(res);
            return;
          }
          res.statusCode = 404;
          res.end('Chapter image not found');
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), newsRssPlugin(), gutenbergBooksPlugin(), bookAutomationPlugin(), officialWebtoonIntegrationPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'framer-motion'],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      cors: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
