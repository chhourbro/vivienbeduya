import { AiOutlineLink } from "react-icons/ai";
import { linkFields } from "../../utils/helper";

export default {
  title: "Link",
  name: "link",
  icon: AiOutlineLink,
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: linkFields(),
};
