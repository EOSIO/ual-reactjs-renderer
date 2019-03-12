const baseAuth = {
  getStyle: () => ({
    icon: '',
    background: '',
    textColor: '',
    text: '',
  }),
  getError: () => null,
}

export const availableAuth = {
  ...baseAuth,
  isLoading: () => false,
  isErrored: () => false,
}

export const loadingAuth = {
  ...baseAuth,
  isLoading: () => true,
  isErrored: () => false,
}

export const erroredAuth = {
  ...baseAuth,
  isLoading: () => false,
  isErrored: () => true,
}
