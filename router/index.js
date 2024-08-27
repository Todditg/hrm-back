import {Router} from "express";
import { body } from "express-validator"
import { userController } from "../controllers/userController.js";

const router = new Router();

router.post("/signup",
    body("email").isEmail(),
    body("password").isLength({min: 8, max: 32}),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers)
router.put("/userUpdate/:id", userController.updateUser)
router.get("/getUser/:id", userController.getUser)

export default router;
