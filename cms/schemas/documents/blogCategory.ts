import { defineType, defineField } from "sanity";
import { BiCategoryAlt } from "react-icons/bi";

export default defineType({
  name: "blogCategory",
  title: "Blog category",
  icon: BiCategoryAlt,
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "categoryId",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "imageWithMeta",
      validation: (Rule: any) => Rule.required(),
    }),
  ],
});
