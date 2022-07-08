import React from "react";

type Props = {
  className?: string;
};

export default function Divider({ className }: Props) {
  return <div className={`border-b-2 border-white w-full ${className}`} />;
}
