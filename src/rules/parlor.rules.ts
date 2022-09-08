import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { Parlor } from "../instances/sequelize";

export const parlorRules = {
  registerParlor: [
    (req: any, res, next) => {
      var mobile: string = req.body.mobile;
      var password: string = req.body.password;
      if (!mobile)
        res.status(500).json({ error: true, message: "Invalid Request" });

      if (!mobile.match(/^[6-9][0-9]{9}$/)) {
        res.json({ error: true, message: "Invalid mobile number" });
      } else if(password.length < 8) {
        res.json({ error: true, message: "Password length should be atleast 8 characters" });
      } else {
        Parlor.findOne({ where: { mobile } }).then((user) => {
          if (!user) {
            var userdata: any = {
              id: uuidv4(),
              mobile: mobile,
              password: password,
            };
            req.user = userdata;
            next();
          } else {
            res.json({
              error: true,
              message: "Parlor exists with this mobile number",
            });
          }
        });
      }
    },
    (req, res, next) => {
      next();
    },
  ],
  forLogin: [
    (req: any, res, next) => {
      var mobile: string = req.body.mobile;
      var password: string = req.body.password;
      if (!mobile)
        res.status(500).json({ error: true, message: "Invalid Request" });

      if (mobile.match(/^[6-9][0-9]{9}$/)) {
        Parlor.findOne({ where: { mobile } }).then((user) => {
          var raw_user = user?.toJSON();
          if (!user)
            res.json({
              error: true,
              message: "No Parlor registered with this mobile number",
            });
          var checkPassword = Parlor.findOne({
            where: { mobile: mobile },
          }).then((u) =>
            bcrypt
              .compare(password, u!.password)
              .then((valid) => {
                if (!valid) {
                  return res.status(401).json({
                    error: true,
                    message: "Incorrect password!",
                  });
                }
                var userdata: any = {
                  id: u!.id,
                  password: raw_user?.password!,
                  mobile: raw_user?.mobile!,
                };
                req.user = userdata;
                next();
              })
              .catch((error) => {
                res.status(500).json({
                  error: true,
                  message: "Something went wrong, Please try again!",
                });
              })
          );
        });
      } else res.json({ error: true, message: "Invalid mobile number" });
    },
    (req, res, next) => {
      next();
    },
  ],
};
