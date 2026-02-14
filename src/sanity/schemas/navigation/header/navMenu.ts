import { formatPreview, selectPreviewArray } from "@flight-digital/sanity-plugin-flightdeck";
import { BiNavigation } from "react-icons/bi";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "headerNavMenu",
  title: "Navigation Menu",
  icon: BiNavigation,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.required().max(20),
    }),
  ],
  preview: {
    select: {
      title: "title",
      ...selectPreviewArray("links", "text", "links", 6),
    },
    prepare({ title, ...links }) {
      const subtitle = Object.values(links).filter(Boolean).join(", ");
      return formatPreview(title, subtitle, "Navigation Menu");
    },
  },
});
