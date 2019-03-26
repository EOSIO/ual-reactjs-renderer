import { base } from './base'
import { authButton } from './authenticator'

export const inputWrapper = {
  ...base,
  marginTop: '10px',
}

export const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  fontSize: '1.3em',
  boxSizing: 'border-box',
  margin: '0px auto 15px auto',
  maxWidth: '400px',
  transition: 'opacity 0.3s',
  WebkitTransition: 'opacity 0.3s',
  border: 'none',
  color: 'white',
  borderBottom: '1px solid white',
  outline: 'none',
  backgroundColor: 'rgba(0,0,0,0)',
}

export const buttonDisabled = {
  ...authButton,
  opacity: '0.5',
}

export const buttonEnabled = {
  ...authButton,
  opacity: '1',
}
