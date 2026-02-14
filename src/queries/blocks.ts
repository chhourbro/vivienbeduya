import { defineQuery } from "next-sanity";
import {
  accordionFields,
  ctaCardFields,
  imageFields,
  linkFields,
  richTextFields,
} from "./_general";

const defaultBlockFields = defineQuery(`
  _type,
  _key,
  layoutEditor,
  backgroundImage { ${imageFields} },
  classNames,
  customCss
`);

const primitiveBlocksFields = defineQuery(`
  _type,
  _key,
  _type == "codeBlock" => {
    code,
    _key,
    _type
  },
  _type == "button" => {
    ${linkFields}
  },
  _type == "link" => {
    ${linkFields}
  },
  _type == "ctaCard" => {
    ${ctaCardFields}
  },
  _type == "adaptiveImage" => {
    ${imageFields}
  },
  _type == "accordion" => {
    ${accordionFields}
  },
  _type == "buttonsList" => {
    buttons[] { ${linkFields} },
    spaceBetween,
    direction,
    align
  },
  _type == "gap" => {
    amount,
    showSeparator,
    separatorColor
  },
  _type == "richText" => {
    ${richTextFields} 
  }
  // Add your custom primitive objects fields here
  // _type == "customObject" => {
  //   ... 
  // },
`);

const defineBlockQuery = (blockType: string) => (query: string) =>
  defineQuery(`
  _type == "${blockType}" => {
    ${defaultBlockFields},
    ${query}
  }
`);

// FLIGHTDECK DEFAULT BLOCKS QUERIES
const blockParagraphFields = defineBlockQuery("block.paragraph")(
  `
  content { ${richTextFields} }
`,
);

const blockGapFields = defineBlockQuery("block.gap")(
  `
  amount,
  showSeparator,
  separatorColor
`,
);

const blockGridFields = defineBlockQuery("block.grid")(
  `
  gridColumns[] {
    ${defaultBlockFields},
    columnItems[] {
      ${primitiveBlocksFields}
    },
    rowGap,
    columnSize,
    verticalAlign,
    horizontalAlign,
    reverseOnMobile
  },
  fluidGrid,
  columnGap,
  rowGap,
  reverseOnMobile
`,
);

const blockContainerFields = defineBlockQuery("block.container")(
  `
  containerItems[] {
    ${primitiveBlocksFields}
  },
  rowGap,
  reverseOnMobile
`,
);
// ------------------------------

// Add your custom blocks queries below

const blockArticlesListFields = defineBlockQuery("block.articlesList")(
  `
  content { ${richTextFields} }
`,
);

const blocksListFields = defineQuery(`
  ${blockGapFields},
  ${blockParagraphFields},
  ${blockGridFields},
  ${blockContainerFields},
  ${blockArticlesListFields}
`);

const componentFields = defineQuery(`
  _type == "component" => {
    _type,
    _key,
    componentBlueprint -> {
      variables[] { ... },
      blocks[] { ${blocksListFields} }
    },
    values[] {
      ...,
      image { ${imageFields} },
      link { ${linkFields} },
      buttons[] { ${linkFields} },
      ${primitiveBlocksFields},
      _type == "componentPrimitiveValue" => {
        arrayOfObject[] {
          ${primitiveBlocksFields},
        }
      }
    }
  }
`);

// Used for the page query to get the content blocks
export const blocksFields = defineQuery(`
  list[] {
    ${blocksListFields},
    ${componentFields}
  }
`);

// Only for the preview page query
export const componentBuilderPreviewFields = defineQuery(`
  _type,
  _id,
  blocks[] {  ${blocksListFields} }
`);
