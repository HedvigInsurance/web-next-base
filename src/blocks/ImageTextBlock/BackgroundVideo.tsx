import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import MediaQuery from 'react-responsive'
import { backgroundImageStyles } from '../../components/blockHelpers'

interface BackgroundProps {
  backgroundColor: string
}

const fadeInKeyframe = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const HeightContainer = styled('div')(
  ({ backgroundColor }: BackgroundProps) => ({
    animation: `${fadeInKeyframe} 2000ms forwards`,
    transition: 'height 1500ms, padding 1500ms',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  }),
)

const BackgroundImage = styled('div')(({ image }: { image: string }) => ({
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  ...backgroundImageStyles(image),
}))

const VideoWrapper = styled('div')({
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
})

const Video = styled('video')({
  width: '100%',
  objectFit: 'cover',
  transition: 'height 1500ms',
  overflow: 'hidden',
  borderRadius: 0.01,
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  height: '100%',
  '@media(min-width: 1500px)': {
    height: '110vh',
  },
})

interface PlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>
  mobileVideoRef: React.RefObject<HTMLVideoElement>
  baseMobileVideoUrl: string
  baseVideoUrl: string
  desktopImage: string
  mobileImage: string
}

interface VideoItemProps {
  videoUrl: string
  videoRef: React.RefObject<HTMLVideoElement>
}

const VideoItem: React.FunctionComponent<VideoItemProps> = ({
  videoUrl,
  videoRef,
}) => (
  <VideoWrapper>
    <Video
      poster={`${videoUrl}.png`}
      innerRef={videoRef}
      playsInline
      autoPlay
      muted={true}
      loop={true}
      controls={false}
    >
      <source src={`${videoUrl}.m3u8`} type="application/vnd.apple.mpegurl" />
      <source src={`${videoUrl}.mp4`} type="video/mp4" />
      <source src={`${videoUrl}.webm`} type="video/webm" />
    </Video>
  </VideoWrapper>
)

export const BackgroundVideo: React.SFC<PlayerProps & BackgroundProps> = ({
  videoRef,
  mobileVideoRef,
  desktopImage,
  mobileImage,
  baseVideoUrl,
  baseMobileVideoUrl,
  backgroundColor,
}) => (
  <HeightContainer backgroundColor={backgroundColor}>
    <MediaQuery query="(max-width: 700px)">
      {baseMobileVideoUrl ? (
        <VideoItem videoUrl={baseMobileVideoUrl} videoRef={mobileVideoRef} />
      ) : (
        mobileImage && <BackgroundImage image={mobileImage} />
      )}
    </MediaQuery>
    <MediaQuery query="(min-width: 701px)">
      {baseVideoUrl ? (
        <VideoItem videoUrl={baseVideoUrl} videoRef={videoRef} />
      ) : (
        desktopImage && <BackgroundImage image={desktopImage} />
      )}
    </MediaQuery>
  </HeightContainer>
)
