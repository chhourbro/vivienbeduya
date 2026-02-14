import { formatPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { ImCoinDollar } from "react-icons/im";
import { defineField, defineType } from "sanity";

/** THIS IS JUST AN EXAMPLE SCHEMA, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY */
export default defineType({
  name: "exampleObject",
  title: "Example Object",
  icon: ImCoinDollar,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "design",
      type: "string",
      options: {
        list: [
          {
            title: "Default",
            value: "default",
          },
          {
            title: "Banner And Buttons",
            value: "bannerAndButtons",
          },
        ],
      },
      initialValue: "default",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return formatPreview(title, "Example Object");
    },
  },
});
