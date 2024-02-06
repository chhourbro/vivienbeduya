import { defineType, defineField } from "sanity";
import { BsLink, BsCursorText } from "react-icons/bs";

import { blockContentToText, linkFields } from "../../utils/helper";

export default defineType({
  title: "Rich text",
  name: "blockContent",
  icon: BsCursorText,
  type: "object",
  fields: [
    defineField({
      title: "Content",
      name: "blocks",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Underline", value: "underline" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "inlineLink",
                type: "object",
                fields: linkFields(false),
                icon: BsLink,
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      blocks: "blocks",
    },
    prepare({ blocks }) {
      const title = blockContentToText(blocks);
      return {
        title,
        subtitle: "Rich Text",
        media: BsCursorText,
      };
    },
  },
});
