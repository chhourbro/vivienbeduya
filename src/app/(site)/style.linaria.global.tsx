import { css } from "@linaria/core";

export const globals = css`
  :global() {
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      --color-black: #2E2A2B;
      --color-white: #ffffff;
      --color-blue: #0000ff;
      --color-dull: #9FA6A2;

      --font-primary: "Roboto", Arial, system-ui, "Open Sans", sans-serif;
      --font-secondary: "Wittgenstein", Arial, system-ui, "Open Sans", sans-serif;
      --font-weight-regular: 400;
      --font-weight-bold: 600;

      --theme-page-horizontal-padding: 0;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      font-family: var(--font-primary);
      font-size: 10rwd;
      font-weight: var(--font-weight-regular);
      background-color: var(--color-white);
      color: var(--color-black);
      line-height: 1.3;
      min-height: 100dvh;

      .modal{
        z-index: 1000;
      }

      .popup-content {
        padding: 80rwd 60rwd;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 40rwd;

        p {
          font-size: 14rwd;
        }

        .logo {
          width: 250rwd;
          margin: auto;
        }
      }

      .popup-button {
        text-decoration: underline;
        color: var(--color-dull);
        cursor: pointer;
      }

      .close-button {
        width: 30rwd;
        height: 30rwd;
      }

      main, .grid-wrapper {
        min-height: 100dvh;
      }

      hr {
        border-color: #9FA6A2 !important;
      }

      .grid-column {
        justify-content: center;
        background-position: bottom;
      }

      @media (max-width: 1200px) {
        .grid-column {
          padding: 0 32rwd !important;
        }
      }

      @media --base-down {
        --theme-page-horizontal-padding: 0;
        font-size: 15rwm;
        .popup-content .logo {
          width: 200rwm;
        }
        .popup-content {
          padding: 64rwm 16rwm;
        }
        .grid-column {
          padding: 64rwm 16rwm !important;
        }
      }

      script {
        display: none !important;
      }

      strong,
      b {
        font-weight: var(--font-weight-bold);
      }

      img {
        display: block;
        height: auto;
        max-width: 100%;
        width: 100%;
      }

      ul,
      ol {
        padding-left: 24rwd;

        @media --base-down {
          padding-left: 16rwm;
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      a,
      button,
      select,
      input,
      textarea {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        color: inherit;
        display: block;
        margin: 0;
        padding: 0;
      }

      input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        &[type="number"] {
          -moz-appearance: textfield;
        }
      }


      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-secondary);
      }

      h1,
      .h1,
      h2,
      .h2,
      h3,
      .h3,
      h4,
      .h4,
      h5,
      .h5,
      h6,
      .h6 {
        font-weight: var(--font-weight-regular);
        line-height: 1; 
      }

      h6, h4 {
        line-height: 0.9;
      }

      .h1,
      h1 {
        font-size: 59rwd;
      }

      .h2,
      h2 {
        font-size: 56rwd;
      }

      .h3,
      h3 {
        font-size: 40rwd;
      }

      .h4,
      h4 {
        font-size: 30rwd;
      }

      .h5,
      h5 {
        font-size: 24rwd;
      }

      .h6,
      h6 {
        font-size: 16rwd;
      }

      p,
      .p {
        font-size: 11rwd;
      }

      small,
      .small {
        font-size: 13rwd;
        line-height: 1;
      }

      @media --base-down {
        .h1,
        h1 {
          font-size: 36rwm;
        }

        .h2,
        h2 {
          font-size: 32rwm;
        }

        .h3,
        h3 {
          font-size: 28rwm;
        }

        .h4,
        h4 {
          font-size: 24rwm;
        }

        .h5,
        h5 {
          font-size: 20rwm;
        }

        .h6,
        h6 {
          font-size: 16rwm;
        }

        p,
        .p {
          font-size: 14rwm;
        }

        .caption,
        small,
        .small {
          font-size: 15rwm;
        }
      }

      .button,
      button,
      a {
        font-style: normal;
        transition: color 300ms;
        text-decoration: none;
        cursor: pointer;
        border: none;
        background: none;
        outline: none;

        &:disabled {
          opacity: 0.6;
          pointer-events: none;
          cursor: disabled;
        }

        &:hover {
          color: var(--color-dull);
        }

        &.design {
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 8rw;
          transition:
            color 300ms,
            background-color 300ms,
            border-color 300ms;
          overflow: hidden;
          width: fit-content;
          padding: 10rw 24rw;
          border: 1px solid transparent;
          height: 40rwd;
          min-height: 40rwd;
          border-radius: 8rwd;

          @media --base-down {
            column-gap: 8rwm;
            padding: 8rwm 16rwm;
            height: 40rwm;
            min-height: 40rwm;
            border-radius: 6rwm;
          }

          &.full-width {
            width: 100%;
            min-width: unset;
            justify-content: center;
          }

          &.blue {
            background-color: var(--color-blue);
            color: var(--color-white);
            border: 1px solid var(--color-blue);

            &:hover {
              background-color: var(--color-white);
              color: var(--color-blue);
              border-color: var(--color-blue);
            }
          }

          &.black {
            background-color: var(--color-black);
            color: var(--color-white);
            border: 1px solid var(--color-black);

            &:hover {
              background-color: var(--color-white);
              color: var(--color-black);
              border-color: var(--color-black);
            }
          }
        }
      }

      // Use this to hide elements from the screen but keep them accessible to screen readers
      .visually-hidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      // Use to create a hidden link on a card to trigger the card click, check the CTA Card
      .card-hidden-link {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;

        .label {
          display: none;
        }
      }

      .error-message {
        text-align: center;
        color: rgb(229, 63, 63);
        font-size: 14rw;
      }

      .desktop-only {
        @media --base-down {
          display: none;
        }
      }

      .mobile-only {
        @media --base-up {
          display: none;
        }
      }
    }
  }
`;
