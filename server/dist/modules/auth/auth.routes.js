"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("./auth.validator");
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, auth_validator_1.signupValidator)(auth_schema_1.signupSchema), auth_controller_1.signupController);
exports.default = authRoutes;
