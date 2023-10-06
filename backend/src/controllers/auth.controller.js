import { createUser } from "../services/auth.service.js";

export const resgister = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        const newUser = await createUser({
            name, 
            email, 
            picture, 
            status, 
            password
        });

        res.status(200).json({
            success: true,
            message: "User created successfully",
            newUser
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
        
    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        
    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}


export const refreshToken = async (req, res, next) => {
    try {
        
    } catch (error) {
        // res.status(500).json({ message: error.message });
        //we send this error(through next) to http-error(package), it will
        //do the same work for use
        next(error);
    }
}