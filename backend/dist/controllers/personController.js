"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPersons = exports.deletep = exports.update = exports.create = exports.get = void 0;
const models_1 = require("../models");
const mongodb_1 = require("mongodb");
// define function that get person
// details from his name
const get = async (personName) => {
    let person = await models_1.Persons.findOne({
        first_name: personName[0],
        last_name: personName[1],
    });
    let result = "";
    if (!person)
        return "The person doesn't exists!";
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
exports.get = get;
// define function that add new person
// to DB according to his details
const create = async (person) => {
    const errorMessage = "Person with this name is already exists!";
    if (await models_1.Persons.findOne({
        first_name: person.first_name,
        last_name: person.last_name,
    }))
        return errorMessage;
    const new_user = await models_1.Persons.create(person);
    const errorPresentaion = JSON.stringify(new_user);
    return errorPresentaion;
};
exports.create = create;
// define function that update
// the first name of specific person
const update = async (id, person) => {
    const new_person = await models_1.Persons.findByIdAndUpdate(id, person, {
        new: true,
    });
    if (new_person)
        return "Succeed updates";
    return "The person doesn't exists";
};
exports.update = update;
// define function that
// delete specific person
async function deletep(id) {
    const person = await models_1.Persons.findByIdAndDelete(new mongodb_1.ObjectId(id));
    if (person)
        return `The person: ${person.first_name} ${person.last_name} removed successfully!`;
    return "not found";
}
exports.deletep = deletep;
async function getAllPersons() {
    const persons = models_1.Persons.find({});
    return persons;
}
exports.getAllPersons = getAllPersons;
