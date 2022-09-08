import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { check } from 'express-validator'
import { User,Otp } from '../instances/sequelize';
import e from 'express';

export const userRules = {
  forAuthentication: [
    (req: any, res, next) => {
      var mobile: string = req.body.mobile;

      if (!mobile)
        res.status(500).json({ error: true, message: "Invalid Request" });

      if (!mobile.match(/^[6-9][0-9]{9}$/)) {
        res.json({ error: true, message: "Invalid mobile number" });
      } else {
        User.findOne({ where: { mobile } }).then((user) => {
          if (!user) {
            var userdata: any = {
              id: uuidv4(),
              mobile: mobile
            };
            req.user = userdata;
            next();
          } else {
            if(true) {
              var userdata: any = {
                id: user!.id,
                mobile: user!.mobile
              };
              req.user = userdata;
              
              next();
            } else {
              // Pass
            }
          }
        });
      }
    },
  ],
  forVerification: [
    (req: any, res, next) => {
      var mobile: string = req.body.mobile;
      var otp: string = req.body.otp;

      if (!mobile || !otp)
        res.status(500).json({ error: true, message: "Invalid Request" });

        Otp.findOne({ where: { mobile } }).then((user) => {
          if (!user) {
            res.status(403).json({ error: true, message: "Invalid Credentials" });
          } else {
            var raw_user = user?.toJSON();
            bcrypt.compare(otp, user!.otp).then((valid)=>{
              if(!valid) {
                res.status(402).json({error: true, message: "Invalid OTP!"});
              } else {
                var userdata: any = {
                  mobile: raw_user?.mobile!,
                };
                req.user = userdata;
                Otp.destroy({where: {mobile}});
                next()
              }
            });
          }
        });
    },
  ],
}