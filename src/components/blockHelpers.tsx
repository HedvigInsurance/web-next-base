import styled from '@emotion/styled'
import { colors, colorsV3, fonts } from '@hedviginsurance/brand'
import { match } from 'matchly'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { SectionSize } from 'src/utils/SectionSize'
import {
  ColorComponent,
  colorComponentColors,
  colorDeviationColors,
  MinimalColorComponent,
  minimalColorComponentColors,
} from '../blocks/BaseBlockProps'

export const CONTENT_GUTTER = '2rem'
export const CONTENT_GUTTER_MOBILE = '1rem'
export const MOBILE_BP_UP = '@media (min-width: 481px)'
export const MOBILE_BP_DOWN = '@media (max-width: 480px)'
export const TABLET_BP_DOWN = '@media (max-width: 800px)'
export const TABLET_BP_UP = '@media (min-width: 801px)'
export const LAPTOP_BP_UP = '@media (min-width: 1024px)'
export const GIANT_BP_UP = '@media (min-width: 1700px)'

export const SITE_MAX_WIDTH = {
  maxWidth: '100%',
}

export const CONTENT_MAX_WIDTH = {
  maxWidth: 1000,
}

export const CONTENT_MAX_WIDTH_DEPRECATED = {
  maxWidth: 1200,
  [GIANT_BP_UP]: {
    maxWidth: 1500,
  },
}

export const colorDeviations = {
  pinkDeviation100: '#efbca8',
  pinkDeviation200: '#ee7476',
  yellowDeviation100: '#fed802',
  blueDeviation100: '#263067',
  purpleDeviation100: '#693abe',
}

interface ColorSet {
  color: string
  background: string
  secondaryColor?: string
}

const colorMap: Record<
  colorComponentColors | colorDeviationColors,
  ColorSet
> = Object.entries({
  blue: {
    color: colors.WHITE,
    background: colors.BLACK_PURPLE,
  },
  'blue-dark': {
    color: colors.WHITE,
    background: colors.DARK_PURPLE,
  },
  'pink-light': {
    color: colors.OFF_BLACK_DARK,
    background: colors.PINK_LIGHT,
  },
  'pink-dark': {
    color: colors.OFF_BLACK_DARK,
    background: colors.PINK,
  },
  'off-white': {
    color: colors.OFF_BLACK_DARK,
    background: colors.OFF_WHITE,
  },
  'off-black': {
    color: colors.WHITE,
    background: colors.OFF_BLACK,
  },
  'off-black-dark': {
    color: colors.WHITE,
    background: colors.OFF_BLACK_DARK,
  },
  green: {
    color: colors.WHITE,
    background: colors.GREEN,
  },
  'green-dark': {
    color: colors.WHITE,
    background: colors.DARK_GREEN,
  },
  purple: {
    color: colors.WHITE,
    background: colors.PURPLE,
  },
  'yellow-light': {
    color: colors.OFF_BLACK_DARK,
    background: colors.LIGHT_YELLOW,
  },
  'yellow-dark': {
    color: colors.WHITE,
    background: colors.DARK_YELLOW,
  },
  'pink-deviation-100': {
    color: colors.BLACK,
    background: colorDeviations.pinkDeviation100,
  },
  'pink-deviation-200-black': {
    color: colors.BLACK,
    background: colorDeviations.pinkDeviation200,
  },
  'pink-deviation-200-white': {
    color: colors.WHITE,
    background: colorDeviations.pinkDeviation200,
  },
  'yellow-deviation-100-white': {
    color: colors.WHITE,
    background: colorDeviations.yellowDeviation100,
  },
  'yellow-deviation-100-black': {
    color: colors.BLACK,
    background: colorDeviations.yellowDeviation100,
  },
  'blue-deviation-100': {
    color: colors.WHITE,
    background: colorDeviations.blueDeviation100,
  },
  'purple-deviation-100': {
    color: colors.WHITE,
    background: colorDeviations.purpleDeviation100,
  },
})
  .map<
    [
      [colorComponentColors | colorDeviationColors, ColorSet],
      [colorComponentColors | colorDeviationColors, ColorSet],
    ]
  >(([key, value]) => [
    [key as colorComponentColors | colorDeviationColors, value],
    [
      (key + '-inverse') as colorComponentColors | colorDeviationColors,
      { color: value.background, background: value.color },
    ],
  ])
  .reduce<Record<colorComponentColors | colorDeviationColors, ColorSet>>(
    (acc, [std, inverse]) => ({
      ...acc,
      [std[0]]: std[1],
      [inverse[0]]: inverse[1],
    }),
    // tslint:disable-next-line no-object-literal-type-assertion
    {} as Record<colorComponentColors | colorDeviationColors, ColorSet>,
  )

