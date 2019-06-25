import { ActionMap, Container } from 'constate'
import isIOS from 'is-ios'
import * as React from 'react'
import styled from 'react-emotion'

import {
  CONTENT_GUTTER,
  CONTENT_GUTTER_MOBILE,
  CONTENT_MAX_WIDTH,
  MOBILE_BP_DOWN,
} from '../../components/blockHelpers'
import { BaseBlockProps, ColorComponent } from '../BaseBlockProps'
import { CloseButton } from './CloseButton'
import { Player } from './Player'
import { Title } from './Title'

interface HeroVideoBlockProps extends BaseBlockProps {
  video_file_location: string
  headline: string
  title: string
  play_button_text: string
  background_color: ColorComponent
  use_text_drop_shadow: boolean
  use_shadow: boolean
}

const Background = styled('div')(
  ({
    backgroundColor,
    useTextDropShadow,
  }: {
    backgroundColor: string
    useTextDropShadow: boolean
  }) => ({
    backgroundColor,
    textShadow: useTextDropShadow ? '1px 1px 3px rgba(0, 0, 0, .5)' : undefined,
  }),
)

const HeroContainer = styled('div')({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  ...CONTENT_MAX_WIDTH,
})

interface ShadowProps {
  useShadow: boolean
  hidden: boolean
}

const Shadow = styled('div')(
  {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    padding: CONTENT_GUTTER,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'opacity 1000ms',

    [MOBILE_BP_DOWN]: {
      padding: CONTENT_GUTTER_MOBILE,
    },
  },
  ({ useShadow, hidden }: ShadowProps) => ({
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? 'none' : 'all',
    backgroundColor: useShadow ? 'rgba(0,0,0,0.7)' : undefined,
  }),
)

interface State {
  isFullScreen: boolean
  videoRef: React.RefObject<HTMLVideoElement>
}

interface Actions {
  setFullScreen: (isFullScreen: boolean) => void
  setVideoRef: (videoRef: React.RefObject<HTMLVideoElement>) => void
}

const actions: ActionMap<State, Actions> = {
  setFullScreen: (isFullScreen) => () => ({
    isFullScreen,
  }),
  setVideoRef: (videoRef) => () => ({
    videoRef,
  }),
}

const onPlay = ({
  videoRef,
  setFullScreen,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
  setFullScreen: (isFullScreen: boolean) => void
}) => () => {
  if (videoRef.current && isIOS) {
    const video = videoRef.current
    video.muted = false
    video.pause()
    video.currentTime = 0
    video.play()
    video.webkitEnterFullscreen()
    return
  }

  setFullScreen(true)
}

export const HeroVideoBlock: React.FunctionComponent<HeroVideoBlockProps> = ({
  headline,
  title,
  play_button_text,
  video_file_location,
  background_color,
  use_text_drop_shadow,
  use_shadow,
}) => (
  <Background
    backgroundColor={background_color.color}
    useTextDropShadow={use_text_drop_shadow}
  >
    <Container
      actions={actions}
      initialState={{
        isFullScreen: false,
        videoRef: React.createRef<HTMLVideoElement>(),
      }}
    >
      {({ isFullScreen, setFullScreen, videoRef }) => (
        <HeroContainer>
          <Player
            isFullScreen={isFullScreen}
            videoRef={videoRef}
            baseVideoUrl={video_file_location}
            backgroundColor={background_color.color}
          />
          <Shadow useShadow={use_shadow} hidden={isFullScreen}>
            <Title
              headline={headline}
              title={title}
              playButtonText={play_button_text}
              clickedPlayButton={onPlay({ videoRef, setFullScreen })}
            />
          </Shadow>
          <CloseButton
            onClick={() => setFullScreen(false)}
            hidden={!isFullScreen}
          />
        </HeroContainer>
      )}
    </Container>
  </Background>
)