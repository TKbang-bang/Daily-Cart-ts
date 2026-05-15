"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("./auth.validator");
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
const sessionHandler_1 = __importDefault(require("../../middlewares/sessionHandler"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, auth_validator_1.signupValidator)(auth_schema_1.signupSchema), auth_controller_1.signupController);
authRoutes.post("/signin", (0, auth_validator_1.signupValidator)(auth_schema_1.signinSchema), auth_controller_1.signinController);
authRoutes.delete("/logout", sessionHandler_1.default, auth_controller_1.logoutController);
exports.default = authRoutes;
