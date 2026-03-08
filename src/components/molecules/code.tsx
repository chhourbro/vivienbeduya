"use client";

import {
  useThirdPartyEmbed,
  INSTAGRAM_EMBED_SCRIPT_URL,
  TIKTOK_EMBED_SCRIPT_URL,
} from "@/hooks/useInstagramEmbed";
import Script from "next/script";
import { useEffect, useState } from "react";
import { styled } from "@linaria/react";

const SKELETON_DELAY_MS = 1500;

interface Props {
  data: Sanity.CodeBlock;
}

const Skeleton = () => (
  <SkeletonWrapper>
    <SkeletonLine width="70%" />
    <SkeletonLine width="60%" />
    <SkeletonLine width="90%" />
    <SkeletonLine width="80%" />
    <SkeletonLine width="100%" />
  </SkeletonWrapper>
);

export const Code = ({ data }: Props) => {
  const [showContent, setShowContent] = useState(false);
  const rawCode = data?.code as string | undefined;
  const { isInstagram, isTiktok, html } = useThirdPartyEmbed(rawCode);

  useEffect(() => {
    const id = setTimeout(() => setShowContent(true), SKELETON_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  if (!data) return null;
  if (!rawCode) return <Skeleton />;
  if (!showContent) return <Skeleton />;

  return (
    <>
      {isInstagram && (
        <Script src={INSTAGRAM_EMBED_SCRIPT_URL} strategy="lazyOnload" />
      )}
      {isTiktok && (
        <Script src={TIKTOK_EMBED_SCRIPT_URL} strategy="lazyOnload" />
      )}
      <Wrapper data-lenis-prevent dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 13.5vw;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  min-height: 13.5vw;
  display: flex;
  flex-direction: column;
  gap: 12rwd;
  padding: 16rwd;
  border-radius: 4px;

  @media --base-down {
    gap: 10rwm;
    padding: 12rwm;
  }
`;

const SkeletonLine = styled.div<{ width?: string }>`
  height: 40rwd;
  width: ${({ width }) => width ?? "100%"};
  background: linear-gradient(
    90deg,
    #005d50 25%,
    color-mix(in srgb, #005d50 60%, var(--color-white)) 50%,
    #005d50 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.2s ease-in-out infinite;
  border-radius: 2px;
  opacity: 0.4;

  @media --base-down {
    height: 12rwm;
  }

  @keyframes skeleton-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
