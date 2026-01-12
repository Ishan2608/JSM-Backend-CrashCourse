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