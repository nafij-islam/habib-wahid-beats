import { Song } from "@/types/music";
import albumCover1 from "@/assets/album-cover-1.jpg";
import albumCover2 from "@/assets/album-cover-2.jpg";
import albumCover3 from "@/assets/album-cover-3.jpg";
import albumCover4 from "@/assets/album-cover-4.jpg";

const albumCovers = [albumCover1, albumCover2, albumCover3, albumCover4];

export const habibWahidSongs: Song[] = [
  {
    id: "1",
    title: "Bolte Bolte Cholte Cholte",
    artist: "Habib Wahid",
    album: "Bolte Bolte Cholte Cholte",
    albumCover: albumCovers[0],
    duration: 245,
    releaseYear: 2015,
    plays: 15420000,
  },
  {
    id: "2",
    title: "Mayabono Biharini",
    artist: "Habib Wahid",
    album: "Mayabono Biharini",
    albumCover: albumCovers[1],
    duration: 312,
    releaseYear: 2012,
    plays: 8750000,
  },
  {
    id: "3",
    title: "Tumi Amar",
    artist: "Habib Wahid",
    album: "Tumi Amar",
    albumCover: albumCovers[2],
    duration: 278,
    releaseYear: 2018,
    plays: 6320000,
  },
  {
    id: "4",
    title: "Fagunero Mohonay",
    artist: "Habib Wahid",
    album: "Fagunero Mohonay",
    albumCover: albumCovers[3],
    duration: 298,
    releaseYear: 2014,
    plays: 5890000,
  },
  {
    id: "5",
    title: "Krishno",
    artist: "Habib Wahid",
    album: "Krishno",
    albumCover: albumCovers[0],
    duration: 265,
    releaseYear: 2010,
    plays: 12100000,
  },
  {
    id: "6",
    title: "Ore Nil Doriya",
    artist: "Habib Wahid",
    album: "Ore Nil Doriya",
    albumCover: albumCovers[1],
    duration: 289,
    releaseYear: 2016,
    plays: 4560000,
  },
  {
    id: "7",
    title: "Bhalobeshe Shokhi",
    artist: "Habib Wahid",
    album: "Bhalobeshe Shokhi",
    albumCover: albumCovers[2],
    duration: 256,
    releaseYear: 2013,
    plays: 7230000,
  },
  {
    id: "8",
    title: "Moner Ghore",
    artist: "Habib Wahid",
    album: "Moner Ghore",
    albumCover: albumCovers[3],
    duration: 301,
    releaseYear: 2019,
    plays: 3980000,
  },
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
