import express from "express";
import multer from "multer";
import fs from "fs";
import Posts_model from "../Models/post_model.js";
import JsonWebToken from "jsonwebtoken";

const upload = multer({ dest: '\Uploads'}) //uploading files to seperate file


const createPost = express.Router();

createPost.post('/post',upload.single('files'),async(req,res)=>{
    const {originalname,path} = req.file;

    const divide = originalname.split('.');  //removing the extention of the file and attaching it the files saved in uploads

    const File_extension = divide[divide.length -1];  

    const newPath = path+'.'+File_extension;
    
    fs.renameSync(path, newPath);  //to rename the file with extention
 
    const {title,summary,username} = req.body;

   const cleanedResponse = summary.replace(/<\/?p>/g, "");

   const {token} = req.cookies;
    JsonWebToken.verify(token, process.env.Secrete_Key, {},async (err,info)=>{
       if (err) throw err;
         
         //creating DB for posts
   try{ 
      const Post_Doc = await Posts_model.create({
           title,
           summary:cleanedResponse,
           username,
           files:newPath,
           author:info.id,
       });
       
   
    } catch (error) {
       console.log(error)
       res.status(400).json(error);
    }
   

        res.json(info)
    })


  


});

export default createPost; 