"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = require("../utils/token");
const cookies_1 = require("../utils/cookies");
const serverError_1 = __importDefault(require("../errors/serverError"));
const sessionMiddleware = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        const refreshToken = req.cookies.refreshToken;
        if ((!accessToken || accessToken === "null") && !refreshToken) {
            return next(new serverError_1.default("Unauthorized", "session", 401));
        }
        if (accessToken && accessToken !== "null") {
            try {
                const { userId } = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                req.userID = userId;
                return next();
            }
            catch { }
        }
        if (refreshToken) {
            try {
                const { userId } = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const newAccess = (0, token_1.createAccessToken)(userId);
                const newRefresh = (0, token_1.createRefreshToken)(userId);
                res.cookie("refreshToken", newRefresh, cookies_1.cookieOptions);
                res.setHeader("access-token", `Bearer ${newAccess}`);
                req.userID = userId;
                return next();
            }
            catch {
                return next(new serverError_1.default("Unauthorized", "session", 401));
            }
        }
        return next(new serverError_1.default("Unauthorized", "session", 401));
    }
    catch (error) {
        next(error);
    }
};
exports.default = sessionMiddleware;
