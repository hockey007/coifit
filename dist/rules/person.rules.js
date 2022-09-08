"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personRules = void 0;
const uuid_1 = require("uuid");
// import { PersonAddModel, PersonReadModel} from "../instances/sequelize";
const sequelize_1 = require("../instances/sequelize");
var Categories;
(function (Categories) {
    Categories["SELF"] = "self";
    Categories["FRIENDSANDFAMILY"] = "fnf";
    Categories["OTHERS"] = "others";
})(Categories || (Categories = {}));
var Genders;
(function (Genders) {
    Genders["MALE"] = "male";
    Genders["FEMALE"] = "female";
})(Genders || (Genders = {}));
exports.personRules = {
    addPerson: [
        (req, res, next) => {
            var userId = req.body.userId;
            var name = req.body.name;
            var age = req.body.age;
            var gender = req.body.gender;
            var category = req.body.category;
            var tag = req.body.tag;
            if (!userId || !name || !age || !gender || !category)
                res.status(500).json({ error: true, message: "Invalid Request" });
            sequelize_1.User.findOne({ where: { id: userId } }).then((user) => {
                if (!user) {
                    res.status(500).json({ error: true, message: "Invalid User ID" });
                }
                else {
                    if (userId.length == 0) {
                        res.json({ error: true, message: "User ID can't be empty" });
                    }
                    else if (name.length == 0) {
                        res.json({ error: true, message: "Name can't be empty" });
                    }
                    else if (age <= 0) {
                        res.json({ error: true, message: "Invalid Age" });
                    }
                    else if (!(Object.values(Genders).includes(gender))) {
                        res.json({ error: true, message: "Invalid/Empty Gender" });
                    }
                    else if (!(Object.values(Categories).includes(category))) {
                        res.json({ error: true, message: "Invalid/Empty Category" });
                    }
                    else {
                        var personInfo = {
                            id: (0, uuid_1.v4)(),
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
        (req, res, next) => {
            var userId = req.query.userId;
            if (!userId)
                res.status(500).json({ error: true, message: "Invalid Request" });
            next();
        },
    ],
};
