import { defineType, defineField } from "sanity";

export default defineType({
  title: "SEO",
  name: "seo",
  description:
    "All fields in this block are optional, if left empty will fallback to the global SEO values",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      title: "Page title",
      name: "pageTitle",
      type: "string",
      description: "This title will appear as the title in Google search results",
    }),
    defineField({
      title: "Page description",
      name: "pageDescription",
      type: "text",
      description: "This will appear underneath the title in Google search results",
    }),
    defineField({
      title: "Image",
      name: "ogImage",
      type: "image",
      description: "This image when you share a page on social media",
    }),
    defineField({
      title: "Page key words",
      name: "pageKeyWords",
      description:
        "Relevant keywords that could help with search results: separate by comma and space, e.g. keyword1, keyword2, key..",
      type: "string",
    }),
    defineField({
      name: "jsonLD",
      title: "Structured Markup",
      description:
        "Add JSONLD structured markup below to inject into the seo object on each page. NOTE: Do not add this into the global seo fallback. Markup can be generated here: https://technicalseo.com/tools/schema-markup-generator/",
      type: "code",
      options: {
        language: "json",
      },
    }),
  ],
});
