"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persons = exports.Groups = void 0;
// imports
const mongoose_1 = __importDefault(require("mongoose"));
const Groups_1 = require("./Groups");
const Persons_1 = require("./Persons");
// exports
exports.Groups = mongoose_1.default.model("Group", Groups_1.groupSchema);
exports.Persons = mongoose_1.default.model("Persons", Persons_1.personSchema);
