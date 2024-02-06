import { defineField, defineType } from "sanity";
import { FaMicroblog } from "react-icons/fa";

import { label } from "../../utils/helper";

export default defineType({
  name: "latestBlogs",
  title: "Latest/Related Blogs",
  icon: FaMicroblog,
  type: "object",
  fields: [
    label,
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogCategory" }] }],
      description:
        "Displays up to 3 most latest updates from a list of categories, leave blank to display any updates",
    }),
    defineField({
      name: "allBlogsLink",
      description: "Link to view all articles ie.(Blogs page)",
      type: "link",
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: `Latest Articles`,
      };
    },
  },
});
