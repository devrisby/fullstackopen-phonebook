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
const config = __importStar(require("../config"));
const mongo_1 = require("../data/mongo");
const schema_1 = __importDefault(require("../modules/person/schema"));
const persons = [
    {
        name: 'Arto Hellas',
        phone: '040-123456',
    },
    {
        name: 'Ada Lovelace',
        phone: '39-44-5323523',
    },
    {
        name: 'Dan Abramov',
        phone: '12-43-234345',
    },
    {
        name: 'Mary Poppendieck',
        phone: '39-23-6423122',
    },
    {
        name: 'Bob the Builder',
        phone: '123-123-1234',
    },
    {
        name: 'Sandy Cheeks',
        phone: '111-123-1111',
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_1.startMongo)(config.MONGO_URI);
    yield schema_1.default.deleteMany({});
    yield schema_1.default.insertMany(persons);
    if (process.argv[2] != null && process.argv[3] != null) {
        const personDTO = new schema_1.default({
            name: process.argv[2],
            phone: process.argv[3],
        });
        yield personDTO.save();
    }
    const savedPersons = yield schema_1.default.find({}).exec();
    console.log('phonebook:\n');
    savedPersons.forEach(p => {
        console.log(p);
    });
    yield (0, mongo_1.stopMongo)();
});
seed().catch(e => {
    console.log(e);
});
