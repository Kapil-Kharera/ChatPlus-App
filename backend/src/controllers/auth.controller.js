import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";

export const resgister = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        console.log(req.body);
        const newUser = await createUser({
            name, 
            email, 
            picture, 
            status, 
            password
        });

        //generating access token
        const acessToken = await generateToken(
            {userId: newUser._id}, 
            "1d", 
            process.env.ACCESS_TOKEN_SECRET
        );

        //generating refresh token
        const refreshToken = await generateToken(
            {userId: newUser._id}, 
            "30d", 
            process.env.REFRESH_TOKEN_SECRET
        );
        

        //sending refresh token in cookies
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })


        res.status(200).json({
            success: true,
            message: "User registered successfully",
            
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                acessToken: acessToken
            }
        });

    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await signUser(email, password);

        //generating access token
        const acessToken = await generateToken(
            {userId: user._id}, 
            "1d", 
            process.env.ACCESS_TOKEN_SECRET
        );

        //generating refresh token
        const refreshToken = await generateToken(
            {userId: user._id}, 
            "30d", 
            process.env.REFRESH_TOKEN_SECRET
        );
        

        //sending refresh token in cookies
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })


        res.status(200).json({
            success: true,
            message: "User login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                acessToken: acessToken,
            }
        });

    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        //to logout, just remove the refresh token
        res.clearCookie("refreshtoken", {path: "/api/v1/auth/refreshtoken"});

        res.status(200).json({
            success: true,
            message: "Logout Successfully",
        })
    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}


export const refreshToken = async (req, res, next) => {
    try {
        //extracting refreshtoken from cookies
        const refreshToken = req.cookies.refreshtoken;
        
        if(!refreshToken) {
            throw createHttpError.Unauthorized("Please Login");
        }

        //checking is token is verified, here we get the user id
        const isTokenVarified = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        //find the uesr based on id
        const user = await findUser(isTokenVarified.userId);

        //generating a access token 
        const acessToken = await generateToken(
            { userId: user._id },
            "1d",
            process.env.ACCESS_TOKEN_SECRET
        )

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                acessToken: acessToken
            }
        });

    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}