"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errored = exports.chevron = exports.authTextFont = exports.authText = exports.authIconWrapper = exports.authIcon = exports.buttonHover = exports.authButton = void 0;

var _base = require("./base");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var authButton = {
  fontWeight: '100',
  color: '#ffffff',
  borderRadius: '6px',
  width: '100%',
  margin: '20px auto',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
  opacity: '1',
  transition: '0.3s',
  WebkitTransition: '0.3s',
  outline: 'none'
};
exports.authButton = authButton;
var buttonHover = {
  cursor: 'pointer',
  transform: 'scale(1.03)'
};
exports.buttonHover = buttonHover;
var authIcon = {
  maxHeight: '30px',
  maxWidth: '100%',
  margin: 'auto',
  marginTop: '7%',
  display: 'block'
};
exports.authIcon = authIcon;

var authIconWrapper = _objectSpread({}, _base.base, {
  display: 'inline-block',
  float: 'left',
  width: '50px',
  padding: '8.5px 10px',
  backgroundColor: 'rgba(0,0,0,0.15)',
  borderRadius: '5px 0px 0px 5px'
});

exports.authIconWrapper = authIconWrapper;

var authText = _objectSpread({}, _base.base, {
  display: 'inline-block',
  padding: '12px 13px 12px 15px',
  width: 'calc(100% - 50px)',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  letterSpacing: '1.1px'
});

exports.authText = authText;
var authTextFont = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  letterSpacing: '1.1px'
};
exports.authTextFont = authTextFont;
var chevron = {
  float: 'right',
  height: '16px',
  marginTop: '2px'
};
exports.chevron = chevron;
var errored = {
  color: 'rgb(144, 150, 168)',
  fontSize: '1.5rem'
};
exports.errored = errored;
//# sourceMappingURL=authenticator.js.map