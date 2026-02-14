import { desk } from "@flight-digital/sanity-plugin-flightdeck";
import { AiFillSetting } from "react-icons/ai";
import { FaPalette } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { RiDirectionLine, RiLayoutBottomLine, RiLayoutTopLine } from "react-icons/ri";
import { StructureBuilder } from "sanity/structure";

export const docs = [
  { type: "settings", title: "Settings", icon: AiFillSetting },
  { type: "redirect", title: "Redirects", icon: RiDirectionLine, isList: true },
  { type: "theme", title: "Theme", icon: FaPalette },
  { type: "wiki", title: "Wiki", icon: MdHelpOutline },
  { type: "header", title: "Header", icon: RiLayoutTopLine },
  { type: "footer", title: "Footer", icon: RiLayoutBottomLine },
];

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Advanced")
    .icon(AiFillSetting)
    .child(
      S.list()
        .title("Advanced")
        .items([
          ...docs
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(({ type, title, icon, isList }) =>
              isList
                ? desk.multipleListDocuments(S, title, type, icon)
                : desk.singleListDocument(S, title, type, icon),
            ),
        ]),
    );
