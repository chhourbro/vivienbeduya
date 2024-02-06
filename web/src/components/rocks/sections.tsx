import React from "react";
import { styled } from "@linaria/react";
import { helpers, mediaQuery } from "@flight-digital/flightdeck";

import Block from "./block";

interface Props {
  data: any[] | undefined;
}
interface SectionProps {
  item: Sanity.Production.Schema.Section | undefined;
}

const Sections = ({ data }: Props) => {
  if (!data) return null;

  return (
    <div>
      {data.map((section, index) => {
        return <SectionWrapper key={index} item={section} />;
      })}
    </div>
  );
};

export const SectionWrapper = ({ item }: SectionProps) => {
  if (!item) return null;

  const { contentBlocks, label, marginBottom, anchorId } = item;
  const className = helpers.marginBottomClass(marginBottom);

  return (
    <StyledSection className={className} id={anchorId || undefined}>
      {contentBlocks?.map((block: any) => <Block key={block?._key} data={block} label={label} />)}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  position: relative;
  .img-wrapper {
    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
    max-width: 1600px;
    margin: 0 auto;
  }

  .borderRadius img {
    border-radius: 25px;
  }
  .rich-text-wrapper {
    margin: 80px auto;
    margin-top: 0;
    position: relative;
  }

  ${mediaQuery.mobileDown} {
    width: 90%;
    margin: auto;
  }
`;

export default Sections;
