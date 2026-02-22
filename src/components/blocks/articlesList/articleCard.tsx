"use client";

import Image from "@/components/atoms/image";
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
import { useEffect, useRef, useState } from "react";

const TYPEWRITER_MS_PER_CHAR = 10;

interface Props {
  data: Sanity.Maybe<Sanity.Article>;
  className?: string;
}

export const ArticleCard = ({ data, className }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [titleLen, setTitleLen] = useState(0);
  const [descLen, setDescLen] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const title = data?.title ?? "";
  const description = data?.description ?? "";
  const altTitle = data?.alternativeTitle?.trim() ?? "";
  const altDescription = data?.alternativeDescription?.trim() ?? "";
  const showAlt = hovered && (altTitle || altDescription);
  const hasAlt = !!(altTitle || altDescription);

  useEffect(() => {
    if (!showAlt) {
      setTitleLen(0);
      setDescLen(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setTitleLen((prev) => (prev >= altTitle.length ? prev : prev + 1));
      setDescLen((prev) => (prev >= altDescription.length ? prev : prev + 1));
    }, TYPEWRITER_MS_PER_CHAR);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showAlt, altTitle.length, altDescription.length]);

  useEffect(() => {
    const done = titleLen >= altTitle.length && descLen >= altDescription.length;
    if (done && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [titleLen, descLen, altTitle.length, altDescription.length]);

  const titleDone = titleLen >= altTitle.length;
  const descDone = descLen >= altDescription.length;

  const altTitleVisible = altTitle.slice(0, titleLen);
  const altDescVisible = altDescription.slice(0, descLen);

  return (
    <Card
      className={mergeClassNames("article-card", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image data={data?.image} width={500} />
      <TitleContent>
        {showAlt ? (
          <h4 className="article-card__title" aria-label={altTitle}>
            {altTitleVisible}
            {!titleDone && <span className="article-card__cursor" aria-hidden>|</span>}
          </h4>
        ) : (
          <h4 className="article-card__title">{title}</h4>
        )}
      </TitleContent>
      <DescContent>
        {showAlt ? (
          <p className="article-card__description" aria-label={altDescription}>
            {altDescVisible}
            {!descDone && <span className="article-card__cursor" aria-hidden>|</span>}
          </p>
        ) : (
          <p className="article-card__description">{description}</p>
        )}
      </DescContent>
    </Card>
  );
};

const CARD_TRANSITION = "0.35s ease";

const Card = styled.article`
  cursor: pointer;
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
    height: 200rwd;
    object-fit: cover;
    transition: border-radius ${CARD_TRANSITION};
  }

  .article-card__cursor {
    display: inline-block;
    margin-left: 2px;
    animation: article-card-cursor-blink 0.7s step-end infinite;
  }

  @keyframes article-card-cursor-blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  @media --base-down {
    gap: 12rwm;
    padding: 12rwm;
    border-radius: 12rwm;

    .image {
      height: 180rwm;
      border-radius: 6rwm;
    }
  }
`;

const TitleContent = styled.div`
  .article-card__title {
    margin: 0;
    line-height: 1.2;
  }
`;


const DescContent = styled.div`
  .article-card__description {
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

