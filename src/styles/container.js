import { base } from './base'

export const container = {
  ...base,
  minHeight: '20px',
  width: '100%',
  height: '100%',
  padding: '15px',
}

export const containerAnimated = {
  transition: '0.3s',
  WebkitTransition: '0.3s',
}

export const containerCenter = {
  marginLeft: '0%',
}

export const containerLeft = {
  marginLeft: '-120%',
}

export const containerRight = {
  marginLeft: '120%',
}
