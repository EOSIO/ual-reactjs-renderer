/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '../../i18n'
import '../../types'
import { UAL, UALError, UALErrorType } from 'universal-authenticator-library'

import { UALContext } from './UALContext'
import { DEFAULT_STATUS } from '../../constants/provider'
import { UALBox } from '../modal/UALBox'

import { modalStyles } from '../../styles/provider'
import { baseFont } from '../../styles/base'

/**
 * Wrapper component that provides a child app with access to UAL functionality
 */
export class UALProvider extends Component {
  static displayName = 'UALProvider'

  constructor(props) {
    super(props)
    /**
     * @namespace UAL
     */
    this.state = {
      /**
       * @memberof UAL
       * @desc chain list from props
       * @type {Chain[]} chains
       */
      chains: props.chains,
      /**
       * @memberof UAL
       * @desc authenticator instances from props
       * @type {Authenticator[]} authenticators
       */
      authenticators: props.authenticators,
      /**
       * @memberof UAL
       * @desc available authenticator list
       * @type {Authenticator[]} availableAuthenticators
       */
      availableAuthenticators: [],
      /**
       * @memberof UAL
       * @desc name of app
       * @type {string} appName
       */
      appName: props.appName,
      /**
       * @memberof UAL
       * @desc whether or not show modal, initialized via props
       * @type {boolean} modal
       */
      modal: props.modal,
      /**
       * @memberof UAL
       * @desc loading state of UAL
       * @type {boolean} loading
       */
      loading: false,
      /**
       * @memberof UAL
       * @desc list of authenticated users
       * @type {User[]} users
       */
      users: [],
      /**
       * @memberof UAL
       * @desc authenticator currently used
       * @type {Authenticator} activeAuthenticator
       */
      activeAuthenticator: null,
      /**
       * @memberof UAL
       * @desc logged in user
       * @type {User} activeUser
       */
      activeUser: null,
      /**
       * @memberof UAL
       * @desc whether or not activeAuthenticator should auto login
       * @type {boolean} isAutoLogin
       */
      isAutoLogin: false,
      /**
       * @memberof UAL
       * @desc captured error if any
       * @type {UALError|null} error
       */
      error: null,
      /**
       * @memberof UAL
       * @desc message, if any, accompanying current UAL state
       * @type {string} message
       */
      message: '',
      /**
       * @memberof UAL
       * @function
       * @name hideModal
       * @desc hides the modal
       * @return {Void}
       */
      hideModal: () => this.setState({ modal: false, loading: true, message: i18n.t('loadingAuthenticators') }),
      /**
       * @memberof UAL
       * @function
       * @name showModal
       * @desc shows the modal
       * @return {Void}
       */
      showModal: () => {
        const { availableAuthenticators } = this.state
        availableAuthenticators.forEach(auth => auth.reset())
        this.setState({ modal: true })
      },
      /**
       * @memberof UAL
       * @function
       * @name logout
       * @desc logs user out of authenticator and resets UAL state
       * @return {Void}
       */
      logout: () => {
        const { activeAuthenticator } = this.state
        this.setState(DEFAULT_STATUS, () => activeAuthenticator && this.fullLogout(activeAuthenticator))
      },
      /**
       * @memberof UAL
       * @function
       * @name restart
       * @desc resets all available authenticators and resets UAL state
       * @return {Void}
       */
      restart: () => {
        this.setState({ DEFAULT_STATUS }, () => {
          const { availableAuthenticators } = this.state
          availableAuthenticators.forEach(auth => auth.reset())
          this.setState(availableAuthenticators)
        })
      },
      /**
       * @memberof UAL
       * @function
       * @name broadcastStatus
       * @desc dispatches a provider state update
       * @return {Void}
       */
      broadcastStatus: (status = DEFAULT_STATUS) => this.setState(status),
      /**
       * @memberof UAL
       * @function
       * @name authenticateWithoutAccountInput
       * @desc attempts authentication with an authenticator not requiring account input
       * @return {Void}
       * @param {Authenticator} authenticator
       * @param {boolean} [false] isAutoLogin
       */
      authenticateWithoutAccountInput: async (authenticator, isAutoLogin = false) => {
        const { broadcastStatus } = this.state
        broadcastStatus({
          loading: true,
          message: i18n.t('continueWithAuthenticator', { authenticatorName: authenticator.getStyle().text }),
          activeAuthenticator: authenticator,
        })
        try {
          const users = await authenticator.login()
          const accountName = await users[0].getAccountName()
          if (!isAutoLogin) {
            window.localStorage.setItem('UALLoggedInAuthType', authenticator.constructor.name)
            this.setUALInvalidateAt()
          }
          broadcastStatus({
            activeUser: users[users.length - 1],
            users,
            isAutoLogin,
            message: i18n.t('currentlyLoggedInAs', { accountName }),
          })
        } catch (err) {
          broadcastStatus({
            loading: false,
            error: err,
            message: err.message,
          })
        }
      },
      /**
       * @memberof UAL
       * @function
       * @name submitAccountForLogin
       * @desc attempts authentication
       * @return {Void}
       * @param {string} accountInput
       * @param {Authenticator} authenticator
       */
      submitAccountForLogin: async (accountInput, authenticator) => {
        const { broadcastStatus } = this.state
        const authenticatorName = authenticator.constructor.name
        broadcastStatus({
          loading: true,
          message: authenticator.requiresGetKeyConfirmation()
            ? i18n.t('waitWhileFindAccountWithConfirmation')
            : i18n.t('waitWhileFindAccount'),
        })
        try {
          const users = await authenticator.login(accountInput)
          window.localStorage.setItem('UALLoggedInAuthType', authenticatorName)
          window.localStorage.setItem('UALAccountName', accountInput)
          broadcastStatus({
            activeUser: users[users.length - 1],
            activeAuthenticator: authenticator,
            users,
            message: i18n.t('currentlyLoggedInAs', { accountName: accountInput }),
          })
          this.setUALInvalidateAt()
        } catch (err) {
          broadcastStatus({
            error: err,
            message: err.message,
            loading: false,
          })
        }
      },
    }
  }

