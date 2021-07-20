import styled from '@emotion/styled'
import React, { useRef, useState, useCallback } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  getMarketsInLocalLang,
  getMarketsInEnglish,
  checkIsInEnglish,
  locales,
  LocaleData,
} from 'utils/locales'
import { ButtonBrandPivot } from 'components/ButtonBrandPivot/Button'
import { Globe } from 'components/icons/Globe'
import { Chevron } from 'components/icons/Chevron'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import { useClickOutside } from './useClickOutside'

const Wrapper = styled.div`
  position: relative;
`

const Button = styled(ButtonBrandPivot)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 15rem;

  ${MOBILE_BP_UP} {
    width: 100%;
  }
`

const GlobeIcon = styled(Globe)`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-left: -0.875rem;
`

const ButtonLabel = styled.div`
  flex: 1;
  padding-left: 0.5rem;
  text-align: left;
`

const Menu = styled.ul`
  position: absolute;
  width: 100%;
  background: ${colorsV3.gray900};
  border: 1px solid ${colorsV3.white};
  border-radius: 8px;
  padding: 0;
  margin: 0.5rem 2px 0;
  max-width: 15rem;
`

const MenuItem = styled.li`
  list-style: none;
  height: 3rem;
  padding: 0.75rem 1.5rem;
`

const MenuItemLink = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;

  &:hover {
    opacity: 0.7;
  }
`

interface MarketPickerProps {
  currentLocale: LocaleData
}

const sortMarketsAlphabetically = (markets: LocaleData[]) => {
  return markets.sort((a, b) => (a.label < b.label ? -1 : 1))
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLocale,
}) => {
  const wrapperRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = useCallback(() => setIsOpen(false), [])
  useClickOutside(wrapperRef, handleClose)

  const currentMarketName = currentLocale.marketName
  const marketsInLocalLang = getMarketsInLocalLang(locales)
  const marketsInEnglish = getMarketsInEnglish(locales)

  const markets = checkIsInEnglish(currentLocale)
    ? sortMarketsAlphabetically(marketsInEnglish)
    : sortMarketsAlphabetically(marketsInLocalLang)

  return (
    <Wrapper ref={wrapperRef}>
      <Button
        size="sm"
        styleType="outlined"
        color="standard-inverse"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <GlobeIcon />
        <ButtonLabel>{currentMarketName}</ButtonLabel>
        <Chevron />
      </Button>

      <Menu style={{ display: isOpen ? 'block' : 'none' }}>
        {markets.map((market) => (
          <MenuItem key={market.label}>
            <MenuItemLink
              href={`/${market.marketLabel}`}
              hrefLang={market.hrefLang}
            >
              {market.marketName}
            </MenuItemLink>
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  )
}
