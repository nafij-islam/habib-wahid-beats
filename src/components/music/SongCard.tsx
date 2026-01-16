import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/types/music";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration, formatPlays } from "@/data/songs";
import { cn } from "@/lib/utils";

interface SongCardProps {
  song: Song;
  index: number;
  allSongs: Song[];
}

const SongCard = ({ song, index, allSongs }: SongCardProps) => {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song, allSongs);
    }
  };

  return (
    <div
      className={cn(
        "music-card group p-4 cursor-pointer",
        isCurrentSong && "ring-1 ring-primary/50"
      )}
      onClick={handlePlay}
    >
      {/* Album Cover */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img
          src={song.albumCover}
          alt={song.album}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Play Button Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <Button
            size="icon"
            className={cn(
              "w-14 h-14 rounded-full shadow-lg transition-all duration-300",
              isCurrentSong && isPlaying
                ? "bg-primary text-primary-foreground scale-100"
                : "bg-primary text-primary-foreground scale-90 group-hover:scale-100"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handlePlay();
            }}
          >
            {isCurrentSong && isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
        </div>

        {/* Now Playing Indicator */}
        {isCurrentSong && isPlaying && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <span className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="space-y-1">
        <h3 className={cn(
          "font-semibold truncate transition-colors",
          isCurrentSong ? "text-primary" : "text-foreground"
        )}>
          {song.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground/70">
            {formatDuration(song.duration)}
          </span>
          {song.plays && (
            <span className="text-xs text-muted-foreground/70">
              {formatPlays(song.plays)} plays
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons - Visible on Hover */}
      <div className="flex items-center justify-end gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SongCard;
