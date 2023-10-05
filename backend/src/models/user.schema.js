import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required : [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email address"],
        unique: [true, "This email address already exist"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    picture: {
        type: String,
        default: "" //set default image here
    },
    status: {
        type: String,
        default: "Hey there, I'm using ChatPlus."
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, "Please make sure your password is atleast 6 characters long."],
        maxLength: [128, "Please make sure your password is less than 128 characters long."]
    }
}, {
    collection: "users", //collection name or table name
    timestamps: true
});

//Check if the UserModel already exists, otherwise create it
const UserModel = mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;