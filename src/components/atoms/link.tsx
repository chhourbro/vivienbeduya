"use client";
import FlightLink from "@flight-digital/flightdeck/pebbles/link";
import NextLink from "next/link";
import React, { ComponentProps, useState } from "react";

type DefaultProps = Omit<ComponentProps<typeof FlightLink>, "LinkComponent">;

interface Props extends DefaultProps { }

const ValidLinkProps = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <NextLink {...props} href={props.href ?? ""} scroll={false} />;
};

const Link = (props: Props) => {
  return <FlightLink {...props} LinkComponent={ValidLinkProps} />;
};

export default Link;
