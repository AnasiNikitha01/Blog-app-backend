import express from "express";
import Posts_model from "../Models/post_model.js";

const userPost = express.Router();


userPost.get('/post',async(req,res)=>{
     const Allpost =await Posts_model.find().sort({createdAt:-1}).limit(20);  //finding all posts and arranging in reverse order
     res.json(Allpost);
})

export default userPost;