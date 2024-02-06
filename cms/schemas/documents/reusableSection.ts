import { defineField, defineType } from "sanity";
import { FaRecycle } from "react-icons/fa";

import { prepareSectionSubtitle } from "../../utils/helper";

export default defineType({
  name: "reusableSection",
  title: "Reusable section",
  icon: FaRecycle,
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      // description:
      //   "NOTE: Make sure you publish this document before referencing it in a page, otherwise it won't show up.",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      title: "Section",
      name: "section",
      type: "section",
      description: "Add a section to be referenced on desired pages",
    }),
  ],
  preview: {
    select: {
      title: "title",
      blocks: "section.contentBlocks",
    },
    prepare({ title, blocks }) {
      const subtitle = prepareSectionSubtitle(blocks);
      return { title, subtitle };
    },
  },
});
