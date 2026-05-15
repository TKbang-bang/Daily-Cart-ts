"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router"));
const errorHandler_1 = __importDefault(require("./errors/errorHandler"));
const app = (0, express_1.default)();
app.set("port", process.env.PORT);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["access-token"],
}));
app.use((0, cookie_parser_1.default)());
app.use(router_1.default);
app.use(errorHandler_1.default);
exports.default = app;
