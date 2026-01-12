import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    console.log("On sign-up Route");
    return res.send({message: "On Sign-Up Route"});
})
authRouter.post('/log-in', (req, res) => {
    console.log("On log-in Route");
    return res.send({message: "On Log-In Route"});
})
authRouter.post('/log-out', (req, res) => {
    console.log("On log-out Route");
    return res.send({message: "On Log-Out Route"});
})

export default authRouter;