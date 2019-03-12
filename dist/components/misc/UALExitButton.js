"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALExitButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

var _exit = require("../../styles/buttons/exit");

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
 * Component for rendering a modal close button.
 */
var UALExitButton =
/*#__PURE__*/
function (_Component) {
  _inherits(UALExitButton, _Component);

  function UALExitButton(props) {
    var _this;

    _classCallCheck(this, UALExitButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UALExitButton).call(this, props));
    /**
     * @memberof UALExitButton
     * @name state
     * @prop {Object} hoverStyle - additional button style on hover
     */

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scaleUp", function () {
      _this.setState({
        hoverStyle: _exit.exitHover
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scaleDown", function () {
      _this.setState({
        hoverStyle: {}
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


  _createClass(UALExitButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hideModal = _this$props.hideModal,
          isSecondaryStyle = _this$props.isSecondaryStyle;
      var hoverStyle = this.state.hoverStyle;
      var buttonColor = isSecondaryStyle ? {
        color: 'white'
      } : {};
      return _react.default.createElement("p", {
        style: _exit.exitWrapper
      }, _react.default.createElement("span", {
        role: "button",
        "aria-label": "exit",
        tabIndex: "-1",
        style: _objectSpread({}, _exit.exit, hoverStyle, buttonColor),
        onMouseEnter: this.scaleUp,
        onMouseLeave: this.scaleDown,
        onClick: hideModal
      }, _react.default.createElement(_fa.FaTimes, null)));
    }
  }]);

  return UALExitButton;
}(_react.Component);
/**
 * @memberof UALExitButton
 * @name props
 * @prop {function} hideModal - from UAL, hides modal
 * @prop {boolean} isSecondaryStyle - whether or not button should be light
 */


exports.UALExitButton = UALExitButton;
UALExitButton.propTypes = {
  hideModal: _propTypes.default.func.isRequired,
  isSecondaryStyle: _propTypes.default.bool.isRequired
};
//# sourceMappingURL=UALExitButton.js.map