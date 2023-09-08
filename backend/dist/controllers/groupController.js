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
exports.getSons = exports.rename = exports.getAllGroups = exports.marko = exports.removeg = exports.deleteg = exports.add = exports.create = exports.hyrar = exports.get = void 0;
// imports
const models_1 = require("../models");
const helpers = __importStar(require("../helpers"));
// define function that get group
// details from his name
async function get(group_name) {
    const group = await models_1.Groups.findOne({ group_name });
    let result = "";
    if (!group)
        return "The group doesn't exists!";
    result += `The Group: ${group.group_name}\n`;
    result += "It contains this groups:\n";
    for (let i = 0; i < group.groups_ids.length; i++) {
        let g = await models_1.Groups.findById(group.groups_ids[i]);
        result += `Group number ${i + 1}: ${g.group_name}\n`;
    }
    result += "And it contains this persons:\n";
    for (let i = 0; i < group.persons_ids.length; i++) {
        let p = await models_1.Persons.findById(group.persons_ids[i]);
        result += `Person number ${i + 1} ${p.first_name} ${p.last_name}\n`;
    }
    return result;
}
exports.get = get;
// define function that get group
// details and hirarchy from his name
async function hyrar(groupName) {
    let group = await models_1.Groups.findOne({ group_name: groupName });
    if (!group)
        return "The group doesn't exists!";
    let currentGroupLevel = [group];
    let degree = 1;
    let result = "";
    let newGroupLevel = [];
    while (currentGroupLevel.length !== 0) {
        newGroupLevel = [];
        result += `Degree number ${degree}:\n`;
        for (let i = 0; i < currentGroupLevel.length; i++) {
            if (currentGroupLevel[i]) {
                result += `Group number ${i} is: ${currentGroupLevel[i].group_name}\n`;
                for (let j = 0; j < currentGroupLevel[i].groups_ids.length; j++) {
                    const subGroup = models_1.Groups.findById(currentGroupLevel[i].groups_ids[j]);
                    if (newGroupLevel)
                        newGroupLevel.push(subGroup);
                }
                if (currentGroupLevel[i].persons_ids.length > 0)
                    result += `Her persons:\n`;
                for (let j = 0; j < currentGroupLevel[i].persons_ids.length; j++) {
                    const personFromGroup = models_1.Persons.findById(currentGroupLevel[i].persons_ids[j]);
                    if (personFromGroup)
                        result += `Person number ${j}: ${personFromGroup.first_name} ${personFromGroup.last_name}}`;
                }
            }
            else {
                return `I felt on degree number: ${degree}`;
            }
        }
        currentGroupLevel = newGroupLevel;
        degree++;
    }
    return result;
}
exports.hyrar = hyrar;
// define function that create new group
async function create(groupName) {
    if (await models_1.Groups.findOne({ group_name: groupName }))
        return "Group with that name is already exists!";
    await models_1.Groups.create({
        group_name: groupName,
        persons_ids: [],
        groups_ids: [],
        have_father: false,
    });
    const newAdded = await models_1.Groups.findOne({ group_name: groupName });
    return { _id: newAdded === null || newAdded === void 0 ? void 0 : newAdded._id, group_name: newAdded === null || newAdded === void 0 ? void 0 : newAdded.group_name };
}
exports.create = create;
// define function that add
// group into another group
async function add(big_group, small_group) {
    let first_group = await models_1.Groups.findOne({ group_name: big_group });
    let second_group = await models_1.Groups.findOne({ group_name: small_group });
    if (!first_group)
        return "The big group doesn't exists!";
    if (!second_group)
        return "The small group doesn't exists!";
    if (second_group.have_father)
        return "Group not have more than one father!";
    if (first_group._id.equals(second_group._id))
        return "Group can not contain itself - Rassel Parradox!";
    if (await helpers.DFS(second_group, first_group._id))
        return "Circles in the group graph aren't allowed!";
    await models_1.Groups.updateOne({ _id: first_group._id }, { $addToSet: { groups_ids: second_group._id } });
    await models_1.Groups.findOneAndUpdate({ _id: second_group._id }, { have_father: true }, { new: true });
    return `The Group: ${second_group.group_name} add to: ${first_group.group_name} successfully!`;
}
exports.add = add;
// define function that delete group
async function deleteg(id) {
    const groupTodelete = await models_1.Groups.findById(id);
    if (!groupTodelete)
        return "The group doesn't exists!";
    for (let i = 0; i < groupTodelete.persons_ids.length; i++) {
        const member = await models_1.Persons.findById(groupTodelete.persons_ids[i]);
        if (member)
            await models_1.Persons.updateOne({ _id: groupTodelete.persons_ids[i] }, { $pull: { belongs_to: groupTodelete._id } });
    }
    for (let i = 0; i < groupTodelete.groups_ids.length; i++) {
        let son = await models_1.Groups.findById(groupTodelete.groups_ids[i]);
        marko(son);
    }
    await models_1.Groups.findOneAndDelete(groupTodelete._id);
    return `The group: ${groupTodelete.group_name} removed successfully!`;
}
exports.deleteg = deleteg;
// define function that remove group from another group
async function removeg(big_group, small_group) {
    let first_group = await models_1.Groups.findOne({ group_name: big_group });
    let second_group = await models_1.Groups.findOne({ group_name: small_group });
    if (!first_group)
        return "The big group doesn't exists!";
    if (!second_group)
        return "The small group doesn't exists!";
    if (!first_group.groups_ids.includes(second_group._id))
        return "The big group doesn't includes the small group!";
    await models_1.Groups.updateOne({ _id: first_group._id }, { $pull: { groups_ids: second_group._id } });
    await models_1.Groups.updateOne({ _id: second_group._id }, { have_father: false });
    return `Group ${small_group} removed from ${big_group} successfully!`;
}
exports.removeg = removeg;
// define function that make 'have_father'
// to false for each sons groups of the
// group that we want to delete
async function marko(son) {
    for (let i = 0; i < son.groups_ids.length; i++)
        await models_1.Groups.updateOne({ _id: son.groups_ids[i] }, { have_father: false });
}
exports.marko = marko;
const getAllGroups = async () => {
    const groups = await models_1.Groups.find({});
    return groups;
};
exports.getAllGroups = getAllGroups;
const rename = async (id, newName) => {
    const groupBefore = await models_1.Groups.findById(id);
    await models_1.Groups.updateOne({ _id: id }, { group_name: newName });
    return `Group name channged to ${newName} from ${groupBefore === null || groupBefore === void 0 ? void 0 : groupBefore.group_name} successfully!`;
};
exports.rename = rename;
const getSons = async (groupName) => {
    const our_group = await models_1.Groups.find({ group_name: groupName });
    const sons = [];
    if (our_group[0].groups_ids.length === 0)
        return [{ group_name: "There are no sons!" }];
    for (let i = 0; i < our_group[0].groups_ids.length; i++) {
        const son = await models_1.Groups.findById(our_group[0].groups_ids[i]);
        sons.push({
            _id: son === null || son === void 0 ? void 0 : son._id,
            group_name: son === null || son === void 0 ? void 0 : son.group_name,
        });
    }
    return sons;
};
exports.getSons = getSons;
