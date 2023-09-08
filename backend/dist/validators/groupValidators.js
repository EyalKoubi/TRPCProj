"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameGroupProcedure = exports.twoGroupsNamesProcedure = exports.groupIdProcedure = exports.groupNameProcedure = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.groupNameProcedure = trpc_1.t.procedure.input(zod_1.z.object({ groupName: zod_1.z.string() }));
exports.groupIdProcedure = trpc_1.t.procedure.input(zod_1.z.object({ id: zod_1.z.string() }));
exports.twoGroupsNamesProcedure = trpc_1.t.procedure.input(zod_1.z.object({ bigGroupName: zod_1.z.string(), smallGroupName: zod_1.z.string() }));
exports.renameGroupProcedure = trpc_1.t.procedure.input(zod_1.z.object({
    id: zod_1.z.string(),
    newName: zod_1.z.string(),
}));
