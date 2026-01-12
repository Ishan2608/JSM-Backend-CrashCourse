import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from '../config/env.js';

if (!DB_URI){
    throw new Error('Please define a DB_URI environment variable in .env.<development/production>.local');
}

const connectToDB = async () =>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connect to DB in ${NODE_ENV} mode`);
    }
    catch (err) {
        console.log("Error occured in connecting to MongoDB Atlas: ", err);
    }
}

export default connectToDB;