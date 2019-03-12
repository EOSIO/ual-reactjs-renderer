"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALErrorMessage = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _universalAuthenticatorLibrary = require("@blockone/universal-authenticator-library");

var _io = require("react-icons/io");

var _base = require("../../styles/base");

var _error = require("../../styles/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @name UALErrorMessage
 * @desc component for rendering error messages
 */
var UALErrorMessage = function UALErrorMessage(_ref) {
  var message = _ref.error.message;
  return _react.default.createElement("div", {
    style: _base.base
  }, _react.default.createElement("p", {
    style: _error.errorMessage
  }, _react.default.createElement(_io.IoMdInformationCircleOutline, null), ' ', message));
};
/**
 * @memberof UALErrorMessage
 * @name props
 * @prop {UALError|Object} chains - list of chains the app supports
 */


exports.UALErrorMessage = UALErrorMessage;
UALErrorMessage.propTypes = {
  error: _propTypes.default.oneOfType([_propTypes.default.instanceOf(_universalAuthenticatorLibrary.UALError), _propTypes.default.object]).isRequired
};
//# sourceMappingURL=UALErrorMessage.js.map