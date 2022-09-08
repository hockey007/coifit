"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const otpGenerator = require("otp-generator");
const Jwt = __importStar(require("jsonwebtoken"));
const sequelize_1 = require("../instances/sequelize");
class UserService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = "0.rfyj3n9nzh";
    }
    static get userAttributes() {
        return ["id", "email"];
    }
    static get user() {
        return UserService._user;
    }
    generate({ mobile, type }) {
        const OTP = otpGenerator.generate(6, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false,
        });
        return bcrypt.hash(OTP, this._saltRounds).then((hash) => {
            return sequelize_1.Otp.create({ mobile, otp: hash, type: type }).then((u) => {
                return OTP;
            });
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                UserService._user = sequelize_1.User.findByPk(decoded["id"]);
                resolve(true);
                return;
            });
        });
    }
    getUserById(id) {
        return sequelize_1.User.findByPk(id, {
            attributes: UserService.userAttributes,
        });
    }
}
exports.UserService = UserService;
