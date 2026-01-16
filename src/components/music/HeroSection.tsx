import { Play, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/contexts/PlayerContext";
import { habibWahidSongs } from "@/data/songs";

interface HeroSectionProps {
  artistImage: string;
}

const HeroSection = ({ artistImage }: HeroSectionProps) => {
  const { playSong } = usePlayer();

  const handlePlayAll = () => {
    if (habibWahidSongs.length > 0) {
      playSong(habibWahidSongs[0], habibWahidSongs);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...habibWahidSongs].sort(() => Math.random() - 0.5);
    if (shuffled.length > 0) {
      playSong(shuffled[0], shuffled);
    }
  };

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={artistImage}
          alt="Habib Wahid"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-12 md:pb-16">
        <div className="max-w-2xl animate-slide-up">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-4">
            Featured Artist
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Habib Wahid
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-2">
            The King of Bangladeshi Pop Music
          </p>
          <p className="text-muted-foreground/70 mb-8 max-w-lg">
            Experience the soulful melodies and rhythmic beats that have captivated millions across Bangladesh and beyond.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 glow-effect"
              onClick={handlePlayAll}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Play All
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:bg-secondary/50 font-semibold px-8"
              onClick={handleShuffle}
            >
              <Shuffle className="w-5 h-5 mr-2" />
              Shuffle
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-6 border-t border-border/30">
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold gradient-text">65M+</p>
              <p className="text-muted-foreground text-sm">Monthly Listeners</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold">200+</p>
              <p className="text-muted-foreground text-sm">Songs</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-display font-bold">15+</p>
              <p className="text-muted-foreground text-sm">Albums</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
