import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Song, PlayerState } from "@/types/music";

interface PlayerContextType extends PlayerState {
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  setCurrentTime: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    queue: [],
    queueIndex: 0,
  });

  const playSong = useCallback((song: Song, queue?: Song[]) => {
    const newQueue = queue || [song];
    const index = newQueue.findIndex((s) => s.id === song.id);
    setState((prev) => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      queue: newQueue,
      queueIndex: index >= 0 ? index : 0,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const nextSong = useCallback(() => {
    setState((prev) => {
      if (prev.queue.length === 0) return prev;
      const nextIndex = (prev.queueIndex + 1) % prev.queue.length;
      return {
        ...prev,
        currentSong: prev.queue[nextIndex],
        queueIndex: nextIndex,
        currentTime: 0,
        isPlaying: true,
      };
    });
  }, []);

  const previousSong = useCallback(() => {
    setState((prev) => {
      if (prev.queue.length === 0) return prev;
      const prevIndex = prev.queueIndex === 0 ? prev.queue.length - 1 : prev.queueIndex - 1;
      return {
        ...prev,
        currentSong: prev.queue[prevIndex],
        queueIndex: prevIndex,
        currentTime: 0,
        isPlaying: true,
      };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const seek = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playSong,
        togglePlay,
        nextSong,
        previousSong,
        setVolume,
        seek,
        setCurrentTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
