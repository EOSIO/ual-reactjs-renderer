import React from 'react'
import i18n from '../../i18n'

import { UALAccountInput } from '../authentication/UALAccountInput'
import { UALAuthButton } from '../authentication/UALAuthButton'
import { UALLearnMore } from '../info/UALLearnMore'
import { UALExitButton } from '../misc/UALExitButton'
import { UALErrorMessage } from '../info/UALErrorMessage'
import { UALLoadingIcon } from '../misc/UALLoadingIcon'
import { UALInstallAuth } from '../authentication/UALInstallAuth'

import { title, titleSecondary } from '../../styles/title'
import { backButton, backButtonWrapper, backButtonText } from '../../styles/buttons/back'
import { retryButton } from '../../styles/buttons/retry'
import { secondaryInstructionsText, secondaryInstructionsLight } from '../../styles/instructions'
import { darkenColor } from '../../utils'

/**
 * @class
 * @name UALBoxParts
 * @desc class for rendering sections of the UALBox Component 
 */
export class UALBoxParts {
  /**
   * returns an instance of UALAuthButton
   * @memberof UALBoxParts
   * @method
   * @name authButton
   * @return {ReactElement}
   */
  static authButton(authenticator, index, instructions, authenticate, checkAuthenticators, enterInstallScreen) {
    return (
      <UALAuthButton
        key={index}
        index={index}
        instructions={instructions}
        onErroredState={checkAuthenticators}
        authenticator={authenticator}
        onAuthenticatorSelect={authenticate}
        onRequestInstall={enterInstallScreen}
      />
    )
  }

  /**
   * returns an instance of UALAuthInput
   * @memberof UALBoxParts
   * @method
   * @name accountLogin
   * @return {ReactElement}
   */
  static accountLogin(submitAccountForLogin, loading, authenticator) {
    return (
      <UALAccountInput
        submitAccountForLogin={submitAccountForLogin}
        authenticator={authenticator}
        loading={loading}
      />
    )
  }

  /**
   * returns the secondary instructions for a given screen
   * @memberof UALBoxParts
   * @method
   * @name secondaryInstructions
   * @return {HTML}
   */
  static secondaryInstructions({ secondaryInstructions, showInstallScreen }, refreshBox) {
    const retry = (
      <strong
        role='button'
        aria-label='Go Back'
        tabIndex='-1'
        style={retryButton}
        onClick={refreshBox}
      >
        {i18n.t('retry')}
      </strong>
    )
    if (secondaryInstructions !== '') {
      const trueStyle = showInstallScreen ? secondaryInstructionsLight : secondaryInstructionsText
      return (
        <p style={trueStyle}>
          {secondaryInstructions}
          {'  '}
          {!showInstallScreen && retry}
          {!showInstallScreen && '.'}
        </p>
      )
    }
    return null
  }

  /**
   * returns an instance of UALInstallAuth
   * @memberof UALBoxParts
   * @method
   * @name installAuthenticatorSection
   * @return {ReactElement}
   */
  static installAuthenticatorSection(authenticator) {
    return <UALInstallAuth authenticator={authenticator} />
  }

  /**
   * returns a back-button DOM element
   * @memberof UALBoxParts
   * @method
   * @name backButton
   * @return {HTML}
   */
  static backButton({ showAccountInput, error, loading, logout, showInstallScreen }, goBackToAuthSelect) {
    const goBackAction = error ? logout : goBackToAuthSelect
    if ((error || showAccountInput || showInstallScreen) && !loading) {
      return (
        <p style={backButtonWrapper}>
          <span role='button' aria-label='Go Back' tabIndex='-1' style={backButton} onClick={goBackAction}>
            <strong style={backButtonText}>{i18n.t('goBack')}</strong>
          </span>
        </p>
      )
    }
    return null
  }

  /**
   * returns instructions on dealing with no available authenticators
   * @memberof UALBoxParts
   * @method
   * @name noAvailableAuthenticators
   * @return {HTML}
   */
  static noAvailableAuthenticators() {
    return (
      <p
        style={secondaryInstructionsText}
      >
        {i18n.t('noAuthenticatorsAvailableForDevice')}
      </p>
    )
  }

  /**
   * returns the main content of UALBox
   * @memberof UALBoxParts
   * @method
   * @name mainContent
   * @return {ReactElement[]}
   */
  static mainContent(app, authenticate, checkAuthenticators, enterInstallScreen) {
    const {
      submitAccountForLogin,
      authenticator,
      loading,
      error,
      showAccountInput,
      showInstallScreen,
      availableAuthenticators,
      instructions,
    } = app
    const authProps = [
      authenticate,
      checkAuthenticators,
      enterInstallScreen,
    ]
    let mainContent = !loading
      ? availableAuthenticators.map((auth, index) => this.authButton(auth, index, instructions, ...authProps))
      : <UALLoadingIcon withContainer />
    if (!loading && !availableAuthenticators.length) {
      mainContent = this.noAvailableAuthenticators()
    }
    if (showAccountInput || showInstallScreen) {
      mainContent = showInstallScreen
        ? this.installAuthenticatorSection(authenticator)
        : this.accountLogin(submitAccountForLogin, loading, authenticator)
    }
    return !error && mainContent
  }

  /**
   * returns an instance of UALErrorMessage
   * @memberof UALBoxParts
   * @method
   * @name errorMessage
   * @return {ReactElement}
   */
  static errorMessage({ error }) {
    if (error) {
      return <UALErrorMessage error={error} />
    }
    return null
  }

  /**
   * returns an instance of UALLearnMore
   * @memberof UALBoxParts
   * @method
   * @name learnMore
   * @return {ReactElement}
   */
  static learnMore({ showAccountInput, showInstallScreen, error, loading }) {
    if (!showAccountInput && !error && !loading && !showInstallScreen) {
      return <UALLearnMore />
    }
    return null
  }

  /**
   * returns the background color for a given screen
   * @memberof UALBoxParts
   * @method
   * @name boxBackground
   * @return {Object}
   */
  static boxBackground({ error, loading, showAccountInput, showInstallScreen, activeAuthenticator, authenticator }) {
    let authenticatorStyle = activeAuthenticator && activeAuthenticator.getStyle().background
    let background = {}
    if (!authenticatorStyle) {
      authenticatorStyle = authenticator && authenticator.getStyle().background
    }
    if (showAccountInput || loading || showInstallScreen || error) {
      background = {
        backgroundColor: darkenColor(authenticatorStyle)
      }
    }
    return background
  }

  /**
   * returns the main title of a screen of UALBox
   * @memberof UALBoxParts
   * @method
   * @name boxTitle
   * @return {HTML}
   */
  static boxTitle({ error, instructions, showAccountInput, showInstallScreen, loading, message }) {
    const boxTitle = error ? i18n.t('errorDuring', { src: error.source, type: error.type.toLowerCase() }) : instructions
    const titleStyle = error || showAccountInput || loading || showInstallScreen ? titleSecondary : title
    const titleContent = !loading || error ? boxTitle : message
    return <h1 style={titleStyle}>{titleContent}</h1>
  }

  /**
   * returns an instance of UALExitButton
   * @memberof UALBoxParts
   * @method
   * @name exitButton
   * @return {ReactElement}
   */
  static exitButton({ error, showAccountInput, showInstallScreen, loading, hideModal }) {
    return (
      <UALExitButton
        isSecondaryStyle={!!error || showAccountInput || !!loading || showInstallScreen}
        hideModal={hideModal}
      />
    )
  }
}
