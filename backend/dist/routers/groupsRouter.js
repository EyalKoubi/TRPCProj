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
exports.groups_router = void 0;
const trpc_1 = require("../trpc");
const groupCont = __importStar(require("../controllers/groupController"));
const validators_1 = require("../validators");
exports.groups_router = trpc_1.t.router({
    getGroup: validators_1.group_validators.groupNameProcedure.query(async ({ input }) => {
        return await groupCont.get(input.groupName);
    }),
    getGroupsSons: validators_1.group_validators.groupNameProcedure.query(async ({ input }) => {
        return await groupCont.getSons(input.groupName);
    }),
    getAllOfTheGroups: trpc_1.t.procedure.query(async () => {
        return await groupCont.getAllGroups();
    }),
    groupHyrarchy: validators_1.group_validators.groupNameProcedure.query(async ({ input }) => {
        return await groupCont.hyrar(input.groupName);
    }),
    createGroup: validators_1.group_validators.groupNameProcedure.mutation(async ({ input }) => {
        return await groupCont.create(input.groupName);
    }),
    addGroupToGroup: validators_1.group_validators.twoGroupsNamesProcedure.mutation(async ({ input }) => {
        return await groupCont.add(input.bigGroupName, input.smallGroupName);
    }),
});
