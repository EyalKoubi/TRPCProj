import { t } from "../trpc";
import * as personCont from "../controllers/personController";
import { person_validators } from "../validators";

export const persons_router = t.router({
  getPerson: person_validators.personNameProcedure.query(async ({ input }) => {
    return await personCont.get(input.personName.split(" "));
  }),
  getAllOfThePeople: t.procedure.query(async () => {
    return await personCont.getAllPersons();
  }),
  createPerson: person_validators.personProcedure.mutation(
    async ({ input }) => {
      return await personCont.create(input);
    }
  ),
  updatePerson: person_validators.updatePersonProcedure.mutation(
    async ({ input }) => {
      return await personCont.update(input.id, input.newPerson);
    }
  ),
  deletePerson: person_validators.deletePersonProcedure.mutation(
    async ({ input }) => {
      return await personCont.deletep(input.id);
    }
  ),
});
