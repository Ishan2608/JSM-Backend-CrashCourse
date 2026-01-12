import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    return res.send({message: "On Sign-Up Route"});
})
authRouter.post('/log-in', (req, res) => {
    return res.send({message: "On Log-In Route"});
})
authRouter.post('/log-out', (req, res) => {
    return res.send({message: "On Log-Out Route"});
})

export default authRouter;