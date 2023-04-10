import {createSlice} from "@reduxjs/toolkit";

//The state of the app at launch
const initialState = {
mode: "light",
user:  null,
token: null, 
posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    //Functions to modify global state
    reducers: {
        //Changing light mode to dark mode and vice versa
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        //Updates state with the user and token data upon successful user login
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        //Resets state with null values when the user logs out
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        //Set the friends into our local state
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.error("user friends non-existent :(")
            }
        },
        //Sets the state with an array of posts.
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        //Updates a specific post with new data
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;