"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendingCookieToken = exports.cookieOptions = void 0;
const isProduction = process.env.NODE_ENV === "production";
exports.cookieOptions = {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 30,
};
const sendingCookieToken = (res, accessToken, refreshToken) => {
    return res
        .cookie("refreshToken", refreshToken, exports.cookieOptions)
        .status(200)
        .json({
        success: true,
        data: { accessToken, message: "Account created successfully" },
    });
};
exports.sendingCookieToken = sendingCookieToken;
