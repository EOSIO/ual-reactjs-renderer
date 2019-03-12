"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALAuthButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _fa = require("react-icons/fa");

var _io = require("react-icons/io");

var _UALLoadingIcon = require("../misc/UALLoadingIcon");

var _box = require("../../constants/box");

var _authenticator = require("../../styles/authenticator");

var _authentication = require("../../constants/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
 * Component that provides a button for logging in with a given Authenticator.
 */
var UALAuthButton =
/*#__PURE__*/
function (_Component) {
  _inherits(UALAuthButton, _Component);

  function UALAuthButton(props) {
    var _this;

    _classCallCheck(this, UALAuthButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UALAuthButton).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkButtonAvailability", function () {
      var instructions = _this.props.instructions;
      var button = _this.state.button;

      if (instructions === _box.boxTitles.ERROR && button !== _authentication.buttonState.UNAVAILABLE) {
        _this.setState({
          button: _authentication.buttonState.UNAVAILABLE
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkButtonStatusOnRetry", function () {
      var instructions = _this.props.instructions;
      var button = _this.state.button;

      if (instructions === _box.boxTitles.NORMAL && button === _authentication.buttonState.UNAVAILABLE) {
        _this.setState({
          button: _authentication.buttonState.LOADING
        }, _this.startButtonStateChecker);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "startButtonStateChecker", function () {
      var _this$props = _this.props,
          authenticator = _this$props.authenticator,
          onErroredState = _this$props.onErroredState;
      _this.buttonStateChecker = setInterval(function () {
        if (!authenticator.isLoading() && !authenticator.isErrored()) {
          clearInterval(_this.buttonStateChecker);

          _this.setState({
            button: _authentication.buttonState.AVAILABLE
          });
        } else if (authenticator.isErrored()) {
          clearInterval(_this.buttonStateChecker);

          _this.setState({
            button: _authentication.buttonState.ERRORED
          }, onErroredState());
        }
      }, 250);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "attemptAuthentication", function () {
      var button = _this.state.button;
      var _this$props2 = _this.props,
          onAuthenticatorSelect = _this$props2.onAuthenticatorSelect,
          authenticator = _this$props2.authenticator,
          onRequestInstall = _this$props2.onRequestInstall;

      if (button === _authentication.buttonState.AVAILABLE) {
        onAuthenticatorSelect(authenticator);
      }

      if (button === _authentication.buttonState.UNAVAILABLE) {
        onRequestInstall(authenticator);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activateGenericSize", function () {
      var button = _this.state.button;

      if (button === _authentication.buttonState.AVAILABLE || button === _authentication.buttonState.UNAVAILABLE) {
        _this.setState({
          hoverStyle: {}
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activateHoverSize", function () {
      var button = _this.state.button;

      if (button === _authentication.buttonState.AVAILABLE || button === _authentication.buttonState.UNAVAILABLE) {
        _this.setState({
          hoverStyle: _authenticator.buttonHover
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderIcon", function () {
      var button = _this.state.button;

      switch (button) {
        case _authentication.buttonState.LOADING:
          return _react.default.createElement(_UALLoadingIcon.UALLoadingIcon, null);

        case _authentication.buttonState.ERRORED:
          return _react.default.createElement(_io.IoMdInformationCircleOutline, {
            style: _authenticator.errored
          });

        case _authentication.buttonState.UNAVAILABLE:
          return _react.default.createElement(_fa.FaDownload, null);

        default:
          return _react.default.createElement(_fa.FaChevronRight, null);
      }
    });

    var _button = _authentication.buttonState.UNAVAILABLE;

    if (props.instructions === _box.boxTitles.NORMAL) {
      _button = _authentication.buttonState.AVAILABLE;
      _button = props.authenticator.isErrored() ? _authentication.buttonState.ERRORED : _button;
      _button = props.authenticator.isLoading() ? _authentication.buttonState.LOADING : _button;
    }
    /**
     * @memberof UALAuthButton
     * @name state
     * @prop {string} icon - icon associated with authenticator
     * @prop {string} background - hexidecimal button background color
     * @prop {string} textColor - hexidecimal button text color
     * @prop {string} text - button text
     * @prop {string} button - button status
     * @prop {Object} hoverStyle - additional button style on hover
     */


    _this.state = _objectSpread({}, props.authenticator.getStyle(), {
      button: _button
      /**
       * @memberof UALAuthButton
       * @name buttonStateChecker
       * @type {null|function}
       * @desc interval for checking button status during initialization
       */

    });
    _this.buttonStateChecker = null;
    return _this;
  }

  _createClass(UALAuthButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onErroredState = this.props.onErroredState;
      var button = this.state.button;

      if (button === _authentication.buttonState.LOADING) {
        this.startButtonStateChecker();
      }

      if (button === _authentication.buttonState.ERRORED) {
        onErroredState();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkButtonAvailability();
      this.checkButtonStatusOnRetry();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.buttonStateChecker);
    }
    /**
     * @method
     * @return {Void}
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          icon = _this$state.icon,
          background = _this$state.background,
          textColor = _this$state.textColor,
          text = _this$state.text,
          hoverStyle = _this$state.hoverStyle,
          button = _this$state.button;
      var authenticator = this.props.authenticator;
      var trueBackground = button === _authentication.buttonState.ERRORED ? _authentication.errorColors.LIGHT_GREY : background;
      var trueTextColor = button === _authentication.buttonState.ERRORED ? _authentication.errorColors.DARK_GREY : textColor;
      var errorTooltip = authenticator.getError() ? authenticator.getError().message : '';

      var toolTip = errorTooltip.length > 0 && button !== _authentication.buttonState.UNAVAILABLE && _react.default.createElement(_reactTooltip.default, null);

      return _react.default.createElement("div", {
        onClick: this.attemptAuthentication,
        role: "button",
        "aria-label": text,
        tabIndex: this.props.index,
        style: _objectSpread({}, _authenticator.authButton, {
          background: trueBackground
        }, hoverStyle, {
          color: trueTextColor
        }),
        onMouseEnter: this.activateHoverSize,
        onMouseLeave: this.activateGenericSize,
        "data-tip": errorTooltip,
        "data-effect": "solid"
      }, toolTip, _react.default.createElement("div", {
        style: _authenticator.authIconWrapper
      }, _react.default.createElement("img", {
        style: _authenticator.authIcon,
        src: icon,
        alt: ""
      })), _react.default.createElement("div", {
        style: _authenticator.authText
      }, _react.default.createElement("span", {
        style: _authenticator.authTextFont
      }, text), _react.default.createElement("span", {
        style: _authenticator.chevron
      }, this.renderIcon())));
    }
  }]);

  return UALAuthButton;
}(_react.Component);
/**
 * @memberof UALAuthButton
 * @name props
 * @prop {string} instructions - current instructions on UAL modal
 * @prop {function} onAuthenticatorSelect - triggered when authenticator button is clicked
 * @prop {function} onRequestInstall - triggered when authenticator install button is clicked
 * @prop {function} onErroredState - triggered when authenticator initialization ends in error
 * @prop {Authenticator} authenticator - reference to current authenticator instance
 * @prop {number} index - authenticator's index in list
 */


exports.UALAuthButton = UALAuthButton;
UALAuthButton.propTypes = {
  instructions: _propTypes.default.string.isRequired,
  onAuthenticatorSelect: _propTypes.default.func.isRequired,
  onRequestInstall: _propTypes.default.func.isRequired,
  onErroredState: _propTypes.default.func.isRequired,
  authenticator: _propTypes.default.object.isRequired,
  // eslint-disable-line
  index: _propTypes.default.number.isRequired
};
//# sourceMappingURL=UALAuthButton.js.map