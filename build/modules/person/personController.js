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
const utils_1 = require("../../data/utils");
const personSchema_1 = __importDefault(require("./personSchema"));
const error_1 = __importDefault(require("../../http/error"));
const router = express_1.default.Router();
const phoneNumberValidator = (phone) => {
    var _a;
    if (phone.length < 8) {
        throw new error_1.default(400, 'Phone number must be atleast 8 characters long');
    }
    if (phone.match(/^[0-9-]+$/) == null) {
        throw new error_1.default(400, "Phone number must only contain digits or '-'");
    }
    if (phone.includes('-')) {
        // https://www.w3docs.com/snippets/javascript/how-to-count-string-occurrence-in-string.html
        if (((_a = phone.match(/-/g)) !== null && _a !== void 0 ? _a : []).length !== 1)
            throw new error_1.default(400, "Phone number must have only one '-' character!");
        if (!(phone[2] === '-' || phone[3] === '-'))
            throw new error_1.default(400, "Phone number must have '-' as the 3rd or 4th digit!");
    }
};
router.get('/info', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield personSchema_1.default.find({}).exec();
    const message = `Phonebook has info for ${persons.length} people\n ${new Date().toString()}`;
    res.status(200).send(message);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield personSchema_1.default.find({}).exec();
    res.status(200).json(persons);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name == null || req.body.phone == null) {
        throw new error_1.default(400, 'Missing name or phone number');
    }
    if (req.body.name.length < 3) {
        throw new error_1.default(400, 'Name must be atleast 3 characters long');
    }
    phoneNumberValidator(req.body.phone);
    if ((yield personSchema_1.default.findOne({ name: req.body.name })) != null) {
        throw new error_1.default(409, 'Already exists in phonebook!');
    }
    const personDTO = new personSchema_1.default({
        name: req.body.name,
        phone: req.body.phone,
    });
    const newPerson = yield personDTO.save();
    res.status(201).json(newPerson);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, utils_1.objectIdValidator)(req.params.id)) {
        throw new error_1.default(400, 'Incorrect ID format');
    }
    const person = yield personSchema_1.default.findById(req.params.id).exec();
    if (person != null) {
        res.status(200).json(person);
    }
    else {
        throw new error_1.default(404, 'Person not found');
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, utils_1.objectIdValidator)(req.params.id)) {
        throw new error_1.default(400, 'Incorrect ID format');
    }
    if (req.body.name < 3) {
        throw new error_1.default(400, 'Name must be atleast 3 characters long');
    }
    phoneNumberValidator(req.body.phone);
    const personDTO = {
        name: req.body.name,
        phone: req.body.phone,
    };
    const updatedPerson = yield personSchema_1.default.findByIdAndUpdate(req.params.id, personDTO, { new: true });
    if (updatedPerson != null) {
        res.status(200).json(updatedPerson);
    }
    else {
        throw new error_1.default(404, 'Person not found');
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, utils_1.objectIdValidator)(req.params.id)) {
        throw new error_1.default(400, 'Incorrect ID format');
    }
    yield personSchema_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
}));
exports.default = router;
