// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  ""
);
import { defineConfig } from "astro/config";
import wyw from "@wyw-in-js/vite";

// Different environments use different variables
const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

const sanityIntegration = (sanity as any).default;

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      wyw({
        include: ["**/*.{ts,tsx}"],
        babelOptions: {
          presets: ["@babel/preset-typescript", "@babel/preset-react"]
        }
      })
    ]
  },
  integrations: [
    sanityIntegration({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "v2022-03-07",
      perspective: "published"
    }),
    react()
  ]
});
