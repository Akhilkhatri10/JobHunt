import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {

    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            })
        }

        req.id = decode.userId
        next()

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }

}


export default isAuthenticated