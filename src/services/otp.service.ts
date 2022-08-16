import * as bcrypt from "bcrypt";
const otpGenerator = require("otp-generator");
import * as Jwt from "jsonwebtoken";
import * as Bluebird from "Bluebird";
import { User, UserModel, UserAddModel, UserViewModel } from "../models/user";
import { Otp, OtpAddModel } from "../models/otp";

export class UserService {
  private readonly _saltRounds = 12;
  private readonly _jwtSecret = "0.rfyj3n9nzh";

  static get userAttributes() {
    return ["id", "email"];
  }
  private static _user;
  static get user() {
    return UserService._user;
  }

  generate({ mobile, type }: OtpAddModel) {
    const OTP: string = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    return bcrypt.hash(OTP, this._saltRounds).then((hash) => {
      return Otp.create({ mobile, otp: hash, type: type }).then((u) => {
        return OTP;
      });
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      Jwt.verify(token, this._jwtSecret, (err, decoded: any) => {
        if (err) {
          resolve(false);
          return;
        }

        UserService._user = User.findByPk(decoded["id"]);
        resolve(true);
        return;
      });
    }) as Promise<boolean>;
  }

  getUserById(id: number) {
    return User.findByPk(id, {
      attributes: UserService.userAttributes,
    }) as unknown as Bluebird<UserViewModel>;
  }
}
