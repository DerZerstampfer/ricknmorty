import type { NextPage } from "next";
import Head from "next/head";
import Page from "../../layout/page";
import axios from "axios";
import { useState } from "react";
import EpisodeItem from "../../components/EpisodeItem";

type Props = {
  episodes: Episodes;
  meta: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
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

const Index = (props: Props) => {
  const [episodes, setEpisodes] = useState(props.episodes);
  const [meta, setMeta] = useState(props.meta);

  const loadMoreEpisodes = async () => {
    try {
      if (!meta.next) return;

      const response = await axios.get(meta.next);

      setEpisodes([...episodes, ...response.data.results]);
      setMeta(response.data.info);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page onScrolledToBottomWithOffset={loadMoreEpisodes}>
      <div className="py-8">
        <div className="flex justify-center items-center flex-col gap-8">
          <p className="text-7xl font-semibold">EPISODES</p>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mx-2 md:w-2/3">
            {episodes?.map((episode, index) => (
              <EpisodeItem key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export async function getServerSideProps({ params }: any) {
  let episodes: Episodes = [];
  let meta: any;

  try {
    const response = await axios.get("https://rickandmortyapi.com/api/episode");
    episodes = response.data.results;
    meta = response.data.info;

    return { props: { episodes, meta } };
  } catch (error) {
    console.error(error);
  }
}

export default Index;
