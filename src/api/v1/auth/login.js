import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import User from '../../../models/user';
import Token from '../../../models/token';

export const login = async (ctx) => {
    let { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.status = 400;
        ctx.body = {
            response: 'Bad Request',
            information: !username && !password ? 'No username and password submitted' : !username ? 'No username submitted' : 'No password submitted'
        };
        return;
    }

    let user = await User.findOne().where('username').equals(username).exec();

    if (user === null) {
        ctx.status = 400;
        ctx.body = {
            response: 'Bad Request',
            information: 'Wrong username or password'
        };
        return;
    }

    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        ctx.status = 400;
        ctx.body = {
            response: 'Bad Request',
            information: 'Wrong username or password'
        };
        return;
    }

    let tokens = await generateTokens(user._id);

    if (tokens.error) {
        ctx.status = 500;
        ctx.body = {
            response: 'Internal Server Error',
            information: tokens.error
        };
        return;
    }
    ctx.status = 200;
    user.password = undefined;
    ctx.body = {
        response: 'OK',
        information: user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
    }
};

async function generateTokens(userId) {
    let refreshId = v4();

    let accessToken = jwt.sign({
        userId: userId
    }, ctx.config.secret, { expiresIn: '1h', audience: 'access' });

    let refreshToken = jwt.sign({
        userId: userId
    }, ctx.config.secret, { expiresIn: '1y', audience: 'refresh', jwtid: refreshId });

    let token = new Token({
        tokenUUID: refreshId
    });

    try {
        await token.save();
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }
    catch (e) {
        return {error: e.message};
    }
}
