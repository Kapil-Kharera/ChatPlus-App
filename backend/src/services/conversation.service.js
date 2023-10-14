import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

export const isConversationExist = async (senderId, receiverId) => {
    let conversation = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: senderId }}},
            { users: { $elemMatch: { $eq: receiverId }}}
        ]
    })
    .populate("users", "-password")
    .populate("latestMessage");

    if(!conversation) {
        throw createHttpError.BadRequest("Oops, Something went wrong!");
    }

    //populate message model
    conversation = await UserModel.populate(conversation, {
        path: "latestMessage.sender",
        select: "name email picture status"
    });

    return conversation[0];//find return an array
}


export const createConversation = async (data) => {
    const newConversation = await ConversationModel.create(data);

    if(!newConversation) {
        throw createHttpError.BadRequest("Oops, something wrong happen!")
    }

    return newConversation;
}

export const populateConversation = async (id, fieldsToPopulate, fieldsToRemove) => {
    const data = await ConversationModel.findOne({ _id: id })
    .populate(fieldsToPopulate, fieldsToRemove);

    if(!data) {
        throw createHttpError.NotFound("Oops, something wrong happen!");
    }

    return data;
}