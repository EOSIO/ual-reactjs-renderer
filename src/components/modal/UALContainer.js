import React from 'react'
import PropTypes from 'prop-types'

import {
	container,
	containerAnimated,
	containerCenter,
	containerRight,
	containerLeft
} from '../../styles/container'

/**
 * @class
 * @name UALContainer
 * @desc wrapper for UALBox contents
 */
export const UALContainer = ({ enter, exit, transitionForward, children }) => {
  const end = transitionForward ? containerLeft : containerRight
  const start = transitionForward ? containerRight : containerLeft
  const startStyles = (enter || exit) ? containerAnimated : start
  const enterStyles = enter ? containerCenter : {}
  const exitStyles = exit ? end : {}
  return (
    <div style={{ ...container, ...startStyles, ...enterStyles, ...exitStyles }}>
      {children}
    </div>
  )
}

UALContainer.displayName = 'UALContainer'

/**
 * @memberof UALContainer
 * @name props
 * @prop {boolean} enter - whether or not the screen has entered the user's view
 * @prop {boolean} exit - whether or not the screen has exited the user's view
 * @prop {boolean} transitionForward - whether or not user is progressing forward through screens
 * @prop {Node[]|Node} children - nested components
 */
UALContainer.propTypes = {
  enter: PropTypes.bool.isRequired,
  exit: PropTypes.bool.isRequired,
  transitionForward: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
