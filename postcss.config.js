module.exports = async () => {
  const { default: flightdeck } = await import("@flight-digital/flightdeck/postCssPlugin");
  return {
    plugins: [
      flightdeck({
        baseBreakpoint: 768, // If you change this, you need to change the mobileBreakpoint in @/utils/constants.ts,
      }),
    ],
  };
};
