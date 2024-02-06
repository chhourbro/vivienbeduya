import { defineType, defineField } from "sanity";
import { RiPagesLine } from "react-icons/ri";
import { BiHomeHeart } from "react-icons/bi";
import { GrArticle } from "react-icons/gr";

import { sections, pageFields } from "../../utils/helper";

const Page = defineType({
  name: "page",
  title: "Page",
  icon: RiPagesLine,
  type: "document",
  fields: [
    ...pageFields,
    defineField({
      title: "Sections",
      name: "sections",
      type: "array",
      of: sections,
      // description:
      //   "NOTE: If the preview is taking a long time to show your updates - try clicking the 🔄 button, or refresh the page",
    }),
  ],
  preview: {
    select: {
      media: "seo.ogImage.asset",
      title: "title",
      slug: "slug.current",
    },
    prepare({ media, title, slug }) {
      const icon = () => {
        if (slug === "/") return BiHomeHeart;
        if (slug === "blogs") return GrArticle;
        return media;
      };

      return {
        title: title,
        media: icon(),
      };
    },
  },
});

export default Page;
