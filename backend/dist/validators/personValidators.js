"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePersonProcedure = exports.updatePersonProcedure = exports.personProcedure = exports.personNameProcedure = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
exports.personNameProcedure = trpc_1.t.procedure
    .input(zod_1.z.object({ personName: zod_1.z.string() }))
    .output(zod_1.z.string());
exports.personProcedure = trpc_1.t.procedure.input(zod_1.z.object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    age: zod_1.z.number().min(0).max(120),
}));
exports.updatePersonProcedure = trpc_1.t.procedure.input(zod_1.z.object({
    id: zod_1.z.string(),
    newPerson: zod_1.z
        .object({
        first_name: zod_1.z.string(),
        last_name: zod_1.z.string(),
        age: zod_1.z.number().min(0).max(120),
    })
        .partial(),
}));
exports.deletePersonProcedure = trpc_1.t.procedure.input(zod_1.z.object({ id: zod_1.z.string() }));
