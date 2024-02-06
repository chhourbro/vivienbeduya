import { IoShareSocial } from "react-icons/io5";
import { defineField, defineType } from "sanity";
import * as icons from "react-icons/fa";

export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  icon: IoShareSocial,
  fields: [
    defineField({
      name: "url",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      title: "Icon",
      name: "icon",
      type: "iconPicker",
      validation: (rule) => rule.required(),
      options: {
        outputFormat: "react",
        providers: ["fa"],
      },
    }),
  ],
  preview: {
    select: {
      title: "url",
      icon: "icon",
    },
    prepare({ title, icon }) {
      const Icon = icons?.[icon?.name as keyof typeof icons];

      return {
        title: (icon?.name ?? "").replace("Fa", ""),
        subtitle: title,
        media: Icon ? <Icon /> : undefined,
      };
    },
  },
});
