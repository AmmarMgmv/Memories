import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

//REGISTER USER
//This will handle user resgistrations that come to the /auth/register route
export const register = async(req, res) => {
    try{
        //This extracts data from the req body
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            firends,
            location,
            occupation
        } = req.body;

        //This creates a salt which is a random data added to a password before it gets hashed
        const salt = await bcrypt.genSalt();
        //Create a secure hash value of the user's password with the added salt
        const passwordHash = await bcrypt.hash(password, salt);

        //This creates a new instance of user with the extracted data from req
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            firends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        //This saves the new user to the database
        const savedUser = await newUser.save();
        //If it succeeds, we return the object to the client
        res.status(201).json(savedUser);
    }
    catch(err){
        //If it fails, we send an error response
        res.status(500).json({error: err.message});
    }
}


//LOGGING IN
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        //Finds the user object in the database with the same email
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: "User does not exist. "});

        //Compares user objects hashed password with the password given
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials. "});

        //Generates a JWT using the secret key in the env file
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        //Delete password to prevent it being sent to the client
        delete user.password;
        //Sends status code response with the JWT token and user object
        res.status(200).json({token, user});
    }
    catch (err) {
        //If it fails, we send an error response
        res.status(500).json({error: err.message});
    }
}