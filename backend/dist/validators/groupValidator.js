"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupNameProcedure = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.groupNameProcedure = trpc_1.t.procedure
    .input(zod_1.z.object({ groupName: zod_1.z.string() }))
    .output(zod_1.z.string());
