import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "oxsdlhui",
  },
  graphql: [
    {
      id: "production",
      tag: "default",
      workspace: "production",
      playground: false,
    },
    {
      id: "development",
      tag: "default",
      workspace: "development",
      playground: true,
    },
  ],
});
