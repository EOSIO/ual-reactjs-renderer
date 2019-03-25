import React, { Component } from 'react'
import PropTypes from 'prop-types'

import i18n from '../../i18n'

import { UALContainer } from './UALContainer'
import { withUAL } from '../provider/UALContext'
import { UALBoxParts } from './UALBoxParts'

import { box } from '../../styles/box'
import { titleWrapper } from '../../styles/title'
import { mediaQuery } from '../../styles/mediaQuery'

import { boxTitles, installGuide, defaultBoxState } from '../../constants/box'

/**
 * Component for rendering the box containing the AuthButtons, account input, and handling
 * basic preparatory authentication logic
 */
class UALBoxBase extends Component {
  static displayName = 'UALBoxBase'

  constructor(props) {
    super(props)
    this.state = defaultBoxState
  }

  componentDidMount() {
    const { ual: { activeUser, modal, hideModal } } = this.props
    if (activeUser && modal) {
      hideModal()
    } else {
      setTimeout(() => this.setState({ containerEnter: true }), 300)
    }
  }

  componentDidUpdate() {
    const { ual: { activeUser, modal, hideModal } } = this.props
    if (activeUser && modal) {
      hideModal()
    }
  }

  /**
   * Attempts authentication
   * @method
   * @return {Void}
   * @param {Authenticator} authenticator
   */
  authenticate = async (authenticator) => {
    const { ual: { authenticateWithoutAccountInput } } = this.props
    const needsAccountName = await authenticator.shouldRequestAccountName()
    if (needsAccountName) {
      this.authenticateWithAccountInput(authenticator)
    } else {
      authenticateWithoutAccountInput(authenticator)
    }
  }

  /**
   * Checks if all available authenticators have errored
   * @method
   * @return {Void}
   */
  checkAuthenticators = () => {
    const { availableAuthenticators } = this.props.ual
    const nonErroredAuthenticators = availableAuthenticators.filter(auth => !auth.isErrored())
    if (!nonErroredAuthenticators.length) {
      this.setState({
        instructions: boxTitles.ERROR,
        secondaryInstructions: installGuide,
      })
    }
  }

  /**
   * Transitions to authenticator's account input screen
   * @method
   * @return {Void}
   * @param {Authenticator} authenticator
   */
  authenticateWithAccountInput = (authenticator) => {
    const loginState = {
      containerEnter: true,
      showAccountInput: true,
      showInstallScreen: false,
      instructions: i18n.t('enterUsername'),
      secondaryInstructions: '',
    }
    this.setState({
      authenticator,
      containerExit: true,
      containerEnter: false,
      transitionForward: true,
    },
    this.transitionToReset(loginState))
  }

  /**
   * Transitions to authenticator's install screen
   * @method
   * @return {Void}
   * @param {Authenticator} authenticator
   */
  enterInstallScreen = (authenticator) => {
    const authName = authenticator.getStyle().text
    const secondaryInstructions = i18n.t('getStarted', { authName })
    const installState = {
      containerEnter: true,
      showInstallScreen: true,
      showAccountInput: false,
      instructions: i18n.t('welcomeAccount', { authName }),
      secondaryInstructions,
    }
    this.setState({
      authenticator,
      containerExit: true,
      containerEnter: false,
      transitionForward: true,
    },
    this.transitionToReset(installState))
  }

  /**
   * Returns to authenticator select screen
   * @method
   * @return {Void}
   */
  goBackToAuthSelect = () => {
    const { showInstallScreen } = this.state
    const instructions = showInstallScreen ? boxTitles.ERROR : boxTitles.NORMAL
    const secondaryInstructions = showInstallScreen ? installGuide : ''
    const previousSelectState = {
      containerEnter: true,
      showAccountInput: false,
      showInstallScreen: false,
      instructions,
      secondaryInstructions,
    }
    this.setState({
      containerExit: true,
      containerEnter: false,
      transitionForward: false,
    },
    this.transitionToReset(previousSelectState))
  }

