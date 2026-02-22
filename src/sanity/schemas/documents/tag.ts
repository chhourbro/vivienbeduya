import { defineField, defineType } from "sanity";
import { FaTag } from "react-icons/fa";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: FaTag,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
