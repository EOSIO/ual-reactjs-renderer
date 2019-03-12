"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secondaryInstructionsLight = exports.secondaryInstructionsText = void 0;

var _base = require("./base");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var secondaryInstructionsText = _objectSpread({}, _base.base, {
  fontSize: '1rem',
  marginTop: '0.5rem',
  marginBottom: '2rem',
  color: '#607C9F'
});

exports.secondaryInstructionsText = secondaryInstructionsText;

var secondaryInstructionsLight = _objectSpread({}, secondaryInstructionsText, {
  color: 'white'
});

exports.secondaryInstructionsLight = secondaryInstructionsLight;
//# sourceMappingURL=instructions.js.map