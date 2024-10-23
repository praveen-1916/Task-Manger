import jwt from "jsonwebtoken";

const mySecret = "praveen@is@1619@is@praveen";


const fetchUser = async (req, res, next) => {

    const token = req.header('authToken');

    try {
        if (token) {
            const data = jwt.verify(token, mySecret);
            req.userId = data.user.id;
            next();
        } else {
            res.status(400).json({ success: false, errorMsg: 'Please authenticate with a valid token!' })
        }
    } catch (error) {
        res.status(400).json({ success: false, msg: 'Please', errorMsg: 'Internal server error!', err: error })
    }

}


export default fetchUser;