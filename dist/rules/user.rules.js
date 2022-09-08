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
exports.userRules = void 0;
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const sequelize_1 = require("../instances/sequelize");
exports.userRules = {
    forAuthentication: [
        (req, res, next) => {
            var mobile = req.body.mobile;
            if (!mobile)
                res.status(500).json({ error: true, message: "Invalid Request" });
            if (!mobile.match(/^[6-9][0-9]{9}$/)) {
                res.json({ error: true, message: "Invalid mobile number" });
            }
            else {
                sequelize_1.User.findOne({ where: { mobile } }).then((user) => {
                    if (!user) {
                        var userdata = {
                            id: (0, uuid_1.v4)(),
                            mobile: mobile
                        };
                        req.user = userdata;
                        next();
                    }
                    else {
                        if (true) {
                            var userdata = {
                                id: user.id,
                                mobile: user.mobile
                            };
                            req.user = userdata;
                            next();
                        }
                        else {
                            // Pass
                        }
                    }
                });
            }
        },
    ],
    forVerification: [
        (req, res, next) => {
            var mobile = req.body.mobile;
            var otp = req.body.otp;
            if (!mobile || !otp)
                res.status(500).json({ error: true, message: "Invalid Request" });
            sequelize_1.Otp.findOne({ where: { mobile } }).then((user) => {
                if (!user) {
                    res.status(403).json({ error: true, message: "Invalid Credentials" });
                }
                else {
                    var raw_user = user === null || user === void 0 ? void 0 : user.toJSON();
                    bcrypt.compare(otp, user.otp).then((valid) => {
                        if (!valid) {
                            res.status(402).json({ error: true, message: "Invalid OTP!" });
                        }
                        else {
                            var userdata = {
                                mobile: raw_user === null || raw_user === void 0 ? void 0 : raw_user.mobile,
                            };
                            req.user = userdata;
                            sequelize_1.Otp.destroy({ where: { mobile } });
                            next();
                        }
                    });
                }
            });
        },
    ],
};
