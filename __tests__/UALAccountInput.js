import React from 'react'
import { shallow, mount } from 'enzyme'
import { loadingProps, availableProps } from 'UALAccountInputProps'
import { UALAccountInput, StyledInput } from '../src/components/authentication/UALAccountInput'
import { UALLoadingIcon } from '../src/components/misc/UALLoadingIcon'

describe('UALAccountInput', () => {
  it('renders an input', () => {
    const wrapper = shallow(<UALAccountInput {...availableProps} />)
    expect(wrapper.find(UALLoadingIcon).length).toBe(0)
    expect(wrapper.find(StyledInput).length).toBe(1)
  })

  it('renders a loading icon in place of the input when loading prop is true', () => {
    const wrapper = shallow(<UALAccountInput {...loadingProps} />)
    expect(wrapper.find(StyledInput).length).toBe(0)
    expect(wrapper.find(UALLoadingIcon).length).toBe(1)
  })

  it('submits valid account name for login on click', () => {
    const wrapper = mount(<UALAccountInput {...availableProps} />)
    wrapper.find({ role: 'button' }).simulate('click')
    expect(availableProps.submitAccountForLogin).not.toHaveBeenCalled()
    wrapper.setState({ accountInput: 'example' })
    wrapper.find({ role: 'button' }).simulate('click')
    expect(availableProps.submitAccountForLogin).toHaveBeenCalled()
  })

  describe('validates input client side', () => {
    let wrapper
    const input = {
      target: {
        value: '7example',
      },
    }

    beforeAll(() => {
      wrapper = shallow(<UALAccountInput {...availableProps} />)
    })

    it('by forcing first character to be lowercase letter or numbers 1 - 5', () => {
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).not.toEqual('.example')
      input.target.value = '7example'
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).not.toEqual('7example')
      input.target.value = '3example'
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).toEqual('3example')
      input.target.value = 'example'
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).toEqual('example')
    })

    it('by allowing a . to be used after first character', () => {
      input.target.value = 'e.xample'
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).toEqual('e.xample')
    })

    it('by enforcing a max character length of 12', () => {
      input.target.value = 'lessthan12'
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).toEqual('lessthan12')
      input.target.value = 'morethantwelve'
      wrapper.instance().updateButtonWithInput(input)
      expect(wrapper.state().accountInput).not.toEqual('morethantwelve')
    })
  })
})
