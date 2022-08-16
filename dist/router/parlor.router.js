"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parlorRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const parlor_service_1 = require("../services/parlor.service");
const parlor_rules_1 = require("../rules/parlor.rules");
exports.parlorRouter = (0, express_1.Router)();
const parlorService = new parlor_service_1.ParlorService();
exports.parlorRouter.post("/register", parlor_rules_1.parlorRules["registerParlor"], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const parlor = parlorService.register(req.user);
    return parlor === null || parlor === void 0 ? void 0 : parlor.then((u) => res.json(u));
});
exports.parlorRouter.post("/login", parlor_rules_1.parlorRules["forLogin"], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const token = parlorService.login(req.user);
    return token.then((t) => res.json(t));
});
