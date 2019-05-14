import React from 'react'
import { mount } from 'enzyme'

import { withUAL } from '../src/components/provider/withUAL'

const mockContext = 'testContext'
jest.mock('../src/components/provider/UALContext', () => ({
  UALContext: {
    Consumer: ({ children }) => children(mockContext),
  }
}))

describe('withUAL', () => {
  let wrappedComponent
  let component
  let name

  beforeEach(() => {
    component = (props) => {
      return <h1>Hello, {props.name}</h1>;
    }
    name = 'testName'
    const WrappedComponent = withUAL(component)
    wrappedComponent = mount(<WrappedComponent name={name} />)
  })

  it('sets the props', () => {
    expect(wrappedComponent.prop('name')).toBe(name)
  })

  it('renders the wrapped component', () => {
    expect(wrappedComponent.find(component)).toHaveLength(1)
  })

  fit('passes the context as the prop ual to the wrapped component', () => {
    expect(wrappedComponent.find(component).prop('ual')).toBe(mockContext)
  })

  it('passes the props to the wrapped component', () => {
    expect(wrappedComponent.find(component).prop('name')).toBe(name)
  })

  it('renders the props in the wrapped component', () => {
    expect(wrappedComponent.text()).toEqual(`Hello, ${name}`)
  })
})
