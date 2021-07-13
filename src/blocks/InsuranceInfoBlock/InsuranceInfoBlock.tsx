import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  LAPTOP_BP_UP,
  SectionWrapper,
  TABLET_BP_DOWN,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { ButtonLinkBrandPivot } from 'components/ButtonBrandPivot/Button'

const StyledSectionWrapper = styled(SectionWrapper)`
  color: ${colorsV3.gray900};
  padding: 4rem 0;

  ${TABLET_BP_UP} {
    padding: 7rem 0 4rem;
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & {
    max-width: calc(49rem + 2 * 2rem);
  }
`

const Column = styled.div<{
  hardBottom?: boolean
  halfHardBottom?: boolean
  lastOnMobile?: boolean
}>`
  width: 100%;

  ${TABLET_BP_DOWN} {
    ${({ lastOnMobile }) =>
      lastOnMobile &&
      css`
        order: 999;
      `};
  }

  ${TABLET_BP_UP} {
    width: calc(100% / 2);
  }

  ${LAPTOP_BP_UP} {
    width: calc(100% / 3);
  }

  padding-bottom: 3rem;
  ${({ hardBottom }) =>
    hardBottom &&
    css`
      padding-bottom: 0;
    `};
  ${({ halfHardBottom }) =>
    halfHardBottom &&
    css`
      padding-bottom: 1.5rem;
    `};
`

const InsuranceValueDescription = styled.div`
  color: ${colorsV3.gray700};
`
const InsuranceValue = styled.div`
  font-size: 1.5rem;
`

const Link = styled.a`
  display: block;
  line-height: 1.75;
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    color: inherit;
    text-decoration: underline;
  }
`

type Links = {
  link: string
  text: string
}[]

type Values = {
  description: string
  value: string
}[]

interface InsuranceInfoBlockProps extends BrandPivotBaseBlockProps {
  value_1_description: string
  value_1_value: string
  value_2_description: string
  value_2_value: string
  value_3_description: string
  value_3_value: string
  value_4_description: string
  value_4_value: string
  value_5_description: string
  value_5_value: string
  value_6_description: string
  value_6_value: string
  value_7_description: string
  value_7_value: string
  terms_link: string
  terms_link_text: string
  terms_link_2: string
  terms_link_text_2: string
  terms_link_3: string
  terms_link_text_3: string
  presale_info_link: string
  presale_info_link_text: string
  cta_text: string
  cta_link: string
}

export const InsuranceInfoBlock: React.FC<InsuranceInfoBlockProps> = ({
  color,
  index,
  extra_styling,
  ...data
}) => {
  const values: Values = [
    { description: data.value_1_description, value: data.value_1_value },
    { description: data.value_2_description, value: data.value_2_value },
    { description: data.value_3_description, value: data.value_3_value },
    { description: data.value_4_description, value: data.value_4_value },
    { description: data.value_5_description, value: data.value_5_value },
    { description: data.value_6_description, value: data.value_6_value },
    { description: data.value_7_description, value: data.value_7_value },
  ].filter((item) => item.value)

  const links: Links = [
    { link: data.terms_link, text: data.terms_link_text },
    { link: data.terms_link_2, text: data.terms_link_text_2 },
    { link: data.terms_link_3, text: data.terms_link_text_3 },
    { link: data.presale_info_link, text: data.presale_info_link_text },
  ].filter((item) => item.text)

  return (
    <StyledSectionWrapper
      extraStyling={extra_styling}
      colorComponent={color}
      brandPivot
    >
      <StyledContentWrapper index={index}>
        {values.map(({ description, value }) => (
          <Column key={description + value}>
            <InsuranceValueDescription>{description}</InsuranceValueDescription>
            <InsuranceValue>{value}</InsuranceValue>
          </Column>
        ))}

        <Column lastOnMobile hardBottom>
          {links.map(({ link, text }) => (
            <Link
              href={link}
              target="_blank"
              rel="noopener nofollow"
              key={link}
            >
              {text}↗
            </Link>
          ))}
        </Column>

        {data.cta_link && (
          <Column halfHardBottom>
            <ButtonLinkBrandPivot
              href={data.cta_link}
              fullWidth
              styleType="outlined"
            >
              {data.cta_text}
            </ButtonLinkBrandPivot>
          </Column>
        )}
      </StyledContentWrapper>
    </StyledSectionWrapper>
  )
}
