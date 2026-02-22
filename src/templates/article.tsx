import Image from "@/components/atoms/image";
import Blocks from "@/components/blocks/blocks";
import { styled } from "@linaria/react";
import { format } from "date-fns";

interface Props {
  data: Sanity.Article;
  enablePreview?: boolean;
}
/**
 * THIS IS JUST AN EXAMPLE TEMPLATE, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY
 */
const ArticleTemplate = ({ data, enablePreview }: Props) => {

  const publishDate = data?.publishDate ? format(new Date(data?.publishDate), "dd MMMM yyyy") : null;
  return (
    <Wrapper>
      <div className="article-title-area">
        <h1 className="title">{data?.title}</h1>
        <div className="article-details">
          <div className="article-date">
            Published on: {publishDate}
          </div>
          <div className="article-tags">
            {data?.tags?.map((tag) => (
              <span key={tag?._key} className="article-tag">{tag?.name}</span>
            ))}
          </div>
        </div>
        {data.image?.desktopImage?.asset ? (
          <div className="image-area">
            <Image data={data?.image} width={1200} loading="eager" />
          </div>
        ) : null}
      </div>
      <div className="article-content-area">
        <Blocks data={data?.blocks} enablePreview={enablePreview} />
      </div>
    </Wrapper>
  );
};

export default ArticleTemplate;

const Wrapper = styled.div`
  .article-title-area {
    padding: 32rwd 128rwd;
    display: flex;
    flex-direction: column;
    gap: 32rwd;
    text-align: center;

    @media --base-down {
      padding: 32rwm var(--theme-page-horizontal-padding);
      gap: 16rwm;
    }

    .title {
      max-width: 80%;
      margin: 0 auto;
      text-align: center;

      @media --base-down {
        max-width: 100%;
      }
    }

    .image-area {
      width: 100%;

      @media --base-down {
        height: 200rwm;
      }

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .article-content-area {
    padding: 32rwd 128rwd;

    p {
      margin: 8rwd 0;
    }
  }
`;
