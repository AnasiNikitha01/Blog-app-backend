import express from "express";
import Posts_model from "../Models/post_model.js";
import multer from "multer";
import JsonWebToken from "jsonwebtoken";
    
const edit = express.Router();

const upload = multer({ dest: '\Uploads'}) //uploading files to seperate file


edit.put('/post',upload.single('files'),async(req,res)=>{
    let newPath = null;
   if(req.file){
    const {originalname,path} = req.file;

    const divide = originalname.split('.');  //removing the extention of the file and attaching it the files saved in uploads

    const File_extension = divide[divide.length -1];  

    newPath = path+'.'+File_extension;
    
    fs.renameSync(path, newPath);  //to rename the file with extention
   }


   const {token} = req.cookies;
   const {id,title,summary} = req.body;
   JsonWebToken.verify(token, process.env.Secrete_Key, {},async (err,info)=>{

    const postDoc = await Posts_model.findById(id);
    const isAuthor =JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if(!isAuthor){
       return res.status(400).json("You are not the user");
    }

    const post_update = await postDoc.updateOne({
        title,
        summary,
        files: newPath? newPath : postDoc.files,
    })
    
  res.json(post_update);
   })
})

export default edit;