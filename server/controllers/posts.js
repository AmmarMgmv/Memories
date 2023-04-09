import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
//This function allows users to create posts
export const createPost = async (req, res) => {
    try {
        //Grab userId, description and picturePath from the request
        const {userId, description, picturePath} = req.body;
        //Find the user with that ID
        const user = await User.findById(userId);
        //This creates a new instance of post with the extracted data from req & user data
        const newPost = new Post({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        //This saves the new post to the database
        await newPost.save();

        //Send the updated list of post to the front end
        const post = await Post.find();
        res.status(201).json(post);
    }
    catch (err) {
        res.status(409).json({message: err.message})
    }
}

//READ
//This function allows us to get the feed posts
export const getFeedPosts =async (req, res) => {
    try {
         //Send the updated list of post to the front end
         const post = await Post.find();
         res.status(200).json(post);
    }
    catch (err) {
        res.status(409).json({message: err.message})
    }
}

//This function allows us to get users posts only
export const getUserPosts =async (req, res) => {
    try {
        //Grab userID from the req
        const {userId} = req.params;
         //Send the posts that belong to the user 
         const post = await Post.find({userId});
         res.status(200).json(post);
    }
    catch (err) {
        res.status(409).json({message: err.message})
    }
}