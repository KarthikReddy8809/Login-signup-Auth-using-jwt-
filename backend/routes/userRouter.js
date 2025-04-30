const express = require('express');
const { use } = require('..');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const userRouter=express.Router();  
const UserModel=require("../models/userModel")


userRouter.post("/signup",async(req,res)=>{
    try{

    
    const {name,email,password}=req.body
    const existingUser=await UserModel.find({email})
    if(existingUser.length>0){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    await UserModel.create({
        name,
        email,
        password:hashedPassword
    })  
    res.status(200).json({
        message:"User created successfully"
    })
}catch(err){
    res.status(401).json({
        message:err.message
    })
}
})
const JWT_SECRET="user"

userRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log(email,password);
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User not found"
            }) 
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1h"})
        console.log(token);
        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                name:user.name,
                email:user.email
            }
        })
    }catch(err){
        res.status(401).json({
            message:err.message
        })
    }
})


module.exports={
    userRouter
}