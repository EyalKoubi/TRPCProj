// imports
import { CreateUserProps } from "src/types";
import { Persons } from "../models";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

// define function that get person
// details from his name
export const get = async (personName: String[]) => {
  let person: any = await Persons.findOne({
    first_name: personName[0],
    last_name: personName[1],
  });

  let result = "";

  if (!person) return "The person doesn't exists!";
  result +=
    "Person name: " +
    person.first_name +
    " " +
    person.last_name +
    "\nHis age is: " +
    person.age +
    "\n";
  return result;
};

// define function that add new person
// to DB according to his details
export const create = async (person: CreateUserProps) => {
  const errorMessage = "Person with this name is already exists!";
  if (
    await Persons.findOne({
      first_name: person.first_name,
      last_name: person.last_name,
    })
  )
    return errorMessage;
  const new_user = await Persons.create(person);
  const errorPresentaion = JSON.stringify(new_user);
  return errorPresentaion;
};

// define function that update
// the first name of specific person
export const update = async (id: String, person: Object) => {
  const new_person = await Persons.findByIdAndUpdate(id, person, {
    new: true,
  });
  if (new_person) return "Succeed updates";
  return "The person doesn't exists";
};

// define function that
// delete specific person
export async function deletep(id: string) {
  const person = await Persons.findByIdAndDelete(new ObjectId(id));
  if (person)
    return `The person: ${person.first_name} ${person.last_name} removed successfully!`;
  return "not found";
}

export async function getAllPersons() {
  const persons = Persons.find({});

  return persons;
}
