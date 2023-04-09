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