import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";
import { UserModel } from "../models/index.js";

//env variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
    const { name, email, picture, status, password } = userData;

    //check if fields are empty
    if(!name || !email || !password) {
        throw createHttpError.BadRequest("Please fill all fields");
    }

    //check name length
    if(!validator.isLength(name, {min: 2, max:16})) {
        throw createHttpError.BadRequest("Please make sure name is between 2 to 16 character");
    }

    //check status length
    if(status && status.length > 64) {
        throw createHttpError.BadRequest("Please make sure your status is less than 64 character");
    }

    //check if email address is valid
    if(!validator.isEmail(email)) {
        throw createHttpError.BadRequest("Please make sure to provide a valid email address.")
    }

    //check if user already exist
    const isUserExist = await UserModel.findOne({email});

    if(isUserExist) {
        throw createHttpError.Conflict("Please try again with different email address, this email already exist.");
    }

    //check password length
    if(!validator.isLength(password, {min: 6, max: 128})) {
        throw createHttpError.BadRequest("Please make sure your password between 6 to 128 characters.")
    }



    const user = await new UserModel({
        name, 
        email, 
        picture: picture || DEFAULT_PICTURE, 
        status: status || DEFAULT_STATUS, 
        password}).save();

    return user;
}


export const signUser = async (email, password) => {
    //finding user by email
    //lean()- it will mongoose, to return JS plain obj not mongodb doc obj
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

    if(!user) {
        throw createHttpError.NotFound('Invalid credentials');
    }

    //comparing password
    const passwordMatched = await bcrypt.compare(password, user.password);

    if(!passwordMatched) {
        throw createHttpError.NotFound('Invalid credentials');
    }


    return user;
}