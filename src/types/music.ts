export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number; // in seconds
  audioUrl?: string;
  releaseYear: number;
  plays?: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  releaseYear: number;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio?: string;
  genres: string[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  queue: Song[];
  queueIndex: number;
}
