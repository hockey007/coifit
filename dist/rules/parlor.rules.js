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
exports.parlorRules = void 0;
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const parlor_1 = require("../models/parlor");
exports.parlorRules = {
    registerParlor: [
        (req, res, next) => {
            var mobile = req.body.mobile;
            var password = req.body.password;
            if (!mobile)
                res.status(500).json({ error: true, message: "Invalid Request" });
            if (!mobile.match(/^[6-9][0-9]{9}$/)) {
                res.json({ error: true, message: "Invalid mobile number" });
            }
            else if (password.length < 8) {
                res.json({ error: true, message: "Password length should be atleast 8 characters" });
            }
            else {
                parlor_1.Parlor.findOne({ where: { mobile } }).then((user) => {
                    if (!user) {
                        var userdata = {
                            id: (0, uuid_1.v4)(),
                            mobile: mobile,
                            password: password,
                        };
                        req.user = userdata;
                        next();
                    }
                    else {
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
        (req, res, next) => {
            var mobile = req.body.mobile;
            var password = req.body.password;
            if (!mobile)
                res.status(500).json({ error: true, message: "Invalid Request" });
            if (mobile.match(/^[6-9][0-9]{9}$/)) {
                parlor_1.Parlor.findOne({ where: { mobile } }).then((user) => {
                    var raw_user = user === null || user === void 0 ? void 0 : user.toJSON();
                    if (!user)
                        res.json({
                            error: true,
                            message: "No Parlor registered with this mobile number",
                        });
                    var checkPassword = parlor_1.Parlor.findOne({
                        where: { mobile: mobile },
                    }).then((u) => bcrypt
                        .compare(password, u.password)
                        .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                error: true,
                                message: "Incorrect password!",
                            });
                        }
                        var userdata = {
                            id: u.id,
                            password: raw_user === null || raw_user === void 0 ? void 0 : raw_user.password,
                            mobile: raw_user === null || raw_user === void 0 ? void 0 : raw_user.mobile,
                        };
                        req.user = userdata;
                        next();
                    })
                        .catch((error) => {
                        res.status(500).json({
                            error: true,
                            message: "Something went wrong, Please try again!",
                        });
                    }));
                });
            }
            else
                res.json({ error: true, message: "Invalid mobile number" });
        },
        (req, res, next) => {
            next();
        },
    ],
};
