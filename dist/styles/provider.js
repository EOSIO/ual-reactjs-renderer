"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modalStyles = void 0;

var _base = require("./base");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var modalStyles = _objectSpread({}, _base.base, {
  position: 'fixed',
  zIndex: '999999999999',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  margin: 'auto',
  overflow: 'auto',
  backgroundColor: 'rgb(49, 71, 128, 0.8)'
});

exports.modalStyles = modalStyles;
//# sourceMappingURL=provider.js.map