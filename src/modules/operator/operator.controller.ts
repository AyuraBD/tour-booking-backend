import { NextFunction, Request, Response } from "express";
import { operatorService } from "./operator.service";

const getOperator = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const result = await operatorService.getOperator(userId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const createOperator = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const result = await operatorService.createOperator(req.body, userId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const updateOperator = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const result = await operatorService.updateOperator(req.body, userId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

export const operatorController = {
  getOperator,
  createOperator,
  updateOperator
}