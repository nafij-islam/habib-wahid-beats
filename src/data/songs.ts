import { Song } from "@/types/music";
import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";
import albumCover4 from "@/assets/album-cover-4.jpg";
// 
import DinGelo from "@/audio/din-gelo.mp3"
import MohaJadu from "@/audio/moha-jadu.mp3"
import valobasbo from "@/audio/vlobasbo-basbore.mp3"

const albumCovers = [albumCover1, albumCover2, albumCover3, albumCover4];

export const habibWahidSongs: Song[] = [
  {
    id: "1",
    title: "Din Gelo Tomar Potho Chahiya",
    artist: "Habib Wahid",
    album: "Din Gelo Tomar Potho Chahiya",
    albumCover: albumCovers[1],
    audioUrl:DinGelo ,
    duration: 250,
    releaseYear: 2015,
    plays: 15420000,
  },
    {
    id: "2",
    title: "Amr Bondhu Moha Jadu Jane",
    artist: "Habib Wahid",
    album: "Amr Bondhu Moha Jadu Jane",
    albumCover: albumCovers[2],
    audioUrl:MohaJadu,
    duration: 210,
    releaseYear: 2015,
    plays: 15420000,
  },
    {
    id: "3",
    title: "valobasbo valobasbo re bondhu",
    artist: "Habib Wahid",
    album: "valobasbo valobasbo re bondhu",
    albumCover: albumCovers[3],
    audioUrl:valobasbo,
    duration: 290,
    releaseYear: 2015,
    plays: 15420000,
  }
];

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatPlays = (plays: number): string => {
  if (plays >= 1000000) {
    return `${(plays / 1000000).toFixed(1)}M`;
  }
  if (plays >= 1000) {
    return `${(plays / 1000).toFixed(0)}K`;
  }
  return plays.toString();
};
