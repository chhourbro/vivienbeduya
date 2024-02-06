import React from "react";
import { styled } from "@linaria/react";
import { BlockContent as FlightDeckBlockContent } from "@flight-digital/flightdeck";

interface Props {
  data: SanityBlockContent | undefined;
  className?: string;
}

const BlockContent = ({ data, className }: Props) => {
  if (data == null) return null;

  const content: any = data.blocks || data._rawBlocks || data;

  const portableTextComponents = {
    // types: {
    //   link
    // },
    marks: {
      inlineLink
    }
  };

  return (
    <BlockContentWrapper className={className}>
      <FlightDeckBlockContent
        data={content}
        portableTextComponents={portableTextComponents as any}
      />
    </BlockContentWrapper>
  );
};

const inlineLink = ({ value, children }: any) => {
  if (!value) return null;
  const { externalLink } = value;
  const shouldBeInternal = externalLink?.startsWith("/");
  if (shouldBeInternal) {
    return <a href={externalLink?.slice(1)}>{children}</a>;
  }

  if (externalLink) {
    return (
      <a href={externalLink} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <a href={externalLink}>{children}</a>;
};

const BlockContentWrapper = styled.div`
  margin: 0 auto;
  .rich-text {
    p u {
      text-decoration: underline;
      svg {
        display: none;
      }
    }
  }
`;

export default BlockContent;
