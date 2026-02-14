"use client";

import { useEffect, useState } from "react";
import { styled } from "@linaria/react";

const SKELETON_DELAY_MS = 1500;

interface Props {
  data: Sanity.CodeBlock;
}

export const Code = ({ data }: Props) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShowContent(true), SKELETON_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  if (!data) return null;

  const skeleton = (
    <SkeletonWrapper>
      <SkeletonLine width="90%" />
      <SkeletonLine />
      <SkeletonLine width="90%" />
      <SkeletonLine />
    </SkeletonWrapper>
  );

  if (!data.code) return skeleton;
  if (!showContent) return skeleton;

  return (
    <Wrapper dangerouslySetInnerHTML={{ __html: data.code as string }} />
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
  width: ${({ width }) => width || "100%"};
  background: linear-gradient(
    90deg,
    #B7B09C 25%,
    color-mix(in srgb, #B7B09C 60%, var(--color-white)) 50%,
    #B7B09C 75%
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