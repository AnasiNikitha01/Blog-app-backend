import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
import { connect_database } from './Database/connection.js';
import cookieParser from 'cookie-parser';
import Loginroute from './Routes/loginRout.js';
import Register_route from './Routes/registerRoute.js';
import profile_user from './Routes/Profile.js';
import logout from './Routes/Logout.js';
import createPost from './Routes/CreatedPosts.js';
import userPost from './Routes/Userposts.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import singlePost from './Routes/SinglePost.js';
import delete_post from './Routes/DeletePost.js';
import edit from './Routes/EditPost.js';



const app = express();

app.use(express.json());  //parsing the json data 

app.use(cookieParser());

app.use(cors({credentials:true , origin: "http://localhost:3001"}));  //for cors error importing as a middleware


const __filename = fileURLToPath(import.meta.url);// configurations to do changes in ES version for dirname
const __dirname = dirname(__filename);
app.use('/Uploads',express.static(__dirname+'/Uploads')); //getting files from backend to frontend

dotenv.config();  //.env config  

const port = process.env.PORT || 5000;  //port number from .env file


connect_database(); //database connection


app.use(Register_route);  //Adding the data POST metod for register

app.use(Loginroute); //Adding the data POST metod for login

app.use(profile_user); // getting the user info with cookies and storing it in the frontend

app.use(logout); //for logout the user 

app.use(createPost); //posting all the values of the form

app.use(userPost);  //getting all the post to display on frontend

app.use(singlePost);  //displaying single posts 

app.use(delete_post); //delete post from db

app.use(edit); //updates the post 

//starting the port
app.listen(port, () => {
    console.log(`listening to ${port}`)
})


