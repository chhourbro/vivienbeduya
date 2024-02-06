import { defineField, defineType } from "sanity";
import { FaBlog } from "react-icons/fa";

export default defineType({
  name: "allBlogs",
  title: "All Blogs",
  icon: FaBlog,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Displays all blogs in a grid",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: `All Blogs`,
      };
    },
  },
});
