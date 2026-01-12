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

export const updateUser = async (req, res, next) => {
    try{
        if(req.user.id !== req.params.id){
            const err = new Error("You are not the owner of this account");
            err.statusCode = 401;
            throw err;
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).select('-password');
        if(!user){
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        return res.status(200).json({success: true, message: "User updated", data: user});
    }
    catch(err){
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        if(req.user.id !== req.params.id){
            const err = new Error("You are not the owner of this account");
            err.status = 401;
            throw err;
        }
        else{
            const deleted = User.deleteOne({email: req.user.email});
            return res.status(201).json({success: true, message: "User deleted", data: deleted});
        }
    }
    catch(err){
        next(err);
    }
}