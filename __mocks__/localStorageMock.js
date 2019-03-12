export const localStorageMock = {
  getItem: key => this[key],
  setItem: (key, val) => {
    this[key] = val
  },
  clear: () => {
    Object.keys(this).forEach(key => delete this[key])
  },
}
