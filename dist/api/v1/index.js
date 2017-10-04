'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _coffee = require('./coffee');

var _coffee2 = _interopRequireDefault(_coffee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)({ prefix: '/v1' });

router.use(_auth2.default.routes(), _coffee2.default.routes());

exports.default = router;