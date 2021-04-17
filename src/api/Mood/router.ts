import { Request, Response, Router } from 'express';

const router = Router();

export const moodRouteHandler = ()=>{}

const addMood = async(req:Request, res:Response)=>{
    try {
        let data = await setToken(req.query);
        res.json({ success: true, token: generateJwt(data.email), name: data.name.split(' ')[0] });
      } catch (error) {
        LoggerInstance.error(error);
        res.status(500).json({ success: false, message: error.message });
      }
}