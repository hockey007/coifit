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
exports.ParlorService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const Jwt = __importStar(require("jsonwebtoken"));
const sequelize_1 = require("../instances/sequelize");
class ParlorService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = '0.rfyj3n9nzh';
    }
    static get userAttributes() {
        return ['id', 'mobile'];
    }
    static get parlor() {
        return ParlorService._parlor;
    }
    register({ mobile, password, id }) {
        if (!password)
            return null;
        return bcrypt.hash(password, this._saltRounds)
            .then(hash => {
            return sequelize_1.Parlor.create({ id, mobile, password: hash })
                .then(u => this.getParlorById(u.id));
        });
    }
    login({ mobile }) {
        return sequelize_1.Parlor.findOne({ where: { mobile } }).then(u => {
            if (u == null)
                throw "Invalid User";
            const { id, mobile } = u;
            return { token: Jwt.sign({ id, mobile }, this._jwtSecret, { expiresIn: '7d' }) };
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                ParlorService._parlor = sequelize_1.Parlor.findByPk(decoded['id']);
                resolve(true);
                return;
            });
        });
    }
    getParlorById(id) {
        return sequelize_1.Parlor.findByPk(id, {
            attributes: ParlorService.userAttributes
        });
    }
}
exports.ParlorService = ParlorService;
