import { defineField, defineType } from "sanity";
import { FaCode } from "react-icons/fa";

export default defineType({
  name: "codeBlock",
  title: "Code",
  icon: FaCode,
  type: "object",
  fields: [
    defineField({
      name: "code",
      type: "code",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
