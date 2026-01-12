import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true, message: "Users found", data: users
        })
    } catch (err){
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            const err = new Error("User not Found");
            err.statusCode = 404;
            throw err;
        }
        res.status(200).json({
            success: true, message: "This user found", data: user
        })
    } catch (err){
        next(err)
    }
}

export const createUser = async (req, res, next) => {}

export const updateUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            const err = new Error("User not Found");
            err.statusCode = 404;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            const err = new Error("User not Found");
            err.statusCode = 404;
            throw err;
        }
    }
    catch(err){
        next(err);
    }
}