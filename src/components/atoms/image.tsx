import FlightImage from "@flight-digital/flightdeck/pebbles/image";
import { ComponentProps } from "react";

type DefaultProps = ComponentProps<typeof FlightImage>;

interface Props extends DefaultProps {
  data?: Sanity.Maybe<Partial<Sanity.AdaptiveImage>>;
}

const Image = (props: Props) => {
  return <FlightImage {...props} data={props.data} useAssetAltText />;
};

export default Image;
