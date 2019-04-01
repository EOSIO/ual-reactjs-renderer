const baseProps = {
  authenticator: {
  	getStyle: jest.fn().mockReturnValue('rgb(100,100,100)')
  },
  submitAccountForLogin: jest.fn(),
}

export const loadingProps = {
  ...baseProps,
  loading: true,
}

export const availableProps = {
  ...baseProps,
  loading: false,
}
