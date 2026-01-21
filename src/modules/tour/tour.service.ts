import { Operator, Tour } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getTour = async(id:string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId:id
    },
    select:{
      id: true
    }
  })

  return await prisma.tour.findMany({
    where:{
      operatorId:operatorData.id
    }
  })
}

const getAllTours = async()=>{
  return await prisma.tour.findMany({})
}

const createTour = async(data:Omit<Tour, 'id'>, id: string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId:id
    },
    select:{
      id:true,
    }
  });
  return await prisma.tour.create({
    data:{
      ...data,
      operatorId: operatorData.id
    }
  });
}

const updateTour = async(data:Partial<Tour>, id: string, paramId:string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId:id
    },
    select:{
      id:true
    }
  });
  const tourData = await prisma.tour.findUniqueOrThrow({
    where:{
      id: paramId
    },
    select:{
      id:true,
      operatorId: true
    }
  });
  if(operatorData.id !== tourData.operatorId){
    throw new Error("Tour not found");
  }
  return await prisma.tour.update({
    where:{
      id: tourData.id
    },
    data:{
      ...data,
      operatorId: operatorData.id
    }
  });
}

const deleteTour = async(id: string, paramId:string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId:id
    },
    select:{
      id:true
    }
  });
  const tourData = await prisma.tour.findUniqueOrThrow({
    where:{
      id: paramId
    },
    select:{
      id:true,
      operatorId: true
    }
  });
  if(operatorData.id !== tourData.operatorId){
    throw new Error("Tour not found");
  }
  return await prisma.tour.delete({
    where:{
      id: tourData.id
    }
  });
}

export const tourService = {
  getTour,
  getAllTours,
  createTour,
  updateTour,
  deleteTour
}