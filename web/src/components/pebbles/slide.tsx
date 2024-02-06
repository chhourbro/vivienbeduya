import React from "react";
import Block from "@components/rocks/block";

interface Props {
  data: Sanity.Production.Schema.Slide | undefined;
}

export default function Slide({ data }: Props) {
  if (!data) return null;

  const { items } = data;

  return (
    <div>
      {items?.map((item, index) => {
        return <Block key={index} data={item} />;
      })}
    </div>
  );
}
