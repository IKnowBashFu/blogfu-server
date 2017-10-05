'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _perf_hooks = require('perf_hooks');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config;
let envConf = {};
if (process.env.PORT) envConf['port'] = process.env.PORT;
if (process.env.ENV) envConf['debug'] = process.env.ENV === 'debug';

try {
    config = require('./config/config');
} catch (e) {
    console.warn('You really need to create a config');
    process.exit(0);
}
config = Object.assign(config, envConf);
const App = new _koa2.default();

App.context.config = config;

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(config.connection, {
    useMongoClient: true
});

App.use(async (ctx, next) => {
    if (config.debug) {
        let startTime = _perf_hooks.performance.now();
        await next();
        let timeSpent = _perf_hooks.performance.now() - startTime;
        ctx.set('X-Response-Time', timeSpent.toFixed(3) + 'ms');
    } else {
        await next();
    }
});

App.use(_api2.default.routes());
App.use(_api2.default.allowedMethods());
App.listen(config.port, () => {
    let serverStart = config.debug ? `Server is listening on port ${config.port} in debug mode` : `Server is listening on port ${config.port}`;
    console.log(serverStart);
});