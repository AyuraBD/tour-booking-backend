import { NextFunction } from "express";
import { Event } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getEvent = async(userId: string, paramId:string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId
    },
    select:{
      id: true,
      userId: true
    }
  });
  const tourData = await prisma.tour.findFirst({
    where:{
      id:paramId
    },
    select:{
      id: true,
      operatorId: true
    }
  });

  if(operatorData.id !== tourData?.operatorId){
    throw new Error("You are not allowed to get events of the tour");
  }
  return await prisma.event.findMany({
    where:{
      tourId: tourData.id
    }
  });
}

const createEvent = async(data: Omit<Event, 'id'>, userId:string, paramId: string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId
    },
    select:{
      id: true,
      userId: true
    }
  });
  const tourData = await prisma.tour.findUniqueOrThrow({
    where:{
      id:paramId
    },
    select:{
      id: true,
      operatorId: true
    }
  });
  if(operatorData.id !== tourData.operatorId){
    throw new Error("You can not create event of the tour.");
  }
  return await prisma.event.create({
    data:{
      ...data,
      operatorId: operatorData.id,
      tourId: tourData.id
    }
  })
}

const updateEvent = async(data: Partial<Event>, userId:string, paramId: string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId
    },
    select:{
      id: true,
      userId: true
    }
  });
  const eventData = await prisma.event.findUniqueOrThrow({
    where:{
      id:paramId
    },
    select:{
      id: true,
      operatorId: true
    }
  });
  if(operatorData.id !== eventData.operatorId){
    throw new Error("You can not update the event");
  }
  return await prisma.event.update({
    where:{
      id: eventData.id
    },
    data
  })
}

const deleteEvent = async(userId:string, paramId: string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId
    },
    select:{
      id: true,
      userId: true
    }
  });
  const eventData = await prisma.event.findUniqueOrThrow({
    where:{
      id:paramId
    },
    select:{
      id: true,
      operatorId: true
    }
  });
  if(operatorData.id !== eventData.operatorId){
    throw new Error("You can not delete the event");
  }
  return await prisma.event.delete({
    where:{
      id: eventData.id
    }
  })
}

export const eventService = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}