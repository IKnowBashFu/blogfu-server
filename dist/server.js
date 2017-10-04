'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _perf_hooks = require('perf_hooks');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var port = process.env.PORT || 8081;
var debug = process.env.ENV == 'debug';

var App = new _koa2.default();

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://mongo-server:27017/blogfu', {
    useMongoClient: true
});

App.use(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var startTime, timeSpent;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!debug) {
                            _context.next = 8;
                            break;
                        }

                        startTime = _perf_hooks.performance.now();
                        _context.next = 4;
                        return next();

                    case 4:
                        timeSpent = _perf_hooks.performance.now() - startTime;

                        ctx.set('X-Response-Time', timeSpent.toFixed(3) + 'ms');
                        _context.next = 10;
                        break;

                    case 8:
                        _context.next = 10;
                        return next();

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

App.use(_api2.default.routes());
App.use(_api2.default.allowedMethods());

App.listen(port, function () {
    var serverStart = debug ? 'Server is listening on port ' + port + ' in debug mode' : 'Server is listening on port ' + port;
    console.log(serverStart);
});