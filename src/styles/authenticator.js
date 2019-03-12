import { base } from './base'

export const authButton = {
  fontWeight: '100',
  color: '#ffffff',
  borderRadius: '6px',
  width: '100%',
  margin: '20px auto',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
  opacity: '1',
  transition: '0.3s',
  WebkitTransition: '0.3s',
  outline: 'none',
}

export const buttonHover = {
  cursor: 'pointer',
  transform: 'scale(1.03)',
}

export const authIcon = {
  maxHeight: '30px',
  maxWidth: '100%',
  margin: 'auto',
  marginTop: '7%',
  display: 'block',
}

export const authIconWrapper = {
  ...base,
  display: 'inline-block',
  float: 'left',
  width: '50px',
  padding: '8.5px 10px',
  backgroundColor: 'rgba(0,0,0,0.15)',
  borderRadius: '5px 0px 0px 5px',
}

export const authText = {
  ...base,
  display: 'inline-block',
  padding: '12px 13px 12px 15px',
  width: 'calc(100% - 50px)',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  letterSpacing: '1.1px',
}

export const authTextFont = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  letterSpacing: '1.1px',
}

export const chevron = {
  float: 'right',
  height: '16px',
  marginTop: '2px',
}

export const errored = {
  color: 'rgb(144, 150, 168)',
  fontSize: '1.5rem',
}
