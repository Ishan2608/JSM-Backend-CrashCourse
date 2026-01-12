import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({message: "GET All subscriptions"});
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({message: "GET a subscriptions"});
})
subscriptionRouter.post('/', (req, res) => {
    res.send({message: "CREATE a subscription"});
})
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