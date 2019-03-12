"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonEnabled = exports.buttonDisabled = exports.inputStyle = exports.inputWrapper = void 0;

var _base = require("./base");

var _authenticator = require("./authenticator");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputWrapper = _objectSpread({}, _base.base, {
  marginTop: '10px'
});

exports.inputWrapper = inputWrapper;
var inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  fontSize: '1.3em',
  boxSizing: 'border-box',
  margin: '0px auto 15px auto',
  maxWidth: '400px',
  transition: 'opacity 0.3s',
  WebkitTransition: 'opacity 0.3s',
  border: 'none',
  color: 'white',
  borderBottom: '1px solid white',
  outline: 'none',
  backgroundColor: 'rgba(0,0,0,0)'
};
exports.inputStyle = inputStyle;

var buttonDisabled = _objectSpread({}, _authenticator.authButton, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
});

exports.buttonDisabled = buttonDisabled;

var buttonEnabled = _objectSpread({}, _authenticator.authButton, {
  backgroundColor: 'rgba(0, 0, 0, 0.25)'
});

exports.buttonEnabled = buttonEnabled;
//# sourceMappingURL=input.js.map