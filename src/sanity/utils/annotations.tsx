// Create your custom annotation components here and use in the flightdeck plugin config

import { BlockDecoratorProps } from "sanity";

const Uppercase = (props: BlockDecoratorProps) => {
  return <span style={{ backgroundColor: "pink" }}>{props.children}</span>;
};

const annotations = {
  Uppercase,
};

export default annotations;
