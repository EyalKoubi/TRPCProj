"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personAndGroupNames = exports.personNameProcedure = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.personNameProcedure = trpc_1.t.procedure.input(zod_1.z.object({
    personName: zod_1.z.string(),
}));
exports.personAndGroupNames = trpc_1.t.procedure.input(zod_1.z.object({
    personName: zod_1.z.string(),
    groupName: zod_1.z.string(),
}));
