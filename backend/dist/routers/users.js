"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persons_router = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const userProcedure = trpc_1.t.procedure.input(zod_1.z.object({ userId: zod_1.z.string() }));
exports.persons_router = trpc_1.t.router({
    getUser: userProcedure.query(({ input }) => {
        return { id: input.userId, name: "Kyle" };
    }),
});
