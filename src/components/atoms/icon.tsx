import IconBuilder from "@flight-digital/flightdeck/pebbles/iconBuilder";

export const IconHamburger = (props: IconBuilderProps) => (
  <IconBuilder {...props} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBuilder>
);

export const IconClose = (props: IconBuilderProps) => (
  <IconBuilder {...props} width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 12L12 4M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBuilder>
);

export const IconArrowRight = (props: IconBuilderProps) => (
  <IconBuilder {...props} width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6.75 9.75L10.5 6M10.5 6L6.75 2.25M10.5 6H1.5" stroke="currentColor" />
  </IconBuilder>
);
