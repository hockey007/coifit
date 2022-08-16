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
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
class UserService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = '0.rfyj3n9nzh';
    }
    static get userAttributes() {
        return ['id', 'email'];
    }
    static get user() {
        return UserService._user;
    }
    register({ email, password }) {
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return user_1.User.create({ email, password: hash })
                .then(u => this.getUserById(u.id));
        });
    }
    login({ email }) {
        return user_1.User.findOne({ where: { email } }).then(u => {
            const { id, email } = u;
            return { token: jwt.sign({ id, email }, this._jwtSecret) };
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                UserService._user = user_1.User.findById(decoded['id']);
                resolve(true);
                return;
            });
        });
    }
    getUserById(id) {
        return user_1.User.findById(id, {
            attributes: UserService.userAttributes
        });
    }
}
exports.UserService = UserService;
