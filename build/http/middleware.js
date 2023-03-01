"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = exports.errorHandler = exports.httpLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const httpLogger = () => {
    // @ts-ignore
    morgan_1.default.token('body', (req, res) => JSON.stringify(req.body));
    return (0, morgan_1.default)(':method :url :body');
};
exports.httpLogger = httpLogger;
const errorHandler = (error, req, res, next) => {
    if (error.name === 'ApiError')
        res
            .status(error.status)
            .json({ status: error.status, cause: error.cause, error: error.name });
    else
        res.status(503).json({ message: 'Server Error', error: error.message });
};
exports.errorHandler = errorHandler;
const unknownEndpoint = (req, res) => {
    res.status(404).json({ status: 404, error: 'Unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
