import { imageWithMetaOptions } from "@flight-digital/sanity-plugin-flightdeck";
import { defineField } from "sanity";
import { fieldgroups } from "./constants";

interface AnyPageProps {
  /** Set to true if your page will not be used in a pages list (e.g. articles list), this will hide the description and image */
  notListable?: boolean;
  /** Set an initial prefix page ID when creating a new page in the CMS */
  prefixPageId?: string;
  noBlocks?: boolean;
}

const defaultPageFields = (props?: AnyPageProps) => [
  defineField({
    name: "title",
    type: "string",
    group: fieldgroups.pageSettings.name,
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    title: "Excerpt",
    name: "description",
    type: "text",
    rows: 3,
    hidden: props?.notListable,
    group: fieldgroups.pageSettings.name,
    // limit the length to 150 characters
    validation: (Rule) =>
      Rule.max(150).warning("The excerpt should be no more than 150 characters"),
  }),
  defineField({
    name: "slug",
    title: "Page URL",
    initialValue: props?.prefixPageId
      ? {
          prefix: {
            _type: "reference",
            _ref: props?.prefixPageId ?? "",
          },
        }
      : undefined,
    type: "slugWithPrefix",
    validation: (Rule) => Rule.required(),
    group: fieldgroups.pageSettings.name,
  }),
  defineField({
    name: "image",
    title: "Preview image",
    type: "adaptiveImage",
    description: "Image displayed when the page is used in a list",
    hidden: props?.notListable,
    options: {
      ...imageWithMetaOptions,
      disableImageSettings: true,
      disableMobileImage: true,
    },
    group: fieldgroups.pageSettings.name,
  }),
  defineField({
    name: "label",
    description: "Optional, for CMS use only",
    type: "string",
    group: fieldgroups.pageSettings.name,
  }),
  defineField({
    name: "seo",
    title: "SEO",
    type: "seo",
    group: fieldgroups.seo.name,
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "blocks",
    type: "blocks",
    hidden: props?.noBlocks,
    group: fieldgroups.content.name,
  }),
];

const sharedFields = { defaultPageFields };

export default sharedFields;
