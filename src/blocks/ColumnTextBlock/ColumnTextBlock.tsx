import styled from '@emotion/styled'
import React from 'react'
import {
  BaseBlockProps,
  MarkdownHtmlComponent,
} from 'src/blocks/BaseBlockProps'
import {
  ContentWrapper,
  MOBILE_BP_UP,
  SectionWrapper,
} from '../../components/blockHelpers'

const ColumnContentWrapper = styled(ContentWrapper)({
  display: 'flex',
  flexWrap: 'wrap',
})

const Column = styled('div')({
  width: '100%',
  '&:not(:last-child)': {
    paddingBottom: '1rem',
  },

  [MOBILE_BP_UP]: {
    width: '50%',
    paddingBottom: 0,

    '&:first-child': {
      paddingRight: '1rem',
    },

    '&:last-child': {
      paddingLeft: '1rem',
    },
  },
})

interface ColumnTextBlockProps extends BaseBlockProps {
  text_one: MarkdownHtmlComponent
  text_two: MarkdownHtmlComponent
}

export const ColumnTextBlock: React.FC<ColumnTextBlockProps> = ({
  color,
  extra_styling,
  index,
  text_one,
  text_two,
}) => (
  <SectionWrapper
    colorComponent={color}
    extraStyling={extra_styling}
    size="none"
    brandPivot
  >
    <ColumnContentWrapper brandPivot index={index}>
      <Column dangerouslySetInnerHTML={{ __html: text_one?.html }} />
      <Column dangerouslySetInnerHTML={{ __html: text_two?.html }} />
    </ColumnContentWrapper>
  </SectionWrapper>
)
