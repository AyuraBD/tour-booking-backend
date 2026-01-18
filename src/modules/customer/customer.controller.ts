import { NextFunction, Request, Response } from "express"
import { customerServices } from "./customer.service";

const getCustomer = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const id = req.user?.id;
    const result = await customerServices.getCustomer(id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const createCustomer = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await customerServices.createCustomer(req.body, req?.user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const updateCustomer = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await customerServices.updateCustomer(req.body, req?.user?.id as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

export const customerController = {
  getCustomer,
  createCustomer,
  updateCustomer
}