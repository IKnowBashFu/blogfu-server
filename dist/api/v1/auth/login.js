'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = undefined;

var generateTokens = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId) {
        var refreshId, accessToken, refreshToken, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        refreshId = _uuid2.default.v4();
                        accessToken = _jsonwebtoken2.default.sign({
                            userId: userId
                        }, _config.config.secret, { expiresIn: '1h', audience: 'access' });
                        refreshToken = _jsonwebtoken2.default.sign({
                            userId: userId
                        }, _config.config.secret, { expiresIn: '1y', audience: 'refresh', jwtid: refreshId });
                        token = new _token2.default({
                            tokenUUID: refreshId
                        });
                        _context2.prev = 4;
                        _context2.next = 7;
                        return token.save();

                    case 7:
                        return _context2.abrupt('return', {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](4);
                        return _context2.abrupt('return', { error: _context2.t0.message });

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 10]]);
    }));

    return function generateTokens(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('../../../models/token');

var _token2 = _interopRequireDefault(_token);

var _config = require('../../../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var login = exports.login = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var _ctx$request$body, username, password, user, passwordMatch, tokens;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;

                        if (!(!username || !password)) {
                            _context.next = 5;
                            break;
                        }

                        ctx.status = 400;
                        ctx.body = {
                            response: 'Bad Request',
                            information: !username && !password ? 'No username and password submitted' : !username ? 'No username submitted' : 'No password submitted'
                        };
                        return _context.abrupt('return');

                    case 5:
                        _context.next = 7;
                        return _user2.default.findOne().where('username').equals(username).exec();

                    case 7:
                        user = _context.sent;

                        if (!(user === null)) {
                            _context.next = 12;
                            break;
                        }

                        ctx.status = 400;
                        ctx.body = {
                            response: 'Bad Request',
                            information: 'Wrong username or password'
                        };
                        return _context.abrupt('return');

                    case 12:
                        _context.next = 14;
                        return _bcrypt2.default.compare(password, user.password);

                    case 14:
                        passwordMatch = _context.sent;

                        if (passwordMatch) {
                            _context.next = 19;
                            break;
                        }

                        ctx.status = 400;
                        ctx.body = {
                            response: 'Bad Request',
                            information: 'Wrong username or password'
                        };
                        return _context.abrupt('return');

                    case 19:
                        _context.next = 21;
                        return generateTokens(user._id);

                    case 21:
                        tokens = _context.sent;

                        if (!tokens.error) {
                            _context.next = 26;
                            break;
                        }

                        ctx.status = 500;
                        ctx.body = {
                            response: 'Internal Server Error',
                            information: tokens.error
                        };
                        return _context.abrupt('return');

                    case 26:
                        ctx.status = 200;
                        user.password = undefined;
                        ctx.body = {
                            response: 'OK',
                            information: user,
                            accessToken: tokens.accessToken,
                            refreshToken: tokens.refreshToken
                        };

                    case 29:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function login(_x) {
        return _ref.apply(this, arguments);
    };
}();