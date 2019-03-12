"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _container = require("../../styles/container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class
 * @name UALContainer
 * @desc wrapper for UALBox contents
 */
var UALContainer = function UALContainer(_ref) {
  var enter = _ref.enter,
      exit = _ref.exit,
      transitionForward = _ref.transitionForward,
      children = _ref.children;
  var end = transitionForward ? _container.containerLeft : _container.containerRight;
  var start = transitionForward ? _container.containerRight : _container.containerLeft;
  var startStyles = enter || exit ? _container.containerAnimated : start;
  var enterStyles = enter ? _container.containerCenter : {};
  var exitStyles = exit ? end : {};
  return _react.default.createElement("div", {
    style: _objectSpread({}, _container.container, startStyles, enterStyles, exitStyles)
  }, children);
};
/**
 * @memberof UALContainer
 * @name props
 * @prop {boolean} enter - whether or not the screen has entered the user's view
 * @prop {boolean} exit - whether or not the screen has exited the user's view
 * @prop {boolean} transitionForward - whether or not user is progressing forward through screens
 * @prop {Node[]|Node} children - nested components
 */


exports.UALContainer = UALContainer;
UALContainer.propTypes = {
  enter: _propTypes.default.bool.isRequired,
  exit: _propTypes.default.bool.isRequired,
  transitionForward: _propTypes.default.bool.isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired
};
//# sourceMappingURL=UALContainer.js.map