import th from './translationHelpers'

export default {
  logout: th('Logout'),
  loggedInAs: th('Logged in as {{accountName}}'),
  instructionsToContinue: th('To continue please select an option'),
  loadingAuthenticators: th('Loading Authenticators...'),
  enterUsername: th('Next, please enter your username'),
  learnMore: th('Learn more'),
  learnMoreText: th('This option allows you to connect to your favorite key manager app.'),
  learnMoreAccept: th('I got it!'),
  selectALoginService: th('Please select a service to log in'),
  accountName: th('Account Name'),
  continue: th('Continue'),
  noAvailableAuthenticatorsTitle: th('Pardon the interruption'),
  noAvailableAuthenticatorsContent: th(`It looks like you have no available authenticators.  Select the 
    authenticator that you wish to download and install.  If you see an authenticator that you 
    already have, make sure the corresponding application is running and`),
  getStarted: th('To get started with {{authName}}, install the app at the link below.'),
  leaveAndInstall: th('Leave and Install'),
  welcomeAccount: th('Welcome to {{authName}}'),
  retry: th('retry'),
  noAuthenticatorsAvailableForDevice: th('No authenticators are available for your current browser and/or device.'),
  continueWithAuthenticator: th('Continue with {{authenticatorName}}'),
  currentlyLoggedInAs: th('Currently, logged in as {{accountName}}'),
  waitWhileFindAccount: th('Please wait while we find your account.'),
  waitWhileFindAccountWithConfirmation: th('Please approve the request from your device.'),
  authenticatorsLoaded: th('Authenticators loaded.'),
  sessionEndedNeedLogin: th('User session has ended. Login required.'),
  goBack: th('Go Back'),
  errorDuring: th('{{src}} encountered an error during {{type}}'),
}
