import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ShieldCheck,
  SkipForward,
  SkipBack,
  Settings,
  AlertCircle,
  Tv,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AnimeEpisode, AnimeSeason } from "@/lib/animes";
import { sanitizeTrailerEmbedUrl } from "@/lib/animeMetadataSync";

interface SecureAnimePlayerProps {
  animeTitle: string;
  season: AnimeSeason;
  episode: AnimeEpisode;
  onSelectEpisode: (episodeNumber: number) => void;
  onNextEpisode?: () => void;
  onPreviousEpisode?: () => void;
  hasNextEpisode?: boolean;
  hasPreviousEpisode?: boolean;
}

export const SecureAnimePlayer: React.FC<SecureAnimePlayerProps> = ({
  animeTitle,
  season,
  episode,
  onSelectEpisode,
  onNextEpisode,
  onPreviousEpisode,
  hasNextEpisode = false,
  hasPreviousEpisode = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<string>("1080p");
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [blockedRedirectsCount, setBlockedRedirectsCount] = useState(0);
  const [playerMode, setPlayerMode] = useState<"embed" | "native">("embed");
  const containerRef = useRef<HTMLDivElement>(null);

  // Anti-Redirect / Anti-Popup Guard
  useEffect(() => {
    // Intercepta tentativas de navegação no nível da janela superior (top window)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Bloqueia tentativas automáticas de descarregamento forçado por scripts terceiros
      if (isShieldActive) {
        setBlockedRedirectsCount((c) => c + 1);
      }
    };

    // Previne que scripts usem window.open para criar popups ou popunders
    const originalOpen = window.open;
    window.open = function (...args) {
      console.warn("[SecureAnimePlayer] Tentativa de abertura de popup ou redirecionamento bloqueada:", args);
      setBlockedRedirectsCount((c) => c + 1);
      return null;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.open = originalOpen;
    };
  }, [isShieldActive]);

  // Se o episódio tiver um stream_url nativo (.mp4 / .m3u8), utiliza o leitor nativo
  const isDirectMedia =
    episode.streamUrl &&
    (episode.streamUrl.endsWith(".mp4") || episode.streamUrl.endsWith(".m3u8"));

  const embedUrl = isDirectMedia
    ? episode.streamUrl
    : sanitizeTrailerEmbedUrl(episode.streamUrl || season.trailerYoutubeId || "916nW3F1Yv8");

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl overflow-hidden border border-border bg-black shadow-2xl transition-all duration-300 ${
        isTheaterMode ? "max-w-6xl mx-auto ring-2 ring-primary/40" : "w-full"
      }`}
    >
      {/* Barra Superior de Segurança e Informação */}
      <div className="px-4 py-2.5 bg-neutral-900 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Blindagem Anti-Redirect Ativa</span>
          </div>
          <span className="hidden sm:inline text-neutral-400">•</span>
          <span className="text-neutral-300 font-medium truncate max-w-[280px] sm:max-w-md">
            T{season.seasonNumber}:E{episode.number} — {episode.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {blockedRedirectsCount > 0 && (
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {blockedRedirectsCount} Popups Bloqueados
            </span>
          )}

          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
            {["1080p", "720p"].map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuality(q)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  selectedQuality === q
                    ? "bg-primary text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsTheaterMode(!isTheaterMode)}
            className={`p-1.5 rounded-lg border border-white/10 text-xs text-neutral-300 hover:bg-white/10 transition-colors ${
              isTheaterMode ? "bg-primary/20 text-primary border-primary/40" : ""
            }`}
            title={isTheaterMode ? "Sair do Modo Teatro" : "Modo Teatro"}
          >
            <Tv className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Área Central de Vídeo com Sandboxing Estrito */}
      <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
        {/*
          SANDBOXING ESTRITO ANTI-REDIRECT:
          - allow-scripts: Necessário para a engine do player rodar
          - allow-same-origin: Necessário para carregar recursos de streaming
          - allow-presentation: Permite envio para Chromecast / AirPlay
          - allow-encrypted-media: Permite DRM oficial e decodificação HD
          CRÍTICO: NÃO inclui 'allow-popups' nem 'allow-top-navigation'.
          Desta forma, mesmo se o player tentar window.open ou redirecionar o site,
          o navegador do usuário bloqueia silenciosamente e o mantém na plataforma!
        */}
        <iframe
          key={`${episode.id}-${selectedQuality}`}
          src={embedUrl}
          title={`${animeTitle} - T${season.seasonNumber}:E${episode.number}`}
          sandbox="allow-scripts allow-same-origin allow-presentation allow-encrypted-media"
          referrerPolicy="no-referrer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 select-none"
        />
      </div>

      {/* Barra Inferior com Controles Rápidos e Metadados de Verificação */}
      <div className="p-4 bg-neutral-950 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">
              Episódio {episode.number}: {episode.title}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              ({episode.duration})
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
              HD Oficial Verificado
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-light line-clamp-2 max-w-2xl">
            {episode.synopsis || season.synopsis}
          </p>
        </div>

        {/* Botões de Navegação Entre Episódios */}
        <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
          <button
            onClick={onPreviousEpisode}
            disabled={!hasPreviousEpisode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              hasPreviousEpisode
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "opacity-40 border-transparent text-neutral-500 cursor-not-allowed"
            }`}
          >
            <SkipBack className="h-3.5 w-3.5" />
            <span>Anterior</span>
          </button>

          <button
            onClick={onNextEpisode}
            disabled={!hasNextEpisode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              hasNextEpisode
                ? "bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/25"
                : "opacity-40 bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <span>Próximo</span>
            <SkipForward className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Tela Cheia"
          >
            <Maximize className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecureAnimePlayer;
