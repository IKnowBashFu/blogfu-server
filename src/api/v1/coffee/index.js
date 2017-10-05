import Router from 'koa-router';

const router = Router({ prefix: '/coffee' });

router.get('/', (ctx) => {
    ctx.status = 418;
    ctx.body = {
        response: `I\'m a teapot.`
    };
});

router.get('/teapot', (ctx) => {
    ctx.status = 418;
    ctx.body = {
        response: 'The requested entity body is short and stout. Tip me over and pour me out.'
    };
});

export default router;
