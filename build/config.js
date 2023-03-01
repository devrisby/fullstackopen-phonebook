"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '5000';
exports.PORT = PORT;
const MONGO_URI = process.env.NODE_ENV === 'dev'
    ? process.env.LOCAL_MONGO_URI
    : process.env.MONGO_URI;
exports.MONGO_URI = MONGO_URI;
