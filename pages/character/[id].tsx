import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Page from "../../layout/page";
import EpisodeItem from "../../components/EpisodeItem";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { useLocalStorage, useIsClient } from "usehooks-ts";

type Props = {
  character: Character;
  episodes: Episodes;
  lastEpisode: number;
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

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

type Episodes = Episode[];

export default function ID(props: Props) {
  let { character } = props;
  const [episodes, setEpisodes] = useState(props.episodes);
  const [lastEpisode, setLastEpisode] = useState(props.lastEpisode);
  const [liked, setLiked] = useLocalStorage<number[]>("liked", []);
  const isClient = useIsClient();

  const handleLoadMoreEpisodes = async () => {
    let arr = [...episodes];
    let last = lastEpisode;

    if (lastEpisode < character.episode.length) {
      for (
        let i = lastEpisode + 1;
        i < character.episode.length && i < lastEpisode + 5;
        i++
      ) {
        const id = character.episode[i].split("/");

        const response = await axios.get(
          `https://rickandmortyapi.com/api/episode/${id[id.length - 1]}`
        );

        arr.push(response.data);
        last = i;
      }

      setEpisodes([...arr]);
      setLastEpisode(last);
    }
  };

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
    <Page onScrolledToBottomWithOffset={handleLoadMoreEpisodes}>
      <div className="flex flex-col w-full items-center py-8 gap-8">
        {/* Info */}
        <div className="drop-shadow-md bg-white rounded-lg overflow-hidden flex flex-col lg:flex-row items-center">
          <div className="relative h-52 w-52">
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
              <p className="text-lg font-bold cursor-pointer hover:underline">
                {character.name}
              </p>
              <p>
                {character.status === "Alive" ? "🟢" : "💀"} {character.status}
              </p>
              <p>{character.species}</p>
              <p>{character.gender}</p>
              <p>{character.type}</p>
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
        {/* Episodes */}
        <div className="flex flex-col gap-2 w-11/12 md:w-2/3">
          <p className="text-7xl font-semibold">EPISODES:</p>
          {episodes?.map((episode, index) => (
            <EpisodeItem key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps({ params }: any) {
  let character: Character;
  let episodes: Episodes = [];
  let lastEpisode = 0;

  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${params.id}`
    );
    character = response.data;

    for (let i = 0; i < character.episode.length && i < 5; i++) {
      const id = character.episode[i].split("/");

      const response2 = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id[id.length - 1]}`
      );

      episodes.push(response2.data);
      lastEpisode = i;
    }

    return { props: { character, episodes, lastEpisode } };
  } catch (error) {
    console.error(error);
  }
}
