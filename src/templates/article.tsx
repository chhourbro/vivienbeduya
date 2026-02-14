import Image from "@/components/atoms/image";
import RichText from "@/components/molecules/richText";
import { styled } from "@linaria/react";

interface Props {
  data: Sanity.Article;
}
/**
 * THIS IS JUST AN EXAMPLE TEMPLATE, PLEASE DELETE THIS FILE IF YOU DON'T NEED IT OR MODIFY IT ACCORDINGLY
 */
const ArticleTemplate = ({ data }: Props) => {
  return (
    <Wrapper>
      <div className="article-title-area">
        <h1 className="title">{data?.title}</h1>
        {data.image?.desktopImage?.asset ? (
          <div className="image-area">
            <Image data={data?.image} width={1200} loading="eager" />
          </div>
        ) : null}
      </div>
      <div className="article-content-area">
        <RichText data={data?.content} />
      </div>
    </Wrapper>
  );
};

export default ArticleTemplate;

const Wrapper = styled.div`
  .article-title-area {
    padding: 64rwd 135rwd;
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
      height: 560rwd;

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
    padding: 64rwd var(--theme-page-horizontal-padding);
  }
`;
