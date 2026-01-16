import { Clock } from "lucide-react";
import { Song } from "@/types/music";
import SongListItem from "./SongListItem";

interface SongListProps {
  title: string;
  subtitle?: string;
  songs: Song[];
}

const SongList = ({ title, subtitle, songs }: SongListProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        {/* Header */}
        <div className="hidden md:flex items-center gap-4 px-3 py-2 border-b border-border/50 text-sm text-muted-foreground mb-2">
          <div className="w-8 text-center">#</div>
          <div className="w-12" /> {/* Album art space */}
          <div className="flex-1">Title</div>
          <div className="flex-1">Album</div>
          <div className="hidden lg:block w-24 text-right">Plays</div>
          <div className="w-8" /> {/* Heart button space */}
          <div className="w-12 flex justify-end">
            <Clock className="w-4 h-4" />
          </div>
          <div className="w-8" /> {/* More button space */}
        </div>

        {/* Song Items */}
        <div className="space-y-1">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <SongListItem song={song} index={index} allSongs={songs} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SongList;
