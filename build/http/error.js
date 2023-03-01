"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, cause) {
        super(`${cause}`);
        this.name = 'ApiError';
        this.status = status;
        this.cause = cause;
    }
}
exports.default = ApiError;
