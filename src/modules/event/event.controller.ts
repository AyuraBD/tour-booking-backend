import { NextFunction, Request, Response } from "express";
import { eventService } from "./event.service";

const getEvent = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {paramId} = req.params;
    const result = await eventService.getEvent(user?.id as string, paramId as string);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

const createEvent = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {paramId} = req.params;
    const data = req.body;
    const result = await eventService.createEvent(data, user?.id as string, paramId as string);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

const updateEvent = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {paramId} = req.params;
    const data = req.body;
    const result = await eventService.updateEvent(data, user?.id as string, paramId as string);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

const deleteEvent = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {paramId} = req.params;
    const result = await eventService.deleteEvent(user?.id as string, paramId as string);
    res.status(200).json({
      success: true,
      data: result
    });
  }catch(err:any){
    next(err);
  }
}

export const eventController = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}