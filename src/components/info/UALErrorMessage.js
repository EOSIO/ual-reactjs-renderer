import React from 'react'
import PropTypes from 'prop-types'
import { UALError } from 'universal-authenticator-library'

import { IoMdInformationCircleOutline } from 'react-icons/io'

import { base } from '../../styles/base'
import { errorMessage } from '../../styles/error'

/**
 * @class
 * @name UALErrorMessage
 * @desc component for rendering error messages
 */
export const UALErrorMessage = ({ error: { message } }) => (
  <div style={base}>
    <p style={errorMessage}>
      <IoMdInformationCircleOutline />
      {' '}
      {message}
    </p>
  </div>
)

UALErrorMessage.displayName = 'UALErrorMessage'

/**
 * @memberof UALErrorMessage
 * @name props
 * @prop {UALError|Object} chains - list of chains the app supports
 */
UALErrorMessage.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.instanceOf(UALError),
    PropTypes.object,
  ]).isRequired,
}
