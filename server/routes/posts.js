import express from "express";
//These have not been created yet
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
//Get all the posts for the feed
router.get("/", verifyToken, getFeedPosts);
//Get a specific users posts only
router.get("/:userId/posts", verifyToken, getUserPosts);

//UPDATE
//Like and unlike a users post
router.patch("/:id?like", verifyToken, likePost);

export default router;