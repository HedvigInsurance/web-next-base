import styled from '@emotion/styled'
import * as React from 'react'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image as StoryblokImage } from '../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 800px)'

const Wrapper = styled('div')<{ imagePosition: 'left' | 'right' }>(
  ({ imagePosition }) => ({
    display: 'flex',
    flexDirection: imagePosition === 'left' ? 'row' : 'row-reverse',
    alignItems: 'center',

    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
)

const Col = styled('div')<{ pad: 'left' | 'right' }>(({ pad }) => ({
  width: '50%',
  paddingLeft: pad === 'left' ? '1rem' : 0,
  paddingRight: pad === 'right' ? '1rem' : 0,
  [TABLET_BP_DOWN]: {
    padding: 0,
    width: '100%',
  },
}))

const Image = styled(DeferredImage)<{ pull: 'left' | 'right' }>(({ pull }) => ({
  display: 'block',
  marginLeft: pull === 'left' ? undefined : 'auto',
  marginRight: pull === 'right' ? undefined : 'auto',
}))

const Title = styled('h3')({
  marginTop: 0,
  fontSize: '1.25rem',
})

const TextContent = styled('div')({
  'p:first-of-type': {
    marginTop: 0,
  },
})

export interface ImageMultiTextBlockProps extends BaseBlockProps {
  image_position: 'left' | 'right'
  image: StoryblokImage
  text_items: ReadonlyArray<
    BaseBlockProps & { paragraph: MarkdownHtmlComponent; title: string }
  >
}

export const ImageMultiTextBlock: React.FunctionComponent<ImageMultiTextBlockProps> = ({
  color,
  size,
  extra_styling,
  image,
  image_position,
  text_items,
}) => (
  <SectionWrapper
    color={color && color.color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper>
      <Wrapper imagePosition={image_position}>
        <Col pad={image_position === 'left' ? 'right' : 'left'}>
          <Image pull={image_position} src={getStoryblokImage(image)} />
        </Col>
        <Col pad={image_position === 'left' ? 'left' : 'right'}>
          {text_items.map((item) => (
            <TextContent key={item._uid}>
              <Title>{item.title}</Title>
              <div dangerouslySetInnerHTML={{ __html: item.paragraph.html }} />
            </TextContent>
          ))}
        </Col>
      </Wrapper>
    </ContentWrapper>
  </SectionWrapper>
)
