import { GrGallery } from "react-icons/gr";
import { defineType, defineField } from "sanity";

import { label } from "../../utils/helper";

const objTitle = "Carousel";

export default defineType({
  title: objTitle,
  name: "carousel",
  icon: GrGallery,
  type: "object",
  fields: [
    label,
    defineField({
      name: "slides",
      type: "array",
      of: [{ type: "slide" }],
    }),
    defineField({
      name: "autoplay",
      type: "boolean",
    }),
    defineField({
      name: "image",
      type: "imageWithMeta",
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: objTitle,
        media: GrGallery,
      };
    },
  },
});
