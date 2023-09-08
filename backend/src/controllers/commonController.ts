// imports
import { Persons, Groups } from "../models";
import { Request, Response } from "express";
import * as helpers from "../helpers";

// define function that search
// specific person in specific group
export async function searchPinG(personName: string, groupName: string) {
  const strings = personName.split(" ");
  if (strings.length !== 2) return "Invalid input";
  const [first, last] = strings;
  let group = await Groups.findOne({ group_name: groupName });
  let person = await Persons.findOne({
    first_name: first,
    last_name: last,
  });

  if (!group) return `The group ${groupName} doesn't exists!`;
  if (!person) return `The person ${personName} dosn't exists!`;
  if (await helpers.PersonSearch(group, person._id))
    return `The person ${personName} is in the group ${groupName} in some way.`;
  return `The person ${personName} is not in the group ${groupName} at all.`;
}

// define function that for a specific
// person show the whole groups that
// it belongs to them
export async function his(personName: string) {
  const strings = personName.split(" ");
  if (strings.length !== 2) return "Invalid input";
  const [first, last] = strings;
  let person = await Persons.findOne({
    first_name: first,
    last_name: last,
  });

  let result = "";

  if (!person) return `The person ${personName} dosn't exists!`;
  for (let i = 0; i < person.belongs_to.length; i++) {
    const group: any = await Groups.findById(person.belongs_to[i]);
    if (group) result += `Group number ${i + 1} is: ${group?.group_name}\n`;
  }
  return result;
}

// define function that add person to group
export async function addPtoG(personName: string, groupName: string) {
  const strings = personName.split(" ");
  if (strings.length !== 2) return "Invalid input";
  const [first, last] = strings;
  let group = await Groups.findOne({ group_name: groupName });
  let person = await Persons.findOne({
    first_name: first,
    last_name: last,
  });

  if (!group) return `The group ${groupName} doesn't exists!`;
  if (!person) return `The person ${personName} dosn't exists!`;
  await Persons.updateOne(
    { _id: person._id },
    { $addToSet: { belongs_to: group._id } }
  );
  await Groups.updateOne(
    { _id: group._id },
    { $addToSet: { persons_ids: person._id } }
  );
  return `Person: ${first} ${last} added to group ${groupName} successfully!`;
}

// define function that remove person from group
export async function removePfromG(personName: string, groupName: string) {
  const strings = personName.split(" ");
  if (strings.length !== 2) return "Invalid input";
  const [first, last] = strings;
  let group = await Groups.findOne({ group_name: groupName });
  let person = await Persons.findOne({
    first_name: first,
    last_name: last,
  });

  if (!group) return `The group ${groupName} doesn't exists!`;
  if (!person) return `The person ${personName} dosn't exists!`;
  if (!group.persons_ids.includes(person._id))
    return `The group ${groupName} doesn't includes the person ${personName}!`;
  await Persons.updateOne(
    { _id: person._id },
    { $pull: { belongs_to: group._id } }
  );
  await Groups.updateOne(
    { _id: group._id },
    { $pull: { persons_ids: person._id } }
  );
  return `Person ${first} ${last} removed from group: ${groupName} successfully!`;
}
