import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { HTMLAttributes, ReactNode } from "react";
import Image from "../atoms/image";
import Link from "../atoms/link";
import RichText from "./richText";

interface Props extends HTMLAttributes<HTMLDivElement> {
  data?: Sanity.Maybe<Sanity.CtaCard>;
}

interface WrapperProps {
  children: ReactNode;
  link?: Sanity.Maybe<Sanity.LinkWithoutText>;
}

const InnerWrapper = ({ children, link }: WrapperProps) => {
  if (link?.internalLink || link?.externalLink || link?.anchorId) {
    return (
      <Link
        className="inner-wrapper"
        data={{ ...link, design: null, startIcon: null, endIcon: null }}
      >
        {children}
      </Link>
    );
  }
  return <div className="inner-wrapper">{children}</div>;
};

const CtaCard = ({ data, ...props }: Props) => {
  if (!data) return null;
  return (
    // Add to the mergeClassNames if you have design options in the CMS (e.g. `design-${data?.design}`)
    <Wrapper className={mergeClassNames("cta-card")} {...props}>
      <InnerWrapper link={data?.link}>
        <div className="cta-image-area" data-sanity-path="image">
          <Image data={data?.image} width={500} />
        </div>
        <div className="cta-content-area">
          {data?.title && (
            <h3
              className={mergeClassNames("cta-title", "h4")}
              data-sanity-path="title"
              data-sanity-editable
            >
              {data?.title}
            </h3>
          )}
          <RichText data={data?.content} className="cta-description" data-sanity-path="content" />
          {data?.buttons?.length ? (
            <div className="cta-buttons" data-sanity-path="buttons">
              {data?.buttons?.map((btn) => (
                <Link
                  data={btn}
                  key={btn?._key}
                  data-sanity-editable="text"
                  data-sanity-path={`{${btn?._key}}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default CtaCard;

const Wrapper = styled.div`
  .inner-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16rwd;

    @media --base-down {
      gap: 16rwm;
    }
  }

  .cta-image-area {
    width: 100%;
    height: 220rwd;
    @media --base-down {
      height: 180rwm;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .cta-content-area {
    display: flex;
    flex-direction: column;
    gap: 16rwd;

    @media --base-down {
      gap: 16rwm;
    }
  }

  .cta-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .cta-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8rw;

    svg {
      display: block;
    }
  }
`;
