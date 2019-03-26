import React, { Component } from 'react'
import PropTypes from 'prop-types'

import i18n from '../../i18n'

import { installButton, installButtonWrapper, buttonText } from '../../styles/installation'
import { baseLink } from '../../styles/base'
import { buttonHover } from '../../styles/authenticator'

/**
 * Component for rendering the authenticator install screen
 */
export class UALInstallAuth extends Component {
  constructor(props) {
    super(props)
    /**
     * @memberof UALInstallAuth
     * @name state
     * @prop {Object} hoverStyle - additional button style on hover
     */
    this.state = {
      hoverStyle: {},
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
    this.setState({ hoverStyle: buttonHover })
  }

  render() {
    const { hoverStyle } = this.state
    const { authenticator } = this.props
    const background = authenticator.getStyle().background
    return (
      <div style={installButtonWrapper}>
        <div
          role='button'
          aria-label='Leave and Install'
          tabIndex='-1'
          style={{ ...installButton, background, ...hoverStyle }}
          onMouseEnter={this.activateHoverSize}
          onMouseLeave={this.activateGenericSize}
        >
          <a
            style={baseLink}
            href={authenticator.getOnboardingLink()}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div style={buttonText} href='authenticator'>{i18n.t('leaveAndInstall')}</div>
          </a>
        </div>
      </div>
    )
  }
}

/**
 * @memberof UALInstallAuth
 * @name props
 * @prop {Authenticator} authenticator - authenticator from which to render an install button
 */
UALInstallAuth.propTypes = {
  authenticator: PropTypes.object.isRequired, // eslint-disable-line
}
