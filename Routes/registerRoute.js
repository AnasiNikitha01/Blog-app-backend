import express from "express";
import Users from "../Models/user_model.js";
import bcrypt from "bcryptjs"

const Register_route = express.Router();

//bcrypt defination random code
const salt = bcrypt.genSaltSync(10);

Register_route.post("/register", async (req, res) => {

    const { Name, Email, password } = req.body;
    // res.json('hello')
    try {
        let userProfile = await Users.create({
            Name: Name,
            Email: Email,
            // password:password
            password: bcrypt.hashSync(password,salt)  //password hashing
        });

        
        res.json(userProfile);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

export default Register_route;