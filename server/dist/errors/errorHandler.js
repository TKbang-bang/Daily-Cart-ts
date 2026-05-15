"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverError_1 = __importDefault(require("./serverError"));
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof serverError_1.default) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                message: err.message,
                about: err.about,
            },
        });
    }
    console.error(err);
    return res.status(500).json({
        success: false,
        error: {
            message: "Internal Server Error",
            about: "server error",
        },
    });
};
exports.default = errorHandler;
