import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { ContentWrapper } from 'components/blockHelpers'
import { ContextContainer } from 'components/containers/ContextContainer'

const TrustpilotWrapper = styled(ContentWrapper)`
  && {
    max-width: 1200px;
  }
`

export const TrustpilotBlock: React.FC = () => {
  const trustpilotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const castedWindow = window as any
    if (castedWindow && castedWindow.Trustpilot) {
      castedWindow.Trustpilot.loadFromElement(trustpilotRef.current, true)
    }
  }, [])

  return (
    <TrustpilotWrapper>
      <ContextContainer>
        {({ currentLocale }) => (
          <div
            ref={trustpilotRef}
            className="trustpilot-widget"
            data-locale={currentLocale.trustpilotLocale}
            data-template-id="54ad5defc6454f065c28af8b"
            data-businessunit-id="5b62ebf41788620001d3c4ae"
            data-style-height="240px"
            data-style-width="100%"
            data-theme="light"
            data-tags={currentLocale.htmlLang}
            data-text-color={colorsV3.gray900}
          >
            <a
              href="https://www.trustpilot.com/review/www.hedvig.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trustpilot
            </a>
          </div>
        )}
      </ContextContainer>
    </TrustpilotWrapper>
  )
}
