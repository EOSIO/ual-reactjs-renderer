"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALBoxParts = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _UALAccountInput = require("../authentication/UALAccountInput");

var _UALAuthButton = require("../authentication/UALAuthButton");

var _UALLearnMore = require("../info/UALLearnMore");

var _UALExitButton = require("../misc/UALExitButton");

var _UALErrorMessage = require("../info/UALErrorMessage");

var _UALLoadingIcon = require("../misc/UALLoadingIcon");

var _UALInstallAuth = require("../authentication/UALInstallAuth");

var _title = require("../../styles/title");

var _back = require("../../styles/buttons/back");

var _retry = require("../../styles/buttons/retry");

var _instructions = require("../../styles/instructions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class
 * @name UALBoxParts
 * @desc class for rendering sections of the UALBox Component 
 */
var UALBoxParts =
/*#__PURE__*/
function () {
  function UALBoxParts() {
    _classCallCheck(this, UALBoxParts);
  }

  _createClass(UALBoxParts, null, [{
    key: "authButton",

    /**
     * returns an instance of UALAuthButton
     * @memberof UALBoxParts
     * @method
     * @name authButton
     * @return {ReactElement}
     */
    value: function authButton(authenticator, index, instructions, authenticate, checkAuthenticators, enterInstallScreen) {
      return _react.default.createElement(_UALAuthButton.UALAuthButton, {
        key: index,
        index: index,
        instructions: instructions,
        onErroredState: checkAuthenticators,
        authenticator: authenticator,
        onAuthenticatorSelect: authenticate,
        onRequestInstall: enterInstallScreen
      });
    }
    /**
     * returns an instance of UALAuthInput
     * @memberof UALBoxParts
     * @method
     * @name accountLogin
     * @return {ReactElement}
     */

  }, {
    key: "accountLogin",
    value: function accountLogin(submitAccountForLogin, loading, authenticator) {
      return _react.default.createElement(_UALAccountInput.UALAccountInput, {
        submitAccountForLogin: submitAccountForLogin,
        authenticator: authenticator,
        loading: loading
      });
    }
    /**
     * returns the secondary instructions for a given screen
     * @memberof UALBoxParts
     * @method
     * @name secondaryInstructions
     * @return {HTML}
     */

  }, {
    key: "secondaryInstructions",
    value: function secondaryInstructions(_ref, refreshBox) {
      var _secondaryInstructions = _ref.secondaryInstructions,
          showInstallScreen = _ref.showInstallScreen;

      var retry = _react.default.createElement("strong", {
        role: "button",
        "aria-label": "Go Back",
        tabIndex: "-1",
        style: _retry.retryButton,
        onClick: refreshBox
      }, _i18n.default.t('retry'));

      if (_secondaryInstructions !== '') {
        var trueStyle = showInstallScreen ? _instructions.secondaryInstructionsLight : _instructions.secondaryInstructionsText;
        return _react.default.createElement("p", {
          style: trueStyle
        }, _secondaryInstructions, '  ', !showInstallScreen && retry, !showInstallScreen && '.');
      }

      return null;
    }
    /**
     * returns an instance of UALInstallAuth
     * @memberof UALBoxParts
     * @method
     * @name installAuthenticatorSection
     * @return {ReactElement}
     */

  }, {
    key: "installAuthenticatorSection",
    value: function installAuthenticatorSection(authenticator) {
      return _react.default.createElement(_UALInstallAuth.UALInstallAuth, {
        authenticator: authenticator
      });
    }
    /**
     * returns a back-button DOM element
     * @memberof UALBoxParts
     * @method
     * @name backButton
     * @return {HTML}
     */

  }, {
    key: "backButton",
    value: function backButton(_ref2, goBackToAuthSelect) {
      var showAccountInput = _ref2.showAccountInput,
          error = _ref2.error,
          loading = _ref2.loading,
          logout = _ref2.logout,
          showInstallScreen = _ref2.showInstallScreen;
      var goBackAction = error ? logout : goBackToAuthSelect;

      if ((error || showAccountInput || showInstallScreen) && !loading) {
        return _react.default.createElement("p", {
          style: _back.backButtonWrapper
        }, _react.default.createElement("span", {
          role: "button",
          "aria-label": "Go Back",
          tabIndex: "-1",
          style: _back.backButton,
          onClick: goBackAction
        }, _react.default.createElement("strong", {
          style: _back.backButtonText
        }, _i18n.default.t('goBack'))));
      }

      return null;
    }
    /**
     * returns instructions on dealing with no available authenticators
     * @memberof UALBoxParts
     * @method
     * @name noAvailableAuthenticators
     * @return {HTML}
     */

  }, {
    key: "noAvailableAuthenticators",
    value: function noAvailableAuthenticators() {
      return _react.default.createElement("p", {
        style: _instructions.secondaryInstructionsText
      }, _i18n.default.t('noAuthenticatorsAvailableForDevice'));
    }
    /**
     * returns the main content of UALBox
     * @memberof UALBoxParts
     * @method
     * @name mainContent
     * @return {ReactElement[]}
     */

  }, {
    key: "mainContent",
    value: function mainContent(app, authenticate, checkAuthenticators, enterInstallScreen) {
      var _this = this;

      var submitAccountForLogin = app.submitAccountForLogin,
          authenticator = app.authenticator,
          loading = app.loading,
          error = app.error,
          showAccountInput = app.showAccountInput,
          showInstallScreen = app.showInstallScreen,
          availableAuthenticators = app.availableAuthenticators,
          instructions = app.instructions;
      var authProps = [authenticate, checkAuthenticators, enterInstallScreen];
      var mainContent = !loading ? availableAuthenticators.map(function (auth, index) {
        return _this.authButton.apply(_this, [auth, index, instructions].concat(authProps));
      }) : _react.default.createElement(_UALLoadingIcon.UALLoadingIcon, {
        withContainer: true
      });

      if (!loading && !availableAuthenticators.length) {
        mainContent = this.noAvailableAuthenticators();
      }

      if (showAccountInput || showInstallScreen) {
        mainContent = showInstallScreen ? this.installAuthenticatorSection(authenticator) : this.accountLogin(submitAccountForLogin, loading, authenticator);
      }

      return !error && mainContent;
    }
    /**
     * returns an instance of UALErrorMessage
     * @memberof UALBoxParts
     * @method
     * @name errorMessage
     * @return {ReactElement}
     */

  }, {
    key: "errorMessage",
    value: function errorMessage(_ref3) {
      var error = _ref3.error;

      if (error) {
        return _react.default.createElement(_UALErrorMessage.UALErrorMessage, {
          error: error
        });
      }

      return null;
    }
    /**
     * returns an instance of UALLearnMore
     * @memberof UALBoxParts
     * @method
     * @name learnMore
     * @return {ReactElement}
     */

  }, {
    key: "learnMore",
    value: function learnMore(_ref4) {
      var showAccountInput = _ref4.showAccountInput,
          showInstallScreen = _ref4.showInstallScreen,
          error = _ref4.error,
          loading = _ref4.loading;

      if (!showAccountInput && !error && !loading && !showInstallScreen) {
        return _react.default.createElement(_UALLearnMore.UALLearnMore, null);
      }

      return null;
    }
    /**
     * returns the background color for a given screen
     * @memberof UALBoxParts
     * @method
     * @name boxBackground
     * @return {Object}
     */

  }, {
    key: "boxBackground",
    value: function boxBackground(_ref5) {
      var error = _ref5.error,
          loading = _ref5.loading,
          showAccountInput = _ref5.showAccountInput,
          showInstallScreen = _ref5.showInstallScreen,
          activeAuthenticator = _ref5.activeAuthenticator,
          authenticator = _ref5.authenticator;
      var authenticatorStyle = activeAuthenticator && activeAuthenticator.getStyle().background;
      var background = {};

      if (!authenticatorStyle) {
        authenticatorStyle = authenticator && authenticator.getStyle().background;
      }

      if (showAccountInput || loading || showInstallScreen || error) {
        background = {
          backgroundColor: authenticatorStyle
        };
      }

      return background;
    }
    /**
     * returns the main title of a screen of UALBox
     * @memberof UALBoxParts
     * @method
     * @name boxTitle
     * @return {HTML}
     */

  }, {
    key: "boxTitle",
    value: function boxTitle(_ref6) {
      var error = _ref6.error,
          instructions = _ref6.instructions,
          showAccountInput = _ref6.showAccountInput,
          showInstallScreen = _ref6.showInstallScreen,
          loading = _ref6.loading,
          message = _ref6.message;
      var boxTitle = error ? _i18n.default.t('errorDuring', {
        src: error.source,
        type: error.type.toLowerCase()
      }) : instructions;
      var titleStyle = error || showAccountInput || loading || showInstallScreen ? _title.titleSecondary : _title.title;
      var titleContent = !loading || error ? boxTitle : message;
      return _react.default.createElement("h1", {
        style: titleStyle
      }, titleContent);
    }
    /**
     * returns an instance of UALExitButton
     * @memberof UALBoxParts
     * @method
     * @name exitButton
     * @return {ReactElement}
     */

  }, {
    key: "exitButton",
    value: function exitButton(_ref7) {
      var error = _ref7.error,
          showAccountInput = _ref7.showAccountInput,
          showInstallScreen = _ref7.showInstallScreen,
          loading = _ref7.loading,
          hideModal = _ref7.hideModal;
      return _react.default.createElement(_UALExitButton.UALExitButton, {
        isSecondaryStyle: !!error || showAccountInput || !!loading || showInstallScreen,
        hideModal: hideModal
      });
    }
  }]);

  return UALBoxParts;
}();

exports.UALBoxParts = UALBoxParts;
//# sourceMappingURL=UALBoxParts.js.map