import Router from 'koa-router';
import V1 from './v1';

const router = Router();

router.use(V1.routes());

export default router;
