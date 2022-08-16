import * as bcrypt from 'bcrypt'
import * as Jwt from 'jsonwebtoken'
import * as Bluebird from 'Bluebird'
const otpGenerator = require("otp-generator");
import { User, UserModel, UserAddModel, UserViewModel, UserVerifyModel } from '../models/user'
import { Otp } from '../models/otp';

export class UserService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get userAttributes() {
        return ['id', 'mobile']
    }
    private static _user
    static get user() {
        return UserService._user
    }

    auth({ id, mobile }: UserAddModel) {
        return User.findOne({ where: { mobile } }).then((user) => {
            if(!user) {
                User.create({ id, mobile }).then(u => this.getUserById(u!.id))
            }
            const OTP = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
            return bcrypt.hash(OTP, this._saltRounds).then((hash) => {
                return Otp.create({ mobile, otp: hash, type: "user" }).then(() => {
                    return { message: "OTP sent!", otp: OTP };
                });
            });
        });
    }

    verify({ mobile }: UserAddModel) {
        return User.findOne({ where: { mobile } }).then(u => {
            if(!u) {
                return {message: "Invalid Request!"}
            } else {
                const { id, mobile } = u!
                return { token: Jwt.sign({ id, mobile }, this._jwtSecret) }
            }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, this._jwtSecret, (err, decoded: any) => {
                if (err) {
                    resolve(false)
                    return
                }

                UserService._user = User.findByPk(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getUserById(id: string) {
        return User.findByPk(id, {
            attributes: UserService.userAttributes
        }) as unknown as Bluebird<UserViewModel>
    }
}