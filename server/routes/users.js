import express from "express";
import {getUser, getUserFriends, addRemoveFriend, } from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

//READ
//Grab ID from database and get the users data
router.get("/:id", verifyToken, getUser);
//Grabs the users friends
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
//Updates friends list when fried is added/removed
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;