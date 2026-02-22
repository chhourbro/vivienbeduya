"use client";

import FlightRichText from "@flight-digital/flightdeck/rocks/richText";
import { ComponentProps } from "react";
import Link from "../atoms/link";
import { TranslationMark } from "./translationMark";

interface Props extends Omit<ComponentProps<typeof FlightRichText>, "LinkComponent" | "data"> {
  data?: Sanity.Maybe<Sanity.RichText | Sanity.Heading>;
}

export const RichTextClient = (props: Props) => {
  return (
    <FlightRichText
      {...props}
      data={{ ...props.data, _rawBlocks: props.data?.blocksRaw } as any}
      LinkComponent={Link}
      portableTextComponents={{
        types: {
          undefined: () => null,
        },
        marks: {
          translation: (markProps: {
            value?: { text?: string | null } | null;
            children: React.ReactNode;
            rootValue?: unknown;
          }) => <TranslationMark {...markProps} />,
        },
      }}
    />
  );
};
