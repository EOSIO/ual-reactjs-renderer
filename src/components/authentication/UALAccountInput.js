import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import i18n from '../../i18n'

import { UALLoadingIcon } from '../misc/UALLoadingIcon'

import { inputWrapper, inputStyle, buttonEnabled, buttonDisabled } from '../../styles/input'
import { buttonHover } from '../../styles/authenticator'
import { buttonText } from '../../styles/installation'

export const StyledInput = styled.input`
  &::-webkit-input-placeholder {
    color: rgba(255,255,255,0.5);
  }
`

/**
 * Component for the account name input field.
 */
export class UALAccountInput extends Component {
  static displayName = 'UALAccountInput'

  constructor(props) {
    super(props)
    /**
     * @memberof UALAccountInput
     * @name state
     * @prop {string} accountInput - currently entered account input
     * @prop {Object} hoverStyle - additional button style on hover
     */
    this.state = {
      accountInput: '',
      hoverStyle: {},
    }
    /**
     * @memberof UALAccountInput
     * @name validator
     * @type {RegExp}
     * @desc used to validate account input against chain constraints
     */
    this.validator = new RegExp(/[a-z1-5]{1}[.a-z1-5]{0,11}/)
  }

  componentDidMount() {
    setTimeout(() => {
      this.inputField.focus()
    }, 300)
  }

  /**
   * @method
   * @return {Void}
   * @param {Event} e
   */
  submitFromKeyboard = (e) => {
    const { submitAccountForLogin, authenticator } = this.props
    const { accountInput } = this.state
    return (e.which === 13 || e.keyCode === 13) && submitAccountForLogin(accountInput, authenticator)
  }

  /**
   * @method
   * @return {Void}
   * @param {Event} e
   */
  updateButtonWithInput = (e) => {
    const accountInput = e.target.value
    const isValid = accountInput.match(this.validator) && accountInput.match(this.validator)[0] === accountInput
    if (isValid || !accountInput.length) {
      this.setState({ accountInput })
    }
  }

  /**
   * @method
   * @return {Void}
   */
  activateGenericSize = () => {
    this.setState({ hoverStyle: {} })
  }

  /**
   * @method
   * @return {Void}
   */
  activateHoverSize = () => {
    if (this.state.accountInput !== '') {
      this.setState({ hoverStyle: buttonHover })
    }
  }

  /**
   * @method
   * @return {ReactElement}
   */
  renderInput = () => {
    const { accountInput, hoverStyle } = this.state
    const { submitAccountForLogin, authenticator } = this.props
    const buttonStyle = accountInput !== '' ? buttonEnabled : buttonDisabled
    const background = authenticator.getStyle().background
    return (
      <div style={inputWrapper}>
        <StyledInput
          className='text-input'
          style={inputStyle}
          type='text'
          placeholder={i18n.t('accountName')}
          value={accountInput}
          onChange={this.updateButtonWithInput}
          onKeyPress={this.submitFromKeyboard}
          ref={(input) => { this.inputField = input }}
          autoCapitalize='none'
        />
        <div
          role='button'
          aria-label='Continue'
          tabIndex='-1'
          style={{ ...buttonStyle, background, ...hoverStyle }}
          onMouseEnter={this.activateHoverSize}
          onMouseLeave={this.activateGenericSize}
          onClick={() => accountInput && submitAccountForLogin(accountInput, authenticator)}
        >
          <div style={buttonText}>{i18n.t('continue')}</div>
        </div>
      </div>
    )
  }

  render() {
    return !this.props.loading ? this.renderInput() : <UALLoadingIcon withContainer />
  }
}

/**
 * @memberof UALAccountInput
 * @name props
 * @prop {Authenticator} authenticator - authenticator to enter account name for
 * @prop {function} submitAccountForLogin - attempts authentication using UAL context function
 * @prop {boolean} loading - loading state of authentication
 */
UALAccountInput.propTypes = {
  authenticator: PropTypes.object.isRequired,
  submitAccountForLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}
