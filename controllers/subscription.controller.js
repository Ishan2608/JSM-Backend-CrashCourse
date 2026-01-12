import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({...req.body, user: req.user._id});
        return res.status(201).json({success:true, message: 'Subscription Created', data: subscription});
    } catch (error) {
        next(error);
    }
}