const sectionSizeStyles = {
  none: { padding: 0 },
  xxs: {
    padding: '0.5rem 0',
    [TABLET_BP_DOWN]: {
      padding: '0.25rem 0',
    },
  },
  xs: {
    padding: '1rem 0',
    [TABLET_BP_DOWN]: {
      padding: '0.5rem 0',
    },
  },
  sm: {
    padding: '3.5rem 0',
    [TABLET_BP_DOWN]: {
      padding: '2rem 0',
    },
  },
  md: {
    padding: '5rem 0',
    [TABLET_BP_DOWN]: {
      padding: '2.5rem 0',
    },
  },
  lg: {
    padding: '7.5rem 0',
    [TABLET_BP_DOWN]: {
      padding: '3.5rem 0',
    },
  },
  xl: {
    padding: '10rem 0 3rem',
    display: 'flex',
    alignItems: 'flex-end',

    [TABLET_BP_DOWN]: {
      padding: '6rem 0',
    },
  },
}

export type ColorSetGetter<TColors> = (
  colors: TColors,
  standardColor?: string,
  standardInverseColor?: string,
) => ColorSet

export const getColorStyles: ColorSetGetter<
  colorComponentColors | colorDeviationColors
> = (
  color,
  standardColor = 'transparent',
  standardInverseColor = colors.OFF_BLACK_DARK,
) => {
  if (color === 'standard') {
    return { background: standardColor, color: standardInverseColor }
  }

  if (color === 'standard-inverse') {
    return { background: standardInverseColor, color: standardColor }
  }

  return colorMap[color]
}

export const getMinimalColorStyles: ColorSetGetter<minimalColorComponentColors> = (
  color,
  standardColor = colorsV3.gray100,
  standardInverseColor = colorsV3.gray900,
) =>
  match([
    [
      'standard',
      {
        background: standardColor,
        color: standardInverseColor,
        secondaryColor: colorsV3.gray700,
      },
    ],
    [
      'standard-inverse',
      {
        background: standardInverseColor,
        color: standardColor,
        secondaryColor: colorsV3.gray500,
      },
    ],
    ['gray700', { background: standardColor, color: colorsV3.gray700 }],
    [
      'gray500-inverse',
      { background: colorsV3.gray900, color: colorsV3.gray500 },
    ],
    [
      'purple300',
      {
        background: colorsV3.purple300,
        color: colorsV3.gray900,
      },
    ],
    [
      'purple500',
      {
        background: colorsV3.purple500,
        color: colorsV3.gray900,
      },
    ],
    [match.any(), { background: standardColor, color: standardInverseColor }],
  ])(color)!

export const getSectionSizeStyle = (size: SectionSize) =>
  sectionSizeStyles[size]

