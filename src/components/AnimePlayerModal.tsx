import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Anime } from "@/lib/animes";
import { Star, Tv, Calendar, Building2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface AnimePlayerModalProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnimePlayerModal = ({ anime, isOpen, onClose }: AnimePlayerModalProps) => {
  if (!anime) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border">
        {/* Video Player Header / Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${anime.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={`Trailer de ${anime.title}`}
            sandbox="allow-scripts allow-same-origin allow-presentation allow-encrypted-media"
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0 select-none"
          />
        </div>

        {/* Video & Anime Info */}
        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-1 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                  {anime.status}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {anime.rating} ({anime.ratingCount.toLocaleString()} votos)
                </span>
              </div>

              <Link
                to={`/animes/${anime.id}`}
                onClick={onClose}
                className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
              >
                Ver todos os {anime.episodesCount} episódios
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            <DialogTitle className="text-xl md:text-2xl font-normal text-foreground">
              {anime.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground italic">
              {anime.japaneseTitle} • {anime.studio} ({anime.year})
            </DialogDescription>
          </DialogHeader>

          <p className="text-xs md:text-sm text-foreground/80 font-light leading-relaxed">
            {anime.synopsis}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>Estúdio: {anime.studio}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tv className="h-3.5 w-3.5" />
              <span>{anime.episodesCount} Episódios</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{anime.season}</span>
            </div>
            <div className="ml-auto font-medium text-foreground">
              {anime.audio}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimePlayerModal;
