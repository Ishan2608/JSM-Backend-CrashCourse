import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({...req.body, user: req.user._id});

        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers:{
                'content-type': 'application/json'
            },
            retries: 0,
        })
        return res.status(201).json({success:true, message: 'Subscription Created', data: {subscription, workflowRunId}});
    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        /*
        You do not use req.user._id because it returns the ObjectId. 
        Here, we need a string version of that ID. Where we are making references,
        we use req.user._id since reference can be made using ObjectId only 
        and not just string version of ID.
        */ 
        if(req.user.id !== req.params.id){
            const err = new Error("You are not the owner of this account");
            err.status = 401;
            throw err;
        }

        const subscriptions = await Subscription.find({user: req.params.id});
        return res.status(200).json({success: true, message: "Subscriptions Fetched", data: subscriptions});
    } catch (error) {
        next(error)
    }
}

export const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const err = new Error("Subscription not found");
            err.statusCode = 404;
            throw err;
        }
        
        if(subscription.user.toString() !== req.user._id.toString()){
            const err = new Error("You are not the owner of this subscription");
            err.statusCode = 401;
            throw err;
        }

        return res.status(200).json({success: true, message: "Subscription fetched", data: subscription});
    } catch (error) {
        next(error);
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        let subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const err = new Error("Subscription not found");
            err.statusCode = 404;
            throw err;
        }
        
        if(subscription.user.toString() !== req.user._id.toString()){
            const err = new Error("You are not the owner of this subscription");
            err.statusCode = 401;
            throw err;
        }

        subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        return res.status(200).json({success: true, message: "Subscription updated", data: subscription});
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const err = new Error("Subscription not found");
            err.statusCode = 404;
            throw err;
        }
        
        if(subscription.user.toString() !== req.user._id.toString()){
            const err = new Error("You are not the owner of this subscription");
            err.statusCode = 401;
            throw err;
        }

        await Subscription.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: "Subscription deleted"});
    } catch (error) {
        next(error);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const err = new Error("Subscription not found");
            err.statusCode = 404;
            throw err;
        }
        
        if(subscription.user.toString() !== req.user._id.toString()){
            const err = new Error("You are not the owner of this subscription");
            err.statusCode = 401;
            throw err;
        }

        if(subscription.status === 'cancelled'){
            const err = new Error("Subscription is already cancelled");
            err.statusCode = 400;
            throw err;
        }

        subscription.status = 'cancelled';
        await subscription.save();
        return res.status(200).json({success: true, message: "Subscription cancelled", data: subscription});
    } catch (error) {
        next(error);
    }
}

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const today = new Date();
        const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        const subscriptions = await Subscription.find({
            user: req.user._id,
            status: 'active',
            renewalDate: {
                $gte: today,
                $lte: thirtyDaysFromNow
            }
        }).sort({renewalDate: 1});

        return res.status(200).json({success: true, message: "Upcoming renewals fetched", data: subscriptions});
    } catch (error) {
        next(error);
    }
}