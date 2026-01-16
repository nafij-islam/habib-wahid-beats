import Header from "@/components/music/Header";
import HeroSection from "@/components/music/HeroSection";
import SongGrid from "@/components/music/SongGrid";
import SongList from "@/components/music/SongList";
import MusicPlayer from "@/components/music/MusicPlayer";
import { habibWahidSongs } from "@/data/songs";
import heroImage from "@/assets/habib-wahid-hero.jpg";

const Index = () => {
  const popularSongs = [...habibWahidSongs].sort((a, b) => (b.plays || 0) - (a.plays || 0)).slice(0, 6);
  const latestSongs = [...habibWahidSongs].sort((a, b) => b.releaseYear - a.releaseYear);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection artistImage={heroImage} />
      
      {/* Popular Songs Grid */}
      <SongGrid 
        title="Popular Songs" 
        subtitle="Most played tracks by Habib Wahid"
        songs={popularSongs} 
      />
      
      {/* All Songs List */}
      <SongList 
        title="All Songs" 
        subtitle="Complete discography"
        songs={latestSongs} 
      />
      
      {/* Bottom spacing for player */}
      <div className="h-28" />
      
      {/* Fixed Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default Index;
