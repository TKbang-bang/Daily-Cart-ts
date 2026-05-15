"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinService = exports.signupService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../db"));
const serverError_1 = __importDefault(require("../../errors/serverError"));
const signupService = async (firstname, lastname, email, password) => {
    const { rows: userByEmail } = await db_1.default.query(`SELECT * FROM users WHERE email = '${email}'`);
    if (userByEmail.length > 0)
        throw new serverError_1.default("User already exists", "duplicate email", 409);
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await db_1.default.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [firstname, lastname, email, hashedPassword]);
    return user.rows[0];
};
exports.signupService = signupService;
const signinService = async (email, password) => {
    const { rows: userByEmail } = await db_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userByEmail.length === 0)
        throw new serverError_1.default("User not found", "email", 404);
    const isPasswordValid = await bcrypt_1.default.compare(password, userByEmail[0].password);
    if (!isPasswordValid)
        throw new serverError_1.default("Incorrect password", "password", 400);
    return userByEmail[0];
};
exports.signinService = signinService;
