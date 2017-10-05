'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _koaRouter2.default)({ prefix: '/coffee' });

router.get('/', ctx => {
    ctx.status = 418;
    ctx.body = {
        response: `I\'m a teapot.`
    };
});

router.get('/teapot', ctx => {
    ctx.status = 418;
    ctx.body = {
        response: 'The requested entity body is short and stout. Tip me over and pour me out.'
    };
});

exports.default = router;