// imports
import { Persons, Groups } from "../models";
import { Request, Response } from "express";
import * as helpers from "../helpers";

// define function that search
// specific person in specific group
export async function searchPinG(
  personName: any,
  groupName: any,
  res: Response
) {
  let group: any = await Groups.findOne({ group_name: groupName });
  let person: any = await Persons.findOne({
    first_name: personName[0],
    last_name: personName[1],
  });

  if (!group) return res.send("The group doesn't exists!");
  if (!person) return res.send("The person dosn't exists!");
  if (await helpers.PersonSearch(group, person._id))
    return res.send("The person is in the group in some way.");
  return res.send("The person is not in the group at all.");
}

// define function that for a specific
// person show the whole groups that
// it belongs to them
export async function his(personName: any, req: Request, res: Response) {
  let person: any = await Persons.findOne({
    first_name: personName[0],
    last_name: personName[1],
  });

  let result = "";

  if (!person) return res.send("The person dosn't exists!");
  for (let i = 0; i < person.belongs_to.length; i++) {
    const group: any = await Groups.findById(person.belongs_to[i]);
    if (group)
      result += "Group number " + (i + 1) + " is: " + group?.group_name + "\n";
  }
  return res.send(result);
}

// define function that add person to group
export async function addPtoG(personName: any, groupName: any, res: Response) {
  let group: any = await Groups.findOne({ group_name: groupName });
  let person: any = await Persons.findOne({
    first_name: personName[0],
    last_name: personName[1],
  });

  if (!group) return res.send("The group doesn't exists!");
  if (!person) return res.send("The person dosn't exists!");
  await Persons.updateOne(
    { _id: person._id },
    { $addToSet: { belongs_to: group._id } }
  );
  await Groups.updateOne(
    { _id: group._id },
    { $addToSet: { persons_ids: person._id } }
  );
  return res.send(
    "Person: " +
      person.first_name +
      " " +
      person.last_name +
      " added to group: " +
      group.group_name +
      " successfully!"
  );
}

// define function that remove person from group
export async function removePfromG(
  personName: any,
  groupName: any,
  res: Response
) {
  let group: any = await Groups.findOne({ group_name: groupName });
  let person: any = await Persons.findOne({
    first_name: personName[0],
    last_name: personName[1],
  });

  if (!group) return res.send("The group doesn't exists!");
  if (!person) return res.send("The person dosn't exists!");
  if (!group.persons_ids.includes(person._id))
    return res.send("The group doesn't includes the person!");
  await Persons.updateOne(
    { _id: person._id },
    { $pull: { belongs_to: group._id } }
  );
  await Groups.updateOne(
    { _id: group._id },
    { $pull: { persons_ids: person._id } }
  );
  return res.send(
    "Person: " +
      person.first_name +
      " " +
      person.last_name +
      " removed from group: " +
      group.group_name +
      " successfully!"
  );
}
