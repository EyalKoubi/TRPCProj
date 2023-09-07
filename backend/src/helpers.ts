// imports
import { Persons, Groups } from "./models";

// define function that check
// if the variable is not a digit
export function isNotDigit(char: any) {
  return char > "9" || char < "0";
}

// define function that check if
// the string is string of number
export function isnumber(str: string) {
  // eyal added: if (str.length === 0 || str.charAt(0) === '0')
  // return false;
  if (str.length === 0 || str.charAt(0) === "0") return false;

  for (let i = 0; i < str.length; i++) {
    if (isNotDigit(str.charAt(i))) return false;
  }
  return true;
}

// define function that get group
// and id of other group and returns
// true if and only if the group contains
// the other group in some way
export async function DFS(cur_node: any, id: any): Promise<boolean> {
  for (let i = 0; i < cur_node.groups_ids.length; i++) {
    if (id.equals(cur_node.groups_ids[i])) return true;
    let next_node = await Groups.findById(cur_node.groups_ids[i]);
    const found = await DFS(next_node, id);
    if (found) return true;
  }

  return false;
}

// define function that get group and
// id of person and check if the group
// contains the person in some way
export async function PersonSearch(cur_node: any, id: any): Promise<boolean> {
  if (cur_node.persons_ids.includes(id)) return true;

  for (let i = 0; i < cur_node.groups_ids.length; i++) {
    let next_node: any = await Groups.findOne(cur_node.groups_ids[i]);
    if (next_node === null) return false;
    if (next_node.persons_ids.includes(id)) return true;
    const found = await PersonSearch(next_node, id);
    if (found) return true;
  }

  return false;
}

// define function that present group
// with all of it parts
export async function group_printer(group: any) {
  let result = "\nGroup " + group.group_name + "\n";

  for (let i: number = 0; i < group.persons_ids.length; i++) {
    const person: any = await Persons.findById(group.persons_ids[i]);
    result +=
      "Person number " +
      (i + 1).toString() +
      ": " +
      person?.first_name +
      " " +
      person?.last_name +
      "\n";
  }

  for (let i: number = 0; i < group.groups_ids.length; i++) {
    let g: any = await Groups.findById(group.groups_ids[i]);
    result += "Group number " + (i + 1).toString() + ": " + g.group_name + "\n";
  }

  return result;
}

// define function that present all of the
// family tree of specific group
export async function BFS(groups: any[], degree: number) {
  let result = "";
  while (groups.length > 0) {
    let new_groups: any[] = [];

    result += "\n\nDegree number " + degree.toString() + "\n";

    for (let i = 0; i < groups.length; i++) {
      result += "\nGroup " + groups[i].group_name + ":\n";
      for (let j = 0; j < groups[i].groups_ids.length; j++) {
        let g = await Groups.findById(groups[i].groups_ids[j]);
        if (g !== null) {
          result += await group_printer(g);
          new_groups.push(g);
        }
      }
    }

    groups = [];

    for (let i = 0; i < new_groups.length; i++) groups.push(new_groups[i]);
    degree++;
  }
  return result;
}

// define function that check if the string
// can be an id string or not
export function isID(str: string) {
  const hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  if (str.length !== 24) return false;

  for (let i = 0; i < 24; i++) {
    if (!hex.includes(str.charAt(i))) return false;
  }

  return true;
}
