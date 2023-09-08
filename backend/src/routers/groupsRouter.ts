import { t } from "../trpc";
import * as groupCont from "../controllers/groupController";
import { group_validators } from "../validators";

export const groups_router = t.router({
  getGroup: group_validators.groupNameProcedure.query(async ({ input }) => {
    return await groupCont.get(input.groupName);
  }),
  getGroupsSons: group_validators.groupNameProcedure.query(
    async ({ input }) => {
      return await groupCont.getSons(input.groupName);
    }
  ),
  getAllOfTheGroups: t.procedure.query(async () => {
    return await groupCont.getAllGroups();
  }),
  groupHyrarchy: group_validators.groupNameProcedure.query(
    async ({ input }) => {
      return await groupCont.hyrar(input.groupName);
    }
  ),
  createGroup: group_validators.groupNameProcedure.mutation(
    async ({ input }) => {
      return await groupCont.create(input.groupName);
    }
  ),
  renameGroup: group_validators.renameGroupProcedure.mutation(
    async ({ input }) => {
      return await groupCont.rename(input.id, input.newName);
    }
  ),
  addGroupToGroup: group_validators.twoGroupsNamesProcedure.mutation(
    async ({ input }) => {
      return await groupCont.add(input.bigGroupName, input.smallGroupName);
    }
  ),
  deleteGroup: group_validators.groupIdProcedure.mutation(async ({ input }) => {
    return await groupCont.deleteg(input.id);
  }),
  groupRemoveFromGroup: group_validators.twoGroupsNamesProcedure.mutation(
    async ({ input }) => {
      return await groupCont.removeg(input.bigGroupName, input.smallGroupName);
    }
  ),
});
