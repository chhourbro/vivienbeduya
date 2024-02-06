import { defineType, defineField } from "sanity";
import { AiOutlineMenu } from "react-icons/ai";

export default defineType({
  name: "linkGroup",
  icon: AiOutlineMenu,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});
