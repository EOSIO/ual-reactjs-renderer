import i18n from '../i18n'

export const boxTitles = {
  NORMAL: i18n.t('instructionsToContinue'),
  ERROR: i18n.t('noAvailableAuthenticatorsTitle'),
}

export const installGuide = i18n.t('noAvailableAuthenticatorsContent')

export const defaultBoxState = {
  containerEnter: false,
  containerExit: false,
  transitionForward: true,
  showAccountInput: false,
  showInstallScreen: false,
  authenticator: null,
  instructions: boxTitles.NORMAL,
  secondaryInstructions: '',
}
