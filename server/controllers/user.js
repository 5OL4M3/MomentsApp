import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

export const signin = async (req, res) => {
    
    const {email, password} = req.body;

    try {
        console.log('hello');
        const existingUser = await User.findOne({email});
        
        if(!existingUser){
            console.log('email address does not exist')
            return res.status(404).json({message: 'email address does not exist'});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        {
            console.log('password is incorrect');
            if(!isPasswordCorrect) return res.status(400).json({message: 'password is incorrect'});
        }
        
        
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET, {expiresIn: '1h'});
        
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
    }
}

export const signup = async (req, res) => {
    const {email, password, firstName, lastName, passwordConfirmation} = req.body;
    
    try {
        const existingUser = await User.findOne({email});
        
        if(existingUser) return res.status(400).json({message: 'email address already exists'});
       
        if(password !== passwordConfirmation) return res.status(400).json({message: "passwords do not match."});
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET, {expiresIn: '1h'});

        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'something went wrong'});
    }
}

const router = express.Router();