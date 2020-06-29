import { Authenticator } from 'universal-authenticator-library'

const ScatterJS = {
  scatter: {
    connect: (appName) => {
      if (appName === 'My Working App') {
        return true
      }
      return Promise.resolve(false)
    },
  },
}

const scatter = {
  logout: () => {},
}

class UALScatterError {
  constructor(message, type, error) {
    this.message = message
    this.type = type
    this.error = error
    this.source = 'Scatter'
  }
}

class ScatterUser {
  constructor(chain, scatter) {
    this.chain = chain
    this.scatter = scatter
  }

  getKeys() {
    if (this.scatter) {
      return Promise.resolve('keys!')
    }
    throw new Error()
  }
}

export class Scatter extends Authenticator {
  constructor(chains, options = { appName: '' }) {
    super(chains)
    this.appName = options.appName
    this.scatterIsLoading = false
    this.initError = null
    this.scatter = false
  }

  async init() {
    this.scatterIsLoading = false
    if (!await ScatterJS.scatter.connect(this.appName)) {
      this.initError = new UALScatterError('Error occurred while connecting',
        'initialization',
        null)

      this.scatterIsLoading = false

      return
    }
    this.scatter = scatter
    this.scatterIsLoading = false
  }

  isLoading() {
    return false
  }

  isErrored() {
    return !!this.initError
  }

  getError() {
    return this.initError
  }

  getStyle() {
    return {
      icon: 'logo',
      text: 'Scatter',
      textColor: 'white',
      background: '#62D0FD',
    }
  }

  shouldRender() {
    return true
  }

  shouldAutoLogin() {
    return false
  }

  requiresGetKeyConfirmation() {
    return false
  }

  async login() {
    try {
      for (const chain of this.chains) {
        const user = new ScatterUser(chain, this.scatter)
        await user.getKeys()
        this.users.push(user)
      }

      return this.users
    } catch (e) {
      throw new UALScatterError(
        'Unable to login',
        'login',
        e,
      )
    }
  }

  async logout() {
    try {
      this.scatter.logout()
    } catch (error) {
      throw new UALScatterError('Error occurred during logout',
        'logout',
        error)
    }
  }

  async shouldRequestAccountName() {
    return true
  }

  getName() {
    return 'scatter'
  }
}
