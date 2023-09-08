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
exports.removePfromG = exports.addPtoG = exports.his = exports.searchPinG = void 0;
// imports
const models_1 = require("../models");
const helpers = __importStar(require("../helpers"));
// define function that search
// specific person in specific group
async function searchPinG(personName, groupName) {
    const strings = personName.split(" ");
    if (strings.length !== 2)
        return "Invalid input";
    const [first, last] = strings;
    let group = await models_1.Groups.findOne({ group_name: groupName });
    let person = await models_1.Persons.findOne({
        first_name: first,
        last_name: last,
    });
    if (!group)
        return `The group ${groupName} doesn't exists!`;
    if (!person)
        return `The person ${personName} dosn't exists!`;
    if (await helpers.PersonSearch(group, person._id))
        return `The person ${personName} is in the group ${groupName} in some way.`;
    return `The person ${personName} is not in the group ${groupName} at all.`;
}
exports.searchPinG = searchPinG;
// define function that for a specific
// person show the whole groups that
// it belongs to them
async function his(personName) {
    const strings = personName.split(" ");
    if (strings.length !== 2)
        return "Invalid input";
    const [first, last] = strings;
    let person = await models_1.Persons.findOne({
        first_name: first,
        last_name: last,
    });
    let result = "";
    if (!person)
        return `The person ${personName} dosn't exists!`;
    for (let i = 0; i < person.belongs_to.length; i++) {
        const group = await models_1.Groups.findById(person.belongs_to[i]);
        if (group)
            result += `Group number ${i + 1} is: ${group === null || group === void 0 ? void 0 : group.group_name}\n`;
    }
    return result;
}
exports.his = his;
// define function that add person to group
async function addPtoG(personName, groupName) {
    const strings = personName.split(" ");
    if (strings.length !== 2)
        return "Invalid input";
    const [first, last] = strings;
    let group = await models_1.Groups.findOne({ group_name: groupName });
    let person = await models_1.Persons.findOne({
        first_name: first,
        last_name: last,
    });
    if (!group)
        return `The group ${groupName} doesn't exists!`;
    if (!person)
        return `The person ${personName} dosn't exists!`;
    await models_1.Persons.updateOne({ _id: person._id }, { $addToSet: { belongs_to: group._id } });
    await models_1.Groups.updateOne({ _id: group._id }, { $addToSet: { persons_ids: person._id } });
    return `Person: ${first} ${last} added to group ${groupName} successfully!`;
}
exports.addPtoG = addPtoG;
// define function that remove person from group
async function removePfromG(personName, groupName) {
    const strings = personName.split(" ");
    if (strings.length !== 2)
        return "Invalid input";
    const [first, last] = strings;
    let group = await models_1.Groups.findOne({ group_name: groupName });
    let person = await models_1.Persons.findOne({
        first_name: first,
        last_name: last,
    });
    if (!group)
        return `The group ${groupName} doesn't exists!`;
    if (!person)
        return `The person ${personName} dosn't exists!`;
    if (!group.persons_ids.includes(person._id))
        return `The group ${groupName} doesn't includes the person ${personName}!`;
    await models_1.Persons.updateOne({ _id: person._id }, { $pull: { belongs_to: group._id } });
    await models_1.Groups.updateOne({ _id: group._id }, { $pull: { persons_ids: person._id } });
    return `Person ${first} ${last} removed from group: ${groupName} successfully!`;
}
exports.removePfromG = removePfromG;
