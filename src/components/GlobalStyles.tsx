import { fonts, getCdnFontFaces } from '@hedviginsurance/brand'
import * as React from 'react'
import { injectGlobal } from 'react-emotion'

export const GlobalStyles: React.FunctionComponent = () => {
  // tslint:disable-next-line no-unused-expression
  injectGlobal`
${getCdnFontFaces()}

* {
  box-sizing: border-box;
}

body {
  font-family: ${fonts.CIRCULAR}, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${fonts.SORAY}, sans-serif;
  font-kerning: none;
  margin: 1.414rem 0 0.5rem;
  font-weight: inherit;
  line-height: 1.2rem
}

h1 {
  margin-top: 0;
  font-size: 3.5rem;
  line-height: 4.75rem;
}
h2 {
  font-size: 2.5rem;
  line-height: 4.125rem;
}
h3 {
  font-size: 1.25rem;
}
h4 {
  font-size: 1rem;
}

@media (max-width: 800px) {
  h1 {
    font-size: 3rem;
    line-height: 4.125rem;
  }
  h2 {
      font-size: 2.25rem;
      line-height: 3.125rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
      font-size: 2rem;
  }
}

a {
  color: inherit;
  &:hover, &:focus {
    color: inherit;
  }
}

img {
  max-width: 100%;
}
`

  return null
}
