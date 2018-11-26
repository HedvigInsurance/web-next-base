import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { SectionSize, SectionSizeProps } from 'src/utils/SectionSize'
import { TextPosition } from 'src/utils/textPosition'
import { ButtonLink } from '../components/buttons'
import { getStoryblokLinkUrl } from '../utils/storyblok-link'

const ButtonLinkWithMargin = styled(ButtonLink)({
  marginTop: '1.7rem',
})

const AlignableContentWrapper = styled(ContentWrapper)(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'right' ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

const TextWrapper = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    textAlign: textPosition === 'center' ? 'center' : 'left',
    width: '100%',
    paddingRight: textPosition === 'left' ? '7rem' : '0',
    paddingLeft: textPosition === 'right' ? '7rem' : '0',
    [TABLET_BP_DOWN]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
)

const Title = styled('h2')(
  ({
    size,
    displayOrder,
  }: SectionSizeProps & { displayOrder: 'top' | 'bottom' }) => ({
    fontSize: size === 'xl' ? '4.5rem' : '2.5rem',
    width: '100%',
    [TABLET_BP_DOWN]: {
      fontSize: size === 'xl' ? '3.75rem' : '2rem',
      marginTop: displayOrder === 'top' ? '3rem' : '1.414rem',
    },
  }),
)

const Paragraph = styled('div')(({ size }: SectionSizeProps) => ({
  fontSize: size === 'xl' ? '1.125rem' : '1rem',
  marginTop: '1.5rem',
}))

const Image = styled('img')(
  ({
    alignment,
    displayOrder,
  }: {
    alignment: string
    displayOrder: 'top' | 'bottom'
  }) => ({
    width: '40%',
    display: alignment === 'center' ? 'none' : 'block',
    [TABLET_BP_DOWN]: {
      width: '100%',
      marginTop: displayOrder === 'top' ? '0' : '3rem',
      display: 'block',
      order: displayOrder === 'top' ? -1 : 'initial',
    },
  }),
)

interface ImageTextBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
  text_position: TextPosition
  button_title: string
  button_type: 'filled' | 'outlined'
  button_link: LinkComponent
  show_button: boolean
  image: string
  size: SectionSize
  media_position: 'top' | 'bottom'
}

export const ImageTextBlock: React.FunctionComponent<ImageTextBlockProps> = ({
  title,
  paragraph,
  text_position,
  button_title,
  button_type,
  button_link,
  show_button,
  image,
  color,
  size,
  media_position,
}) => {
  return (
    <SectionWrapper color={color && color.color} size={size}>
      <AlignableContentWrapper textPosition={text_position}>
        <TextWrapper textPosition={text_position}>
          <Title size={size} displayOrder={media_position}>
            {title}
          </Title>
          <Paragraph
            size={size}
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          {show_button && (
            <ButtonLinkWithMargin
              href={getStoryblokLinkUrl(button_link)}
              type={button_type}
              size="sm"
              bold
            >
              {button_title}
            </ButtonLinkWithMargin>
          )}
        </TextWrapper>
        <Image
          alignment={text_position}
          displayOrder={media_position}
          src={image}
        />
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
