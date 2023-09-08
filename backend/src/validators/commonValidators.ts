import { t } from "../trpc";
import { z } from "zod";

export let personNameProcedure = t.procedure.input(
  z.object({
    personName: z.string(),
  })
);

export let personAndGroupNames = t.procedure.input(
  z.object({
    personName: z.string(),
    groupName: z.string(),
  })
);
