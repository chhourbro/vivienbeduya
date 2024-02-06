import { defineType, defineField } from "sanity";
import { PiArticleMediumBold } from "react-icons/pi";

import { pageFields, slices } from "../../utils/helper";

export default defineType({
  name: "blog",
  title: "Blog",
  icon: PiArticleMediumBold,
  type: "document",
  fields: [
    ...pageFields,
    defineField({
      name: "publishDate",
      type: "datetime",
      initialValue: () => {
        const now = new Date();
        return now.toISOString();
      },
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "textAlign",
      description: "Change text alignment of page",
      type: "string",
      options: { list: ["left", "center", "right"] },
      initialValue: "left",
    }),
    defineField({
      name: "contentBlocks",
      type: "array",
      of: [...slices, { type: "reference", to: [{ type: "reusableSection" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "seo.ogImage.asset",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
