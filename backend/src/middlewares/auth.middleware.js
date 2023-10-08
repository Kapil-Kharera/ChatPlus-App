import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export default async function(req, res, next) {
    //return if req obj header don't contain authorization key in it
    if(!req.headers['authorization']) {
        return next(createHttpError.Unauthorized());
    }

    //extracting bearertoken
    const bearerToken = req.headers['authorization'];

    //spliting the token from the bearer keyword
    const token = bearerToken.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
        (err, payload) => {
        if(err) {
            return next(createHttpError.Unauthorized())
        }

        //exlicitly adding user property to req obj
        req.user = payload;//this payload contain user id which return by jwt after verifying 
        next();
    });
}