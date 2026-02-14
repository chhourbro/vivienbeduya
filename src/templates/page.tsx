import Blocks from "@/components/blocks/blocks";

interface Props {
  data: Sanity.Page;
  enablePreview?: boolean;
}

const PageTemplate = ({ data, enablePreview }: Props) => {
  return <Blocks data={data?.blocks} enablePreview={enablePreview} />;
};

export default PageTemplate;
