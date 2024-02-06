import { BsCardHeading } from "react-icons/bs";
import { defineType, defineField } from "sanity";

import { blockContentToText, marginBottom } from "../../utils/helper";

const objTitle = "Hero";

export default defineType({
  title: objTitle,
  name: "hero",
  icon: BsCardHeading,
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: "heroContent",
      type: "blockContent",
    }),
    defineField({
      name: "backgroundImage",
      type: "array",
      of: [{ type: "imageWithMeta" }],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: "links",
      type: "links",
      options: { collapsible: true, collapsed: true },
    }),
    marginBottom,
  ],
  preview: {
    select: {
      title: "heroContent.blocks",
      media: "backgroundImage.asset",
    },
    prepare({ title, media }) {
      return {
        title: blockContentToText(title),
        subtitle: objTitle,
        media: media ?? BsCardHeading,
      };
    },
  },
});
