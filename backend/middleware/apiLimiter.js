import rateLimit from "express-rate-limit";
import { systemLogs } from "../utils/Logger";

//api limiter

export const apiLimiter =  rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:{
        message:'To many login requests from this Ip address , please try again after  30 minutes'
    },
    handler:(req, res, next, options) => {
        systemLogs.error(
            `To many requests : ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
        )


        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true,
    legacyHeaders:true,

    
})

//limit login requests

export const loginLimiter =  rateLimit({
    windowMs:30*60*1000,
    max:20,
    message:{
        message:'To many requests from this AIp address , please try again after  15 minutes'
    },
    handler:(req, res, next, options) => {
        systemLogs.error(
            `To many requests : ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
        )


        res.status(options.statusCode).send(options.message)
    },
    standardHeaders:true,
    legacyHeaders:true,

    
})
