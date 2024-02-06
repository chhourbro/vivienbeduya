import { Config, defineConfig, PluginOptions } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { dashboardTool, projectUsersWidget, projectInfoWidget } from "@sanity/dashboard";
import { iconPicker } from "sanity-plugin-icon-picker";
import { media } from "sanity-plugin-media";

import schemaTypes from "./schemas";
import base from "./desk/base";
import { createElement } from "react";

const noDuplicateDocs = ["header", "footer", "siteConfig", "404Page"];

const defaultPlugins: PluginOptions[] = [
  structureTool(base),
  codeInput(),
  iconPicker(),
  media(),
  visionTool(),
  dashboardTool({
    widgets: [projectInfoWidget(), projectUsersWidget()],
  }),
];

const defaultConfig: Config = {
  projectId: "d04927oe",
  dataset: "production",
  name: "production",
  title: "Vivien Beduya 🌼",
  basePath: "/production",
  schema: {
    types: schemaTypes,
  },
  icon: createElement("img", {
    src: "/static/logo.jpg",
    alt: "brand-logo",
    height: "100%",
    width: "100%",
    style: {
      background: "black",
    },
  }) as any,
  // document settings
  document: {
    // Turn off default actions for Singleton documents
    actions: (prev, context) => {
      if (!noDuplicateDocs.includes(context.documentId || "")) return prev;
      return prev.filter(
        (originalAction) =>
          !["duplicate", "delete", "unpublish"].includes(originalAction.action || "")
      );
    },
    // Change initial document templates here
    newDocumentOptions: (prev, { currentUser, creationContext }) => {
      if (creationContext.schemaType && !noDuplicateDocs.includes(creationContext.schemaType))
        return prev;
      return [];
    },
  },
  plugins: defaultPlugins,
};

export default defineConfig(defaultConfig);
