"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleSecondary = exports.title = exports.titleWrapper = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var titleWrapper = {
  padding: '15px 15px 0px 15px'
};
exports.titleWrapper = titleWrapper;
var titleBase = {
  margin: '0',
  textAlign: 'left'
};

var title = _objectSpread({}, titleBase, {
  color: 'rgb(49, 71, 128)'
});

exports.title = title;

var titleSecondary = _objectSpread({}, titleBase, {
  color: 'white'
});

exports.titleSecondary = titleSecondary;
//# sourceMappingURL=title.js.map