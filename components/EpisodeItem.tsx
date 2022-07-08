import React from "react";
import Link from "next/link";

type Props = {
  episode: Episode;
};

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export default function EpisodeItem({ episode }: Props) {
  return (
    <Link href={`/episode/${episode.id}`}>
      <div className="p-4 drop-shadow-md border-2 border-neutral-300 bg-white rounded-lg cursor-pointer">
        <p className="text-xl font-bold">„{episode.name}“</p>
      </div>
    </Link>
  );
}
