import { css } from '@emotion/react';

export const globalStyles = css`
  :root {
    background-color: #f5f5f5;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family:
      'Noto Sans KR',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
    scrollbar-color: #cfcfcf transparent;
  }

  button {
    cursor: pointer;
    font: inherit;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  input {
    margin: 0;
  }
`;
