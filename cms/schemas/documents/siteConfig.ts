import { defineType, defineField } from "sanity";

export default defineType({
  title: "Site Config",
  name: "siteConfig",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      title: "Default SEO",
      name: "defaultSEO",
      description: "Global fallback SEO",
      type: "seo",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
  ],
});
