import { NextFunction, Request, Response } from "express";
import {tourService } from "./tour.service";

const getTour = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await tourService.getTour(userId);
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
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await tourService.createTour(req.body, userId);
    res.status(201).json({
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
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!paramId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: paramId is required"
      });
    }
    const result = await tourService.updateTour(req.body, userId, paramId as string);
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
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (!paramId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: paramId is required"
      });
    }
    const result = await tourService.deleteTour(userId, paramId as string);
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