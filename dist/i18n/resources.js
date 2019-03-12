"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enUS = _interopRequireDefault(require("./en-US"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  en: {
    // this is the default namespace; this can also be a "namespace" like 'US' as in 'en-US'
    ualcore: _enUS.default
  },
  'en-US': {
    // this is the default namespace; this can also be a "namespace" like 'US' as in 'en-US'
    ualcore: _enUS.default
  },
  es: {
    ualcore: {
      logout: 'Cerra sesión',
      instructionsToContinue: 'para continuar por favor hace una eleción'
    }
  },
  'pt-BR': {
    ualcore: {
      logout: 'Sair',
      instructionsToContinue: 'para continuar por favor hace una eleción'
    }
  }
};
exports.default = _default;
//# sourceMappingURL=resources.js.map