import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


// FILE STORAGE
//Storage configuration
const storage = multer.diskStorage({
    //This tells it where to store the file
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    //This tells is how to name the file, in this case we use the original name
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
});
//We create an instance of multer to handle file uploads using the storage configuration above
const upload = multer({storage});


//ROUTES WITH FILES
//Set up the routes that include a file upload
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


//ROUTES
//Set up routes that dont involve uploads
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


//MONGOOSE SETUP
//PORT should go to our predefined port and if that port doesnt work, use port 6001
const PORT = process.env.PORT || 6001;
//Connecting to mongo database from node server using our MONGO_URL
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//If it works, we will console log the port
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //ONLY RUN ONCE
    // User.insertMany(users);
    // Post.insertMany(posts);
})
//If it doesnt work, we will console log an error
.catch((error) => console.log(`${error} did not connect`));