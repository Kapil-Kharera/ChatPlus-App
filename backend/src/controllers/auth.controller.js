export const resgister = async (req, res, next) => {
    try {
        res.send(req.body);
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