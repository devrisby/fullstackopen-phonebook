"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdValidator = exports.modelFactory = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const modelFactory = (name, paths) => {
    const transformer = {
        transform: (_doc, result) => {
            result.id = result._id.toString();
            delete result._id;
            delete result.__v;
        },
    };
    const schema = new mongoose_1.Schema(paths);
    schema.set('toJSON', transformer);
    schema.set('toObject', transformer);
    return mongoose_1.default.model(name, schema);
};
exports.modelFactory = modelFactory;
const objectIdValidator = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
exports.objectIdValidator = objectIdValidator;
