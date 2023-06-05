import express from "express";
import Posts_model from "../Models/post_model.js";

const singlePost = express.Router();

singlePost.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const post_id = await Posts_model.findById(id);
    res.json(post_id);
})

export default singlePost;