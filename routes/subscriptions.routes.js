import {Router} from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';

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
subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({message: "CANCEL a subscription"});
})
subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({message: "GET upcoming renewals subscription"});
})

export default subscriptionRouter;