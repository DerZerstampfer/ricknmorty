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
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl font-bold italic">„{episode.name}“</p>
          <p>{episode.episode}</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p>
            First broadcast:{" "}
            <span className="font-semibold">
              {new Date(episode.air_date).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
