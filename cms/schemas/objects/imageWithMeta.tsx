import React from "react";
import { defineField, defineType } from "sanity";
import { BiImage } from "react-icons/bi";
import { createPaddingField } from "../../utils/helper";

// keep this as generic as possible, if you need to expand on image fields, create a new type
export default defineType({
  title: "Image",
  name: "imageWithMeta",
  icon: BiImage,
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      title: "Alt Text",
      name: "altText",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    createPaddingField(),
    defineField({
      name: "objectFit",
      title: "Object Fit",
      description: (
        <>
          Object fit is automatically set depending on the component the image is rendered in, only
          set this if you want to override the default behaviour. You can read more about object-fit{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </>
      ),
      type: "string",
      options: {
        list: [
          { title: "Cover", value: "cover" },
          { title: "Contain", value: "contain" },
          { title: "Fill", value: "fill" },
          { title: "Scale down", value: "scale-down" },
        ],
      },
    }),
  ],
});
