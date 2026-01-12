import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {name, email, password} = req.body;

        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error = new Error('User Already Exists');
            error.statusCode = 409;
            throw error;
        }
        else{
            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUsers = await User.create([{name, email, password: hashedPassword}], {session});

            const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                success: true,
                message: "User created successfully",
                data:{ token: token, user: newUsers[0] }
            })
        }
    }
    catch (err){
        await session.abortTransaction();
        session.endSession();
        next(err)
    }
}
export const login = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // try{

    //     await session.commitTransaction();
    // }
    // catch (err){
    //     await session.abortTransaction();
    //     session.endSession();
    //     next(err)
    // }
}
export const logout = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // try{

    //     await session.commitTransaction();
    // }
    // catch (err){
    //     await session.abortTransaction();
    //     session.endSession();
    //     next(err)
    // }
}