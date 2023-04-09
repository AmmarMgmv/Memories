import User from "../models/User";

//READ
//This function gets the user data based on the provided ID
export const getUser = async (req, res) => {
    try{
        //Grab ID from the request
        const {id} =req.params;
        //Search database to find the user with this ID
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}

//This function gets a users friend list based on the provided ID
export const getUserFriends = async (req, res) => {
    try{
        //Grab ID from the request
        const {id} =req.params;
        //Search database to find the user with this ID
        const user = await User.findById(id);

        //Grab all user data for all the friend ID's
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        //Formats friend array to include relevant data only
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}

//UPDATE
//This function allows the user to add and remove friends
export const addRemoveFriend = async (req, res) => {
    try{
        //Grab ID and friendID from the request
        const {id, friendId} = req.params;
        //Search database to find the user with this ID
        const user = await User.findById(id);
        //Search database to find the friend with this friendID
        const friend = await User.findById(friendId);

        //If they are friends, remove them
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        //If they arent friends, add them
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        //Wait until a friend is added/removed before continuing
        await user.save();
        await friend.save();

        //Grab all user data for all the friend ID's
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        //Formats friend array to include relevant data only
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}