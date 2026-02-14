"use client";

import FlightAccordion from "@flight-digital/flightdeck/pebbles/accordion";
import { styled } from "@linaria/react";
import RichText from "./richText";

interface Props {
  data?: Maybe<Sanity.Accordion>;
  title?: Maybe<string>;
  content?: Maybe<any>;
}
const Accordion = ({ data, title, content }: Props) => {
  return (
    <StyledAccordion
      title={
        <p data-sanity-editable className="h5">
          {data?.title || title}
        </p>
      }
      openByDefault={Boolean(data?.openByDefault)}
      className="accordion"
    >
      <RichText data={data?.content || content} className="accordion-content" />
    </StyledAccordion>
  );
};

export default Accordion;

const StyledAccordion = styled(FlightAccordion)``;
