import ArticleTemplate from "@/templates/article";
import PageTemplate from "@/templates/page";
import validateType from "@/utils/validateType";
import Blocks from "../blocks/blocks";

const TemplateRenderer = ({
  data,
  enablePreview,
}: {
  data: AllPagesData | Sanity.ComponentBlueprint;
  enablePreview?: boolean;
}) => {
  if (validateType.isComponentBlueprint(data))
    return <Blocks data={{ list: data.blocks }} enablePreview={enablePreview} />;
  if (validateType.isArticle(data)) return <ArticleTemplate data={data} enablePreview={enablePreview} />;
  return <PageTemplate data={data} enablePreview={enablePreview} />;
};

export default TemplateRenderer;
