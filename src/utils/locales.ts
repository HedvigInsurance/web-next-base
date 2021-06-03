type Label = string // format: 'se' / 'no-en'
type IsoCode = string // format: 'sv_SE' / 'en_NO'
type MarketLabel = string // format: 'se' / 'no'
type MarketName = string // format: 'Sverige' / 'Norway'
type LanguageLabel = string // format: 'Sv' / 'En'
type HtmlLang = string // format: 'sv' / 'en'
type HrefLang = string // format: 'sv-se' / 'en-no'

export type LocaleData = {
  label: Label
  iso: IsoCode
  marketLabel: MarketLabel
  marketName: MarketName
  langLabel: LanguageLabel
  htmlLang: HtmlLang
  hrefLang: HrefLang
  adtractionSrc?: string
  trustpilotLocale?: string
}

export type Locales = Record<Label, LocaleData>

export const locales: Locales = {
  se: {
    label: 'se',
    iso: 'sv_SE',
    marketLabel: 'se',
    marketName: 'Sverige',
    langLabel: 'Sv',
    htmlLang: 'sv',
    hrefLang: 'sv-se',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    trustpilotLocale: 'sv-SE',
  },
  'se-en': {
    label: 'se-en',
    iso: 'en_SE',
    marketLabel: 'se',
    marketName: 'Sweden',
    langLabel: 'En',
    htmlLang: 'en',
    hrefLang: 'en-se',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    trustpilotLocale: 'en-US',
  },
  no: {
    label: 'no',
    iso: 'nb_NO',
    marketLabel: 'no',
    marketName: 'Norge',
    langLabel: 'No',
    htmlLang: 'no',
    hrefLang: 'no-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    trustpilotLocale: 'nb-NO',
  },
  'no-en': {
    label: 'no-en',
    iso: 'en_NO',
    marketLabel: 'no',
    marketName: 'Norway',
    langLabel: 'En',
    htmlLang: 'en',
    hrefLang: 'en-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    trustpilotLocale: 'en-US',
  },
  dk: {
    label: 'dk',
    iso: 'da_DK',
    marketLabel: 'dk',
    marketName: 'Danmark',
    langLabel: 'Da',
    htmlLang: 'da',
    hrefLang: 'da-dk',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    trustpilotLocale: 'da-DK',
  },
  'dk-en': {
    label: 'dk-en',
    iso: 'en_DK',
    marketLabel: 'dk',
    marketName: 'Denmark',
    langLabel: 'En',
    htmlLang: 'en',
    hrefLang: 'en-dk',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    trustpilotLocale: 'en-US',
  },
}

export const fallbackLocale = locales.se

export const getLocaleData = (label: LocaleData['label']): LocaleData => {
  return locales[label] ?? fallbackLocale
}

export const getAssociatedLocales = (locale: LocaleData): LocaleData[] => {
  const currentMarket = locale.marketLabel
  return Object.values(locales).filter(
    ({ marketLabel }) => marketLabel === currentMarket,
  )
}

export const checkIsInEnglish = (locale: LocaleData): boolean => {
  return locale.langLabel === 'En'
}

export const getMarketsInLocalLang = (localesObj: Locales) => {
  return Object.values(localesObj).filter((locale) => !checkIsInEnglish(locale))
}

export const getMarketsInEnglish = (localesObj: Locales) => {
  return Object.values(localesObj).filter((locale) => checkIsInEnglish(locale))
}
