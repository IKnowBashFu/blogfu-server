import Router from 'koa-router';
import Auth from './auth';
import Covfefe from './coffee'

const router = Router({ prefix: '/v1' });

router.use(Auth.routes(), Covfefe.routes());

export default router;
