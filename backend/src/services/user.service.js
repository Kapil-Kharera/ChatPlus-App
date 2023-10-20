import createHttpError from "http-errors";
import  UserModel from "../models/user.schema.js"

export const findUser = async (id) => {
    const user = await UserModel.findById(id);

    if(!user) {
        throw createHttpError.BadRequest("Please fill all fields");
    }

    return user;
}

export const searchUsers = async (keyword) => {
    const users = await UserModel.find({
        $or: [
            {name: { $regex: keyword, $options: "i" } },
            {email: { $regex: keyword, $options: "i" } },
        ]
    });

    return users;
}