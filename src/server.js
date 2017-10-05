import Koa from 'koa';
import Api from './api';
import { performance } from 'perf_hooks';
import mongoose from 'mongoose';
let config;
let envConf = {};
if(process.env.PORT) envConf['port'] = process.env.PORT;
if(process.env.ENV) envConf['debug'] = process.env.ENV === 'debug';

try {
    config = require('./config/config');
} catch (e) {
    console.warn('You really need to create a config');
    process.exit(0);
}
config = Object.assign(config, envConf);
const App = new Koa();

App.context.config = config;

mongoose.Promise = global.Promise;
mongoose.connect(config.connection, {
    useMongoClient: true
});

App.use(async (ctx, next) => {
    if (config.debug) {
        let startTime = performance.now();
        await next();
        let timeSpent = performance.now() - startTime;
        ctx.set('X-Response-Time', timeSpent.toFixed(3)+'ms');
    }
    else {
        await next();
    }
});

App.use(Api.routes());
App.use(Api.allowedMethods());
App.listen(config.port, () => {
    let serverStart = config.debug ? `Server is listening on port ${config.port} in debug mode` : `Server is listening on port ${config.port}`;
    console.log(serverStart);
});
