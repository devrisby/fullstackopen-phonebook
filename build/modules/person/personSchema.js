"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../data/utils");
const personSchema = {
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
};
const PersonModel = (0, utils_1.modelFactory)('Person', personSchema);
exports.default = PersonModel;
