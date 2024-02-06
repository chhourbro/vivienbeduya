import { defineField, defineType } from "sanity";
import { TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { blockContentToText } from "../../utils/helper";

export default defineType({
  name: "accordion",
  title: "Accordion",
  icon: TfiLayoutAccordionSeparated,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "content",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      content: "content.blocks",
    },
    prepare({ title, content }) {
      const subtitle = blockContentToText(content);
      return {
        title,
        subtitle,
      };
    },
  },
});
