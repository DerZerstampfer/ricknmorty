import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

import { useDebounce } from "usehooks-ts";

type Props = {
  children: React.ReactNode;
  fullScreen?: boolean;
  onScrolledToBottom?: () => void;
  onScrolledToBottomWithOffset?: () => void;
};

const Page = ({
  children,
  fullScreen,
  onScrolledToBottom,
  onScrolledToBottomWithOffset,
}: Props) => {
  const [value, setValue] = useState<any>("");
  const [value2, setValue2] = useState<any>("");
  const debouncedValue = useDebounce<any>(value, 50);
  const debouncedValue2 = useDebounce<any>(value2, 50);
  const router = useRouter();

  useEffect(() => {
    addEventListener("scroll", (e) => {
      if (
        Math.round(window.scrollY + window.innerHeight) >=
        Math.round(document.body.scrollHeight)
      ) {
        setValue(e);
      }
      if (
        Math.round(window.scrollY + window.innerHeight * 2) >=
        Math.round(document.body.scrollHeight)
      ) {
        setValue2(e);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof onScrolledToBottom === "function") {
      onScrolledToBottom();
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (typeof onScrolledToBottomWithOffset === "function") {
      onScrolledToBottomWithOffset();
    }
  }, [debouncedValue2]);

  return (
    <div
      className={`min-h-screen ${
        fullScreen ? "h-screen flex flex-grow" : "h-auto"
      } bg-slate-800`}
    >
      <NavBar />
      {children}
      <footer className="bg-[#212329] py-3">
        <p className="text-white  text-center font-semibold">
          Made with ❤️ by{" "}
          <a
            href="https://paukraft.omegalul.co/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-orange-400 duration-100"
          >
            Pau Kraft
          </a>{" "}
          challenged by{" "}
          <a
            href="https://www.sodefa.de/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-orange-400 duration-100"
          >
            Sodefa
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Page;
