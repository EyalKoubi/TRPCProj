// imports
import mongoose from "mongoose";
import { groupSchema } from "./Groups";
import { personSchema } from "./Persons";

// exports
export const Groups = mongoose.model("Group", groupSchema);
export const Persons = mongoose.model("Persons", personSchema);