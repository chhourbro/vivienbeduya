import FlightRichText from "@flight-digital/flightdeck/rocks/richText";
import { ComponentProps } from "react";
import Link from "../atoms/link";

interface Props extends Omit<ComponentProps<typeof FlightRichText>, "LinkComponent" | "data"> {
  data?: Sanity.Maybe<Sanity.RichText | Sanity.Heading>;
}

const RichText = (props: Props) => {
  return (
    <FlightRichText
      {...props}
      data={{ ...props.data, _rawBlocks: props.data?.blocksRaw } as any}
      LinkComponent={Link}
      portableTextComponents={{
        types: {
          // This is required to avoid the error "Invalid block type: undefined" when using the component builder
          undefined: () => null,
        },
        // Add more custom annotations here, see example below
        // marks: {
        //   caption
        // }
      }}
    />
  );
};

export default RichText;

// Import the ChildreRender component when creating custom annotations and wrap the component to enable preview click/double click to edit
// Import  { ChildrenRender } from "@flight-digital/flightdeck/rocks/richText"

// const caption = ({ children, rootValue }: any) => {
//   return (
//     <ChildrenRender
//       children={children}
//       rootValue={rootValue}
//       callback={(child, childProps) => (
//         <span className="caption" {...childProps}>
//           {child}
//         </span>
//       )}
//     />
//   );
// };
