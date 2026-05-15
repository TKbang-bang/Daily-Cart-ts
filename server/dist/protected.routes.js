"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionHandler_1 = __importDefault(require("./middlewares/sessionHandler"));
const protectedRoutes = (0, express_1.Router)();
protectedRoutes.get("/api", sessionHandler_1.default, (_req, res) => {
    return res
        .status(201)
        .json({ success: true, data: { message: "Route is protected" } });
});
exports.default = protectedRoutes;
