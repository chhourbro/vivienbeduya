import { MdOutlineArticle } from "react-icons/md";
import { RiMenuSearchLine, RiPagesLine, RiSettings3Line } from "react-icons/ri";

export const fieldgroups = {
  pageSettings: { name: "pageSettings", title: "Page Settings", icon: RiSettings3Line },
  seo: { name: "seo", title: "SEO", icon: RiMenuSearchLine },
  articleDetails: { name: "articleDetails", title: "Details", icon: MdOutlineArticle },
  content: { name: "content", title: "Content", icon: RiPagesLine },
};

export const spaceOptions = [
  { title: "X Small (8 units)", value: "8" },
  { title: "Small (16 units)", value: "16" },
  { title: "Medium (32 units)", value: "32" },
  { title: "Large (64 units)", value: "64" },
  { title: "X Large (128 units)", value: "128" },
  { title: "XX Large (192 units)", value: "192" },
  { title: "XXX Large (256 units)", value: "256" },
];
