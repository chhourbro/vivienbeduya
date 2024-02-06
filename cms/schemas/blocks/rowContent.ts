import { defineField, defineType } from "sanity";

import { BsThreeDots } from "react-icons/bs";
import { slices, label } from "../../utils/helper";

export default defineType({
  name: "rowContent",
  title: "Row Content",
  icon: BsThreeDots,
  type: "object",
  fields: [
    label,
    defineField({ name: "rowItems", type: "array", of: slices }),
    defineField({
      name: "gridLayout",
      description: "Change the layout to form a grid pattern",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "label",
      media: "image.asset",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Rows",
        media: BsThreeDots,
      };
    },
  },
});
