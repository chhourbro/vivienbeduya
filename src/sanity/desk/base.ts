import { desk } from "@flight-digital/sanity-plugin-flightdeck";
import { ComponentIcon } from "@sanity/icons";
import { MdOutlineArticle } from "react-icons/md";
import { StructureToolOptions } from "sanity/structure";
import settings from "./settings";

const baseStructure: StructureToolOptions = {
  name: "desk",
  title: "Desk",
  structure: (S) =>
    S.list()
      .title("Content")
      .items([
        desk.multipleListDocuments(S, "Pages", "page"),
        desk.multipleListDocuments(S, "Articles", "article", MdOutlineArticle),
        S.divider(),
        desk.multipleListDocuments(S, "Components", "componentBlueprint", ComponentIcon),
        settings(S),
      ]),
};

export default baseStructure;
