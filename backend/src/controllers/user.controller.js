import createHttpError from "http-errors";
import logger from "../config/logger.config.js";
import { searchUsers as searchUserService } from "../services/user.service.js";

export const searchUser = async (req, res, next) => {
    try {
        const { search: keyword} = req.query;

        if(!keyword) {
            logger.error("Please add a search query first.");
            throw createHttpError.BadRequest("Oops, something went wrong!");
        }

        // console.log(req.user.userId);

        const users = await searchUserService(keyword, req.user.userid);

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        next(error);
    }
}