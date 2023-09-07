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
exports.persons_router = void 0;
const trpc_1 = require("../trpc");
const personCont = __importStar(require("../controllers/personController"));
const validators_1 = require("../validators");
exports.persons_router = trpc_1.t.router({
    getPerson: validators_1.person_validators.personNameProcedure.query(async ({ input }) => {
        return await personCont.get(input.personName.split(" "));
    }),
    getAllOfThePeople: trpc_1.t.procedure.query(async () => {
        return await personCont.getAllPersons();
    }),
    createPerson: validators_1.person_validators.personProcedure.mutation(async ({ input }) => {
        return await personCont.create(input);
    }),
    updatePerson: validators_1.person_validators.updatePersonProcedure.mutation(async ({ input }) => {
        return await personCont.update(input.id, input.newPerson);
    }),
    deletePerson: validators_1.person_validators.deletePersonProcedure.mutation(async ({ input }) => {
        return await personCont.deletep(input.id);
    }),
});
