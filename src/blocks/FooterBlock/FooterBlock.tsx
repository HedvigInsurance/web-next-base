import styled from '@emotion/styled'
import { colorsV3, HedvigSymbol } from '@hedviginsurance/brand'
import React from 'react'
import { AppButtons } from 'components/AppButtons/AppButtons'
import {
  CONTENT_GUTTER,
  ContentWrapper,
  MOBILE_BP_UP,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { ContextContainer } from 'components/containers/ContextContainer'
import { StarRating } from 'components/icons/StarRating'
import { GlobalStory, GlobalStoryContainer } from 'storyblok/StoryContainer'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import { BrandPivotBaseBlockProps } from '../BaseBlockProps'
import { MarketPicker } from './MarketPicker/MarketPicker'

const BP_UP = '@media (min-width: 601px)'
const MOBILE_MENU_HIDDEN = '@media (min-width: 1001px)'

const FooterWrapper = styled(SectionWrapper)`
  padding: 4rem 0 5.5rem;
  border-top: 1px solid ${colorsV3.gray800};

  ${TABLET_BP_UP} {
    padding: 6.5rem 0 12rem;
  }

  ${MOBILE_MENU_HIDDEN} {
    padding-top: 4.25rem;
  }
`

const IconWrapper = styled.div`
  display: none;

  ${MOBILE_MENU_HIDDEN} {
    display: flex;
    justify-content: flex-end;
    margin: 0 auto 3.125rem;
    padding-left: ${CONTENT_GUTTER};
    padding-right: ${CONTENT_GUTTER};
  }
`

const LinksColumnsWrapper = styled.nav`
  ${BP_UP} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  ${TABLET_BP_UP} {
    margin-top: 0;
    margin-bottom: 5rem;
    justify-content: space-between;

    @supports (display: grid) {
      display: grid;
      grid-template-columns: 30% 20% 5rem 25% 1fr;
    }
  }
`

const ColumnHeader = styled.h5`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: ${colorsV3.gray500};
`

const LinkColumn = styled.div`
  padding-bottom: 3.5rem;

  ${BP_UP} {
    width: 50%;
  }

  ${TABLET_BP_UP} {
    width: 25%;

    @supports (display: grid) {
      width: auto;

      &:nth-of-type(3) {
        grid-column-start: 4;
      }

      &:nth-of-type(4) {
        grid-column-start: 5;
      }
    }
  }
`

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Link = styled.a`
  display: block;
  color: ${colorsV3.gray100};
  font-size: 1rem;
  line-height: 2;
  text-decoration: none;
`

const DoubleColumn = styled.div`
  & > div {
    margin-bottom: 4rem;
  }

  ${TABLET_BP_UP} {
    display: flex;
    flex-wrap: wrap;

    & > div {
      width: 50%;
    }

    & > div:first-of-type {
      padding-right: 4.5rem;
    }

    @supports (display: grid) {
      display: grid;
      grid-template-columns: 50% calc(50% - 5rem);
      grid-gap: 0 5rem;

      & > div {
        width: auto;
      }
    }
  }
`

const Rating = styled.div`
  position: relative;
  height: 0;
  padding-top: calc(42 / 238 * 100%);

  ${MOBILE_BP_UP} {
    width: 15rem;
    height: 2.625rem;
    padding-top: 0;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const RatingParagraph = styled.div`
  a {
    color: ${colorsV3.purple500};
    text-decoration: none;
  }

  a:hover {
    opacity: 0.8;
  }
`

const FooterFooter = styled(DoubleColumn)`
  margin-top: 2rem;
  font-size: 0.75rem;
  line-height: 1.7;
  color: ${colorsV3.gray500};

  & > div {
    margin-bottom: 1rem;
    text-align: center;
  }

  ${TABLET_BP_UP} {
    & > div {
      text-align: left;
    }
  }
`

type FooterBlockProps = BrandPivotBaseBlockProps

export const Footer: React.FC<{ story: GlobalStory } & FooterBlockProps> = ({
  color,
  extra_styling = '',
  story,
}) => (
  <FooterWrapper
    as="footer"
    brandPivot
    colorComponent={color}
    size="none"
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot>
      <IconWrapper>
        <HedvigSymbol size={32} />
      </IconWrapper>
    </ContentWrapper>
    <ContentWrapper brandPivot>
      <LinksColumnsWrapper>
        {(story.content.footer_menu_items ?? []).map((menuItem) => (
          <LinkColumn key={menuItem._uid}>
            <ColumnHeader>{menuItem.label}</ColumnHeader>
            <MenuList>
              {(menuItem.menu_items ?? []).map((innerMenuItem) =>
                innerMenuItem.link?.cached_url ? (
                  <li key={innerMenuItem._uid}>
                    <Link href={getStoryblokLinkUrl(innerMenuItem.link)}>
                      {innerMenuItem.label}
                    </Link>
                  </li>
                ) : null,
              )}
            </MenuList>
          </LinkColumn>
        ))}
      </LinksColumnsWrapper>
      <DoubleColumn>
        {story.content.footer_safety_title && (
          <div>
            <ColumnHeader>{story.content.footer_safety_title}</ColumnHeader>
            <div
              dangerouslySetInnerHTML={{
                __html: story.content.footer_safety_body?.html,
              }}
            />
          </div>
        )}

        {story.content.footer_rating_title && (
          <div>
            <ColumnHeader>{story.content.footer_rating_title}</ColumnHeader>
            <Rating>
              <StarRating />
            </Rating>
            <RatingParagraph
              dangerouslySetInnerHTML={{
                __html: story.content.footer_rating_paragraph?.html,
              }}
            />
          </div>
        )}

        {story.content.footer_download_title && (
          <div>
            <ColumnHeader>{story.content.footer_download_title}</ColumnHeader>
            <AppButtons />
          </div>
        )}

        {story.content.footer_market_title && (
          <div>
            <ColumnHeader>{story.content.footer_market_title}</ColumnHeader>
            <ContextContainer>
              {({ currentLocale }) => (
                <MarketPicker currentLocale={currentLocale} />
              )}
            </ContextContainer>
          </div>
        )}
      </DoubleColumn>
      <FooterFooter
        dangerouslySetInnerHTML={{
          __html: story.content.footer_paragraph?.html,
        }}
      />
    </ContentWrapper>
  </FooterWrapper>
)

export const FooterBlock: React.FunctionComponent<FooterBlockProps> = (
  footerBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Footer story={globalStory} {...footerBlockProps} />}
  </GlobalStoryContainer>
)