  /**
   * Attempts authentication
   * @method
   * @return {Void}
   * @param {Authenticator} authenticator
   */
  refreshBox = () => {
    const { restart } = this.props.ual
    this.setState({ ...defaultBoxState, containerEnter: true }, restart)
  }

  /**
   * @method
   * @return {Void}
   * @param {Object} nextState
   */
  resetContainer = (nextState) => {
    this.setState({ containerExit: false, containerEnter: false }, this.transitionToComplete(nextState))
  }

  /**
   * @method
   * @return {Void}
   * @param {Object} nextState
   */
  transitionToReset = (nextState) => {
    setTimeout(() => { this.resetContainer(nextState) }, 300)
  }

  /**
   * @method
   * @return {Void}
   * @param {Object} nextState
   */
  transitionToComplete = (nextState) => {
    setTimeout(() => { this.setState(nextState) }, 50)
  }

  render() {
    const {
      containerEnter,
      containerExit,
      transitionForward,
      ...state
    } = this.state
    const { ual } = this.props
    const app = { ...state, ...ual }
    const background = UALBoxParts.boxBackground(app)
    return (
      <div id='ual-box' style={{ ...box, ...background }}>
        {UALBoxParts.exitButton(app)}
        <div style={titleWrapper}>
          {UALBoxParts.boxTitle(app)}
        </div>
        <UALContainer enter={containerEnter} exit={containerExit} transitionForward={transitionForward}>
          {UALBoxParts.secondaryInstructions(app, this.refreshBox)}
          {UALBoxParts.mainContent(app, this.authenticate, this.checkAuthenticators, this.enterInstallScreen)}
          {UALBoxParts.errorMessage(ual)}
          {UALBoxParts.backButton(app, this.goBackToAuthSelect)}
          {UALBoxParts.learnMore(app)}
        </UALContainer>
        <style>{ mediaQuery }</style>
      </div>
    )
  }
}

export const UALBox = withUAL(UALBoxBase)

/**
 * @typeDef ual
 * @desc the ual context that UALBox consumes
 * @prop {Chain[]} chains - chain list from props
 * @prop {Authenticator[]} authenticators - authenticator instances from props
 * @prop {Authenticator[]} availableAuthenticators - available authenticator list
 * @prop {boolean} loading - loading state of UAL
 * @prop {User} activeUser - logged in user
 * @prop {string} message - message, if any, accompanying current UAL state
 * @prop {function} broadcastStatus - dispatches a provider state update
 * @prop {function} hideModal - hides the modal
 * @prop {boolean} modal - whether or not show modal, initialized via props
 * @prop {string} appName - name of app
 * @prop {function} logout - logs user out of authenticator and resets UAL state
 * @prop {function} restart - resets all available authenticators and resets UAL state
 * @prop {UALError|null} error - captured error if any
 * @prop {function} authenticateWithoutAccountInput - attempts authentication with an authenticator not requiring account input
 * @prop {function} submitAccountForLogin - attempts authentication
 */
/**
 * @memberof UALBoxBase
 * @name props
 * @prop {ual} ual
 */
UALBoxBase.propTypes = {
  ual: PropTypes.shape({
    chains: PropTypes.arrayOf(PropTypes.object).isRequired,
    authenticators: PropTypes.arrayOf(PropTypes.object).isRequired,
    availableAuthenticators: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool.isRequired,
    activeUser: PropTypes.object, // eslint-disable-line
    message: PropTypes.string.isRequired,
    broadcastStatus: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    modal: PropTypes.bool.isRequired,
    appName: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    restart: PropTypes.func.isRequired,
    error: PropTypes.object,
    authenticateWithoutAccountInput: PropTypes.func.isRequired,
    submitAccountForLogin: PropTypes.func.isRequired,
  }).isRequired,
}
