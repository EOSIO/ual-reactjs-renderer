"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.learnMoreIcon = exports.learnMoreButton = exports.learnMoreText = exports.infoExpanded = exports.learnMore = void 0;
var learnMore = {
  transition: 'max-height ease 0.2s, transform ease-out 0.3s, opacity ease-in 0.7s',
  WebkitTransition: 'max-height ease 0.2s, transform ease-out 0.3s, opacity ease-in 0.7s',
  overflow: 'hidden',
  transform: 'scale(0.5)',
  transformOrigin: 'top left',
  opacity: '0',
  maxHeight: '0',
  margin: '0'
};
exports.learnMore = learnMore;
var infoExpanded = {
  opacity: '1',
  transform: 'scale(1)',
  maxHeight: '500px'
};
exports.infoExpanded = infoExpanded;
var learnMoreText = {
  color: 'rgba(49, 71, 128, 0.7)',
  fontSize: '0.8rem',
  fontWeight: '100',
  margin: '0px'
};
exports.learnMoreText = learnMoreText;
var learnMoreButton = {
  marginTop: '0px',
  color: 'rgb(72, 151, 248)',
  fontSize: '0.9rem',
  fontWeight: '100',
  transition: '0.3s',
  WebkitTransition: '0.3s',
  cursor: 'pointer',
  outline: 'none'
};
exports.learnMoreButton = learnMoreButton;
var learnMoreIcon = {
  fontSize: '1rem',
  verticalAlign: 'middle'
};
exports.learnMoreIcon = learnMoreIcon;
//# sourceMappingURL=info.js.map