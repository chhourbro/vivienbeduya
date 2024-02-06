import { StructureToolOptions } from "sanity/structure";

import settings from "./settings";

const BaseDesk: StructureToolOptions = {
  name: "desk",
  title: "Desk",
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        S.documentTypeListItem("page").title("Pages"),
        S.documentTypeListItem("reusableSection").title("Reusable Sections"),
        S.divider(),
        S.documentTypeListItem("blog").title("Blogs"),
        S.documentTypeListItem("blogCategory").title("Blog Categories"),
        S.divider(),
        settings(S),
      ]),
  defaultDocumentNode: (S) => S.document().views([S.view.form()]),
};

export default BaseDesk;
