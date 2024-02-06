import { defineField, defineType } from "sanity";
import { VscLink } from "react-icons/vsc";

import { label } from "../../utils/helper";

export default defineType({
  name: "links",
  title: "Links",
  icon: VscLink,
  type: "object",
  fields: [
    label,
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Links",
      };
    },
  },
});
