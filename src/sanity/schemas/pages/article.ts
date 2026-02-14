import sharedFields from "@/sanity/utils/sharedFields";
import { formatPagePreview } from "@flight-digital/sanity-plugin-flightdeck";
import { MdOutlineArticle } from "react-icons/md";
import { defineField, defineType } from "sanity";
import { fieldgroups } from "../../utils/constants";

/** THIS IS JUST AN EXAMPLE SCHEMA, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY */
export default defineType({
  title: "Article",
  name: "article",
  type: "document",
  icon: MdOutlineArticle,
  groups: [
    fieldgroups.pageSettings,
    fieldgroups.seo,
    fieldgroups.articleDetails,
    { ...fieldgroups.content, default: true },
  ],
  fields: [
    ...sharedFields.defaultPageFields({
      // prefixPageId: "a8928378-7726-4d6a-b80c-ce4e8ed2899e", Use to set a fixed prefix page id for the article
      noBlocks: true,
    }),
    defineField({
      name: "publishDate",
      type: "date",
      initialValue: new Date().toISOString().slice(0, 10),
      options: {
        dateFormat: "DD/MM/YYYY",
      },
      validation: (Rule) => Rule.required(),
      group: fieldgroups.articleDetails.name,
    }),
    defineField({
      name: "content",
      type: "richText",
      group: fieldgroups.content.name,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: formatPagePreview(null, { publishDate: "publishDate" }, (props) => ({
    title: props.label || props.title,
    subtitle: `${props.publishDate} | ${props.formattedSlug}`,
  })),
});
