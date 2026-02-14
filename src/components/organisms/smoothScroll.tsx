"use client";

import SmoothScrollComponent from "@flight-digital/flightdeck/boulders/smoothScroll";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathName = usePathname();

  return <SmoothScrollComponent scrollToTopOnChange={pathName} />;
}
