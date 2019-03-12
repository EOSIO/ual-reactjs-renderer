"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultBoxState = exports.installGuide = exports.boxTitles = void 0;

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boxTitles = {
  NORMAL: _i18n.default.t('instructionsToContinue'),
  ERROR: _i18n.default.t('noAvailableAuthenticatorsTitle')
};
exports.boxTitles = boxTitles;

var installGuide = _i18n.default.t('noAvailableAuthenticatorsContent');

exports.installGuide = installGuide;
var defaultBoxState = {
  containerEnter: false,
  containerExit: false,
  transitionForward: true,
  showAccountInput: false,
  showInstallScreen: false,
  authenticator: null,
  instructions: boxTitles.NORMAL,
  secondaryInstructions: ''
};
exports.defaultBoxState = defaultBoxState;
//# sourceMappingURL=box.js.map