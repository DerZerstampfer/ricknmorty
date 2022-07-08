import type { NextPage } from "next";
import Head from "next/head";
import Page from "../../layout/page";
import axios from "axios";
import { useState } from "react";
import CharacterItem from "../../components/CharacterItem";

type Props = {
  characters: Characters;
  meta: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
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

type Characters = Character[];

const Index = (props: Props) => {
  const [characters, setCharacters] = useState(props.characters);
  const [meta, setMeta] = useState(props.meta);

  const loadMoreCharacters = async () => {
    try {
      if (!meta.next) return;

      const response = await axios.get(meta.next);

      setCharacters([...characters, ...response.data.results]);
      setMeta(response.data.info);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page onScrolledToBottomWithOffset={loadMoreCharacters}>
      <div className="py-8">
        <div className="flex justify-center items-center flex-col gap-8">
          <p className="text-7xl font-semibold">Characters</p>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mx-2 w-11/12 md:w-2/3">
            {characters?.map((character, index) => (
              <CharacterItem key={character.id} character={character} />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export async function getServerSideProps({ params }: any) {
  let characters: Characters = [];
  let meta: any;

  try {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    characters = response.data.results;
    meta = response.data.info;

    return { props: { characters, meta } };
  } catch (error) {
    console.error(error);
  }
}

export default Index;
