import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { ContextContainer } from 'components/containers/ContextContainer'
import * as React from 'react'
import { Mount, Unmount } from 'react-lifecycle-components'
import { AppLink } from '../../components/AppLink'
import { ContentWrapper } from '../../components/blockHelpers'
import {
  ButtonLink,
  ButtonStyleType,
  ButtonWeight,
} from '../../components/buttons'
import { Togglable } from '../../components/containers/Togglable'
import { HedvigWordmark } from '../../components/icons/HedvigWordmark'
import {
  GlobalStory,
  GlobalStoryContainer,
  LinkComponent,
} from '../../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../../utils/storyblok'
import { BaseBlockProps, MinimalColorComponent } from '../BaseBlockProps'
import { MenuItem } from './MenuItem'
import { Burger, TABLET_BP_DOWN, TABLET_BP_UP } from './mobile'

export const WRAPPER_HEIGHT = '4rem'
export const HEADER_VERTICAL_PADDING = '1.2rem'
export const TOGGLE_TRANSITION_TIME = 250

const isBelowScrollThreshold = () =>
  typeof window !== 'undefined' && window.scrollY > 20

const Wrapper = styled('div')<{ inverse: boolean; open: boolean }>(
  ({ inverse, open }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    color: inverse && !isBelowScrollThreshold() ? colorsV3.white : 'inherit',
    transition: 'color 300ms',

    [TABLET_BP_DOWN]: {
      bottom: open ? 0 : undefined,
    },
  }),
)
const Filler = styled('div')({
  height: WRAPPER_HEIGHT,
})
const HeaderBackgroundFiller = styled('div')<{ transparent: boolean }>(
  ({ transparent }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    height: WRAPPER_HEIGHT,
    backgroundColor: colorsV3.white,
    opacity: transparent && !isBelowScrollThreshold() ? 0 : 1,
    transition: 'opacity 300ms',
  }),
)

const InnerHeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: WRAPPER_HEIGHT,
  padding: HEADER_VERTICAL_PADDING + ' 0',
})
const Menu = styled('ul')<{ open: boolean }>(({ open }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',

  [TABLET_BP_DOWN]: {
    position: 'absolute',
    display: 'block',
    zIndex: 101,
    width: '80%',
    height: '100vh',
    top: 0,
    bottom: 0,
    right: open ? '20%' : '100%',
    paddingTop: `calc(${WRAPPER_HEIGHT} + ${HEADER_VERTICAL_PADDING})`,
    fontSize: 18,
    background: colorsV3.white,
    transition: `right ${TOGGLE_TRANSITION_TIME}ms`,
    color: colorsV3.black,
    overflow: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
}))

const LogoLink = styled('a')({
  display: 'inline-flex',
  paddingTop: 3, // fix to push down logo a little or it looks unbalanced
  color: 'inherit',
  marginLeft: '1rem',
})

const ButtonWrapper = styled('div')({
  paddingLeft: '2rem',

  [TABLET_BP_DOWN]: {
    paddingTop: '1.5rem',
    paddingLeft: '1rem',
    paddingBottom: HEADER_VERTICAL_PADDING,
  },
})

const RightContainer = styled('div')({
  display: 'flex',
})

const MobileHeaderLink = styled(ButtonLink)({
  [TABLET_BP_UP]: {
    display: 'none',
  },
})

interface HeaderBlockProps extends BaseBlockProps {
  is_transparent: boolean
  inverse_colors: boolean
  override_cta_link?: LinkComponent | null
  override_cta_label?: string | null
  cta_color?: MinimalColorComponent
  cta_weight?: ButtonWeight
  cta_style?: ButtonStyleType
  override_mobile_header_cta_label?: string | null
  override_mobile_header_cta_link?: LinkComponent | null
  mobile_header_cta_color?: MinimalColorComponent
  mobile_header_weight?: ButtonWeight
  mobile_header_cta_style?: ButtonStyleType
}

class Header extends React.PureComponent<
  { story: GlobalStory } & HeaderBlockProps
