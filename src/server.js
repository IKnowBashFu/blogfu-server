import Koa from 'koa';
import Api from './api';
import { performance } from 'perf_hooks';
import mongoose from 'mongoose';

const port = process.env.PORT || 8081;
const debug = process.env.ENV == 'debug';

const App = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo-server:27017/blogfu', {
    useMongoClient: true
});

App.use(async (ctx, next) => {
    if (debug) {
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

App.listen(port, () => {
    let serverStart = debug ? `Server is listening on port ${port} in debug mode` : `Server is listening on port ${port}`
    console.log(serverStart);
});
