import express from "express";

const logout = express.Router();

logout.post('/logout',(req,res)=>{
    res.cookie('token','').json('OK');  //instead of the info send empty token to make no info
});

export default logout;