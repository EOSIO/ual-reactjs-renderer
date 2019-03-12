"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALAccountInput = exports.StyledInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _UALLoadingIcon = require("../misc/UALLoadingIcon");

var _input = require("../../styles/input");

var _authenticator = require("../../styles/authenticator");

var _installation = require("../../styles/installation");

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  &::-webkit-input-placeholder {\n    color: rgba(255,255,255,0.5);\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledInput = _styledComponents.default.input(_templateObject());
/**
 * Component for the account name input field.
 */


exports.StyledInput = StyledInput;

var UALAccountInput =
/*#__PURE__*/
function (_Component) {
  _inherits(UALAccountInput, _Component);

  function UALAccountInput(props) {
    var _this;

    _classCallCheck(this, UALAccountInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UALAccountInput).call(this, props));
    /**
     * @memberof UALAccountInput
     * @name state
     * @prop {string} accountInput - currently entered account input
     * @prop {Object} hoverStyle - additional button style on hover
     */

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "submitFromKeyboard", function (e) {
      var _this$props = _this.props,
          submitAccountForLogin = _this$props.submitAccountForLogin,
          authenticator = _this$props.authenticator;
      var accountInput = _this.state.accountInput;
      return (e.which === 13 || e.keyCode === 13) && submitAccountForLogin(accountInput, authenticator);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateButtonWithInput", function (e) {
      var accountInput = e.target.value;
      var isValid = accountInput.match(_this.validator) && accountInput.match(_this.validator)[0] === accountInput;

      if (isValid || !accountInput.length) {
        _this.setState({
          accountInput: accountInput
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activateGenericSize", function () {
      _this.setState({
        hoverStyle: {}
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activateHoverSize", function () {
      if (_this.state.accountInput !== '') {
        _this.setState({
          hoverStyle: _authenticator.buttonHover
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderInput", function () {
      var _this$state = _this.state,
          accountInput = _this$state.accountInput,
          hoverStyle = _this$state.hoverStyle;
      var _this$props2 = _this.props,
          submitAccountForLogin = _this$props2.submitAccountForLogin,
          authenticator = _this$props2.authenticator;
      var buttonStyle = accountInput !== '' ? _input.buttonEnabled : _input.buttonDisabled;
      return _react.default.createElement("div", {
        style: _input.inputWrapper
      }, _react.default.createElement(StyledInput, {
        className: "text-input",
        style: _input.inputStyle,
        type: "text",
        placeholder: _i18n.default.t('accountName'),
        value: accountInput,
        onChange: _this.updateButtonWithInput,
        onKeyPress: _this.submitFromKeyboard,
        ref: function ref(input) {
          _this.inputField = input;
        },
        autoCapitalize: "none"
      }), _react.default.createElement("div", {
        role: "button",
        "aria-label": "Continue",
        tabIndex: "-1",
        style: _objectSpread({}, buttonStyle, hoverStyle),
        onMouseEnter: _this.activateHoverSize,
        onMouseLeave: _this.activateGenericSize,
        onClick: function onClick() {
          return accountInput && submitAccountForLogin(accountInput, authenticator);
        }
      }, _react.default.createElement("div", {
        style: _installation.buttonText
      }, _i18n.default.t('continue'))));
    });

    _this.state = {
      accountInput: '',
      hoverStyle: {}
      /**
       * @memberof UALAccountInput
       * @name validator
       * @type {RegExp}
       * @desc used to validate account input against chain constraints
       */

    };
    _this.validator = new RegExp(/[a-z1-5]{1}[.a-z1-5]{0,11}/);
    return _this;
  }

  _createClass(UALAccountInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.inputField.focus();
      }, 300);
    }
    /**
     * @method
     * @return {Void}
     * @param {Event} e
     */

  }, {
    key: "render",
    value: function render() {
      return !this.props.loading ? this.renderInput() : _react.default.createElement(_UALLoadingIcon.UALLoadingIcon, {
        withContainer: true
      });
    }
  }]);

  return UALAccountInput;
}(_react.Component);
/**
 * @memberof UALAccountInput
 * @name props
 * @prop {Authenticator} authenticator - authenticator to enter account name for
 * @prop {function} submitAccountForLogin - attempts authentication using UAL context function
 * @prop {boolean} loading - loading state of authentication
 */


exports.UALAccountInput = UALAccountInput;
UALAccountInput.propTypes = {
  authenticator: _propTypes.default.object.isRequired,
  // eslint-disable-line
  submitAccountForLogin: _propTypes.default.func.isRequired,
  loading: _propTypes.default.bool.isRequired
};
//# sourceMappingURL=UALAccountInput.js.map