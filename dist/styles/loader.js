"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingElementCSS = exports.loadingElementTwo = exports.loadingElementOne = exports.loadingElementThree = exports.loadingIconWithContainer = exports.loadingIcon = void 0;

var _base = require("./base");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loadingIcon = _objectSpread({}, _base.base, {
  width: '41px',
  textAlign: 'center',
  marginTop: '-4px'
});

exports.loadingIcon = loadingIcon;

var loadingIconWithContainer = _objectSpread({}, loadingIcon, {
  width: '100%',
  padding: '20px'
});

exports.loadingIconWithContainer = loadingIconWithContainer;
var loadingElementThree = {
  width: '9px',
  height: '9px',
  margin: '1px',
  backgroundColor: 'white',
  borderRadius: '100%',
  display: 'inline-block',
  WebkitAnimation: 'ual-bouncedelay 1.4s infinite ease-in-out both',
  animation: 'ual-bouncedelay 1.4s infinite ease-in-out both'
};
exports.loadingElementThree = loadingElementThree;

var loadingElementOne = _objectSpread({}, loadingElementThree, {
  WebkitAnimationDelay: '-0.32s',
  AnimationDelay: '-0.32s'
});

exports.loadingElementOne = loadingElementOne;

var loadingElementTwo = _objectSpread({}, loadingElementThree, {
  WebkitAnimationDelay: '-0.16s',
  AnimationDelay: '-0.16s'
});

exports.loadingElementTwo = loadingElementTwo;
var loadingElementCSS = "\n  @-webkit-keyframes ual-bouncedelay {\n    0%, 80%, 100% { -webkit-transform: scale(0) }\n    40% { -webkit-transform: scale(1.0) }\n  }\n\n  @keyframes ual-bouncedelay {\n    0%, 80%, 100% { \n      -webkit-transform: scale(0);\n      transform: scale(0);\n    } 40% { \n      -webkit-transform: scale(1.0);\n      transform: scale(1.0);\n    }\n  }\n";
exports.loadingElementCSS = loadingElementCSS;
//# sourceMappingURL=loader.js.map