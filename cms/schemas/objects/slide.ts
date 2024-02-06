import { defineField, defineType } from "sanity";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

import { slices, label } from "../../utils/helper";

export default defineType({
  name: "slide",
  title: "Slide",
  icon: TfiLayoutSliderAlt,
  type: "object",
  fields: [label, defineField({ name: "items", type: "array", of: slices })],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "Slide",
      };
    },
  },
});
