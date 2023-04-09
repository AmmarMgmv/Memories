import { express } from "express";
import {login} from "../controllers/auth.js";

const router = express.Router();

//Defining a new route for HTTP POST requests with url path /auth/login
//Uses the login function from auth.js
router.post("login", login);

export default router;