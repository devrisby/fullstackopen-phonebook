"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../../data/mongo");
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
const PersonModel = (0, mongo_1.modelFactory)('Person', personSchema);
exports.default = PersonModel;
