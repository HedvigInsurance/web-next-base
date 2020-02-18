import styled from '@emotion/styled'
import * as React from 'react'
import { TextPosition } from 'src/utils/textPosition'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

interface IconBulletPointItemBlockProps {
  _uid: string
  title: string
  paragraph: MarkdownHtmlComponent
  icon?: Image
}

interface BulletPointBlockProps extends BaseBlockProps {
  title: string
  title_position: TextPosition
  bullet_points: IconBulletPointItemBlockProps[]
}

const Paragraph = styled('div')({
  width: '100%',
})

const IconBulletPointItem = styled('div')<{ contentAlignment: string }>(
  ({ contentAlignment }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: contentAlignment === 'center' ? 'center' : 'start',
    width: 'calc(100% / 3)',
    textAlign: 'left',
    ':nth-child(n+4)': {
      marginTop: '3rem',
    },
    [TABLET_BP_DOWN]: {
      width: '50%',
      ':nth-child(n+3)': {
        marginTop: '3rem',
      },
    },
    [MOBILE_BP_DOWN]: {
      width: '100%',
      ':nth-child(n+2)': {
        marginTop: '3rem',
      },
    },
  }),
)

const Icon = styled('img')({
  display: 'block',
  flexShrink: 0,
  width: '5rem',
  marginRight: '0.625rem',
  marginTop: '1.414rem',
  marginBottom: '0.5rem',
  [MOBILE_BP_DOWN]: {
    marginLeft: '-3rem',
  },
})

const BulletPointTitle = styled('h4')({
  fontSize: '1.25rem',
})

const AlignableContent = styled(ContentWrapper)<{
  titlePosition: TextPosition
}>(({ titlePosition }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: titlePosition === 'center' ? 'center' : 'left',
}))

const MainTitle = styled('h2')({
  marginTop: 0,
  marginBottom: '1.586rem',
  [MOBILE_BP_DOWN]: {
    textAlign: 'left',
  },
})

const BulletPointList = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  [MOBILE_BP_DOWN]: {
    flexDirection: 'column',
  },
})

export const IconBulletPointBlock: React.FunctionComponent<BulletPointBlockProps> = ({
  color,
  size,
  extra_styling,
  title,
  title_position,
  bullet_points,
  index,
}) => {
  return (
    <SectionWrapper
      color={color && color.color}
      size={size}
      extraStyling={extra_styling}
    >
      <AlignableContent titlePosition={title_position} index={index}>
        <MainTitle>{title}</MainTitle>
        <BulletPointList>
          {bullet_points.map(
            ({ _uid, title: bulletPointTitle, paragraph, icon }) => {
              return (
                <IconBulletPointItem
                  contentAlignment={title_position}
                  key={_uid}
                >
                  <Icon src={getStoryblokImage(icon) || ''} />
                  <div>
                    <BulletPointTitle>{bulletPointTitle}</BulletPointTitle>
                    {
                      <Paragraph
                        dangerouslySetInnerHTML={{
                          __html: paragraph.html,
                        }}
                      />
                    }
                  </div>
                </IconBulletPointItem>
              )
            },
          )}
        </BulletPointList>
      </AlignableContent>
    </SectionWrapper>
  )
}
