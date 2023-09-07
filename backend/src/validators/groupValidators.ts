import { t } from "../trpc";
import { z } from "zod";

export let groupNameProcedure = t.procedure.input(
  z.object({ groupName: z.string() })
);

export let twoGroupsNamesProcedure = t.procedure.input(
  z.object({ bigGroupName: z.string(), smallGroupName: z.string() })
);
