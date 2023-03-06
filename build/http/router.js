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
const express_1 = __importDefault(require("express"));
const mongo_1 = require("../data/mongo");
const personController_1 = __importDefault(require("../modules/person/personController"));
const router = express_1.default.Router();
router.get('/api/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dbHealth = yield (0, mongo_1.mongoHealth)();
    const appHealth = {
        status: 'OK',
        uptime: `${process.uptime().toFixed(2)} seconds`,
        database: dbHealth,
        date: new Date().toLocaleString(),
    };
    res.status(200).json(appHealth);
}));
router.use('/api/persons', personController_1.default);
exports.default = router;
