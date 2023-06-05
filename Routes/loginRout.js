import express from "express";
import Users from "../Models/user_model.js";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";

const Loginroute = express.Router();


Loginroute.post('/login',async(req,res)=>{
    const {  Email, password } = req.body;
    try{
    const findUser = await Users.findOne({Email});
    const userPass = bcrypt.compareSync(password,findUser.password);

    if(userPass){
        //JWT token 
        JsonWebToken.sign({Email,id:findUser._id},process.env.Secrete_Key,{},(err,token)=>{
            if(err) throw err;
                res.cookie('token',token).json({
                    id:findUser._id,
                    Email
                });//send the info as the response helps during login procees
                console.log(token);
            
        });
    }
    else{
        res.status(400).json("incorrect password")
    }

}
catch(error){
    console.log(error)
    res.status(400).json(error)
}

});

export default Loginroute;










