import { Operator } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getOperator = async(id:string)=>{
  const result = await prisma.operator.findUniqueOrThrow({
    where:{
      userId: id
    },
    select:{
      userId: true
    }
  })
  if(result.userId !== id){
    throw new Error("Forbidden access")
  }
  return await prisma.operator.findFirstOrThrow({
    where: {
      userId: id
    }
  })
}

const createOperator = async(data:Omit<Operator, 'id'>, id: string)=>{
  const operatorData = await prisma.user.findUniqueOrThrow({
    where:{
      id
    },
    select:{
      id:true,
      role: true
    }
  });
  if(operatorData.id !== id && operatorData.role === "OPERATOR"){
    throw new Error("Forbidden");
  }
  return await prisma.operator.create({
    data:{
      ...data,
      userId: operatorData.id
    }
  });
}

const updateOperator = async(data:Partial<Operator>, id: string)=>{
  const operatorData = await prisma.operator.findUniqueOrThrow({
    where:{
      userId:id
    },
    select:{
      id:true,
      userId: true
    }
  });
  if(operatorData.userId !== id){
    throw new Error("Forbidden");
  }
  return await prisma.operator.update({
    where:{
      id: operatorData.id
    },
    data
  });
}

export const operatorService = {
  getOperator,
  createOperator,
  updateOperator
}