import type { CodegenConfig } from "@graphql-codegen/cli";

const DEFAULT_TYPESCRIPT_CONFIG = {
  avoidOptionals: true,
  immutableTypes: true,
  maybeValue: `T | null`,
  noExport: true,
  enumsAsTypes: true,
  useTypeImports: true,
  scalars: {
    Date: `string`,
    JSON: `Record<string, unknown>`,
  },
};

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/default`,
  generates: {
    "sanity-types.d.ts": {
      plugins: [
        {
          add: {
            placement: `prepend`,
            content: `/* eslint-disable */\n`,
          },
        },
        {
          add: {
            placement: `prepend`,
            content: `/* prettier-ignore */\n`,
          },
        },
        {
          add: {
            placement: `prepend`,
            content: `declare namespace Sanity {\n`,
          },
        },
        {
          typescript: DEFAULT_TYPESCRIPT_CONFIG,
        },
        {
          add: {
            placement: `append`,
            content: `\n}\n`,
          },
        },
      ],
    },
  },
};

export default config;
