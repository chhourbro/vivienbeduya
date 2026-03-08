"use client";

import NextSanityStudio from "@flight-digital/flightdeck/boulders/nextSanityStudio";

// Update the logo and colors for your project
const StudioComponent = () => {
  return (
    <NextSanityStudio
      sanityConfigLoader={() => import("../../../../sanity.config")}
      loadingLogoUrl="https://cdn.sanity.io/images/bm3737yn/production/0cf15d9cab6fa84ddd0b37e5d66a6fb9aebf1287-2000x2000.png?auto=format&fit=max&q=75&w=408"
    />
  );
};

export default StudioComponent;
