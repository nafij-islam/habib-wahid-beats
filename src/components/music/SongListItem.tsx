import { Play, Pause, Heart, MoreHorizontal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/types/music";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration, formatPlays } from "@/data/songs";
import { cn } from "@/lib/utils";

interface SongListItemProps {
  song: Song;
  index: number;
  allSongs: Song[];
}

const SongListItem = ({ song, index, allSongs }: SongListItemProps) => {
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
        "group flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer",
        isCurrentSong ? "bg-primary/10" : "hover:bg-secondary/50"
      )}
      onClick={handlePlay}
    >
      {/* Index / Play Button */}
      <div className="w-8 flex items-center justify-center">
        <span className={cn(
          "group-hover:hidden text-sm font-medium",
          isCurrentSong ? "text-primary" : "text-muted-foreground"
        )}>
          {isCurrentSong && isPlaying ? (
            <div className="flex items-center gap-0.5">
              <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-0.5 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
              <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            index + 1
          )}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="hidden group-hover:flex w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Album Art */}
      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
        <img
          src={song.albumCover}
          alt={song.album}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          "font-medium truncate",
          isCurrentSong ? "text-primary" : "text-foreground"
        )}>
          {song.title}
        </h4>
        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
      </div>

      {/* Album */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-sm text-muted-foreground truncate">{song.album}</p>
      </div>

      {/* Plays */}
      <div className="hidden lg:block w-24 text-right">
        <p className="text-sm text-muted-foreground">
          {song.plays ? formatPlays(song.plays) : "-"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4" />
        </Button>
        
        <span className="text-sm text-muted-foreground w-12 text-right">
          {formatDuration(song.duration)}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SongListItem;
