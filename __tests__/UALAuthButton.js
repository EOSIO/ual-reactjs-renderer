import React from 'react'
import { shallow } from 'enzyme'
import { FaChevronRight, FaDownload } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { availableAuth, loadingAuth, erroredAuth } from 'AuthenticatorMocks'
import { UALLoadingIcon } from '../src/components/misc/UALLoadingIcon'
import { UALAuthButton } from '../src/components/authentication/UALAuthButton'
import { boxTitles } from '../src/constants/box'

describe('UALAuthButton', () => {
  const onAuthenticatorSelect = jest.fn()
  const onErroredState = jest.fn()
  const onRequestInstall = jest.fn()
  const instructions = boxTitles.NORMAL
  const baseProps = {
    onAuthenticatorSelect,
    onErroredState,
    onRequestInstall,
    instructions,
  }
  const unavailableProps = {
    ...baseProps,
    instructions: boxTitles.ERROR,
  }


  it('shows loading state when authenticator is loading', () => {
    const wrapper = shallow(<UALAuthButton
      authenticator={loadingAuth}
      index={0}
      {...baseProps}
    />)
    expect(wrapper.state().button).toEqual('loading')
    expect(wrapper.find(UALLoadingIcon).length).toBe(1)
  })

  it('shows available state when authenticator is available', () => {
    const wrapper = shallow(<UALAuthButton
      authenticator={availableAuth}
      index={0}
      {...baseProps}
    />)
    expect(wrapper.state().button).toEqual('available')
    expect(wrapper.find(FaChevronRight).length).toBe(1)
  })

  it('shows error state when authenticator has errored', () => {
    const wrapper = shallow(<UALAuthButton
      authenticator={erroredAuth}
      index={0}
      {...baseProps}
    />)
    expect(wrapper.state().button).toEqual('errored')
    expect(wrapper.find(IoMdInformationCircleOutline).length).toBe(1)
  })

  it('shows unavailable state when instructions prop reflects error screen', () => {
    const wrapper = shallow(<UALAuthButton
      authenticator={erroredAuth}
      index={0}
      {...unavailableProps}
    />)
    expect(wrapper.state().button).toEqual('unavailable')
    expect(wrapper.find(FaDownload).length).toBe(1)
  })

  it('attempts authentication when clicked', () => {
    const wrapper = shallow(<UALAuthButton
      authenticator={availableAuth}
      index={0}
      {...baseProps}
    />)
    wrapper.find({ role: 'button' }).simulate('click')
    expect(onAuthenticatorSelect).toHaveBeenCalled()
  })
})
