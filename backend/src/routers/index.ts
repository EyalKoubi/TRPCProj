import { t } from "../trpc";
import { common_router } from "./commonRouter";
import { groups_router } from "./groupsRouter";
import { persons_router } from "./personsRouter";

export const appRouter = t.router({
  persons: persons_router,
  groups: groups_router,
  common: common_router,
});
