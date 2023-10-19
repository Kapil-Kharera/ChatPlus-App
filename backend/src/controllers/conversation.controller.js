import createHttpError from "http-errors";
import logger from "../config/logger.config.js";
import { isConversationExist, createConversation, populateConversation, getUserConversations } from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const createOpenConversation = async (req, res, next) => {
    try {
        const senderId = req.user.userId;
        const { receiverId } = req.body;

        //check if receiverId is exists
        if(!receiverId) {
            logger.error("Please provide the user Id, you want to start a conversation with!");
            throw createHttpError.BadRequest("Oops, Something went wrong!");
        }

        //check if conversation is exists
        const existedConversation = await isConversationExist(senderId, receiverId);

        if(existedConversation) {
            res.status(200).json(existedConversation);
        }else {
            let receiverUser = await findUser(receiverId);
           
            let conversationData = {
                name: receiverUser.name,
                picture: receiverUser.picture,
                isGroup: false,
                users: [ senderId, receiverId ]
            }

            const newConversation = await createConversation(conversationData);

            const populatedConversation = await populateConversation(newConversation._id, "users", "-password");

            res.status(200).json({
                success: true,
                populatedConversation
            });
        }

    } catch (error) {
        next(error);
    }
}


export const getConversation = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const conversations = await getUserConversations(userId);
    
        res.status(200).json(conversations);
        // res.status(200).json({
        //     success: true,
        //     conversations
        // });
    } catch (error) {
        next(error);
    }
}