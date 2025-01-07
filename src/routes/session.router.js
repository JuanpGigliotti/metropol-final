import { Router } from 'express';
import passport from 'passport';
const router = Router();

import userController from '../controllers/user.controller.js';
const userController = new userController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", passport.authenticate("jwt", {session: false}), userController.current);
router.post("/logout", userController.logout);

export default router;
