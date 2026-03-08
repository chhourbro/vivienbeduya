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
  const hasAlt = !!(altTitle || altDescription);
  const showAlt = hovered && hasAlt;

  return (
    <Card
      className={mergeClassNames("article-card", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image data={data?.image} width={500} />
      <ContentBlock>
        <FadeLayer $visible={!hasAlt || !showAlt} $isAlt={false}>
          <h4 className="article-card__title">{title}</h4>
        </FadeLayer>
        {hasAlt && (
          <FadeLayer $visible={showAlt} $isAlt>
            <h4 className="article-card__title" aria-label={altTitle}>
              {altTitle}
            </h4>
          </FadeLayer>
        )}
      </ContentBlock>
      <ContentBlock>
        <FadeLayer $visible={!hasAlt || !showAlt} $isAlt={false}>
          <p className="article-card__description">{description}</p>
        </FadeLayer>
        {hasAlt && (
          <FadeLayer $visible={showAlt} $isAlt>
            <p className="article-card__description" aria-label={altDescription}>
              {altDescription}
            </p>
          </FadeLayer>
        )}
      </ContentBlock>

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
  padding: 16rwd;
  transition:
    border-color ${CARD_TRANSITION},
    box-shadow ${CARD_TRANSITION},
    transform ${CARD_TRANSITION};

  &:hover {
    border-color: var(--color-black);
    box-shadow: 0 4rwd 20rwd rgba(0, 0, 0, 0.2);
    transform: translateY(-2rwd);
  }

  .image {
    width: 100%;
    height: 250rwd;
    object-fit: cover;
  }

  .article-card__title {
    margin: 0;
    display: inline;
    color: var(--color-white);
    background: var(--color-violet);
    line-height: 1.4;
    padding: 0 8rwd;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .article-card__description {
    margin: 0;
  }

  @media --base-down {
    gap: 12rwm;
    padding: 12rwm;

    .image {
      height: 200rwm;
    }
  }
`;

const FADE_DURATION = "0.25s ease";

/* Grid: both layers sit in the same cell so row height = max(default, alt) */
const ContentBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const FadeLayer = styled.div<{ $visible: boolean; $isAlt?: boolean }>`
  grid-column: 1;
  grid-row: 1;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) =>
    p.$isAlt ? (p.$visible ? "auto" : "none") : "auto"};
  transition: opacity ${FADE_DURATION};
  min-height: 0;
`;

