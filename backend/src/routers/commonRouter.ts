import { t } from "../trpc";
import { z } from "zod";
import * as common_validators from "../validators/commonValidators";
import * as commonCont from "../controllers/commonController";

export const common_router = t.router({
  hisGroups: common_validators.personNameProcedure.query(async ({ input }) => {
    return await commonCont.his(input.personName);
  }),
  searchPersonIngGroup: common_validators.personAndGroupNames.query(
    async ({ input }) => {
      return await commonCont.searchPinG(input.personName, input.groupName);
    }
  ),
  addPersonToGroup: common_validators.personAndGroupNames.mutation(
    async ({ input }) => {
      return await commonCont.addPtoG(input.personName, input.groupName);
    }
  ),
  removePersonFromGroup: common_validators.personAndGroupNames.mutation(
    async ({ input }) => {
      return await commonCont.removePfromG(input.personName, input.groupName);
    }
  ),
});
