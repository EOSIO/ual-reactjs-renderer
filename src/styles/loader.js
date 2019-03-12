import { base } from './base'

export const loadingIcon = {
  ...base,
  width: '41px',
  textAlign: 'center',
  marginTop: '-4px',
}

export const loadingIconWithContainer = {
  ...loadingIcon,
  width: '100%',
  padding: '20px',
}

export const loadingElementThree = {
  width: '9px',
  height: '9px',
  margin: '1px',
  backgroundColor: 'white',
  borderRadius: '100%',
  display: 'inline-block',
  WebkitAnimation: 'ual-bouncedelay 1.4s infinite ease-in-out both',
  animation: 'ual-bouncedelay 1.4s infinite ease-in-out both',
}

export const loadingElementOne = {
  ...loadingElementThree,
  WebkitAnimationDelay: '-0.32s',
  AnimationDelay: '-0.32s',
}

export const loadingElementTwo = {
  ...loadingElementThree,
  WebkitAnimationDelay: '-0.16s',
  AnimationDelay: '-0.16s',
}

export const loadingElementCSS = `
  @-webkit-keyframes ual-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes ual-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`
