"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withUAL = exports.UALContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var UALContext = _react.default.createContext();
/**
 * @type {function}
 * @name withUAL
 * @desc Function for making a component a consumer of the UAL context
 */


exports.UALContext = UALContext;

var withUAL = function withUAL(WrappedComponent) {
  return function (props) {
    return _react.default.createElement(UALContext.Consumer, null, function (context) {
      return _react.default.createElement(WrappedComponent, _extends({}, props, {
        ual: context
      }));
    });
  };
};

exports.withUAL = withUAL;
//# sourceMappingURL=UALContext.js.map