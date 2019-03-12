import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FaTimes } from 'react-icons/fa'

import { exitWrapper, exit, exitHover } from '../../styles/buttons/exit'

/**
 * Component for rendering a modal close button.
 */
export class UALExitButton extends Component {
  constructor(props) {
    super(props)
    /**
     * @memberof UALExitButton
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
  scaleUp = () => {
    this.setState({ hoverStyle: exitHover })
  }

  /**
   * @method
   * @return {Void}
   */
  scaleDown = () => {
    this.setState({ hoverStyle: {} })
  }

  render() {
    const { hideModal, isSecondaryStyle } = this.props
    const { hoverStyle } = this.state
    const buttonColor = isSecondaryStyle ? { color: 'white' } : {}
    return (
      <p style={exitWrapper}>
        <span
          role='button'
          aria-label='exit'
          tabIndex='-1'
          style={{ ...exit, ...hoverStyle, ...buttonColor }}
          onMouseEnter={this.scaleUp}
          onMouseLeave={this.scaleDown}
          onClick={hideModal}
        >
          <FaTimes />
        </span>
      </p>
    )
  }
}

/**
 * @memberof UALExitButton
 * @name props
 * @prop {function} hideModal - from UAL, hides modal
 * @prop {boolean} isSecondaryStyle - whether or not button should be light
 */
UALExitButton.propTypes = {
  hideModal: PropTypes.func.isRequired,
  isSecondaryStyle: PropTypes.bool.isRequired,
}
