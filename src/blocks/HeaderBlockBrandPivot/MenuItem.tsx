import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Container } from 'constate'
import React from 'react'
import AnimateHeight from 'react-animate-height'
import { Chevron } from 'components/icons/Chevron'
import { MOBILE_BP_DOWN } from 'components/blockHelpers'
import { MenuItem as MenuItemType } from '../../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../../utils/storyblok'
import { TABLET_BP_DOWN, TABLET_BP_UP, DESKTOP_BP_UP } from './mobile'

const MenuListItem = styled('li')({
  position: 'relative',
  margin: 0,
  padding: 0,

  [TABLET_BP_UP]: {
    display: 'flex',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },

  [DESKTOP_BP_UP]: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
})
const DropdownMenuItemList = styled('ul')<{
  isClosing: boolean
  isOpen: boolean
}>(({ isClosing, isOpen }) => ({
  display: isOpen ? 'flex' : 'none',
  flexDirection: 'column',
  position: 'absolute',
  left: '50%',
  top: 'calc(100% + .75rem)',
  listStyle: 'none',
  margin: 0,
  padding: '1.5rem 0 .5rem',
  background: colorsV3.gray100,
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1);',
  borderRadius: '0.5rem',
  opacity: isOpen && !isClosing ? 1 : 0,
  transition: 'opacity 150ms',
  transform: 'translateX(-50%)',
  overflowY: 'hidden',
  color: colorsV3.gray900,

  [TABLET_BP_DOWN]: {
    position: 'static',
    boxShadow: 'none',
    left: 0,
    padding: '0 1rem',
    background: 'inherit',
    color: 'inherit',
    fontSize: '1.5rem',
    transform: 'translateX(0)',
  },
}))
const MenuLink = styled('a')({
  color: 'inherit',
  textDecoration: 'none',

  [TABLET_BP_DOWN]: {
    display: 'inline-block',
    padding: `1rem 0.5rem 1rem 2rem`,
    fontFamily: fonts.FAVORIT,
    fontSize: '1.5rem',
  },

  [MOBILE_BP_DOWN]: {
    paddingLeft: '1.5rem',
  },
})
const MenuFakeLink = styled(MenuLink)({ cursor: 'default' }).withComponent(
  'span',
)
const DropdownMenuLink = styled(MenuLink)({
  display: 'block',
  whiteSpace: 'nowrap',
  padding: 0,
  paddingBottom: '1rem',

  [TABLET_BP_DOWN]: {
    fontSize: '1.2rem',
    padding: '0.5rem 0.5rem 0.5rem 1.5rem',
  },
})

const Toggler = styled('button')<{ isOpen: boolean }>(({ isOpen }) => ({
  position: 'relative',
  top: 2,
  appearance: 'none',
  background: 0,
  border: 0,
  padding: '1rem 0.5rem',
  fontSize: '1rem',
  color: 'inherit',

  svg: {
    fontSize: '1.125rem',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 250ms',
  },

  [TABLET_BP_UP]: {
    top: 1,
    paddingTop: 0,
    paddingBottom: 0,
    svg: {
      fontSize: '0.75rem',
      transform: 'none',
    },
  },
}))

interface State {
  isOpen: boolean
  isClosing: boolean
  closeAnimationTimeout?: number
  closeTimeout?: number
}

interface Effects {
  open: () => void
  close: () => void
  closeWithoutDelay: () => void
}

export const MenuItem: React.FunctionComponent<{ menuItem: MenuItemType }> = ({
  menuItem,
}) => (
  <Container<State, {}, {}, Effects>
    initialState={{
      isOpen: false,
      isClosing: false,
      closeAnimationTimeout: undefined,
      closeTimeout: undefined,
    }}
    effects={{
      open: () => ({ setState, state }) => {
        if (state.closeTimeout) {
          window.clearTimeout(state.closeTimeout)
        }
        if (state.closeAnimationTimeout) {
          window.clearTimeout(state.closeAnimationTimeout)
        }
        setState({
          isOpen: true,
          isClosing: false,
          closeTimeout: undefined,
          closeAnimationTimeout: undefined,
        })
      },
      close: () => ({ setState }) => {
        setState({
          closeTimeout: window.setTimeout(() => {
            setState({
              isOpen: false,
              isClosing: false,
              closeTimeout: undefined,
              closeAnimationTimeout: undefined,
            })
          }, 500),
          closeAnimationTimeout: window.setTimeout(() => {
            setState({ isClosing: true })
          }, 250),
        })
      },
      closeWithoutDelay: () => ({ setState }) => {
        setState({
          isClosing: true,
          closeTimeout: window.setTimeout(() => {
            setState({
              isClosing: false,
              isOpen: false,
              closeTimeout: undefined,
            })
          }, 250),
        })
      },
    }}
  >
    {({ isOpen, isClosing, open, close, closeWithoutDelay }) => (
      <MenuListItem
        key={menuItem._uid}
        onMouseOver={() => {
          open()
        }}
        onMouseOut={() => close()}
      >
        {menuItem.link && menuItem.link.cached_url ? (
          <MenuLink href={getStoryblokLinkUrl(menuItem.link)}>
            {menuItem.label}
          </MenuLink>
        ) : (
          <MenuFakeLink>{menuItem.label}</MenuFakeLink>
        )}

        {menuItem.menu_items && menuItem.menu_items.length > 0 && (
          <Toggler onClick={isOpen ? closeWithoutDelay : open} isOpen={isOpen}>
            <Chevron />
          </Toggler>
        )}

        {menuItem.menu_items && menuItem.menu_items.length > 0 && (
          <AnimateHeight height={isOpen && !isClosing ? 'auto' : 0}>
            <DropdownMenuItemList isOpen={isOpen} isClosing={isClosing}>
              {menuItem.menu_items.map((innerMenuItem) =>
                innerMenuItem.link?.cached_url ? (
                  <MenuListItem key={innerMenuItem._uid}>
                    <DropdownMenuLink
                      href={getStoryblokLinkUrl(innerMenuItem.link)}
                    >
                      {innerMenuItem.label}
                    </DropdownMenuLink>
                  </MenuListItem>
                ) : null,
              )}
            </DropdownMenuItemList>
          </AnimateHeight>
        )}
      </MenuListItem>
    )}
  </Container>
)
