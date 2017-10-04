import Router from 'koa-router';

const router = Router({ prefix: '/coffee' });

router.get('/', (ctx) => {
    let dingle = ctx.header.dingle;
    ctx.status = 418;
    ctx.body = {
        response: `I\'m a teapot.`
    };
});

router.get('/teapot', (ctx) => {
    let dingle = ctx.header.dingle;
    ctx.status = 418;
    ctx.body = {
        response: 'The requested entity body is short and stout. Tip me over and pour me out.'
    };
});

export default router;
