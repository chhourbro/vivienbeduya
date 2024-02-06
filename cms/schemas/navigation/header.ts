import { defineType, defineField } from "sanity";
import { RiLayoutTopLine } from "react-icons/ri";

export default defineType({
  title: "Header",
  name: "header",
  icon: RiLayoutTopLine,
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "imageWithMeta",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});
