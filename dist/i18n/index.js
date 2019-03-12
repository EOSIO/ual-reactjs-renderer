"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _resources = _interopRequireDefault(require("./resources"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this module isn't quite compliant, so it's gotta be imported like this to work
var LanguageDetector = require('i18next-browser-languagedetector');

_i18next.default.use(LanguageDetector).init({
  resources: _resources.default,
  lng: 'en-US',
  fallbackLng: 'en',
  ns: ['ualcore'],
  // namespaces to load
  defaultNS: 'ualcore',
  // defaults to 'translation'
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
  }
}).catch(function (e) {
  return console.warn(e);
});

var _default = _i18next.default;
exports.default = _default;
//# sourceMappingURL=index.js.map