const baseProps = {
  authenticator: {},
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
