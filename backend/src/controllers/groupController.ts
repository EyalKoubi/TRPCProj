// imports
import { Persons, Groups } from "../models";
import { Request, Response } from "express";
import * as helpers from "../helpers";

// define function that get group
// details from his name
export async function get(group_name: string) {
  const group = await Groups.findOne({ group_name });

  let result: string = "";
  if (!group) return "The group doesn't exists!";
  result += `The Group: ${group.group_name}\n`;
  result += "It contains this groups:\n";
  for (let i = 0; i < group.groups_ids.length; i++) {
    let g: any = await Groups.findById(group.groups_ids[i]);
    result += `Group number ${i + 1}: ${g.group_name}\n`;
  }
  result += "And it contains this persons:\n";
  for (let i = 0; i < group.persons_ids.length; i++) {
    let p: any = await Persons.findById(group.persons_ids[i]);
    result += `Person number ${i + 1} ${p.first_name} ${p.last_name}\n`;
  }
  return result;
}

// define function that get group
// details and hirarchy from his name
export async function hyrar(groupName: string) {
  let group = await Groups.findOne({ group_name: groupName });

  if (!group) return "The group doesn't exists!";

  let currentGroupLevel = [group];
  let degree = 1;
  let result = "";
  let newGroupLevel = [];

  while (currentGroupLevel.length !== 0) {
    newGroupLevel = [];
    result += `Degree number ${degree}:\n`;
    for (let i = 0; i < currentGroupLevel.length; i++) {
      if (currentGroupLevel[i]) {
        result += `Group number ${i + 1} is ${
          currentGroupLevel[i].group_name
        }\n`;
        for (let j = 0; j < currentGroupLevel[i].groups_ids.length; j++) {
          const subGroup = await Groups.findById(
            currentGroupLevel[i].groups_ids[j]
          );
          if (subGroup) {
            newGroupLevel.push(subGroup);
          }
        }
        if (currentGroupLevel[i].persons_ids.length > 0)
          result += `Her persons:\n`;
        for (let k = 0; k < currentGroupLevel[i].persons_ids.length; k++) {
          const person = await Persons.findById(
            currentGroupLevel[i].persons_ids[k]
          );
          if (person) {
            result += `Person number ${k + 1} is ${person.first_name} ${
              person.last_name
            }\n`;
          }
        }
      }
    }
    result += `\n\n`;
    currentGroupLevel = newGroupLevel;
    degree++;
  }

  return result;
}

// define function that create new group
export async function create(groupName: string) {
  if (await Groups.findOne({ group_name: groupName }))
    return "Group with that name is already exists!";
  await Groups.create({
    group_name: groupName,
    persons_ids: [],
    groups_ids: [],
    have_father: false,
  });
  const newAdded = await Groups.findOne({ group_name: groupName });
  return { _id: newAdded?._id, group_name: newAdded?.group_name };
}

// define function that add
// group into another group
export async function add(big_group: string, small_group: string) {
  let first_group: any = await Groups.findOne({ group_name: big_group });
  let second_group: any = await Groups.findOne({ group_name: small_group });

  if (!first_group) return "The big group doesn't exists!";
  if (!second_group) return "The small group doesn't exists!";
  if (second_group.have_father) return "Group not have more than one father!";
  if (first_group._id.equals(second_group._id))
    return "Group can not contain itself - Rassel Parradox!";
  if (await helpers.DFS(second_group, first_group._id))
    return "Circles in the group graph aren't allowed!";
  await Groups.updateOne(
    { _id: first_group._id },
    { $addToSet: { groups_ids: second_group._id } }
  );
  await Groups.findOneAndUpdate(
    { _id: second_group._id },
    { have_father: true },
    { new: true }
  );
  return `The Group: ${second_group.group_name} add to: ${first_group.group_name} successfully!`;
}

// define function that delete group
export async function deleteg(id: string) {
  const groupTodelete = await Groups.findById(id);

  if (!groupTodelete) return "The group doesn't exists!";

  for (let i = 0; i < groupTodelete.persons_ids.length; i++) {
    const member = await Persons.findById(groupTodelete.persons_ids[i]);
    if (member)
      await Persons.updateOne(
        { _id: groupTodelete.persons_ids[i] },
        { $pull: { belongs_to: groupTodelete._id } }
      );
  }

  for (let i = 0; i < groupTodelete.groups_ids.length; i++) {
    let son = await Groups.findById(groupTodelete.groups_ids[i]);
    marko(son);
  }

  await Groups.findOneAndDelete(groupTodelete._id);

  return `The group: ${groupTodelete.group_name} removed successfully!`;
}

// define function that remove group from another group
export async function removeg(big_group: string, small_group: string) {
  let first_group: any = await Groups.findOne({ group_name: big_group });
  let second_group: any = await Groups.findOne({ group_name: small_group });

  if (!first_group) return "The big group doesn't exists!";
  if (!second_group) return "The small group doesn't exists!";
  if (!first_group.groups_ids.includes(second_group._id))
    return "The big group doesn't includes the small group!";
  await Groups.updateOne(
    { _id: first_group._id },
    { $pull: { groups_ids: second_group._id } }
  );
  await Groups.updateOne({ _id: second_group._id }, { have_father: false });
  return `Group ${small_group} removed from ${big_group} successfully!`;
}

// define function that make 'have_father'
// to false for each sons groups of the
// group that we want to delete
export async function marko(son: any) {
  for (let i = 0; i < son.groups_ids.length; i++)
    await Groups.updateOne({ _id: son.groups_ids[i] }, { have_father: false });
}

export const getAllGroups = async () => {
  const groups = await Groups.find({});
  return groups;
};

export const rename = async (id: string, newName: string) => {
  const groupBefore = await Groups.findById(id);
  await Groups.updateOne({ _id: id }, { group_name: newName });
  return `Group name channged to ${newName} from ${groupBefore?.group_name} successfully!`;
};

export const getSons = async (groupName: string) => {
  const our_group = await Groups.find({ group_name: groupName });
  const sons = [];
  if (our_group[0].groups_ids.length === 0)
    return [{ group_name: "There are no sons!" }];
  for (let i = 0; i < our_group[0].groups_ids.length; i++) {
    const son = await Groups.findById(our_group[0].groups_ids[i]);
    sons.push({
      _id: son?._id,
      group_name: son?.group_name,
    });
  }
  return sons;
};
