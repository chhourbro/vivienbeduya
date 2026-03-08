"use client";

import Image from "@/components/atoms/image";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { useState } from "react";
import Link from "@/components/atoms/link";

interface Props {
  data: Sanity.Maybe<Sanity.Article>;
  className?: string;
}

export const ArticleCard = ({ data, className }: Props) => {
  const [hovered, setHovered] = useState(false);

  const title = data?.title ?? "";
  const description = data?.description ?? "";
  const altTitle = data?.alternativeTitle?.trim() ?? "";
  const altDescription = data?.alternativeDescription?.trim() ?? "";
  const showAlt = hovered && (altTitle || altDescription);
  const hasAlt = !!(altTitle || altDescription);

  console.log("card data", data);

  return (
    <Card
      className={mergeClassNames("article-card", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image data={data?.image} width={500} />
      <TitleBlock>
        <TitleDefault $visible={!hasAlt || !showAlt}>
          <h4 className="article-card__title">{title}</h4>
        </TitleDefault>
        {hasAlt && (
          <TitleAlt $visible={!!showAlt}>
            <h4 className="article-card__title" aria-label={altTitle}>
              {altTitle}
            </h4>
          </TitleAlt>
        )}
      </TitleBlock>
      <DescBlock>
        <DescDefault $visible={!hasAlt || !showAlt}>
          <p className="article-card__description">{description}</p>
        </DescDefault>
        {hasAlt && (
          <DescAlt $visible={!!showAlt}>
            <p className="article-card__description" aria-label={altDescription}>
              {altDescription}
            </p>
          </DescAlt>
        )}
      </DescBlock>

      <Link data={{ slug: data?.slug }} className="violet design">
        Read more
      </Link>
    </Card>
  );
};

const CARD_TRANSITION = "0.35s ease";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16rwd;
  border: 1px solid var(--color-grey, #9fa6a2);
  border-radius: 16rwd;
  padding: 16rwd;
  transition:
    border-color ${CARD_TRANSITION},
    box-shadow ${CARD_TRANSITION},
    transform ${CARD_TRANSITION};

  &:hover {
    border-color: var(--color-black);
    box-shadow: 0 4rwd 20rwd rgba(0, 0, 0, 0.08);
    transform: translateY(-2rwd);
  }

  .image {
    border-radius: 8rwd;
    width: 100%;
    height: 250rwd;
    object-fit: cover;
    transition: border-radius ${CARD_TRANSITION};
  }

  @media --base-down {
    gap: 12rwm;
    padding: 12rwm;
    border-radius: 12rwm;

    .image {
      height: 200rwm;
      border-radius: 6rwm;
    }
  }
`;

const FADE_DURATION = "0.25s ease";

/* Grid: both layers sit in the same cell so row height = max(default, alt) */
const TitleBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const TitleDefault = styled.div<{ $visible: boolean }>`
  grid-column: 1;
  grid-row: 1;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity ${FADE_DURATION};
  min-height: 0;

  .article-card__title {
    margin: 0;
    line-height: 1.2;
  }
`;

const TitleAlt = styled.div<{ $visible: boolean }>`
  grid-column: 1;
  grid-row: 1;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
  transition: opacity ${FADE_DURATION};
  min-height: 0;

  .article-card__title {
    margin: 0;
    line-height: 1.2;
  }
`;

const DescBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const DescDefault = styled.div<{ $visible: boolean }>`
  grid-column: 1;
  grid-row: 1;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity ${FADE_DURATION};
  min-height: 0;

  .article-card__description {
    margin: 0;
  }
`;

const DescAlt = styled.div<{ $visible: boolean }>`
  grid-column: 1;
  grid-row: 1;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? "auto" : "none")};
  transition: opacity ${FADE_DURATION};
  min-height: 0;

  .article-card__description {
    margin: 0;
  }
`;

