import { defineField, defineType } from "sanity";

import { BsPostcard } from "react-icons/bs";

import { slices, label } from "../../utils/helper";

export default defineType({
  name: "columnContent",
  title: "Columns",
  icon: BsPostcard,
  type: "object",
  fields: [
    label,
    defineField({ name: "firstColumn", type: "array", of: slices }),
    defineField({ name: "secondColumn", type: "array", of: slices }),
    defineField({
      name: "flipColumns",
      type: "boolean",
      description: "Reverse the order of the columns",
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Columns",
        media: BsPostcard,
      };
    },
  },
});
