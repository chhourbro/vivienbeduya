import { formatPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaShop } from "react-icons/fa6";
import { defineField, defineType } from "sanity";

/** THIS IS JUST AN EXAMPLE SCHEMA, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY */
export default defineType({
  title: "Example Document",
  name: "exampleDocument",
  type: "document",
  icon: FaShop,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return formatPreview(title, "Example Document");
    },
  },
});
