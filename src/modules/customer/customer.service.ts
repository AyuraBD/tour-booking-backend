import { Customer } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getCustomer = async(id:string)=>{
  const userData = await prisma.user.findUniqueOrThrow({
    where:{
      id
    },select:{
      id: true
    }
  })
  if(userData?.id !== id){
    throw new Error("Forbidden")
  }
  return await prisma.customer.findUniqueOrThrow({
    where:{
      userId: userData?.id
    }
  })
}

const createCustomer = async(data:Omit<Customer, 'id'>, userId: string)=>{
  const userData = await prisma.user.findUniqueOrThrow({
    where:{
      id: userId
    },select:{
      id: true
    }
  });
  if(userData?.id !== userId){
    throw new Error("Forbidden");
  }
  return await prisma.customer.create({
    data:{
      ...data,
      userId: userData.id
    }
  });
}

const updateCustomer = async(data:Partial<Customer>, userId: string)=>{
  const userData = await prisma.user.findUniqueOrThrow({
    where:{
      id: userId
    },select:{
      id: true
    }
  });
  if(userData?.id !== userId){
    throw new Error("Forbidden");
  }
  return await prisma.customer.update({
    where:{
      userId:userData.id
    },data:{
      ...data
    }
  });
}

export const customerServices = {
  getCustomer,
  createCustomer,
  updateCustomer
}