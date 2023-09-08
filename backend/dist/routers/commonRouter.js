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
exports.common_router = void 0;
const trpc_1 = require("../trpc");
const common_validators = __importStar(require("../validators/commonValidators"));
const commonCont = __importStar(require("../controllers/commonController"));
exports.common_router = trpc_1.t.router({
    hisGroups: common_validators.personNameProcedure.query(async ({ input }) => {
        return await commonCont.his(input.personName);
    }),
    searchPersonIngGroup: common_validators.personAndGroupNames.query(async ({ input }) => {
        return await commonCont.searchPinG(input.personName, input.groupName);
    }),
    addPersonToGroup: common_validators.personAndGroupNames.mutation(async ({ input }) => {
        return await commonCont.addPtoG(input.personName, input.groupName);
    }),
    removePersonFromGroup: common_validators.personAndGroupNames.mutation(async ({ input }) => {
        return await commonCont.removePfromG(input.personName, input.groupName);
    }),
});
