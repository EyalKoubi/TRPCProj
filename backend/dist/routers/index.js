"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const commonRouter_1 = require("./commonRouter");
const groupsRouter_1 = require("./groupsRouter");
const personsRouter_1 = require("./personsRouter");
exports.appRouter = trpc_1.t.router({
    persons: personsRouter_1.persons_router,
    groups: groupsRouter_1.groups_router,
    common: commonRouter_1.common_router,
});
