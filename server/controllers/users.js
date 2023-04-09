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
