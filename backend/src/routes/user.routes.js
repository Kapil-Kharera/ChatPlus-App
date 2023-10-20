import express from "express";
import trimRequest from "trim-request";
import { searchUser } from "../controllers/user.controller.js";

//contollers
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(trimRequest.all, authMiddleware, searchUser);

export default router;