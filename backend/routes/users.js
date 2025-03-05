const express = require('express');
const router = express.Router();
const User = require("../models/User"); // Correct import with require

//GET
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); //excludes password field
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message}) // Use error instead of err
    }
});

//POST registrazione
router.post("/register", async(req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password
        });
        
        await newUser.save();
        
        // Remove password before sending response
        const userResponse = newUser.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//POST login
router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}); // Use await
        
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        if(user.password !== password){
            return res.status(401).json({message: "Incorrect password"});
        }
        
        // Remove password before sending response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.json(userResponse);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;