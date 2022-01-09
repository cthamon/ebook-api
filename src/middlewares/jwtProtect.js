const jwt = require('jsonwebtoken');

const { Session } = require('../models');

exports.protect = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) throw new Error("unauthorized");
        const payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = payload;
        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) next(error);
            await jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (error, payload) => {
                if (error) return next(error);
                else error = null;
                try {
                    const sessions = await Session.findAll({ where: { userId: payload.id } });
                    if (!sessions.some(session => session.userAgent === req.get("user-agent"))) throw Error("invalid session");
                    const accessToken = await jwt.sign({ id: payload.id, email: payload.email }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRED });
                    req.user = payload;
                    res.cookie("accessToken", accessToken, { httpOnly: true });
                    next();
                } catch (error) {
                    next(error);
                }
            });
        }
    }
};