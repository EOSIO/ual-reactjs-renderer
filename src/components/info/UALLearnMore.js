import React, { Component } from 'react'
import { IoMdInformationCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import i18n from '../../i18n'

import { base } from '../../styles/base'
import {
  learnMore,
  infoExpanded,
  learnMoreText,
  learnMoreButton,
  learnMoreIcon,
} from '../../styles/info'

/**
 * Component for rendering the "Learn More" text.
 */
export class UALLearnMore extends Component {
  static displayName = 'UALLearnMore'

  /**
   * @memberof UALLearnMore
   * @name state
   * @prop {boolean} [false] open - state of learn more text accordion
   */
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  /**
   * @method
   * @return {Void}
   */
  toggleMoreInfo = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const { open } = this.state
    const buttonMessage = open ? i18n.t('learnMoreAccept') : i18n.t('learnMore')
    const info = i18n.t('learnMoreText')
    const accordionStyles = open ? infoExpanded : {}
    const buttonIcon = open ? <IoMdCloseCircleOutline style={learnMoreIcon} />
      : <IoMdInformationCircleOutline style={learnMoreIcon} />
    return (
      <div style={base}>
        <div style={{ ...learnMore, ...accordionStyles }}>
          <p style={learnMoreText}>
            {info}
          </p>
        </div>
        <p>
          <span
            style={learnMoreButton}
            onClick={this.toggleMoreInfo}
            role='button'
            aria-label={buttonMessage}
            aria-pressed={open}
            tabIndex='-1'
          >
            {buttonIcon}
            {' '}
            {buttonMessage}
          </span>
        </p>
      </div>
    )
  }
}
