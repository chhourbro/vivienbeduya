"use client";

import NextSanityStudio from "@flight-digital/flightdeck/boulders/nextSanityStudio";

// Update the logo and colors for your project
const StudioComponent = () => {
  return (
    <NextSanityStudio
      sanityConfigLoader={() => import("../../../../sanity.config")}
      loadingLogoUrl="https://cdn.sanity.io/images/2z9jovvw/production/fbffbfb3023a8908d9b1ba00b0b6e3637c0b643f-408x123.png?auto=format&fit=max&q=75&w=408"
    />
  );
};

export default StudioComponent;
