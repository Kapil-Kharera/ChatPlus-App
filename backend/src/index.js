import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.config.js";

//config dotenv
dotenv.config();

//exit on db error
mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error: ${err}`);
    process.exit(1);
});

// db debug mode
if(process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
}

//database connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info("Connected to Mongodb");
})

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
