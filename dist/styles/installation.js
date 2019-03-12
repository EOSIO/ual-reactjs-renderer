"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonText = exports.installButtonWrapper = exports.installButton = void 0;

var _authenticator = require("./authenticator");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var installButton = _objectSpread({}, _authenticator.authButton, {
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer'
});

exports.installButton = installButton;
var installButtonWrapper = {
  paddingTop: '20px',
  paddingBottom: '30px'
};
exports.installButtonWrapper = installButtonWrapper;
var buttonText = {
  padding: '15px',
  textAlign: 'center'
};
exports.buttonText = buttonText;
//# sourceMappingURL=installation.js.map