const express = require('express');

const userModel = require('../models/user.model');  

const router = express.Router();

// Define your routes here



router.post('/', async (req, res) => {
    // Logic to send email
    let {email} = req.body; 
    try{
        let user = await userModel.findOne({email})
    if(user){
         return res.json({
            message: "Email already exists",
            status:"exists"
        })
    };
    let newUser = await userModel.create({email});
    res.json({
        message: "Email added successfully",
        status:"success",
        data: newUser
    });
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            status:"error"
        });
    }
});

module.exports = router;