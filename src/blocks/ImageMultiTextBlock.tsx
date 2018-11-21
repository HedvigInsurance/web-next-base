import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 800px)'

const Wrapper = styled('div')(
  ({ imagePosition }: { imagePosition: 'left' | 'right' }) => ({
    display: 'flex',
    flexDirection: imagePosition === 'left' ? 'row' : 'row-reverse',
    alignItems: 'center',

    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
)

const Col = styled('div')(({ pad }: { pad: 'left' | 'right' }) => ({
  width: '50%',
  paddingLeft: pad === 'left' ? '1rem' : 0,
  paddingRight: pad === 'right' ? '1rem' : 0,
  [TABLET_BP_DOWN]: {
    padding: 0,
    width: 'auto',
  },
}))

const Title = styled('h3')({
  fontSize: 20,
})

const TextContent = styled('div')({
  'p:first-of-type': {
    marginTop: 0,
  },
})

export interface ImageMultiTextBlockProps extends BaseBlockProps {
  image_position: 'left' | 'right'
  image: string
  text_items: ReadonlyArray<
    BaseBlockProps & { paragraph: MarkdownHtmlComponent; title: string }
  >
}

export const ImageMultiTextBlock: React.FunctionComponent<
  ImageMultiTextBlockProps
> = ({ color, image, image_position, text_items }) => (
  <SectionWrapper color={color && color.color} size="sm">
    <ContentWrapper>
      <Wrapper imagePosition={image_position}>
        <Col pad={image_position === 'left' ? 'right' : 'left'}>
          <img src={image} />
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