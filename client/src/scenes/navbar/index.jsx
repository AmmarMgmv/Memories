import { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Ssearch, Message, DarkMode, LightMode, Notifications, Help, Menu, Close, Search } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    //Determines whether we open the mobile menu or not
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    //To dispatch actions from the reducers
    const dispatch = useDispatch();
    //Allows us to navigate to different routes in the app
    const navigate = useNavigate();
    //Access and use the user data from the redux store
    const user = useSelector((state) => state.user);
    //Determine if screen size is above or below our min width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    //To allow us to use the theme properties we defined
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;


    return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography 
                fontWeight="bold" 
                fontSize="clamp(1rem, 2rem, 2.25rem" 
                color="primary" 
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer"
                    }
                }}
            >
                Memories
            </Typography>
        </FlexBetween>  
    </FlexBetween>
};

export default Navbar