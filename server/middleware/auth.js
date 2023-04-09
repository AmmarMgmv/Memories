import jwt from 'jsonwebtoken';

//Authenticate requests to protected routes that require a valid JWT token for access
export const verifyToken = async (req, res, next) => {
    try{
        //Grabbing the JWT token from the authorization header from the req
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        //If it starts with Bearer, we trim off that string leaving the jwt only
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        //Verify the token by comparing it to the secret string
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //Adds the verified payload to the req object 
        req.user = verified;
        //Calls the next function
        next();
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
}