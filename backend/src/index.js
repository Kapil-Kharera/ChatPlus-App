import dotenv from "dotenv";
import app from "./app.js";

//config dotenv
dotenv.config();

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});
