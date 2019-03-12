import React from 'react'
import { shallow } from 'enzyme'
import { providerProps } from 'providerProps'
import { localStorageMock } from 'localStorageMock'
import { UALBox } from '../src/components/modal/UALBox'
import { UALProvider } from '../src/index'
import { DEFAULT_STATUS } from '../src/constants/provider'

describe('UALProvider', () => {
  describe('has a modal prop', () => {
    it('that renders a modal when it is true', () => {
      const wrapper = shallow(<UALProvider {...providerProps} modal><div /></UALProvider>)
      expect(wrapper.find(UALBox).length).toBe(1)
    })

    it('that does not render a modal when false', () => {
      const wrapper = shallow(<UALProvider {...providerProps} appName='My app'><div /></UALProvider>)
      expect(wrapper.find(UALBox).length).toBe(0)
    })
  })

  describe('has a componentDidMount method', () => {
    let wrapper
    beforeAll(() => {
      global.localStorage = localStorageMock
      wrapper = shallow(<UALProvider {...providerProps} modal><div /></UALProvider>)
    })

    afterEach(() => {
      global.localStorage.clear()
    })

    it('that fetches all available authenticators', () => {
      const spy = jest.spyOn(wrapper.instance(), 'fetchAuthenticators')
      wrapper.instance().componentDidMount()
      expect(spy).toHaveBeenCalled()
    })

    it('that attempts auto-login if authenticator type is in localStorage', async () => {
      localStorage.setItem('UALAccountName', 'Example')
      localStorage.setItem('UALLoggedInAuthType', 'Scatter')
      const spy = jest.spyOn(wrapper.instance(), 'getAuthenticatorInstance')
      wrapper.instance().componentDidMount()
      expect(spy).toHaveBeenCalled()
    })

    it('that does not attempt to auto-login if localStorage is empty', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'getAuthenticatorInstance')
      wrapper.instance().componentDidMount()
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('has a fetchAuthenticators method', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<UALProvider {...providerProps} modal><div /></UALProvider>)
    })

    it('that sets the availableAuthenticators with all authenticators that should render', () => {
      const { authenticators } = wrapper.state()
      wrapper.setState({
        availableAuthenticators: [],
      })
      expect(wrapper.state().availableAuthenticators.length).toBe(0)
      wrapper.instance().fetchAuthenticators(authenticators, authenticators[0])
      expect(wrapper.state().availableAuthenticators.length).toBe(1)
    })

    it('that automatically attempts authentication if autoLogin is available', () => {
      const { authenticators } = wrapper.state()
      const spy = jest.spyOn(wrapper.state(), 'authenticateWithoutAccountInput')
      const autoLoginAuth = authenticators[0]
      wrapper.instance().fetchAuthenticators(authenticators, autoLoginAuth)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('has a logout method', () => {
    let wrapper

    beforeAll(() => {
      global.localStorage = localStorageMock
    })

    beforeEach(() => {
      wrapper = shallow(<UALProvider {...providerProps} modal><div /></UALProvider>)
    })

    it('that resets the state to default status', () => {
      wrapper.setState(DEFAULT_STATUS)
      const defaultState = JSON.stringify(wrapper.state())
      wrapper = shallow(<UALProvider {...providerProps} modal><div /></UALProvider>)
      expect(JSON.stringify(wrapper.state())).not.toEqual(defaultState)
      wrapper.state().logout()
      expect(JSON.stringify(wrapper.state())).toEqual(defaultState)
    })

    it('that calls the fullLogout method if the activeAuthenticator state property is set', () => {
      const activeAuthenticator = wrapper.state().availableAuthenticators[0]
      const spy = jest.spyOn(wrapper.instance(), 'fullLogout')
      wrapper.instance().componentDidMount()
      wrapper.setState({
        activeAuthenticator,
      })
      wrapper.state().logout()
      expect(spy).toHaveBeenCalled()
    })

    it('that calls the clearCache method', () => {
      const activeAuthenticator = wrapper.state().availableAuthenticators[0]
      const spy = jest.spyOn(wrapper.instance(), 'clearCache')
      wrapper.instance().componentDidMount()
      wrapper.setState({
        activeAuthenticator,
      })
      wrapper.state().logout()
      expect(spy).toHaveBeenCalled()
    })

    it('that clears the localStorage', () => {
      localStorage.setItem('UALAccountName', 'Example')
      localStorage.setItem('UALLoggedInAuthType', 'Scatter')
      const activeAuthenticator = wrapper.state().availableAuthenticators[0]
      wrapper.setState({
        activeAuthenticator,
      })
      expect(localStorage.hasOwnProperty('UALAccountName')).toBe(true)
      expect(localStorage.hasOwnProperty('UALLoggedInAuthType')).toBe(true)
      wrapper.state().logout()
      expect(localStorage.hasOwnProperty('UALAccountName')).toBe(false)
      expect(localStorage.hasOwnProperty('UALLoggedInAuthType')).toBe(false)
    })
  })
})
