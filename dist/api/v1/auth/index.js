'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _login = require('./login');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)({ prefix: '/auth' });

router.get('/', function (ctx) {
    var dingle = ctx.header.dingle;
    ctx.status = 200;
    ctx.body = {
        response: 'You sent header dingle with: ' + dingle
    };
});

router.post('/login', (0, _koaBody2.default)(), _login.login);

exports.default = router;