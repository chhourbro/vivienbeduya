"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { styled } from "@linaria/react";

const STAGGER_DELAY_MS = 120;

const EFFECT_VARIANTS = ["slide-up", "slide-left", "slide-right", "fade-scale", "fade"] as const;
type EffectVariant = (typeof EFFECT_VARIANTS)[number];

const BlockStaggerContext = createContext<(() => number) | null>(null);

export const BlockStaggerProvider = ({ children }: { children: ReactNode }) => {
  const indexRef = useRef(0);
  const getNextIndex = () => indexRef.current++;
  return (
    <BlockStaggerContext.Provider value={getNextIndex}>
      {children}
    </BlockStaggerContext.Provider>
  );
};

export const AnimatedBlockWrapper = ({ children }: { children: ReactNode }) => {
  const getNextIndex = useContext(BlockStaggerContext);
  const indexRef = useRef<number | null>(null);
  if (indexRef.current === null && getNextIndex) {
    indexRef.current = getNextIndex();
  }
  const staggerIndex = indexRef.current ?? 0;
  const delayMs = staggerIndex * STAGGER_DELAY_MS;
  const variant: EffectVariant = EFFECT_VARIANTS[staggerIndex % EFFECT_VARIANTS.length];

  const Wrapper = variantWrappers[variant];
  return <Wrapper $delayMs={delayMs}>{children}</Wrapper>;
};

const baseWrapperStyles = `
  animation-delay: var(--delay-ms);
  display: flex;
  width: 100%;
`;

const WrapperSlideUp = styled.div<{ $delayMs: number }>`
  --delay-ms: ${({ $delayMs }) => $delayMs}ms;
  animation: block-slide-up 0.5s ease-out both;
  ${baseWrapperStyles}

  @keyframes block-slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const WrapperSlideLeft = styled.div<{ $delayMs: number }>`
  --delay-ms: ${({ $delayMs }) => $delayMs}ms;
  animation: block-slide-left 0.5s ease-out both;
  ${baseWrapperStyles}

  @keyframes block-slide-left {
    from {
      opacity: 0;
      transform: translateX(24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const WrapperSlideRight = styled.div<{ $delayMs: number }>`
  --delay-ms: ${({ $delayMs }) => $delayMs}ms;
  animation: block-slide-right 0.5s ease-out both;
  ${baseWrapperStyles}

  @keyframes block-slide-right {
    from {
      opacity: 0;
      transform: translateX(-24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const WrapperFadeScale = styled.div<{ $delayMs: number }>`
  --delay-ms: ${({ $delayMs }) => $delayMs}ms;
  animation: block-fade-scale 0.5s ease-out both;
  ${baseWrapperStyles}

  @keyframes block-fade-scale {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const WrapperFade = styled.div<{ $delayMs: number }>`
  --delay-ms: ${({ $delayMs }) => $delayMs}ms;
  animation: block-fade 0.5s ease-out both;
  ${baseWrapperStyles}

  @keyframes block-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const variantWrappers: Record<
  EffectVariant,
  React.ComponentType<{ $delayMs: number; children?: ReactNode }>
> = {
  "slide-up": WrapperSlideUp,
  "slide-left": WrapperSlideLeft,
  "slide-right": WrapperSlideRight,
  "fade-scale": WrapperFadeScale,
  fade: WrapperFade,
};
