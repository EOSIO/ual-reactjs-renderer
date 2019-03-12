"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALInstallAuth = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _installation = require("../../styles/installation");

var _base = require("../../styles/base");

var _authenticator = require("../../styles/authenticator");

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
 * Component for rendering the authenticator install screen
 */
var UALInstallAuth =
/*#__PURE__*/
function (_Component) {
  _inherits(UALInstallAuth, _Component);

  function UALInstallAuth(props) {
    var _this;

    _classCallCheck(this, UALInstallAuth);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UALInstallAuth).call(this, props));
    /**
     * @memberof UALInstallAuth
     * @name state
     * @prop {Object} hoverStyle - additional button style on hover
     */

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activateGenericSize", function () {
      _this.setState({
        hoverStyle: {}
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activateHoverSize", function () {
      _this.setState({
        hoverStyle: _authenticator.buttonHover
      });
    });

    _this.state = {
      hoverStyle: {}
    };
    return _this;
  }
  /**
   * @method
   * @return {Void}
   */


  _createClass(UALInstallAuth, [{
    key: "render",
    value: function render() {
      var hoverStyle = this.state.hoverStyle;
      var authenticator = this.props.authenticator;
      return _react.default.createElement("div", {
        style: _installation.installButtonWrapper
      }, _react.default.createElement("div", {
        role: "button",
        "aria-label": "Continue",
        tabIndex: "-1",
        style: _objectSpread({}, _installation.installButton, hoverStyle),
        onMouseEnter: this.activateHoverSize,
        onMouseLeave: this.activateGenericSize
      }, _react.default.createElement("a", {
        style: _base.baseLink,
        href: authenticator.getOnboardingLink(),
        target: "_blank",
        rel: "noopener noreferrer"
      }, _react.default.createElement("div", {
        style: _installation.buttonText,
        href: "authenticator"
      }, _i18n.default.t('leaveAndInstall')))));
    }
  }]);

  return UALInstallAuth;
}(_react.Component);
/**
 * @memberof UALInstallAuth
 * @name props
 * @prop {Authenticator} authenticator - authenticator from which to render an install button
 */


exports.UALInstallAuth = UALInstallAuth;
UALInstallAuth.propTypes = {
  authenticator: _propTypes.default.object.isRequired // eslint-disable-line

};
//# sourceMappingURL=UALInstallAuth.js.map