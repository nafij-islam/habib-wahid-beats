import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  ListMusic,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatDuration } from "@/data/songs";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    volume,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    setCurrentTime,
  } = usePlayer();

  const [localTime, setLocalTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && currentSong && !isDragging) {
      intervalRef.current = setInterval(() => {
        setLocalTime((prev) => {
          if (prev >= currentSong.duration) {
            nextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong, isDragging, nextSong]);

  // Reset time when song changes
  useEffect(() => {
    setLocalTime(0);
  }, [currentSong?.id]);

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setLocalTime(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  if (!currentSong) {
    return null;
  }

  const progress = currentSong.duration > 0 ? (localTime / currentSong.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 player-bar">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 w-1/4 min-w-0">
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
              <img
                src={currentSong.albumCover}
                alt={currentSong.album}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-[8000ms]",
                  isPlaying && "animate-spin-slow"
                )}
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-medium truncate text-sm">{currentSong.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:flex w-8 h-8 flex-shrink-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex w-8 h-8">
                <Shuffle className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={previousSong}>
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={nextSong}>
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex w-8 h-8">
                <Repeat className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xl flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatDuration(Math.floor(localTime))}
              </span>
              <Slider
                value={[localTime]}
                max={currentSong.duration}
                step={1}
                onValueChange={handleSeek}
                onPointerDown={() => setIsDragging(true)}
                onPointerUp={() => setIsDragging(false)}
                className="flex-1 cursor-pointer"
              />
              <span className="text-xs text-muted-foreground w-10">
                {formatDuration(currentSong.duration)}
              </span>
            </div>
          </div>

          {/* Volume & Other Controls */}
          <div className="hidden md:flex items-center gap-2 w-1/4 justify-end">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ListMusic className="w-4 h-4 text-muted-foreground" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24 cursor-pointer"
              />
            </div>

            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Maximize2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
