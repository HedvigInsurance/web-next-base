import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  colorComponentColors,
  minimalColorComponentColors,
} from 'src/blocks/BaseBlockProps'
import { getMinimalColorStyles, MOBILE_BP_UP } from '../blockHelpers'

export const buttonSizes = {
  sm: '.75rem 1.5rem',
  md: 'calc(1rem - 1px) 2rem',
  lg: 'calc(1.125rem - 1px) 3rem',
}

export type ButtonStyleType = 'filled' | 'outlined' | 'plain'
export type ButtonWeight = 'normal' | 'bold'

export interface ButtonProps<TColor = colorComponentColors> {
  size?: keyof typeof buttonSizes
  styleType?: ButtonStyleType
  color?: TColor
  fullWidth?: boolean
}

const getMinimalButtonTypeStyle = (
  buttonType: ButtonStyleType,
  color: minimalColorComponentColors,
) => {
  if (buttonType === 'filled') {
    return {
      backgroundColor: getMinimalColorStyles(
        color,
        colorsV3.gray900,
        colorsV3.gray100,
      ).background,
      color: getMinimalColorStyles(color, colorsV3.gray900, colorsV3.gray100)
        .color,
    }
  }
  if (buttonType === 'plain') {
    return {
      border: 'none',
      padding: '0',
      backgroundColor: 'transparent',
      color: getMinimalColorStyles(color, colorsV3.gray900, colorsV3.gray100)
        .background,
    }
  } else {
    // Outlined or nothing
    return {
      backgroundColor: 'transparent',
      color: getMinimalColorStyles(color, colorsV3.gray900, colorsV3.gray100)
        .background,
    }
  }
}

export const ButtonBrandPivot = styled('button')<
  ButtonProps<minimalColorComponentColors>
>(
  ({
    styleType = 'filled',
    color = 'standard',
    size = 'md',
    fullWidth = false,
  }) => {
    const colorStyles = getMinimalColorStyles(
      color,
      colorsV3.gray900,
      colorsV3.gray100,
    )
    return {
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
      minWidth: '10rem',
      padding: buttonSizes[size],
      borderRadius: 8,
      border: `1px solid ${colorStyles.background}`,
      fontFamily: 'inherit',
      textDecoration: 'none',
      textAlign: 'center',
      fontWeight: 'normal',
      cursor: 'pointer',
      lineHeight: '1rem',
      transition: 'background 150ms, color 150ms',
      whiteSpace: 'nowrap',
      ...getMinimalButtonTypeStyle(styleType, color),

      '&:hover': {
        ...getMinimalButtonTypeStyle(styleType, color),
        ...(styleType === 'outlined'
          ? {
              background: colorStyles.background,
              color: colorStyles.color,
            }
          : {}),
      },

      [MOBILE_BP_UP]: {
        width: 'auto',
      },
    }
  },
)

export const ButtonLinkBrandPivot = ButtonBrandPivot.withComponent('a')
