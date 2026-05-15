"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = void 0;
const zod_1 = require("zod");
const serverError_1 = __importDefault(require("../../errors/serverError"));
const signupValidator = (schema) => (req, _res, next) => {
    try {
        const result = schema.parse(req.body);
        req.body = result;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            console.log({ error });
            return next(new serverError_1.default(error.issues[0].message, "validation error", 400));
        }
        next(error);
    }
};
exports.signupValidator = signupValidator;
