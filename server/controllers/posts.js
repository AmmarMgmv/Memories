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

//UPDATE
//This function allows the user to like and unlike posts
export const likePost = async (req, res) => {
    try {
        //Grab the id from the request
        const {id} = req.params;
        //Grab the userId from the body of the request
        const {userId} = req.body;
        //Find the post using its ID
        const post = await Post.findById(id);
        //Check if the userID is in the likes 
        const isLiked = post.likes.get(userId);

        //If its liked, clicking like will unlike it
        if (isLiked) {
            post.likes.delete(userId);
        }
        //If it isnt liked, clicking like will like it
        else {
            post.likes.set(userId, true);
        }

        //Get the post with the updated number of likes
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        );

        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(409).json({message: err.message})
    }
}