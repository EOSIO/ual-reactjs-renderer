import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'react-tooltip'
import { FaChevronRight, FaDownload } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { UALLoadingIcon } from '../misc/UALLoadingIcon'
import { boxTitles } from '../../constants/box'

import {
  authButton,
  buttonHover,
  authIcon,
  authIconWrapper,
  authText,
  authTextFont,
  chevron,
  errored,
} from '../../styles/authenticator'

import { buttonState, errorColors } from '../../constants/authentication'

/**
 * Component that provides a button for logging in with a given Authenticator.
 */
export class UALAuthButton extends Component {
  static displayName = 'UALAuthButton'

  constructor(props) {
    super(props)
    let button = buttonState.UNAVAILABLE
    if (props.instructions === boxTitles.NORMAL) {
      button = buttonState.AVAILABLE
      button = props.authenticator.isErrored() ? buttonState.ERRORED : button
      button = props.authenticator.isLoading() ? buttonState.LOADING : button
    }
    /**
     * @memberof UALAuthButton
     * @name state
     * @prop {string} icon - icon associated with authenticator
     * @prop {string} background - hexidecimal button background color
     * @prop {string} textColor - hexidecimal button text color
     * @prop {string} text - button text
     * @prop {string} button - button status
     * @prop {Object} hoverStyle - additional button style on hover
     */
    this.state = {
      ...props.authenticator.getStyle(),
      button,
    }
    /**
     * @memberof UALAuthButton
     * @name buttonStateChecker
     * @type {null|function}
     * @desc interval for checking button status during initialization
     */
    this.buttonStateChecker = null
  }

  componentDidMount() {
    const { onErroredState } = this.props
    const { button } = this.state
    if (button === buttonState.LOADING) {
      this.startButtonStateChecker()
    }
    if (button === buttonState.ERRORED) {
      onErroredState()
    }
  }

  componentDidUpdate() {
    this.checkButtonAvailability()
    this.checkButtonStatusOnRetry()
  }

  componentWillUnmount() {
    clearInterval(this.buttonStateChecker)
  }

  /**
   * @method
   * @return {Void}
   */
  checkButtonAvailability = () => {
    const { instructions } = this.props
    const { button } = this.state
    if (instructions === boxTitles.ERROR && button !== buttonState.UNAVAILABLE) {
      this.setState({ button: buttonState.UNAVAILABLE })
    }
  }

  /**
   * @method
   * @return {Void}
   */
  checkButtonStatusOnRetry = () => {
    const { instructions } = this.props
    const { button } = this.state
    if (instructions === boxTitles.NORMAL && button === buttonState.UNAVAILABLE) {
      this.setState({ button: buttonState.LOADING }, this.startButtonStateChecker)
    }
  }

  /**
   * @method
   * @return {Void}
   */
  startButtonStateChecker = () => {
    const { authenticator, onErroredState } = this.props
    this.buttonStateChecker = setInterval(() => {
      if (!authenticator.isLoading() && !authenticator.isErrored()) {
        clearInterval(this.buttonStateChecker)
        this.setState({ button: buttonState.AVAILABLE })
      } else if (authenticator.isErrored()) {
        clearInterval(this.buttonStateChecker)
        this.setState({ button: buttonState.ERRORED }, onErroredState())
      }
    }, 250)
  }

  /**
   * @method
   * @return {Void}
   */
  attemptAuthentication = () => {
    const { button } = this.state
    const { onAuthenticatorSelect, authenticator, onRequestInstall } = this.props
    if (button === buttonState.AVAILABLE) {
      onAuthenticatorSelect(authenticator)
    }
    if (button === buttonState.UNAVAILABLE) {
      onRequestInstall(authenticator)
    }
  }

  /**
   * @method
   * @return {Void}
   */
  activateGenericSize = () => {
    const { button } = this.state
    if (button === buttonState.AVAILABLE || button === buttonState.UNAVAILABLE) {
      this.setState({ hoverStyle: {} })
    }
  }

  /**
   * @method
   * @return {Void}
   */
  activateHoverSize = () => {
    const { button } = this.state
    if (button === buttonState.AVAILABLE || button === buttonState.UNAVAILABLE) {
      this.setState({ hoverStyle: buttonHover })
    }
  }

  /**
   * @method
   * @return {ReactElement}
   */
  renderIcon = () => {
    const { button } = this.state
    switch (button) {
    case buttonState.LOADING:
      return <UALLoadingIcon />
    case buttonState.ERRORED:
      return <IoMdInformationCircleOutline style={errored} />
    case buttonState.UNAVAILABLE:
      return <FaDownload />
    default:
      return <FaChevronRight />
    }
  }

  render() {
    const { icon, background, textColor, text, hoverStyle, button } = this.state
    const { authenticator } = this.props
    const trueBackground = button === buttonState.ERRORED ? errorColors.LIGHT_GREY
      : background
    const trueTextColor = button === buttonState.ERRORED ? errorColors.DARK_GREY
      : textColor
    const errorTooltip = authenticator.getError() ? authenticator.getError().message : ''
    const toolTip = errorTooltip.length > 0 && button !== buttonState.UNAVAILABLE && <Tooltip />
    return (
      <div
        onClick={this.attemptAuthentication}
        role='button'
        aria-label={text}
        tabIndex={this.props.index}
        style={{ ...authButton, background: trueBackground, ...hoverStyle, color: trueTextColor }}
        onMouseEnter={this.activateHoverSize}
        onMouseLeave={this.activateGenericSize}
        data-tip={errorTooltip}
        data-effect='solid'
      >
        {toolTip}
        <div style={authIconWrapper}><img style={authIcon} src={icon} alt='' /></div>
        <div style={authText}>
          <span style={authTextFont}>{text}</span>
          <span style={chevron}>{ this.renderIcon() }</span>
        </div>
      </div>
    )
  }
}

/**
 * @memberof UALAuthButton
 * @name props
 * @prop {string} instructions - current instructions on UAL modal
 * @prop {function} onAuthenticatorSelect - triggered when authenticator button is clicked
 * @prop {function} onRequestInstall - triggered when authenticator install button is clicked
 * @prop {function} onErroredState - triggered when authenticator initialization ends in error
 * @prop {Authenticator} authenticator - reference to current authenticator instance
 * @prop {number} index - authenticator's index in list
 */
UALAuthButton.propTypes = {
  instructions: PropTypes.string.isRequired,
  onAuthenticatorSelect: PropTypes.func.isRequired,
  onRequestInstall: PropTypes.func.isRequired,
  onErroredState: PropTypes.func.isRequired,
  authenticator: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}
