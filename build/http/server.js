"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHTTP = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const middleware_1 = require("./middleware");
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use(express_1.default.static('dist_client'));
app.use((0, middleware_1.httpLogger)());
app.use(router_1.default);
app.use(middleware_1.errorHandler);
app.use(middleware_1.unknownEndpoint);
const startHTTP = (port) => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
};
exports.startHTTP = startHTTP;
