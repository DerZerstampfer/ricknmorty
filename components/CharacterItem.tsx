import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { useLocalStorage, useIsClient } from "usehooks-ts";

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
  const router = useRouter();
  const [liked, setLiked] = useLocalStorage<number[]>("liked", []);
  const isClient = useIsClient();

  const handleLikeClick = () => {
    if (liked.includes(character.id)) {
      let arr = liked;
      var index = arr.indexOf(character.id);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      setLiked(arr);
    } else {
      let arr = liked;
      arr.push(character.id);
      setLiked(arr);
    }
  };

  return (
    <div>
      <div className="drop-shadow-md bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row items-center">
        <div className="relative h-36 w-36">
          <Image
            src={character.image}
            alt={character.name}
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
        <div className="grow flex flex-col xl:flex-row justify-between items-start px-2 truncate w-full">
          <div>
            <p
              className="text-lg font-bold cursor-pointer hover:underline"
              onClick={() => router.push(`/character/${character.id}`)}
            >
              {character.name}
            </p>
            <p>
              {character.status === "Alive" ? "🟢" : "💀"} {character.status}
            </p>
            <p>{character.species}</p>
            <div
              className="w-8 h-8 cursor-pointer text-red-600"
              onClick={handleLikeClick}
            >
              {isClient && liked.includes(character.id) ? (
                <HeartIconSolid />
              ) : (
                <HeartIcon />
              )}
            </div>
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
    </div>
  );
}
