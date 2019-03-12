"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerRight = exports.containerLeft = exports.containerCenter = exports.containerAnimated = exports.container = void 0;

var _base = require("./base");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var container = _objectSpread({}, _base.base, {
  minHeight: '20px',
  width: '100%',
  height: '100%',
  padding: '15px'
});

exports.container = container;
var containerAnimated = {
  transition: '0.3s',
  WebkitTransition: '0.3s'
};
exports.containerAnimated = containerAnimated;
var containerCenter = {
  marginLeft: '0%'
};
exports.containerCenter = containerCenter;
var containerLeft = {
  marginLeft: '-120%'
};
exports.containerLeft = containerLeft;
var containerRight = {
  marginLeft: '120%'
};
exports.containerRight = containerRight;
//# sourceMappingURL=container.js.map