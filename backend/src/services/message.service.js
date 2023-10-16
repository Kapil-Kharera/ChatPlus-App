import createHttpError from "http-errors";
import { ConversationModel, MessageModel } from "../models/index.js";


export const createMessage = async (data) => {
    const newMessage = await MessageModel.create(data);

    if(!newMessage) {
        throw createHttpError.BadRequest("Oops, Something went wrong!");
    }

    return newMessage;
}


export const populateMessage = async (id) => {
    const message = await MessageModel.findById(id)
    .populate({
        path: "sender",
        select: "name picture",
        model: "UserModel"
    })
    .populate({
        path: "conversation",
        select: "name isGroup users",
        model: "ConversationModel",
        populate: {
            path: "users",
            select: "name email picture status",
            model: "UserModel"
        }
    });

    if(!message) {
        throw createHttpError.BadRequest("Oops, Something went wrong!");
    }

    return message;
}


export const updateLatestMessage = async (id, message) => {
    const updatedConversation = await ConversationModel.findByIdAndUpdate(id, {
        latestMessage: message
    });

    if(!message) {
        throw createHttpError.BadRequest("Oops, Something went wrong!");
    }

    return updatedConversation;
}