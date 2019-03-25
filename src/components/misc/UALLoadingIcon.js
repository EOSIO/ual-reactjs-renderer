import React from 'react'
import PropTypes from 'prop-types'

import {
  loadingIcon,
  loadingIconWithContainer,
  loadingElementOne,
  loadingElementTwo,
  loadingElementThree,
  loadingElementCSS,
} from '../../styles/loader'

/**
 * @class
 * @name UALLoadingIcon
 * @desc Component that renders a loading icon
 */
export const UALLoadingIcon = ({ withContainer }) => (
  <div style={withContainer ? loadingIconWithContainer : loadingIcon}>
    <div style={loadingElementOne} />
    <div style={loadingElementTwo} />
    <div style={loadingElementThree} />
    <style>{loadingElementCSS}</style>
  </div>
)

UALLoadingIcon.displayName = 'UALLoadingIcon'

UALLoadingIcon.defaultProps = {
  withContainer: false,
}

/**
 * @memberof UALInstallAuth
 * @name props
 * @prop {boolean} [false] withAuthenticator - authenticator from which to render an install button
 */
UALLoadingIcon.propTypes = {
  withContainer: PropTypes.bool,
}
