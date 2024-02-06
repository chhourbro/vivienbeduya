import React from "react";
import { ErrorMsg } from "@flight-digital/flightdeck";
import validateBlockType from "@utils/validateBlockType";

import Image from "@components/pebbles/image";
import BlocksContent from "@components/pebbles/blockContent";
import Carousel from "@components/pebbles/carousel";
import Slide from "@components/pebbles/slide";

interface BlockProps {
  data: any;
  label?: Maybe<string>;
}

const Block = ({ data, label }: BlockProps) => {
  if (!data) return null;

  if (validateBlockType.isImageWithMeta(data)) {
    return <Image data={data} />;
  }

  if (validateBlockType.isBlockContent(data)) {
    return <BlocksContent data={data} className="rich-text-wrapper" />;
  }

  if (validateBlockType.isCarousel(data)) {
    return <Carousel data={data} />;
  }

  if (validateBlockType.isSlide(data)) {
    return <Slide data={data} />;
  }

  return <ErrorMsg msg={`Error with: ${label}, ${data._type}`} data={data} />;
};

export default Block;
