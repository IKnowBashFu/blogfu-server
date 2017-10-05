import Router from 'koa-router';
import Auth from './auth';
import Covfefe from './coffee';
import Startup from './startup';

const router = Router({ prefix: '/v1' });

router.use(Auth.routes(), Covfefe.routes(), Startup.routes());

export default router;
