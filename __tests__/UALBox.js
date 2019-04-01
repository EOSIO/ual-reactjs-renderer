import React from 'react'
import { mount } from 'enzyme'
import { providerProps } from 'providerProps'
import { UALError, UALErrorType } from 'universal-authenticator-library'
import { UALBox } from '../src/components/modal/UALBox'
import { UALProvider } from '../src/index'
import { UALErrorMessage } from '../src/components/info/UALErrorMessage'
import { UALLoadingIcon } from '../src/components/misc/UALLoadingIcon'
import { UALAuthButton } from '../src/components/authentication/UALAuthButton'
import { UALAccountInput } from '../src/components/authentication/UALAccountInput'

describe('UALBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<UALProvider {...providerProps}><UALBox /></UALProvider>)
  })

  it('displays an error message when UALProvider catches an error in its state', () => {
    wrapper.setState({
      error: new UALError('Sample Error', UALErrorType.Initialization, new Error('Sample Error'), 'UAL'),
    })
    expect(wrapper.find(UALBox).find(UALErrorMessage).length).toBe(1)
  })

  it('displays loader when UALProvider is loading', () => {
    wrapper.setState({
      loading: true,
    })
    expect(wrapper.find(UALBox).find(UALLoadingIcon).length).toBe(1)
  })

  it('renders an authenticator button for each authenticator in UALProvider availableAuthenticators', () => {
    expect(wrapper.find(UALBox).find(UALAuthButton).length).toBe(1)
    const { availableAuthenticators } = wrapper.state()
    availableAuthenticators.push(availableAuthenticators[0])
    wrapper.setState({
      availableAuthenticators,
    })
    expect(wrapper.find(UALBox).find(UALAuthButton).length).toBe(2)
  })

  it('renders an accountInput when showAccountInput is true', () => {
    const { availableAuthenticators } = wrapper.state()
    wrapper.setState({
      showAccountInput: true,
      authenticator: availableAuthenticators[0],
    })
    expect(wrapper.find(UALBox).find(UALAccountInput).length).toBe(1)
  })
})
