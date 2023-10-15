
export const sendMessage = async (req, res, next) => {
    try {
        res.send("Your req working fine.")
    } catch (error) {
        next(error);
    }
}


export const getMessage = async (req, res, next) => {
    try {
        res.send(req.params);
    } catch (error) {
        next(error);
    }
}