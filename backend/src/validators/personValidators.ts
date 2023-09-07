import { t } from "../trpc";
import { z } from "zod";

export let personNameProcedure = t.procedure
  .input(z.object({ personName: z.string() }))
  .output(z.string());

export let personProcedure = t.procedure.input(
  z.object({
    first_name: z.string(),
    last_name: z.string(),
    age: z.number().min(0).max(120),
  })
);

export let updatePersonProcedure = t.procedure.input(
  z.object({
    id: z.string(),
    newPerson: z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        age: z.number().min(0).max(120),
      })
      .partial(),
  })
);

export let deletePersonProcedure = t.procedure.input(
  z.object({ id: z.string() })
);
