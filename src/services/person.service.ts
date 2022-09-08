import { Person, } from "../instances/sequelize";
import { UserService } from "./user.service";

export class PersonService {
    static get personAttributes() {
        return ["id", "name", "age", "gender", "category", "tag"];
    }

    private static _person;
    static get person() {
        return PersonService._person;
    }

    add({ id, userId, name, age, gender, category, tag }: any) {
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

    read({ userId, offset, limit }: any) {
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
        });
    }
}