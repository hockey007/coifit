import { Router } from "express";
import { validationResult } from "express-validator";
import { ParlorService } from "../services/parlor.service";
import { parlorRules } from "../rules/parlor.rules";

export const parlorRouter = Router();
const parlorService = new ParlorService();

parlorRouter.post("/register", parlorRules["registerParlor"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());
  const parlor = parlorService.register(req.user);
  return parlor?.then((u) => res.json(u));
});

parlorRouter.post("/login", parlorRules["forLogin"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());
  const token = parlorService.login(req.user);
  return token.then((t) => res.json(t));
});
