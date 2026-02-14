"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import flightDeckPlugin from "./flightdeck";
import baseStructure from "./src/sanity/desk/base";
import schemas from "./src/sanity/schemas";
import { siteName } from "./src/utils/constants";

const devOnlyPlugins = [visionTool()];

const defaultPlugins = [structureTool(baseStructure), flightDeckPlugin];

export default defineConfig({
  basePath: "/admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  title: siteName,
  schema: {
    types: schemas,
  },
  plugins: [...defaultPlugins, ...(isDev ? devOnlyPlugins : [])],
});
