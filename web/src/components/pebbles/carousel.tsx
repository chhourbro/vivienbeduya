import React from "react";
import { styled } from "@linaria/react";
import { Carousel as FlightDeckCarousel } from "@flight-digital/flightdeck";

import Block from "@components/rocks/block";
import { CONTENT_MAX_WIDTH } from "@utils/constants";

interface Props {
  data: Sanity.Production.Schema.Carousel | undefined;
  className?: string;
}

export default function Carousel({ data }: Props) {
  if (!data) return null;
  const { slides, autoplay } = data;
  if (!slides || slides?.length === 0) return null;

  return (
    <Wrapper>
      <FlightDeckCarousel
        settings={{
          autoplay,
          wrapAround: true,
          adaptiveHeight: true,
          adaptiveHeightAnimation: true
          // defaultControlsConfig: {
          //   pagingDotsClassName: "carousel-dot",
          //   pagingDotsStyle: {
          //     padding: "0 30px"
          //   }
          // }
        }}
      >
        {slides?.map((item, index) => {
          return <Block key={index} data={item} />;
        })}
      </FlightDeckCarousel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: ${CONTENT_MAX_WIDTH}px;
  .paging-dot {
    width: 12px;
    height: 12px;
  }

  .slider-control-bottomcenter {
    margin-bottom: -40px;
  }
  .slider-control-centerright {
    margin-right: -100px;
  }
  .slider-control-centerleft {
    margin-left: -100px;
  }
`;
