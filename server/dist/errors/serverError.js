"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(message, about, statusCode) {
        super(message);
        this.about = about;
        this.statusCode = statusCode;
        this.isOperational = true;
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
exports.default = ServerError;
