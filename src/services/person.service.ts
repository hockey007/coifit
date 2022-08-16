import * as Bluebird from "Bluebird";
import { Person, PersonAddModel, PersonReadModel, PersonViewModel } from "../models/person";
import { UserService } from "./user.service";

export class PersonService {
    static get personAttributes() {
        return ["id", "name", "age", "gender", "category", "tag"];
    }

    private static _person;
    static get person() {
        return PersonService._person;
    }

    add({ id, userId, name, age, gender, category, tag }: PersonAddModel) {
        if (!userId || !name || !age || !gender || !category) return null;
        return Person.create({
            id,
            userId,
            name,
            age,
            gender,
            category,
            tag
        }).then((person) => this.getPersonById(person!.id));
    }

    read({ userId, offset, limit }: PersonReadModel) {
        return Person.findAll({
          where: { userId: userId },
          attributes: PersonService.personAttributes,
          offset: offset || 0,
          limit: limit || 10,
        });
      }

    getPersonById(id: string) {
        return Person.findByPk(id, {
            attributes: PersonService.personAttributes,
        }) as unknown as Bluebird<PersonViewModel>;
    }
}