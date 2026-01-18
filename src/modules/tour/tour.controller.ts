import { NextFunction, Request, Response } from "express";
import {tourService } from "./tour.service";

const getTour = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const result = await tourService.getTour(userId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const createTour = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const result = await tourService.createTour(req.body, userId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const updateTour = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const {paramId} = req.params;
    const result = await tourService.updateTour(req.body, userId as string, paramId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

const deleteTour = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    const {paramId} = req.params;
    const result = await tourService.deleteTour(userId as string, paramId as string);
    res.status(200).json({
      success: true,
      data: result
    })
  }catch(err:any){
    next(err);
  }
}

export const tourController = {
  getTour,
  createTour,
  updateTour,
  deleteTour
}