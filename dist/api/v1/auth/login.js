'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _uuid = require('uuid');

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('../../../models/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = exports.login = async ctx => {
    let { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.status = 400;
        ctx.body = {
            response: 'Bad Request',
            information: !username && !password ? 'No username and password submitted' : !username ? 'No username submitted' : 'No password submitted'
        };
        return;
    }

    let user = await _user2.default.findOne().where('username').equals(username).exec();

    if (user === null) {
        ctx.status = 400;
        ctx.body = {
            response: 'Bad Request',
            information: 'Wrong username or password'
        };
        return;
    }

    let passwordMatch = await _bcrypt2.default.compare(password, user.password);

    if (!passwordMatch) {
        ctx.status = 400;
        ctx.body = {
            response: 'Bad Request',
            information: 'Wrong username or password'
        };
        return;
    }

    let tokens = await generateTokens(user._id);

    if (tokens.error) {
        ctx.status = 500;
        ctx.body = {
            response: 'Internal Server Error',
            information: tokens.error
        };
        return;
    }
    ctx.status = 200;
    user.password = undefined;
    ctx.body = {
        response: 'OK',
        information: user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    };
};

async function generateTokens(userId) {
    let refreshId = (0, _uuid.v4)();

    let accessToken = _jsonwebtoken2.default.sign({
        userId: userId
    }, ctx.config.secret, { expiresIn: '1h', audience: 'access' });

    let refreshToken = _jsonwebtoken2.default.sign({
        userId: userId
    }, ctx.config.secret, { expiresIn: '1y', audience: 'refresh', jwtid: refreshId });

    let token = new _token2.default({
        tokenUUID: refreshId
    });

    try {
        await token.save();
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    } catch (e) {
        return { error: e.message };
    }
}