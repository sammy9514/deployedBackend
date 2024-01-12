import { Router } from "express";
import { createUser } from "../controller/userController";
import validator from "../utils/validator";
import { registerValidator } from "../utils/entryValidator";

const router: Router = Router();

router.route("/create-user").post(createUser);

export default router;
