import Router from 'koa-router';
import bodyParser from 'koa-body';

import { login } from './login';

const router = Router({ prefix: '/auth' });

router.get('/', (ctx) => {
    let dingle = ctx.header.dingle;
    ctx.status = 200;
    ctx.body = {
        response: `You sent header dingle with: ${dingle}`
    };
});

router.post('/login', bodyParser(), login);

export default router;
