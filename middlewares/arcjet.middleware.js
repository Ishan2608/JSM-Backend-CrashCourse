import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req, {requested: 1});
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({err: "Rate Limit Exceeded"});
            if(decision.reason.isBot()) return res.status(403).json({err: "Bot Detected"});

            return res.status(403).json({error: "Access Denied"});
        }
        next();
    }
    catch (err){
        console.log('Arcjet');
        next(err);
    }
}

export default arcjetMiddleware;