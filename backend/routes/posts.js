const express = require('express');
const router = express.Router();
const User = "../models/User";

//GET tutti i post
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "firstName lastName"); //popoliamo i campi dell'autore
        res.json(posts);
    } catch (error) {
        res.status(500).json({error: err.message})
    }
});

//GET per l'id
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "firstName lastName");
        if(!post){
            return res.status(404).json({message: "Post non trovato"})
        }
        res.json(post);
    } catch (error) {   
        res.status(500).jsom({error: err.message});
    }
});

//POST
router.post("/", async (req,res) => {
    const {title, category, cover, content, readTime} = req.body;
    const newPost = await Post({
        title,
        category,
        cover,
        content,
        readTime
    });
    await newPost.save();
    res.status(201).json(newPost);
});

module.exports = router;