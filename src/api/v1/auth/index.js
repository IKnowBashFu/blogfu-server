import Router from 'koa-router';
import bodyParser from 'koa-body';

import { login } from './login';

const router = Router({ prefix: '/auth' });

router.post('/login', bodyParser(), login);

export default router;
