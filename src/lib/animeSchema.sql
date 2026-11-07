-- ============================================================================
-- ARQUITETURA DE BANCO DE DADOS - PLATAFORMA DE STREAMING DE ANIMES
-- Modelagem Hierárquica Estrita: Anime -> Season -> Episode -> Source
-- Integridade Referencial, Chaves de Unicidade Lógica e Prevenção de Duplicatas
-- ============================================================================

-- 1. Habilitar extensões necessárias para UUID e Criptografia
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabela de Animes (Raiz da Obra)
CREATE TABLE IF NOT EXISTS animes (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    japanese_title VARCHAR(255),
    synopsis TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    banner_url TEXT NOT NULL,
    rating NUMERIC(3, 1) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 10.0),
    rating_count INTEGER DEFAULT 0 CHECK (rating_count >= 0),
    status VARCHAR(32) NOT NULL CHECK (status IN ('Em lançamento', 'Completo', 'Cancelado', 'Pausado')),
    studio VARCHAR(128) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1960 AND year <= 2040),
    audio_type VARCHAR(64) DEFAULT 'Dublado & Legendado PT-BR',
    trailer_youtube_id VARCHAR(32),
    mal_id INTEGER UNIQUE,
    tmdb_id INTEGER UNIQUE,
    anilist_id INTEGER UNIQUE,
    featured BOOLEAN DEFAULT FALSE,
    trending BOOLEAN DEFAULT FALSE,
    rank INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_animes_slug ON animes(slug);
CREATE INDEX IF NOT EXISTS idx_animes_featured ON animes(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_animes_trending ON animes(trending) WHERE trending = TRUE;
CREATE INDEX IF NOT EXISTS idx_animes_rating ON animes(rating DESC);

-- 3. Tabela de Temporadas (Season) - Nível 2
CREATE TABLE IF NOT EXISTS seasons (
    id VARCHAR(64) PRIMARY KEY,
    anime_id VARCHAR(64) NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
    season_number INTEGER NOT NULL CHECK (season_number > 0),
    title VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    synopsis TEXT,
    poster_url TEXT,
    banner_url TEXT,
    episodes_count INTEGER DEFAULT 0 CHECK (episodes_count >= 0),
    trailer_youtube_id VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Chave de Unicidade: Um anime não pode ter duas temporadas com o mesmo número
    CONSTRAINT unique_anime_season_number UNIQUE (anime_id, season_number)
);

CREATE INDEX IF NOT EXISTS idx_seasons_anime_id ON seasons(anime_id);
CREATE INDEX IF NOT EXISTS idx_seasons_number ON seasons(anime_id, season_number);

-- 4. Tabela de Episódios (Episode) - Nível 3
CREATE TABLE IF NOT EXISTS episodes (
    id VARCHAR(64) PRIMARY KEY,
    anime_id VARCHAR(64) NOT NULL REFERENCES animes(id) ON DELETE CASCADE,
    season_id VARCHAR(64) NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
    season_number INTEGER NOT NULL CHECK (season_number > 0),
    episode_number INTEGER NOT NULL CHECK (episode_number > 0),
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(32) NOT NULL DEFAULT '24m',
    thumbnail_url TEXT NOT NULL,
    synopsis TEXT,
    is_free BOOLEAN DEFAULT TRUE,
    air_date DATE,
    -- Prevenção Crítica de Duplicidade de Mídia:
    content_hash VARCHAR(64) NOT NULL,
    stream_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Chave de Unicidade Lógica Estrita: Um episódio específico por temporada e anime
    CONSTRAINT unique_anime_season_episode UNIQUE (anime_id, season_number, episode_number),
    -- Bloqueia reutilização cega da mesma fonte de vídeo/conteúdo para episódios diferentes
    CONSTRAINT unique_episode_content_hash UNIQUE (content_hash)
);

CREATE INDEX IF NOT EXISTS idx_episodes_season_id ON episodes(season_id);
CREATE INDEX IF NOT EXISTS idx_episodes_anime_season ON episodes(anime_id, season_number, episode_number);
CREATE INDEX IF NOT EXISTS idx_episodes_content_hash ON episodes(content_hash);

-- 5. Tabela de Fontes de Mídia (Sources / CDN / Streams)
CREATE TABLE IF NOT EXISTS sources (
    id VARCHAR(64) PRIMARY KEY,
    episode_id VARCHAR(64) NOT NULL REFERENCES episodes(id) ON DELETE CASCADE,
    quality VARCHAR(16) NOT NULL CHECK (quality IN ('360p', '480p', '720p', '1080p', '4k')),
    stream_url TEXT NOT NULL,
    format VARCHAR(16) NOT NULL DEFAULT 'hls' CHECK (format IN ('hls', 'mp4', 'dash', 'embed')),
    provider VARCHAR(64) NOT NULL DEFAULT 'official-cdn',
    is_default BOOLEAN DEFAULT FALSE,
    content_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_episode_quality UNIQUE (episode_id, quality),
    CONSTRAINT unique_source_stream_url UNIQUE (stream_url)
);

CREATE INDEX IF NOT EXISTS idx_sources_episode_id ON sources(episode_id);