export const backgroundImageStyles = (
  backgroundImage = '',
  backgroundImageMobile = '',
  tint = false,
) => {
  if (backgroundImage === '') {
    return
  }

  const bgTint = tint
    ? 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),'
    : ''

  return {
    backgroundImage: `${bgTint} url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',

    [TABLET_BP_DOWN]: backgroundImageMobile
      ? {
          backgroundImage: `${bgTint} url(${backgroundImageMobile})`,
        }
      : {},
  }
}

export const STANDARD_COLOR_COMPONENT: ColorComponent = {
  plugin: 'hedvig_limited_color_picker',
  color: 'standard',
  _uid: 'fake',
}

interface SectionProps {
  as?: React.ElementType
  colorComponent?: ColorComponent | MinimalColorComponent
  size?: SectionSize
  backgroundImage?: string
  backgroundImageMobile?: string
  backgroundTint?: boolean
  extraStyling?: string
  brandPivot?: boolean
}
const SectionWrapperComponentUnstyled = styled('section')<SectionProps>(
  ({ colorComponent = STANDARD_COLOR_COMPONENT, size = 'lg', brandPivot }) => ({
    position: 'relative',
    transition: 'background 300ms',
    fontFamily: brandPivot ? `${fonts.FAVORIT}, sans-serif` : undefined,
    ...getSectionSizeStyle(size),
    color:
      colorComponent?.plugin === 'hedvig_minimal_color_picker'
        ? getMinimalColorStyles(colorComponent?.color ?? 'standard').color
        : getColorStyles(colorComponent?.color ?? 'standard').color,

    'h1, h2, h3, h4': brandPivot
      ? {
          fontFamily: `${fonts.FAVORIT}, sans-serif`,
          fontWeight: 400,
        }
      : {},
  }),
)
export const SectionWrapperComponent = styled(
  SectionWrapperComponentUnstyled,
)<SectionProps>`
  ${({ extraStyling = '' }) => String(extraStyling)}
`
const SectionBackground = styled('div')<{
  backgroundImage?: string
  backgroundImageMobile?: string
  tint?: boolean
  colorComponent?: ColorComponent | MinimalColorComponent
}>(({ backgroundImage, backgroundImageMobile, tint, colorComponent }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  minHeight: '100%',
  minWidth: '100%',
  backgroundColor:
    colorComponent?.plugin === 'hedvig_minimal_color_picker'
      ? getMinimalColorStyles(colorComponent.color ?? 'standard').background
      : getColorStyles(
          (colorComponent as ColorComponent | undefined)?.color ?? 'standard',
        ).background,
  ...backgroundImageStyles(
    backgroundImage || '',
    backgroundImageMobile || '',
    tint,
  ),
  zIndex: -1,
}))

export const SectionWrapper: React.FC<SectionProps> = ({
  children,
  backgroundImage,
  backgroundImageMobile,
  backgroundTint,
  ...props
}) => {
  return (
    <SectionWrapperComponent {...props}>
      <SectionBackground
        backgroundImage={backgroundImage}
        backgroundImageMobile={backgroundImageMobile}
        tint={backgroundTint}
        colorComponent={props.colorComponent}
      />
      {children}
    </SectionWrapperComponent>
  )
}

export const MarginSectionWrapper = styled('section')<SectionProps>(
  ({ colorComponent, size = 'lg', backgroundImage = 'none' }) => ({
    ...getSectionSizeStyle(size),
    ...(colorComponent?.plugin === 'hedvig_minimal_color_picker'
      ? getMinimalColorStyles(colorComponent?.color ?? 'standard')
      : getColorStyles(
          (colorComponent as ColorComponent | undefined)?.color ?? 'standard',
        )),
    ...backgroundImageStyles(backgroundImage),
  }),
)

const getContentMaxWidth = (brandPivot: boolean, fullWidth: boolean) => {
  if (fullWidth) {
    return SITE_MAX_WIDTH
  }
  if (brandPivot) {
    return CONTENT_MAX_WIDTH
  }
  return CONTENT_MAX_WIDTH_DEPRECATED
}

export const ContentWrapperStyled = styled('div')<{
  visible: boolean
  brandPivot: boolean
  fullWidth: boolean
}>(({ visible, brandPivot, fullWidth }) => ({
  width: '100%',
  padding: '0 ' + CONTENT_GUTTER,
  margin: '0 auto',

  [MOBILE_BP_DOWN]: {
    padding: '0 ' + CONTENT_GUTTER_MOBILE,
  },

  ...getContentMaxWidth(brandPivot, fullWidth),

  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(5%)',
  transition: 'opacity 800ms, transform 500ms',
}))

export interface ContentWrapperProps {
  index?: number
  brandPivot?: boolean
  fullWidth?: boolean
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  index = 0,
  brandPivot = false,
  children,
  fullWidth = false,
  ...props
}) => (
  <ReactVisibilitySensor
    partialVisibility
    offset={{
      top: -500,
      bottom: typeof window !== 'undefined' ? window.innerHeight / 6 : 0,
    }}
  >
    {({ isVisible }) => (
      <ContentWrapperStyled
        visible={index <= 2 || isVisible}
        brandPivot={brandPivot}
        fullWidth={fullWidth}
        {...props}
      >
        {children}
      </ContentWrapperStyled>
    )}
  </ReactVisibilitySensor>
)

const ErrorBlockWrapper = styled(SectionWrapper)({
  background: 'red',
  color: 'white',
})
export const ErrorBlockComponent: React.FunctionComponent<
  {
    message: string
  } & RouteComponentProps
> = ({ message, location }) =>
  location.search.includes('_storyblok=') ? (
    <ErrorBlockWrapper>
      <ContentWrapper>
        <h1>{message}</h1>
      </ContentWrapper>
    </ErrorBlockWrapper>
  ) : null

export const ErrorBlock = withRouter(ErrorBlockComponent)