  componentDidMount() {
    const { chains, appName, authenticators, authenticateWithoutAccountInput, submitAccountForLogin } = this.state
    let type = window.localStorage.getItem('UALLoggedInAuthType')
    const invalidate = window.localStorage.getItem('UALInvalidateAt')
    const accountName = window.localStorage.getItem('UALAccountName')
    if (type && invalidate && new Date(invalidate) <= new Date()) {
      this.clearCache();
      type = undefined;
    }
    const ual = new UAL(chains, appName, authenticators)
    try {
      const { availableAuthenticators } = ual.getAuthenticators()
      if (type) {
        const authenticator = this.getAuthenticatorInstance(type, availableAuthenticators)
        if (!authenticator) {
          throw new Error('authenticator instance not found')
        }
        const availableCheck = setInterval(() => {
          if (!authenticator.isLoading()) {
            clearInterval(availableCheck)
            // Only Ledger requires an account name
            if (accountName) {
              submitAccountForLogin(accountName, authenticator)
            } else {
              authenticateWithoutAccountInput(authenticator)
            }
          }
        }, 250)
      }
    } catch (e) {
      this.clearCache()
      const msg = i18n.t('sessionEndedNeedLogin')
      const source = type || 'Universal Authenticator Library'
      const errType = UALErrorType.Login
      console.warn(new UALError(msg, errType, e, source))
    } finally {
      const { availableAuthenticators, autoLoginAuthenticator } = ual.getAuthenticators()
      this.fetchAuthenticators(availableAuthenticators, autoLoginAuthenticator)
    }
  }

  componentDidUpdate() {
    const { loading, message, availableAuthenticators, broadcastStatus } = this.state
    if (loading && message === i18n.t('loadingAuthenticators') && availableAuthenticators.length) {
      broadcastStatus({ message: i18n.t('authenticatorsLoaded'), loading: false })
    }
  }

  /**
   * Verifies a logged in user's authenticator is still app supported
   * @method
   * @param {string} type - authenticator type of sessioned user
   * @param {Object[]} availableAuthenticators - list of available app supported authenticators
   * @return {number|boolean}
   */
  getAuthenticatorInstance = (type, availableAuthenticators) => {
    const loggedIn = availableAuthenticators.filter(auth => auth.constructor.name === type)
    if (!loggedIn.length) {
      this.clearCache()
    }
    return loggedIn.length ? loggedIn[0] : false
  }

  /**
   * Sets UALInvalidateAt value to local storage depending on amount of seconds set in authenticator
   * @method
   * @param {Authenticator} authenticator - should-invalidate-after authenticator
   * @return {Void}
   */
  setUALInvalidateAt = (authenticator) => {
    const invalidateSeconds = authenticator.shouldInvalidateAfter();
    const invalidateAt = new Date();
    invalidateAt.setSeconds(invalidateAt.getSeconds() + invalidateSeconds);
    window.localStorage.setItem('UALInvalidateAt', invalidateAt)
  }

  /**
   * Renders available authenticators or starts auto-login process if applicable
   * @method
   * @param {Authenticator[]} availableAuthenticators - list of available app supported authenticators
   * @param {Authenticator} autoLoginAuthenticator - auto-login authenticator
   * @return {Void}
   */
  fetchAuthenticators = (availableAuthenticators, autoLoginAuthenticator) => {
    const { authenticateWithoutAccountInput } = this.state
    if (autoLoginAuthenticator) {
      this.setState({ availableAuthenticators: [autoLoginAuthenticator] }, () => {
        const availableCheck = setInterval(() => {
          if (!autoLoginAuthenticator.isLoading()) {
            clearInterval(availableCheck)
            authenticateWithoutAccountInput(autoLoginAuthenticator, true)
          }
        }, 250)
      })
    } else {
      this.setState({ availableAuthenticators }, () => {
        this.setState({ message: i18n.t('authenticatorsLoaded') })
      })
    }
  }

  /**
   * Clears locally stored user session
   * @method
   * @return {Void}
   */
  clearCache = () => {
    window.localStorage.removeItem('UALLoggedInAuthType')
    window.localStorage.removeItem('UALAccountName')
    window.localStorage.removeItem('UALInvalidateAt')
  }

  /**
   * Clears localStorage and logs out user
   * @method
   * @param {Authenticator} authenticator - used authenticator
   * @return {Void}
   */
  fullLogout = (authenticator) => {
    this.clearCache()
    authenticator.logout()
      .catch(e => console.warn(e))
  }

  render() {
    const modal = this.state.modal && <div style={modalStyles}><UALBox /></div>
    return (
      <UALContext.Provider value={this.state}>
        <style>{baseFont}</style>
        { modal }
        { this.props.children }
      </UALContext.Provider>
    )
  }
}

/**
 * @memberof UALProvider
 * @name props
 * @prop {Chain[]} chains - list of chains the app supports
 * @prop {Authenticator[]} authenticators - list of authenticators the app supports
 * @prop {Node[]|Node} children - child app(s)
 * @prop {string} appName - name of app
 * @prop {boolean} modal - whether or not to show modal
 */
UALProvider.propTypes = {

  chains: PropTypes.arrayOf(PropTypes.object).isRequired,
  authenticators: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  appName: PropTypes.string.isRequired,
  modal: PropTypes.bool,
}

UALProvider.defaultProps = {
  modal: false,
}
