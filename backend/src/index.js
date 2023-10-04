import dotenv from "dotenv";
import app from "./app.js";
import logger from "./config/logger.config.js";

//config dotenv
dotenv.config();

app.listen(process.env.PORT || 8000, () => {
    logger.info(`Server is listening on ${process.env.PORT}`);
});
