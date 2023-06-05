import express from "express";
import user_cont from "../Controllers/user_controller.js";

const route = express.Router();



//Adding the data POST metod
route.post("/register", user_cont)

//export default route;    // //you can use as register route technique or can make an addition folder as controllers and write all the route part in controllers as defined