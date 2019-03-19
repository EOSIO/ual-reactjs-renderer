"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UALProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _i18n = _interopRequireDefault(require("../../i18n"));

require("../../types");

var _universalAuthenticatorLibrary = require("@blockone/universal-authenticator-library");

var _UALContext = require("./UALContext");

var _provider = require("../../constants/provider");

var _UALBox = require("../modal/UALBox");

var _provider2 = require("../../styles/provider");

var _base = require("../../styles/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Wrapper component that provides a child app with access to UAL functionality
 */
var UALProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(UALProvider, _Component);

  function UALProvider(props) {
    var _this;

    _classCallCheck(this, UALProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UALProvider).call(this, props));
    /**
     * @namespace UAL
     */

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getAuthenticatorInstance", function (type, availableAuthenticators) {
      var loggedIn = availableAuthenticators.filter(function (auth) {
        return auth.constructor.name === type;
      });

      if (!loggedIn.length) {
        _this.clearCache();
      }

      return loggedIn.length ? loggedIn[0] : false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetchAuthenticators", function (availableAuthenticators, autoLoginAuthenticator) {
      var authenticateWithoutAccountInput = _this.state.authenticateWithoutAccountInput;

      if (autoLoginAuthenticator) {
        _this.setState({
          availableAuthenticators: [autoLoginAuthenticator]
        }, function () {
          var availableCheck = setInterval(function () {
            if (!autoLoginAuthenticator.isLoading()) {
              clearInterval(availableCheck);
              authenticateWithoutAccountInput(autoLoginAuthenticator, true);
            }
          }, 250);
        });
      } else {
        _this.setState({
          availableAuthenticators: availableAuthenticators
        }, function () {
          _this.setState({
            message: _i18n.default.t('authenticatorsLoaded')
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearCache", function () {
      window.localStorage.removeItem('UALLoggedInAuthType');
      window.localStorage.removeItem('UALAccountName');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fullLogout", function (authenticator) {
      _this.clearCache();

      authenticator.logout().catch(function (e) {
        return console.warn(e);
      });
    });

    _this.state = {
      /**
       * @memberof UAL
       * @desc chain list from props
       * @type {Chain[]} chains 
       */
      chains: props.chains,

      /**
       * @memberof UAL
       * @desc authenticator instances from props
       * @type {Authenticator[]} authenticators
       */
      authenticators: props.authenticators,

      /**
       * @memberof UAL
       * @desc available authenticator list
       * @type {Authenticator[]} availableAuthenticators
       */
      availableAuthenticators: [],

      /**
       * @memberof UAL
       * @desc name of app
       * @type {string} appName
       */
      appName: props.appName,

      /**
       * @memberof UAL
       * @desc whether or not show modal, initialized via props
       * @type {boolean} modal
       */
      modal: props.modal,

      /**
       * @memberof UAL
       * @desc loading state of UAL
       * @type {boolean} loading
       */
      loading: false,

      /**
       * @memberof UAL
       * @desc list of authenticated users
       * @type {User[]} users
       */
      users: [],

      /**
       * @memberof UAL
       * @desc authenticator currently used
       * @type {Authenticator} activeAuthenticator 
       */
      activeAuthenticator: null,

      /**
       * @memberof UAL
       * @desc logged in user
       * @type {User} activeUser
       */
      activeUser: null,

      /**
       * @memberof UAL
       * @desc whether or not activeAuthenticator should auto login
       * @type {boolean} isAutoLogin
       */
      isAutoLogin: false,

      /**
       * @memberof UAL
       * @desc captured error if any
       * @type {UALError|null} error
       */
      error: null,

      /**
       * @memberof UAL
       * @desc message, if any, accompanying current UAL state
       * @type {string} message
       */
      message: '',

      /**
       * @memberof UAL
       * @function
       * @name hideModal
       * @desc hides the modal
       * @return {Void}
       */
      hideModal: function hideModal() {
        return _this.setState({
          modal: false,
          loading: true,
          message: _i18n.default.t('loadingAuthenticators')
        });
      },

      /**
       * @memberof UAL
       * @function
       * @name showModal
       * @desc shows the modal
       * @return {Void}
       */
      showModal: function showModal() {
        var availableAuthenticators = _this.state.availableAuthenticators;
        availableAuthenticators.forEach(function (auth) {
          return auth.reset();
        });

        _this.setState({
          modal: true
        });
      },

      /**
       * @memberof UAL
       * @function
       * @name logout
       * @desc logs user out of authenticator and resets UAL state
       * @return {Void}
       */
      logout: function logout() {
        var activeAuthenticator = _this.state.activeAuthenticator;

        _this.setState(_provider.DEFAULT_STATUS, function () {
          return activeAuthenticator && _this.fullLogout(activeAuthenticator);
        });
      },

      /**
       * @memberof UAL
       * @function
       * @name restart
       * @desc resets all available authenticators and resets UAL state
       * @return {Void}
       */
      restart: function restart() {
        _this.setState({
          DEFAULT_STATUS: _provider.DEFAULT_STATUS
        }, function () {
          var availableAuthenticators = _this.state.availableAuthenticators;
          availableAuthenticators.forEach(function (auth) {
            return auth.reset();
          });

          _this.setState(availableAuthenticators);
        });
      },

      /**
       * @memberof UAL
       * @function
       * @name broadcastStatus
       * @desc dispatches a provider state update
       * @return {Void}
       */
      broadcastStatus: function broadcastStatus() {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _provider.DEFAULT_STATUS;
        return _this.setState(status);
      },

      /**
       * @memberof UAL
       * @function
       * @name authenticateWithoutAccountInput
       * @desc attempts authentication with an authenticator not requiring account input
       * @return {Void}
       * @param {Authenticator} authenticator
       * @param {boolean} [false] isAutoLogin
       */
      authenticateWithoutAccountInput: function () {
        var _authenticateWithoutAccountInput = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(authenticator) {
          var isAutoLogin,
              broadcastStatus,
              users,
              accountName,
              _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  isAutoLogin = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                  broadcastStatus = _this.state.broadcastStatus;
                  broadcastStatus({
                    loading: true,
                    message: _i18n.default.t('continueWithAuthenticator', {
                      authenticatorName: authenticator.getStyle().text
                    }),
                    activeAuthenticator: authenticator
                  });
                  _context.prev = 3;
                  _context.next = 6;
                  return authenticator.login();

                case 6:
                  users = _context.sent;
                  _context.next = 9;
                  return users[0].getAccountName();

                case 9:
                  accountName = _context.sent;

                  if (!isAutoLogin) {
                    window.localStorage.setItem('UALLoggedInAuthType', authenticator.constructor.name);
                  }

                  broadcastStatus({
                    activeUser: users[users.length - 1],
                    users: users,
                    isAutoLogin: isAutoLogin,
                    message: _i18n.default.t('currentlyLoggedInAs', {
                      accountName: accountName
                    })
                  });
                  _context.next = 17;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](3);
                  broadcastStatus({
                    loading: false,
                    error: _context.t0,
                    message: _context.t0.message
                  });

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 14]]);
        }));

        function authenticateWithoutAccountInput(_x) {
          return _authenticateWithoutAccountInput.apply(this, arguments);
        }

        return authenticateWithoutAccountInput;
      }(),

      /**
       * @memberof UAL
       * @function
       * @name submitAccountForLogin
       * @desc attempts authentication
       * @return {Void}
       * @param {string} accountInput
       * @param {Authenticator} authenticator
       */
      submitAccountForLogin: function () {
        var _submitAccountForLogin = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(accountInput, authenticator) {
          var broadcastStatus, authenticatorName, users;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  broadcastStatus = _this.state.broadcastStatus;
                  authenticatorName = authenticator.constructor.name;
                  broadcastStatus({
                    loading: true,
                    message: authenticator.requiresGetKeyConfirmation() ? _i18n.default.t('waitWhileFindAccountWithConfirmation') : _i18n.default.t('waitWhileFindAccount')
                  });
                  _context2.prev = 3;
                  _context2.next = 6;
                  return authenticator.login(accountInput);

                case 6:
                  users = _context2.sent;
                  window.localStorage.setItem('UALLoggedInAuthType', authenticatorName);
                  window.localStorage.setItem('UALAccountName', accountInput);
                  broadcastStatus({
                    activeUser: users[users.length - 1],
                    activeAuthenticator: authenticator,
                    users: users,
                    message: _i18n.default.t('currentlyLoggedInAs', {
                      accountName: accountInput
                    })
                  });
                  _context2.next = 15;
                  break;

                case 12:
                  _context2.prev = 12;
                  _context2.t0 = _context2["catch"](3);
                  broadcastStatus({
                    error: _context2.t0,
                    message: _context2.t0.message,
                    loading: false
                  });

                case 15:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[3, 12]]);
        }));

        function submitAccountForLogin(_x2, _x3) {
          return _submitAccountForLogin.apply(this, arguments);
        }

        return submitAccountForLogin;
      }()
    };
    return _this;
  }

  _createClass(UALProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state = this.state,
          chains = _this$state.chains,
          appName = _this$state.appName,
          authenticators = _this$state.authenticators,
          authenticateWithoutAccountInput = _this$state.authenticateWithoutAccountInput,
          submitAccountForLogin = _this$state.submitAccountForLogin;
      var type = window.localStorage.getItem('UALLoggedInAuthType');
      var accountName = window.localStorage.getItem('UALAccountName');
      var ual = new _universalAuthenticatorLibrary.UAL(chains, appName, authenticators);

      try {
        var _ual$getAuthenticator = ual.getAuthenticators(),
            availableAuthenticators = _ual$getAuthenticator.availableAuthenticators;

        if (type) {
          var authenticator = this.getAuthenticatorInstance(type, availableAuthenticators);

          if (!authenticator) {
            throw new Error('authenticator instance not found');
          }

          var availableCheck = setInterval(function () {
            if (!authenticator.isLoading()) {
              clearInterval(availableCheck); // Only Ledger requires an account name

              if (accountName) {
                submitAccountForLogin(accountName, authenticator);
              } else {
                authenticateWithoutAccountInput(authenticator);
              }
            }
          }, 250);
        }
      } catch (e) {
        this.clearCache();

        var msg = _i18n.default.t('sessionEndedNeedLogin');

        var source = type || 'Universal Authenticator Library';
        var errType = _universalAuthenticatorLibrary.UALErrorType.Login;
        console.warn(new _universalAuthenticatorLibrary.UALError(msg, errType, e, source));
      } finally {
        var _ual$getAuthenticator2 = ual.getAuthenticators(),
            _availableAuthenticators = _ual$getAuthenticator2.availableAuthenticators,
            autoLoginAuthenticator = _ual$getAuthenticator2.autoLoginAuthenticator;

        this.fetchAuthenticators(_availableAuthenticators, autoLoginAuthenticator);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$state2 = this.state,
          loading = _this$state2.loading,
          message = _this$state2.message,
          availableAuthenticators = _this$state2.availableAuthenticators,
          broadcastStatus = _this$state2.broadcastStatus;

      if (loading && message === _i18n.default.t('loadingAuthenticators') && availableAuthenticators.length) {
        broadcastStatus({
          message: _i18n.default.t('authenticatorsLoaded'),
          loading: false
        });
      }
    }
    /**
     * Verifies a logged in user's authenticator is still app supported
     * @method
     * @param {string} type - authenticator type of sessioned user
     * @param {Object[]} availableAuthenticators - list of available app supported authenticators
     * @return {number|boolean}
     */

  }, {
    key: "render",
    value: function render() {
      var modal = this.state.modal && _react.default.createElement("div", {
        style: _provider2.modalStyles
      }, _react.default.createElement(_UALBox.UALBox, null));

      return _react.default.createElement(_UALContext.UALContext.Provider, {
        value: this.state
      }, _react.default.createElement("style", null, _base.baseFont), modal, this.props.children);
    }
  }]);

  return UALProvider;
}(_react.Component);
/**
 * @memberof UALProvider
 * @name props
 * @prop {Chain[]} chains - list of chains the app supports
 * @prop {Authenticator[]} authenticators - list of authenticators the app supports
 * @prop {Node[]|Node} children - child app(s)
 * @prop {string} appName - name of app
 * @prop {boolean} modal - whether or not to show modal
 */


exports.UALProvider = UALProvider;
UALProvider.propTypes = {
  chains: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  authenticators: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  appName: _propTypes.default.string.isRequired,
  modal: _propTypes.default.bool
};
UALProvider.defaultProps = {
  modal: false
};
//# sourceMappingURL=UALProvider.js.map