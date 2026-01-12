import {Router} from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSubscription, getAllSubscriptions, getSubscription, updateSubscription, deleteSubscription, cancelSubscription, getUpcomingRenewals } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions);

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

subscriptionRouter.get('/:id', authorize, getSubscription);

// CREATE a subscription
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', authorize, deleteSubscription);

// GET subscriptions of the logged in user
subscriptionRouter.get('/user/:id', authorize, getAllSubscriptions);

subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;