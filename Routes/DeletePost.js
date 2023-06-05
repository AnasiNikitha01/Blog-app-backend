import express from "express";
import Posts_model from "../Models/post_model.js";

const delete_post = express.Router();


delete_post.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;        
  
    try {
      const deletedPost = await Posts_model.findByIdAndDelete(id);
      
      if (deletedPost) {
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {  
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default delete_post;   