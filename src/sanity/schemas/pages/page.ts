import sharedFields from "@/sanity/utils/sharedFields";
import { formatPagePreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaRegFile } from "react-icons/fa6";
import { defineType } from "sanity";
import { fieldgroups } from "../../utils/constants";

export default defineType({
  title: "Page",
  name: "page",
  type: "document",
  icon: FaRegFile,
  groups: [fieldgroups.pageSettings, fieldgroups.seo, { ...fieldgroups.content, default: true }],
  fields: sharedFields.defaultPageFields({ notListable: true }),
  preview: formatPagePreview(),
});
