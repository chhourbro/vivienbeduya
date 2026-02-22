import FlightRichText from "@flight-digital/flightdeck/rocks/richText";
import { ComponentProps } from "react";
import Link from "../atoms/link";
import { RichTextClient } from "./richTextClient";

interface Props extends Omit<ComponentProps<typeof FlightRichText>, "LinkComponent" | "data"> {
  data?: Sanity.Maybe<Sanity.RichText | Sanity.Heading>;
}

const TRANSLATION_ANNOTATION_TYPE = "translation";

function hasTranslationMark(data: Props["data"]): boolean {
  const raw = data?.blocksRaw ?? (data as { blocks?: unknown[] })?.blocks;
  const blocks = Array.isArray(raw) ? raw : (raw as { blocks?: unknown[] })?.blocks;
  if (!Array.isArray(blocks)) return false;
  for (const block of blocks) {
    const markDefs = (block as { markDefs?: { _type?: string }[] })?.markDefs;
    if (Array.isArray(markDefs)) {
      if (markDefs.some((def) => def?._type === TRANSLATION_ANNOTATION_TYPE)) return true;
    }
  }
  return false;
}

const serverPortableTextComponents = {
  types: { undefined: () => null },
};

const RichText = (props: Props) => {
  const dataWithRaw = { ...props.data, _rawBlocks: props.data?.blocksRaw } as any;

  if (hasTranslationMark(props.data)) {
    return <RichTextClient {...props} data={dataWithRaw} />;
  }

  return (
    <FlightRichText
      {...props}
      data={dataWithRaw}
      LinkComponent={Link}
      portableTextComponents={serverPortableTextComponents}
    />
  );
};

export default RichText;
