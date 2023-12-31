import express from "express";
import trimRequest from "trim-request";

//contollers
import { login, logout, refreshToken, resgister } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(trimRequest.all, resgister);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshtoken").post(trimRequest.all, refreshToken);
router.route("/testingauthmiddleware").get(trimRequest.all, authMiddleware, (req, res) => {
    res.send(req.user);
});

export default router;