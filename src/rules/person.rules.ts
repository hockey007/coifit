import { v4 as uuidv4 } from 'uuid';
// import { PersonAddModel, PersonReadModel} from "../instances/sequelize";
import { User } from '../instances/sequelize';

enum Categories {
    SELF = "self",
    FRIENDSANDFAMILY = "fnf",
    OTHERS = "others",
}

enum Genders {
    MALE = "male",
    FEMALE = "female",
}

export const personRules = {
  addPerson: [
    (req: any, res, next) => {
      var userId: string = req.body.userId;
      var name: string = req.body.name;
      var age: number = req.body.age;
      var gender: string = req.body.gender;
      var category: string = req.body.category;
      var tag: string = req.body.tag;

      if(!userId || !name || !age || !gender || !category)
        res.status(500).json({ error: true, message: "Invalid Request" });

      User.findOne({ where: { id: userId } }).then((user) => {
        if (!user) {
          res.status(500).json({ error: true, message: "Invalid User ID" });
        } else {
          if (userId.length == 0) {
            res.json({ error: true, message: "User ID can't be empty" });
          } else if (name.length == 0) {
            res.json({ error: true, message: "Name can't be empty" });
          } else if (age <= 0) {
            res.json({ error: true, message: "Invalid Age" });
          } else if(!(Object.values(Genders).includes(gender as Genders))) {
            res.json({ error: true, message: "Invalid/Empty Gender" });
          } else if(!(Object.values(Categories).includes(category as Categories))) {
            res.json({ error: true, message: "Invalid/Empty Category" });
          } else {
            var personInfo: any = {
              id: uuidv4(),
              userId: userId,
              name: name,
              age: age,
              gender: gender,
              category: category,
              tag: tag
            };
            req.person = personInfo;
            next();
          }
        }
      });
    },
  ],
  readPerson: [
    (req: any, res, next) => {
      var userId: string = req.query.userId;

      if(!userId)
        res.status(500).json({ error: true, message: "Invalid Request" });
        
      next();
    },
  ],
};