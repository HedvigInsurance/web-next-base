import React from 'react'
import { AppButtons } from 'components/AppButtons/AppButtons'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import {
  BrandPivotBaseBlockProps,
  minimalColorComponentColors,
} from './BaseBlockProps'

type StandardColor = 'standard' | 'standard-inverse'

const STANDARD_COLORS: Array<minimalColorComponentColors> = [
  'standard',
  'standard-inverse',
]

const isStandardColor = (
  color: minimalColorComponentColors,
): color is StandardColor => STANDARD_COLORS.includes(color)

export const AppButtonsBlock: React.FC<BrandPivotBaseBlockProps> = ({
  index,
  color,
  extra_styling,
}) => (
  <SectionWrapper
    brandPivot
    colorComponent={color}
    size="none"
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot index={index}>
      <AppButtons
        alignCenter
        color={color && isStandardColor(color.color) ? color.color : undefined}
      />
    </ContentWrapper>
  </SectionWrapper>
)
