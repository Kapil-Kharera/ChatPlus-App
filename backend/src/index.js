import dotenv from "dotenv";
import app from "./app.js";
import logger from "./config/logger.config.js";

//config dotenv
dotenv.config();

const server = app.listen(process.env.PORT || 8000, () => {
    logger.info(`Server is listening on ${process.env.PORT}`);
    // console.log("Process id : ", process.pid);
});

//handler server error 
const exitHandler = () => {
    if(server) {
        logger.info("Server is closed");
        process.exit(1);
    }else{
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.info(error);
    exitHandler();
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM signal
process.on("SIGTERM", () => {
    if(server) {
        logger.info("Server is closed");
        process.exit(1);
    }
});
