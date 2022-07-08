import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  character: Character;
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export default function CharacterItem({ character }: Props) {
  return (
    <Link href={`/character/${character.id}`}>
      <div className="drop-shadow-md bg-white rounded-lg cursor-pointer overflow-hidden flex flex-col lg:flex-row items-center">
        <div className="relative h-36 w-36">
          <Image
            src={character.image}
            alt={character.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="grow flex flex-col xl:flex-row justify-between items-start px-2 truncate w-full">
          <div>
            <p className="text-lg font-bold">{character.name}</p>
            <p>
              {character.status === "Alive" ? "🟢" : "💀"} {character.status}
            </p>
            <p>{character.species}</p>
          </div>
          <div>
            <p className="text-blac font-semibold">
              <span className="font-bold text-neutral-600">
                Last known location:
              </span>
              <br />
              {character.location.name}
            </p>
            <p className="text-blac font-semibold">
              <span className="font-bold text-neutral-600">First seen:</span>
              <br />
              {character.origin.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
