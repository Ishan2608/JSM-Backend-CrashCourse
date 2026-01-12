import {Router} from 'express';

const userRouter = Router();

userRouter.get('/',(req, res) => {
    res.send({message: "GET all users"});
})
userRouter.get('/:id',(req, res) => {
    res.send({message: "GET a users"});
})
userRouter.post('/',(req, res) => {
    res.send({message: "CREATE a users"});
})
userRouter.put('/:id',(req, res) => {
    res.send({message: "UPDATE a users"});
})
userRouter.delete('/:id',(req, res) => {
    res.send({message: "DELETE a users"});
})

export default userRouter;