> {
  private backgroundFillerRef: null | HTMLDivElement = null
  private wrapperRef = React.createRef<HTMLDivElement>()
  private mobileButtonRef = React.createRef<HTMLAnchorElement>()
  private desktopButtonRef = React.createRef<HTMLAnchorElement>()

  public render() {
    const mobileHeaderCtaLabel =
      this.props.override_mobile_header_cta_label ||
      this.props.story.content.cta_label

    const mobileHeaderCtaLinkSrc =
      this.props.override_cta_link && this.props.override_cta_link.cached_url
        ? this.props.override_cta_link
        : this.props.story.content.cta_link
    const mobileHeaderCtaLink = getStoryblokLinkUrl(mobileHeaderCtaLinkSrc)
    return (
      <>
        <Mount
          on={() => {
            if (!this.props.is_transparent) {
              return
            }

            setTimeout(() => {
              this.updateHeaderTransparency() // update the scroll animation after mount because the server doesn't know scroll position
            }, 1)
            window.addEventListener('scroll', this.updateHeaderTransparency)
          }}
        />
        <Unmount
          on={() => {
            if (!this.props.is_transparent) {
              return
            }

            window.removeEventListener('scroll', this.updateHeaderTransparency)
          }}
        />
        {!this.props.is_transparent && <Filler />}

        <Togglable>
          {({ isOpen, isClosing, toggleOpen }) => (
            <Wrapper
              inverse={this.props.is_transparent && this.props.inverse_colors}
              open={isOpen || isClosing}
              ref={this.wrapperRef}
            >
              <HeaderBackgroundFiller
                transparent={this.props.is_transparent}
                ref={(r) => {
                  this.backgroundFillerRef = r
                }}
              />
              <ContentWrapper>
                <InnerHeaderWrapper>
                  <RightContainer>
                    <Burger
                      isOpen={isOpen}
                      isClosing={isClosing}
                      onClick={toggleOpen}
                      preventInverse={this.props.inverse_colors && isOpen}
                    />

                    <ContextContainer>
                      {(context) => (
                        <LogoLink
                          href={
                            '/' + (context.lang === 'sv' ? '' : context.lang)
                          }
                        >
                          <HedvigWordmark height={24} />
                        </LogoLink>
                      )}
                    </ContextContainer>
                  </RightContainer>

                  {!isOpen && (
                    <>
                      {(() => {
                        if (
                          this.props.override_cta_link?.cached_url ||
                          this.props.override_mobile_header_cta_link?.cached_url
                        ) {
                          return (
                            <MobileHeaderLink
                              size="sm"
                              styleType={this.props.mobile_header_cta_style}
                              weight={this.props.mobile_header_weight}
                              href={mobileHeaderCtaLink}
                              color={
                                this.props.mobile_header_cta_color &&
                                this.props.mobile_header_cta_color.color
                              }
                              ref={this.mobileButtonRef}
                            >
                              {mobileHeaderCtaLabel}
                            </MobileHeaderLink>
                          )
                        }

                        if (
                          this.props.story.content.show_cta &&
                          this.props.story.content.cta_branch_link
                        ) {
                          return (
                            <AppLink>
                              {({ link, handleClick }) => (
                                <MobileHeaderLink
                                  size="sm"
                                  styleType={this.props.mobile_header_cta_style}
                                  weight={this.props.mobile_header_weight}
                                  color={
                                    this.props.mobile_header_cta_color &&
                                    this.props.mobile_header_cta_color.color
                                  }
                                  onClick={handleClick}
                                  href={link}
                                  ref={this.mobileButtonRef}
                                  id="b"
                                >
                                  {mobileHeaderCtaLabel}
                                </MobileHeaderLink>
                              )}
                            </AppLink>
                          )
                        }
                        return (
                          <MobileHeaderLink
                            size="sm"
                            styleType={this.props.mobile_header_cta_style}
                            weight={this.props.mobile_header_weight}
                            href={mobileHeaderCtaLink}
                            color={
                              this.props.mobile_header_cta_color &&
                              this.props.mobile_header_cta_color.color
                            }
                            ref={this.mobileButtonRef}
                            id="3"
                          >
                            {mobileHeaderCtaLabel}
                          </MobileHeaderLink>
                        )
                      })()}
                    </>
                  )}

                  <Menu open={isOpen}>
                    {(this.props.story.content.header_menu_items ?? []).map(
                      (menuItem) => (
                        <MenuItem menuItem={menuItem} key={menuItem._uid} />
                      ),
                    )}

                    {(() => {
                      const ctaLabel =
                        this.props.override_cta_label ||
                        this.props.story.content.cta_label

                      if (
                        this.props.override_cta_link &&
                        this.props.override_cta_link.cached_url
                      ) {
                        return (
                          <ButtonWrapper>
                            <ButtonLink
                              size="sm"
                              styleType={this.props.cta_style}
                              weight={this.props.cta_weight}
                              color={
                                this.props.cta_color &&
                                this.props.cta_color.color
                              }
                              href={getStoryblokLinkUrl(
                                this.props.override_cta_link,
                              )}
                              ref={this.desktopButtonRef}
                            >
                              {ctaLabel}
                            </ButtonLink>
                          </ButtonWrapper>
                        )
                      }

                      if (
                        this.props.story.content.show_cta &&
                        this.props.story.content.cta_branch_link
                      ) {
                        return (
                          <AppLink>
                            {({ link, handleClick }) => (
                              <ButtonWrapper>
                                <ButtonLink
                                  size="sm"
                                  weight={this.props.cta_weight}
                                  styleType={this.props.cta_style}
                                  color={
                                    this.props.cta_color &&
                                    this.props.cta_color.color
                                  }
                                  href={link}
                                  onClick={handleClick}
                                  ref={this.desktopButtonRef}
                                >
                                  {ctaLabel}
                                </ButtonLink>
                              </ButtonWrapper>
                            )}
                          </AppLink>
                        )
                      }

                      return (
                        <ButtonWrapper>
                          <ButtonLink
                            size="sm"
                            styleType={this.props.cta_style}
                            weight={this.props.cta_weight}
                            color={
                              this.props.cta_color && this.props.cta_color.color
                            }
                            href={getStoryblokLinkUrl(
                              this.props.story.content.cta_link,
                            )}
                            ref={this.desktopButtonRef}
                          >
                            {ctaLabel}
                          </ButtonLink>
                        </ButtonWrapper>
                      )
                    })()}
                  </Menu>
                </InnerHeaderWrapper>
              </ContentWrapper>
            </Wrapper>
          )}
        </Togglable>
      </>
    )
  }

  private updateHeaderTransparency = () => {
    const wrapperRef = this.wrapperRef.current
    const mobileButtonRef = this.mobileButtonRef.current
    const desktopButtonRef = this.desktopButtonRef.current
    if (
      !this.backgroundFillerRef ||
      !wrapperRef ||
      (!mobileButtonRef && !desktopButtonRef)
    ) {
      return
    }

    if (isBelowScrollThreshold()) {
      this.backgroundFillerRef.style.opacity = '1'
      wrapperRef.style.color = 'inherit'
      if (mobileButtonRef) {
        if (this.props.mobile_header_cta_style === 'outlined') {
          mobileButtonRef.style.color = colorsV3.black
          mobileButtonRef.style.borderColor = colorsV3.black
        }
      }
      if (desktopButtonRef) {
        if (this.props.mobile_header_cta_style === 'outlined') {
          desktopButtonRef.style.color = colorsV3.black
          desktopButtonRef.style.borderColor = colorsV3.black
        }
      }
      return
    } else {
      if (mobileButtonRef) {
        mobileButtonRef.style.color = null
        mobileButtonRef.style.borderColor = null as any
      }
      if (desktopButtonRef) {
        desktopButtonRef.style.color = null
        desktopButtonRef.style.borderColor = null as any
      }
    }

    this.backgroundFillerRef!.style.opacity = '0'

    if (this.props.inverse_colors) {
      wrapperRef.style.color = colorsV3.white
    }
  }
}

export const HeaderBlock: React.FunctionComponent<HeaderBlockProps> = (
  headerBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Header story={globalStory} {...headerBlockProps} />}
  </GlobalStoryContainer>
)
