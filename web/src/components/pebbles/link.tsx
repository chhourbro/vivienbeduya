import React from "react";
import { styled } from "@linaria/react";

import validateBlockType from "@utils/validateBlockType";

interface Props {
  data: any | undefined;
}

export default function Link({ data }: Props) {
  if (!data) return null;

  if (validateBlockType.isLink(data)) {
    return <LinkResolver data={data} />;
  }

  if (validateBlockType.isLinkGroup(data)) {
    if (!data) return null;
    const { items, title } = data;

    return (
      <div>
        <span>{title}</span>
        <div>
          {items?.map((item, index: number) => {
            return <LinkResolver key={index} data={item} />;
          })}
        </div>
      </div>
    );
  }

  return <a href="/">{data.linkText}</a>;
}

const LinkResolver = ({ data }: Props) => {
  if (!data) return null;
  const { externalLink, internalLink } = data;

  if (internalLink) {
    return <a href={(internalLink as SanityDocument)?.slug?.current}>{data?.linkText}</a>;
  }

  if (externalLink) {
    return (
      <a href={externalLink} target="_blank" rel="noreferrer">
        {data?.linkText}
      </a>
    );
  }

  return <a href="/">{data.linkText || "Link"}</a>;
};

// show links when hovered
const LinkGroup = styled.div``;
