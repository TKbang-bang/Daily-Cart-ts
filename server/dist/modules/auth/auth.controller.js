"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.signinController = exports.signupController = void 0;
const auth_service_1 = require("./auth.service");
const token_1 = require("../../utils/token");
const cookies_1 = require("../../utils/cookies");
const signupController = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = await (0, auth_service_1.signupService)(firstname, lastname, email, password);
        const accessToken = (0, token_1.createAccessToken)(user.id);
        const refreshToken = (0, token_1.createRefreshToken)(user.id);
        return (0, cookies_1.sendingCookieToken)(res, accessToken, refreshToken);
    }
    catch (error) {
        next(error);
    }
};
exports.signupController = signupController;
const signinController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.signinService)(email, password);
        const accessToken = (0, token_1.createAccessToken)(user.id);
        const refreshToken = (0, token_1.createRefreshToken)(user.id);
        return (0, cookies_1.sendingCookieToken)(res, accessToken, refreshToken);
    }
    catch (error) {
        next(error);
    }
};
exports.signinController = signinController;
const logoutController = async (req, res, next) => {
    try {
        req.userID = null;
        res.clearCookie("refreshToken", cookies_1.cookieOptions);
        return res.status(201).end();
    }
    catch (error) {
        return next(error);
    }
};
exports.logoutController = logoutController;
