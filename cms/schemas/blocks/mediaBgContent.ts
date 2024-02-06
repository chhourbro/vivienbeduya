import { BsFileRichtext } from "react-icons/bs";
import { defineType, defineField } from "sanity";

import { blockContentToText, label } from "../../utils/helper";

const objTitle = "Media Background Content";

export default defineType({
  title: objTitle,
  name: "mediaBgContent",
  icon: BsFileRichtext,
  type: "object",
  fields: [
    label,
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "text",
      type: "blockContent",
    }),
    defineField({
      name: "media",
      type: "array",
      of: [{ type: "imageWithMeta" }, { type: "video" }],
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: "links",
      type: "links",
    }),
  ],
  preview: {
    select: {
      title: "text.blocks",
      media: "images.0.asset",
    },
    prepare({ title, media }) {
      return {
        title: blockContentToText(title),
        media: media || BsFileRichtext,
        subtitle: objTitle,
      };
    },
  },
});
