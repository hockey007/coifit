"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const sequelize_1 = require("../instances/sequelize");
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
        return sequelize_1.Person.create({
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
        return sequelize_1.Person.findAll({
            where: { userId: userId },
            attributes: PersonService.personAttributes,
            offset: offset || 0,
            limit: limit || 10,
        });
    }
    getPersonById(id) {
        return sequelize_1.Person.findByPk(id, {
            attributes: PersonService.personAttributes,
        });
    }
}
exports.PersonService = PersonService;
