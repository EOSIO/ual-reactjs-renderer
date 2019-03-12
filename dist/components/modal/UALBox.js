"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALBox = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _UALContainer = require("./UALContainer");

var _UALContext = require("../provider/UALContext");

var _UALBoxParts = require("./UALBoxParts");

var _box = require("../../styles/box");

var _title = require("../../styles/title");

var _mediaQuery = require("../../styles/mediaQuery");

var _box2 = require("../../constants/box");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component for rendering the box containing the AuthButtons, account input, and handling
 * basic preparatory authentication logic
 */
var UALBoxBase =
/*#__PURE__*/
function (_Component) {
  _inherits(UALBoxBase, _Component);

  function UALBoxBase(props) {
    var _this;

    _classCallCheck(this, UALBoxBase);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UALBoxBase).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "authenticate",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(authenticator) {
        var authenticateWithoutAccountInput, needsAccountName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                authenticateWithoutAccountInput = _this.props.ual.authenticateWithoutAccountInput;
                _context.next = 3;
                return authenticator.shouldRequestAccountName();

              case 3:
                needsAccountName = _context.sent;

                if (needsAccountName) {
                  _this.authenticateWithAccountInput(authenticator);
                } else {
                  authenticateWithoutAccountInput(authenticator);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkAuthenticators", function () {
      var availableAuthenticators = _this.props.ual.availableAuthenticators;
      var nonErroredAuthenticators = availableAuthenticators.filter(function (auth) {
        return !auth.isErrored();
      });

      if (!nonErroredAuthenticators.length) {
        _this.setState({
          instructions: _box2.boxTitles.ERROR,
          secondaryInstructions: _box2.installGuide
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "authenticateWithAccountInput", function (authenticator) {
      var loginState = {
        containerEnter: true,
        showAccountInput: true,
        showInstallScreen: false,
        instructions: _i18n.default.t('enterUsername'),
        secondaryInstructions: ''
      };

      _this.setState({
        authenticator: authenticator,
        containerExit: true,
        containerEnter: false,
        transitionForward: true
      }, _this.transitionToReset(loginState));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "enterInstallScreen", function (authenticator) {
      var authName = authenticator.getStyle().text;

      var secondaryInstructions = _i18n.default.t('getStarted', {
        authName: authName
      });

      var installState = {
        containerEnter: true,
        showInstallScreen: true,
        showAccountInput: false,
        instructions: _i18n.default.t('welcomeAccount', {
          authName: authName
        }),
        secondaryInstructions: secondaryInstructions
      };

      _this.setState({
        authenticator: authenticator,
        containerExit: true,
        containerEnter: false,
        transitionForward: true
      }, _this.transitionToReset(installState));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "goBackToAuthSelect", function () {
      var showInstallScreen = _this.state.showInstallScreen;
      var instructions = showInstallScreen ? _box2.boxTitles.ERROR : _box2.boxTitles.NORMAL;
      var secondaryInstructions = showInstallScreen ? _box2.installGuide : '';
      var previousSelectState = {
        containerEnter: true,
        showAccountInput: false,
        showInstallScreen: false,
        instructions: instructions,
        secondaryInstructions: secondaryInstructions
      };

      _this.setState({
        containerExit: true,
        containerEnter: false,
        transitionForward: false
      }, _this.transitionToReset(previousSelectState));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "refreshBox", function () {
      var restart = _this.props.ual.restart;

      _this.setState(_objectSpread({}, _box2.defaultBoxState, {
        containerEnter: true
      }), restart);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetContainer", function (nextState) {
      _this.setState({
        containerExit: false,
        containerEnter: false
      }, _this.transitionToComplete(nextState));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "transitionToReset", function (nextState) {
      setTimeout(function () {
        _this.resetContainer(nextState);
      }, 300);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "transitionToComplete", function (nextState) {
      setTimeout(function () {
        _this.setState(nextState);
      }, 50);
    });

    _this.state = _box2.defaultBoxState;
    return _this;
  }

  _createClass(UALBoxBase, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props$ual = this.props.ual,
          activeUser = _this$props$ual.activeUser,
          modal = _this$props$ual.modal,
          hideModal = _this$props$ual.hideModal;

      if (activeUser && modal) {
        hideModal();
      } else {
        setTimeout(function () {
          return _this2.setState({
            containerEnter: true
          });
        }, 300);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props$ual2 = this.props.ual,
          activeUser = _this$props$ual2.activeUser,
          modal = _this$props$ual2.modal,
          hideModal = _this$props$ual2.hideModal;

      if (activeUser && modal) {
        hideModal();
      }
    }
    /**
     * Attempts authentication
     * @method
     * @return {Void}
     * @param {Authenticator} authenticator
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          containerEnter = _this$state.containerEnter,
          containerExit = _this$state.containerExit,
          transitionForward = _this$state.transitionForward,
          state = _objectWithoutProperties(_this$state, ["containerEnter", "containerExit", "transitionForward"]);

      var ual = this.props.ual;

      var app = _objectSpread({}, state, ual);

      var background = _UALBoxParts.UALBoxParts.boxBackground(app);

      return _react.default.createElement("div", {
        id: "ual-box",
        style: _objectSpread({}, _box.box, background)
      }, _UALBoxParts.UALBoxParts.exitButton(app), _react.default.createElement("div", {
        style: _title.titleWrapper
      }, _UALBoxParts.UALBoxParts.boxTitle(app)), _react.default.createElement(_UALContainer.UALContainer, {
        enter: containerEnter,
        exit: containerExit,
        transitionForward: transitionForward
      }, _UALBoxParts.UALBoxParts.secondaryInstructions(app, this.refreshBox), _UALBoxParts.UALBoxParts.mainContent(app, this.authenticate, this.checkAuthenticators, this.enterInstallScreen), _UALBoxParts.UALBoxParts.errorMessage(ual), _UALBoxParts.UALBoxParts.backButton(app, this.goBackToAuthSelect), _UALBoxParts.UALBoxParts.learnMore(app)), _react.default.createElement("style", null, _mediaQuery.mediaQuery));
    }
  }]);

  return UALBoxBase;
}(_react.Component);

var UALBox = (0, _UALContext.withUAL)(UALBoxBase);
/**
 * @typeDef ual
 * @desc the ual context that UALBox consumes
 * @prop {Chain[]} chains - chain list from props
 * @prop {Authenticator[]} authenticators - authenticator instances from props
 * @prop {Authenticator[]} availableAuthenticators - available authenticator list
 * @prop {boolean} loading - loading state of UAL
 * @prop {User} activeUser - logged in user
 * @prop {string} message - message, if any, accompanying current UAL state
 * @prop {function} broadcastStatus - dispatches a provider state update
 * @prop {function} hideModal - hides the modal
 * @prop {boolean} modal - whether or not show modal, initialized via props
 * @prop {string} appName - name of app
 * @prop {function} logout - logs user out of authenticator and resets UAL state
 * @prop {function} restart - resets all available authenticators and resets UAL state
 * @prop {UALError|null} error - captured error if any
 * @prop {function} authenticateWithoutAccountInput - attempts authentication with an authenticator not requiring account input
 * @prop {function} submitAccountForLogin - attempts authentication
 */

/**
 * @memberof UALBoxBase
 * @name props
 * @prop {ual} ual
 */

exports.UALBox = UALBox;
UALBoxBase.propTypes = {
  ual: _propTypes.default.shape({
    chains: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
    authenticators: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
    availableAuthenticators: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
    loading: _propTypes.default.bool.isRequired,
    activeUser: _propTypes.default.object,
    // eslint-disable-line
    message: _propTypes.default.string.isRequired,
    broadcastStatus: _propTypes.default.func.isRequired,
    hideModal: _propTypes.default.func.isRequired,
    modal: _propTypes.default.bool.isRequired,
    appName: _propTypes.default.string.isRequired,
    logout: _propTypes.default.func.isRequired,
    restart: _propTypes.default.func.isRequired,
    error: _propTypes.default.object,
    authenticateWithoutAccountInput: _propTypes.default.func.isRequired,
    submitAccountForLogin: _propTypes.default.func.isRequired
  }).isRequired
};
//# sourceMappingURL=UALBox.js.map