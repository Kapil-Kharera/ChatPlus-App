import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

//dotenv config
dotenv.config();

//create express app
const app = express();

//morgan middleware
if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

//helmet(security)
app.use(helmet());

//parse json body & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sanitize req data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//fileupload
app.use(fileUpload({
    useTempFiles: true
}));

//cors
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from Server");
})

export default app;

