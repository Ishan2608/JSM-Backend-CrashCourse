import {Router} from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSubscription, getAllSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({message: "GET All subscriptions"});
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({message: "GET a subscriptions"});
})

// CREATE a subscription
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({message: "Update a subscription"});
})
subscriptionRouter.delete('/:id', (req, res) => {
    res.send({message: "DELETE a subscription"});
})

// GET subscriptions of the logged in user
subscriptionRouter.get('/user/:id', authorize, getAllSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({message: "CANCEL a subscription"});
})
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({message: "GET upcoming renewals subscription"});
})

export default subscriptionRouter;