import { defineType, defineField } from "sanity";
import { RiLayoutBottomLine } from "react-icons/ri";

export default defineType({
  title: "Footer",
  name: "footer",
  icon: RiLayoutBottomLine,
  type: "document",
  fields: [
    defineField({
      title: "Add fields here",
      name: "fields",
      type: "string",
    }),
  ],
});
