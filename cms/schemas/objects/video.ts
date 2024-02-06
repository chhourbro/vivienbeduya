import { defineField, defineType } from "sanity";
import { RiVideoFill } from "react-icons/ri";

import UrlIdInput from "../../components/urlIdInput";

export default defineType({
  name: "video",
  title: "Video",
  icon: RiVideoFill,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "imagePreview",
      type: "imageWithMeta",
    }),
    defineField({
      name: "vimeoVideoId",
      type: "string",
      components: { input: UrlIdInput },
      description:
        "NOTE: Just add the id that comes after the prefix shown below, not the whole url.",
      hidden: ({ parent, value }) => Boolean(!value && parent?.youtubeId),
      // @ts-ignore
      option: { prefix: "https://player.vimeo.com/video/" },
    }),
    defineField({
      name: "youtubeId",
      type: "string",
      description:
        "NOTE: Just add the id that comes after the prefix shown below, not the whole url.",
      components: { input: UrlIdInput },
      hidden: ({ parent, value }) => Boolean(!value && parent?.vimeoVideoId),
      // @ts-ignore
      option: { prefix: "https://www.youtube.com/watch?v=" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "imagePreview.asset",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
