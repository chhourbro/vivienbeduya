import { StructureBuilder } from "sanity/structure";
import { AiFillSetting, AiOutlineSearch } from "react-icons/ai";
import { RiLayoutTopLine, RiLayoutBottomLine } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";

export const settingDocs = [
  { type: "siteConfig", title: "Site Config", icon: AiOutlineSearch },
  { type: "header", title: "Header", icon: RiLayoutTopLine },
  { type: "footer", title: "Footer", icon: RiLayoutBottomLine },
  { type: "page", title: "404 Page", icon: TbError404, id: "404Page" },
];

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Settings")
    .icon(AiFillSetting)
    .child(
      S.list()
        .title("Settings")
        .items(
          settingDocs.map(({ type, title, icon, id }) =>
            S.listItem()
              .title(title)
              .icon(icon)
              .child(
                S.editor()
                  .title(title)
                  .id(id || type)
                  .schemaType(type)
                  .documentId(id || type)
              )
          )
        )
    );
