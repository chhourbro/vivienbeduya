// -------------- Pages --------------- //
import page from "./pages/page";
import blog from "./pages/blog";

// -------------- Documents --------------- //
import header from "./navigation/header";
import footer from "./navigation/footer";
import siteConfig from "./documents/siteConfig";
import reusableSection from "./documents/reusableSection";
import blogCategory from "./documents/blogCategory";

// -------------- Objects --------------- //
import video from "./objects/video";
import imageWithMeta from "./objects/imageWithMeta";
import blockContent from "./objects/blockContent";
import seo from "./objects/seo";
import link from "./objects/link";
import color from "./objects/color";
import cta from "./objects/cta";
import accordion from "./objects/accordion";
import slide from "./objects/slide";
import socialLink from "./objects/socialLink";
import linkGroup from "./objects/linkGroup";

// -------------- Blocks --------------- //
import section from "./blocks/section";
import columnContent from "./blocks/columnContent";
import hero from "./blocks/hero";
import links from "./blocks/links";
import rowContent from "./blocks/rowContent";
import mediaBgContent from "./blocks/mediaBgContent";
import carousel from "./blocks/carousel";
import allBlogs from "./blocks/allBlogs";
import latestBlogs from "./blocks/latestBlogs";

export default [
  //pages 📄
  page,
  blog,

  // documents 📑
  header,
  footer,
  siteConfig,
  reusableSection,
  blogCategory,

  //objects 📦
  blockContent,
  link,
  imageWithMeta,
  seo,
  color,
  video,
  cta,
  accordion,
  slide,
  socialLink,
  linkGroup,

  // blocks 🧱
  section,
  hero,
  columnContent,
  links,
  rowContent,
  mediaBgContent,
  carousel,
  latestBlogs,
  allBlogs,
];
