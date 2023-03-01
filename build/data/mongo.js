"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdValidator = exports.modelFactory = exports.mongoHealth = exports.stopMongo = exports.startMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const startMongo = (uri) => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.connect(uri); });
exports.startMongo = startMongo;
const stopMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
});
exports.stopMongo = stopMongo;
const mongoHealth = () => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.connection.db.stats(); });
exports.mongoHealth = mongoHealth;
const modelFactory = (name, paths) => {
    const transformer = {
        transform: (_doc, result) => {
            result.id = result._id.toString();
            delete result._id;
            delete result.__v;
        },
    };
    const schema = new mongoose_1.default.Schema(paths);
    schema.set('toJSON', transformer);
    schema.set('toObject', transformer);
    return mongoose_1.default.model(name, schema);
};
exports.modelFactory = modelFactory;
const objectIdValidator = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
exports.objectIdValidator = objectIdValidator;