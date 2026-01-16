import { Song } from "@/types/music";
import SongCard from "./SongCard";

interface SongGridProps {
  title: string;
  subtitle?: string;
  songs: Song[];
}

const SongGrid = ({ title, subtitle, songs }: SongGridProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SongCard song={song} index={index} allSongs={songs} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SongGrid;
