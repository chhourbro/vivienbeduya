import React from "react";
import type { ComponentProps } from "react";
import { Image as FlightDeckImage } from "@flight-digital/flightdeck";

type FlightImage = Omit<ComponentProps<typeof FlightDeckImage>, "data">;

interface Props extends FlightImage {
  data: SanityImageWithMeta;
  wrapperClassName?: string;
}

const PROJECT_ID = import.meta.env.PUBLIC_SANITY_PROJECT_ID || "";
const DATASET = import.meta.env.PUBLIC_SANITY_DATASET || "";

const Image = ({ data, wrapperClassName, ...rest }: Props) => {
  return (
    <div className={wrapperClassName || "img-wrapper"}>
      <FlightDeckImage data={data} projectId={PROJECT_ID} dataset={DATASET} {...rest} />
    </div>
  );
};

export default Image;
