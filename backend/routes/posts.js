const express = require('express');
const router = express.Router();
const Post = require("../models/Post");

//GET tutti i post
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        // Aggiungi il filtro per autore se presente
        const filter = req.query.author ? { author: req.query.author } : {};

        // Conta il totale dei post
        const totalPosts = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        // Ottieni i post paginati
        const posts = await Post.find(filter)
            .populate("author", "firstName lastName")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Ordina per data di creazione, più recenti prima

        res.json({
            posts,
            currentPage: page,
            totalPages,
            totalPosts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({error: error.message});
    }
});

//POST
router.post("/", async (req, res) => {
    try {
        const {title, category, cover, content, readTime, author} = req.body;
        
        // Validate required fields
        if (!title || !category || !content || !author) {
            return res.status(400).json({ 
                message: "Title, category, content and author are required" 
            });
        }

        const newPost = new Post({
            title,
            category,
            cover,
            content,
            readTime,
            author
        });

        const savedPost = await newPost.save();
        
        // Populate author details before sending response
        const populatedPost = await savedPost.populate("author", "firstName lastName");
        
        res.status(201).json(populatedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ 
            message: "Error creating post", 
            error: error.message 
        });
    }
});

//PUT
router.put('/:id', async (request, respones) => {
    try {
        const {title, category, cover, content, readTime} = request.body;
        const post = await Post.findByIdAndUpdate(request.params.id, {
            title,
            category,
            cover,
            content,
            readTime
        });

        if(!post) {
            return response.status(404).json({message : "Post non trovato"});
        }
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

//DELETE
router.delete('/:id', async (request, response) => {
    try {
        const post = await Post.findByIdAndDelete(request.params.id);
        if(!post){
            return response.status(404).json({message: "Post non trovato"});
        }
        response.json({message: "Post eliminato"});
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});



module.exports = router;