import { defineField, defineType } from "sanity";
import { TbSection } from "react-icons/tb";
import { createElement } from "react";

import {
  label,
  marginBottom,
  blocks,
  createPaddingField,
  prepareSectionSubtitle,
} from "../../utils/helper";

export default defineType({
  name: "section",
  title: "Section",
  icon: TbSection,
  type: "object",
  fields: [
    label,
    defineField({ name: "anchorId", type: "string", description: "ID for linking an anchor to" }),
    defineField({
      name: "contentBlocks",
      type: "array",
      description: "Add content here",
      of: blocks,
    }),
    defineField({ name: "backgroundColour", type: "color" }),
    createPaddingField("padding", "Adds internal horizontal & vertical spacing to the section"),
    marginBottom,
  ],
  preview: {
    select: {
      title: "label",
      blocks: "contentBlocks",
    },
    prepare({ title, blocks }) {
      const count = blocks?.length;
      const subtitle = prepareSectionSubtitle(blocks);

      return {
        title,
        subtitle,
        media: count ? createElement("strong", null, count.toString()) : TbSection,
      };
    },
  },
});
