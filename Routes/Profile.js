import express from "express";
import JsonWebToken from "jsonwebtoken";

const profile_user = express.Router();

profile_user.get('/profiles',(req,res)=>{
    const {token} = req.cookies;
    JsonWebToken.verify(token, process.env.Secrete_Key, {}, (err,info)=>{
        if (err) throw err;
        res.json(info);
        res.json(req.cookies);
    })
    
})

export default profile_user;