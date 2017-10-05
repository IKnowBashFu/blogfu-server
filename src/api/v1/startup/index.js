import Router from 'koa-router';

const router = Router({ prefix: '/startup' });

router.get('/golang', (ctx) => {
    ctx.status = 404;
    ctx.body = {
        response: 'Pointers aren\'t pointers'
    };
});

router.get('/php', (ctx) => {
    ctx.status = 500;
    ctx.body = {
        response: 'Error on (0, -1)'
    };
});

export default router;
