import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'
import { TogglableState } from '../../components/containers/Togglable'
import { HEADER_VERTICAL_PADDING, TOGGLE_TRANSITION_TIME } from './index'

export const TABLET_BP_DOWN = '@media (max-width: 1023px)'
export const TABLET_BP_UP = '@media (min-width: 1024px)'
export const DESKTOP_BP_UP = '@media (min-width: 1280px)'

const BURGER_LINE_WIDTH = '1.5rem'

export const CrossBurger = styled('div')<TogglableState>(
  ({ isOpen, isClosing }) => ({
    width: '100%',
    position: 'absolute',

    '&::before, &::after': {
      position: 'absolute',
      left: 0,
      right: 0,
      content: '" "',
      width: BURGER_LINE_WIDTH,
      height: 2,
      backgroundColor: 'currentColor',
      transition:
        'background-color 300ms, transform 300ms, top 300ms, bottom 300ms',
    },

    '&::before': {
      top: 8,
      ...(isOpen && !isClosing
        ? {
            transform: 'translateY(-1px) rotate(45deg)',
            top: '50%',
            backgroundColor: 'currentColor',
          }
        : {}),
    },
    '&::after': {
      bottom: 8,
      ...(isOpen && !isClosing
        ? {
            bottom: '50%',
            transform: 'translateY(1px) rotate(-45deg)',
            backgroundColor: 'currentColor',
          }
        : {}),
    },
  }),
)

const MiddleBurger = styled('div')<TogglableState>(({ isOpen, isClosing }) => ({
  width: '100%',
  top: '50%',
  left: 0,
  right: 0,
  height: 2,
  backgroundColor: isOpen && !isClosing ? 'transparent' : 'currentColor',
  transition: 'background-color 300ms',
  transform: 'translateY(-1px)',
}))

export const NavToggle = styled('button')({
  position: 'relative',
  display: 'block',
  top: HEADER_VERTICAL_PADDING,
  appearance: 'none',
  background: 'transparent',
  border: '0',
  width: BURGER_LINE_WIDTH,
  height: '2rem',
  padding: 0,
  zIndex: 102,
  color: 'inherit',

  [TABLET_BP_UP]: {
    display: 'none',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})
const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 99,
  transition: `background-color ${TOGGLE_TRANSITION_TIME}ms`,
  animation: `${fadeIn} ${TOGGLE_TRANSITION_TIME}ms`,
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  [TABLET_BP_UP]: {
    display: 'none',
  },
})

export const Burger: React.FunctionComponent<
  TogglableState &
    React.HTMLAttributes<HTMLButtonElement> & { preventInverse: boolean }
> = ({ isOpen, isClosing, ...rest }) => (
  <>
    <NavToggle {...rest}>
      <CrossBurger isOpen={isOpen} isClosing={isClosing} />
      <MiddleBurger isOpen={isOpen} isClosing={isClosing} />
    </NavToggle>
    {(isOpen || isClosing) && (
      <Overlay
        onClick={
          (rest.onClick as any) as React.EventHandler<
            React.MouseEvent<HTMLDivElement>
          >
        }
      />
    )}
  </>
)
