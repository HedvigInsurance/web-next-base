import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { FooterBlock } from '../blocks/FooterBlock'
import { HeaderBlock } from '../blocks/HeaderBlock'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import { BlogStory, StoryContainer } from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'
import { ButtonLink } from '../components/buttons'
import { getStoryblokImage } from '../utils/storyblok'
import { Breadcrumb, Breadcrumbs } from '../components/Breadcrumbs'
import { truncate } from '../utils/truncate'

const TopImageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxHeight: '40vh',
  overflow: 'hidden',
})
const TopImage = styled('img')({
  width: '100%',
})

const ArticleWrapper = styled('article')({
  maxWidth: '50rem',
  margin: 'auto',

  '& img': {
    width: '100%',
    margin: '1.25rem 0',
  },

  '& blockquote': {
    backgroundColor: colors.PINK_LIGHT,
    borderRadius: 10,
    padding: '1.5rem',
    fontFamily: fonts.SORAY,
    fontSize: '2rem',
    lineHeight: 1.5,
    margin: '3rem 0',

    '@media (min-width: 797px)': {
      fontSize: '2.5rem',
      padding: '3rem',
    },

    p: {
      margin: 0,
      lineHeight: 'inherit',
    },
  },
})

const BreadcrumbsWrapper = styled('div')({
  paddingBottom: '1rem',
})

const CtaWrapper = styled('div')({
  paddingTop: '3rem',
  textAlign: 'center',

  [MOBILE_BP_DOWN]: {
    paddingTop: '1.5rem',
  },
})

export const BlogPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <StoryContainer<BlogStory>>
    {({ story }) => (
      <>
        <Helmet>{getMeta({ story, nonce })}</Helmet>

        <HeaderBlock
          is_transparent={false}
          inverse_colors={false}
          _uid="header"
          component="blog"
        />

        <TopImageWrapper>
          <TopImage src={getStoryblokImage(story.content.top_image)} />
        </TopImageWrapper>
        <SectionWrapper size="sm">
          <ContentWrapper>
            <ArticleWrapper>
              <BreadcrumbsWrapper>
                <Breadcrumbs>
                  <Breadcrumb href="/blog">Blogg</Breadcrumb>
                  <Breadcrumb>{truncate(25)(story.content.title)}</Breadcrumb>
                </Breadcrumbs>
              </BreadcrumbsWrapper>

              <h1>{story.content.title}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: story.content.content && story.content.content.html,
                }}
              />

              {story.content.show_cta && (
                <CtaWrapper>
                  <ButtonLink href={story.content.cta_target}>
                    {story.content.cta_label}
                  </ButtonLink>
                </CtaWrapper>
              )}
            </ArticleWrapper>
          </ContentWrapper>
        </SectionWrapper>

        <FooterBlock
          component="blog"
          _uid="footer"
          color={{
            _uid: 'footer',
            color: 'off-black-dark',
            plugin: 'hedvig_limited_color_picker',
          }}
        />
      </>
    )}
  </StoryContainer>
)
