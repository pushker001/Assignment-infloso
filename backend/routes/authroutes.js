const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const bcrypt = require('bcryptjs');

const router = express.Router();

// Creating a signup route

router.post('/signup', async(req, res) => {
    const {username, email, password} = req.body;

    try {
        //logic to check first user exists or not
        const exisitngUser = await User.findOne({email});

        if(exisitngUser){
            return res.status(400).json({message: "User already exists"});
        }

        //hashing password
        const hashpass = await bcrypt.hash(password, 12);

        //Saving the new user
        const newUser = new User({
            username,
            email,
            password: hashpass
        })
        await newUser.save();

        //generating the jwt token

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      
        res.status(500).json({ error: "Server error" });

        
    }
})

//Creating a login route

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
  
      // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  module.exports = router;