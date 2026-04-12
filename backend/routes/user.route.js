import express from "express";
import { getCurrentUser, login, logout, register, saveJob, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(upload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,upload,updateProfile);
router.post("/save/:id", isAuthenticated, saveJob);
router.get("/me", isAuthenticated, getCurrentUser);

export default router;

