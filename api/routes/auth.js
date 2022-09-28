import express from "express";
import { login, logoutUser, register } from "../controllers/auth.js";
const router =express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logoutUser);
export default router;