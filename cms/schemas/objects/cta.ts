import { defineField, defineType } from "sanity";

import { BsCardText } from "react-icons/bs";

export default defineType({
  name: "cta",
  title: "Call to action card",
  icon: BsCardText,
  type: "object",
  fields: [
    defineField({
      name: "design",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Bordered", value: "bordered" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "blockContent",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
    defineField({
      name: "image",
      type: "imageWithMeta",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image.asset",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
        subtitle: "CTA",
      };
    },
  },
});
