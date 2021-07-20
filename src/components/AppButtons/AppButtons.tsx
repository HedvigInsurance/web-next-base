import styled from '@emotion/styled'
import React from 'react'
import { LocaleData } from 'utils/locales'
import { ButtonLinkBrandPivot } from '../ButtonBrandPivot/Button'
import { ContextContainer } from '../containers/ContextContainer'
import { AppStore } from './svg/AppStore'
import { PlayStore } from './svg/PlayStore'

const localeToAppStoreLink = (locale: LocaleData): string => {
  return `https://apps.apple.com/${locale.marketLabel}/app/hedvig/id1303668531?itsct=apps_box_link&itscg=30200`
}

const BP_UP = '@media (min-width: 375px)'

const ButtonsWrapper = styled.div<{ center: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.center ? 'center' : 'normal')};

  ${BP_UP} {
    flex-direction: row;
  }
`

const AppButton = styled(ButtonLinkBrandPivot)`
  display: inline-flex;
  justify-content: center;
  padding: 0.625rem 1rem;
  width: 100%;

  &:first-of-type {
    margin-bottom: 0.5rem;
  }

  & > svg {
    width: 108px;
    height: 26px;
  }

  ${BP_UP} {
    padding: 0.625rem 1.625rem;
    width: auto;

    &:first-of-type {
      margin-right: 0.5rem;
      margin-bottom: 0;
    }

    &:last-of-type {
      margin-left: 0.5rem;
    }

    & > svg {
      width: 99px;
      height: 25px;
    }
  }
`
interface AppButtonsProps {
  color?: 'standard' | 'standard-inverse'
  alignCenter?: boolean
}

export const AppButtons: React.FC<AppButtonsProps> = ({
  color = 'standard-inverse',
  alignCenter = false,
}) => {
  return (
    <ContextContainer>
      {({ currentLocale }) => (
        <ButtonsWrapper center={alignCenter}>
          <AppButton
            color={color}
            styleType="outlined"
            size="sm"
            href="https://play.google.com/store/apps/details?id=com.hedvig.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStore />
          </AppButton>
          <AppButton
            color={color}
            styleType="outlined"
            size="sm"
            href={localeToAppStoreLink(currentLocale)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppStore />
          </AppButton>
        </ButtonsWrapper>
      )}
    </ContextContainer>
  )
}
