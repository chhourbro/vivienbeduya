import React from "react";
import { defineField } from "sanity";
import ColorSelector from "../components/colorSelector";

/**
 *  Check if parent field is present - for hidden functionality
 */
const isParentFieldPresent = (parent: any | undefined, ...fields: string[]): boolean => {
  return fields.some((field) => parent && Boolean(parent[field]));
};

const sizesList = [
  { title: "None", value: "none" },
  { title: "TINY", value: "tiny" },
  { title: "XXS", value: "xxs" },
  { title: "XS", value: "xs" },
  { title: "S", value: "s" },
  { title: "M", value: "m" },
  { title: "L", value: "l" },
  { title: "XL", value: "xl" },
  { title: "XXL", value: "xxl" },
];

// NOTE: Change this to your brand colors
const bgColors = [
  { title: "White", value: "#FFFFFF" },
  { title: "Black", value: "#000000" },
  { title: "Flight Blue", value: "#24468E" },
];

export const label = defineField({
  name: "label",
  description: "For CMS use",
  type: "string",
});

export const sections = [
  { type: "section" },
  { type: "reference", to: [{ type: "reusableSection" }] },
];

// component blocks
export const blocks = [
  { type: "hero", title: "Hero" },
  { type: "imageWithMeta", title: "Image" },
  { type: "blockContent", title: "Rich Text" },
  { type: "columnContent", title: "Columns" },
  { type: "rowContent", title: "Rows" },
  { type: "mediaBgContent", title: "Media Background" },
  { type: "carousel", title: "Carousel" },
  { type: "allBlogs", title: "All Blogs" },
  { type: "latestBlogs", title: "Latest Blogs" },
];

// component slices - used in blocks
export const slices = [
  { type: "imageWithMeta" },
  { type: "blockContent" },
  { type: "links" },
  { type: "cta" },
  { type: "accordion" },
];

export const pages = [{ type: "page" }, { type: "blog" }]; // append your internal pages here;

export const getBlockTitle = (type: string) => {
  const block = blocks.find((block) => block.type === type);
  return block?.title;
};

export const createColorField = (
  params: { name: string; title: string; description?: string },
  list = bgColors
) => {
  const { name, title, description } = params;

  return {
    name,
    title,
    description,
    type: "string",
    components: { input: ColorSelector },
    options: {
      list,
    },
  };
};

export const marginBottom = defineField({
  name: "marginBottom",
  type: "string",
  options: {
    list: sizesList,
  },
  description: "Add some space to the bottom",
});

export const createPaddingField = (name = "padding", description?: string, initialValue?: string) =>
  defineField({
    name,
    description,
    initialValue,
    title: "Padding",
    type: "string",
    options: {
      list: sizesList,
    },
  });

export const linkFields = (notInline = true) => {
  const moreFields = [
    defineField({
      name: "linkText",
      type: "string",
    }),
    defineField({
      name: "internalLink",
      title: "Internal URL",
      description: "URL that links inside of current site",
      type: "reference",
      to: pages,
      hidden: ({ parent, value }) =>
        !value && isParentFieldPresent(parent, "anchorId", "externalLink"),
    }),
  ];

  const defaultFields = [
    defineField({
      name: "externalLink",
      type: "url",
      title: notInline ? "External URL (href)" : "URL",
      description: (
        <>
          {notInline
            ? "URL that links outside of current site:"
            : "Use `/` prefix for internal links, or any of the prefixes below for external links:"}
          <ul>
            <li>https</li>
            <li>http</li>
            <li>mailto</li>
            <li>tel</li>
          </ul>
        </>
      ),
      validation: (rule) => {
        return rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: !notInline,
        });
      },
      hidden: ({ parent, value }) =>
        !value && isParentFieldPresent(parent, "anchorId", "internalLink"),
    }),
    defineField({
      name: "anchorId",
      title: "Anchor ID",
      type: "string",
      description: "Match the id you have assigned to a Section",
      hidden: ({ parent, value }) =>
        !value && isParentFieldPresent(parent, "externalLink", "internalLink"),
    }),
  ];

  if (notInline) return [...moreFields, ...defaultFields];

  return defaultFields;
};

export function blockContentToText(blocks: any, opts = {}) {
  const block = (blocks || []).find((block: any) => block._type === "block");

  return block
    ? block.children
        .filter((child: any) => child?._type === "span")
        .map((span: any, index: number) => {
          if (index === 4) return "...";
          return span?.text;
        })
        .join("")
    : undefined;
}

export const pageFields = [
  defineField({
    name: "seo",
    title: "SEO",
    type: "seo",
  }),
  defineField({
    name: "title",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "slug",
    type: "slug",
    description: "Can be generated from page title",
    options: {
      source: "title",
    },
    validation: (Rule) => Rule.required(),
  }),
];

export const prepareSectionSubtitle = (sectionBlocks: any[]) => {
  return sectionBlocks
    ?.map((block) => {
      const blockTitle = getBlockTitle(block._type);
      if (!blockTitle) return;
      return blockTitle;
    })
    .filter(Boolean)
    .join(" | ");
};
