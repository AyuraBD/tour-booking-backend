import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum UserRole{
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  OPERATOR = "OPERATOR",
}
declare global{
  namespace Express{
    interface Request{
      user?:{
        id: string;
        email: string;
        role: string;
        emailVerified: boolean;
      }
    }
  }
}
const authMiddleware = (...roles: UserRole[])=>{
  return async(req: Request, res: Response, next: NextFunction)=>{
    try{
      const authSession = await auth.api.getSession({
        headers: req.headers as any
      });
      if(!authSession){
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        })
      }
      if(!authSession.user.emailVerified){
        return res.status(401).json({
          success: false,
          message: "Your email isn't verified"
        })
      }
      req.user = {
        id: authSession.user.id,
        email: authSession.user.email,
        role: authSession.user.role as string,
        emailVerified: authSession.user.emailVerified
      }
      
      if(roles.length && !roles.includes(req.user.role as UserRole)){
        return res.status(401).json({
          success: false,
          message: "Forbidden access"
        })
      }
      next();
      
    }catch(err:any){
      next(err);
    }
  }
}


export default authMiddleware;