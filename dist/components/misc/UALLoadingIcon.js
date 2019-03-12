"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALLoadingIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _loader = require("../../styles/loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * @name UALLoadingIcon
 * @desc Component that renders a loading icon
 */
var UALLoadingIcon = function UALLoadingIcon(_ref) {
  var withContainer = _ref.withContainer;
  return _react.default.createElement("div", {
    style: withContainer ? _loader.loadingIconWithContainer : _loader.loadingIcon
  }, _react.default.createElement("div", {
    style: _loader.loadingElementOne
  }), _react.default.createElement("div", {
    style: _loader.loadingElementTwo
  }), _react.default.createElement("div", {
    style: _loader.loadingElementThree
  }), _react.default.createElement("style", null, _loader.loadingElementCSS));
};

exports.UALLoadingIcon = UALLoadingIcon;
UALLoadingIcon.defaultProps = {
  withContainer: false
  /**
   * @memberof UALInstallAuth
   * @name props
   * @prop {boolean} [false] withAuthenticator - authenticator from which to render an install button
   */

};
UALLoadingIcon.propTypes = {
  withContainer: _propTypes.default.bool
};
//# sourceMappingURL=UALLoadingIcon.js.map