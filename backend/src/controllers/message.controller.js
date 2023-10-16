import logger from "../config/logger.config.js";
import { createMessage, populateMessage, updateLatestMessage, getconversationMessages } from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { message, conversationId, files } = req.body;

        if(!conversationId || (!message && !files)) {
            logger.error("Please provide a conversationId and a message body.");
            return res.sendStatus(400);
        }

        const messageData = {
            sender: userId,
            message,
            conversation: conversationId,
            files: files || []
        }

        const newMessage = await createMessage(messageData);

        const populatedMessage = await populateMessage(newMessage._id);

        await updateLatestMessage(conversationId, newMessage);

        res.status(200).json(populatedMessage);

    } catch (error) {
        next(error);
    }
}


export const getMessage = async (req, res, next) => {
    try {
        const { conversationid } = req.params;

        if(!conversationid) {
            logger.error("Please add a conversation id in params");
            res.sendStatus(400);
        }

        const messages = await getconversationMessages(conversationid);

        // console.log(messages);

        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
}