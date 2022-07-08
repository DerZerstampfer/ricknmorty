import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <p className="">Home Page</p>
      <Link href="/episode">Episodes</Link>
      <Link href="/character">Character</Link>
    </div>
  );
};

export default Home;
