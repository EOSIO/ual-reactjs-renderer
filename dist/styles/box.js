"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.box = void 0;

var _base = require("./base");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var box = _objectSpread({}, _base.base, {
  backgroundColor: 'white',
  position: 'static',
  overflow: 'hidden',
  padding: '10px 30px',
  width: '420px',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  margin: '50px auto',
  marginTop: '10vh',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  borderRadius: '4px'
});

exports.box = box;
//# sourceMappingURL=box.js.map