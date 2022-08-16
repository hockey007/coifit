"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const person_1 = require("../models/person");
class PersonService {
    static get personAttributes() {
        return ["id", "name", "age", "gender", "category", "tag"];
    }
    static get person() {
        return PersonService._person;
    }
    add({ id, userId, name, age, gender, category, tag }) {
        if (!userId || !name || !age || !gender || !category)
            return null;
        return person_1.Person.create({
            id,
            userId,
            name,
            age,
            gender,
            category,
            tag
        }).then((person) => this.getPersonById(person.id));
    }
    read({ userId, offset, limit }) {
        return person_1.Person.findAll({
            where: { userId: userId },
            attributes: PersonService.personAttributes,
            offset: offset || 0,
            limit: limit || 10,
        });
    }
    getPersonById(id) {
        return person_1.Person.findByPk(id, {
            attributes: PersonService.personAttributes,
        });
    }
}
exports.PersonService = PersonService;
