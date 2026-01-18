import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

const errorHandler = (err:any, req:Request, res: Response, next: NextFunction)=>{
  if(res.headersSent){
    return next(err);
  }
  let statusCode = 500;
  let errorMessage = "Internal server error";
  let errorDetails = err;
  if(err instanceof Prisma.PrismaClientValidationError){
    statusCode = 400;
    errorMessage = "You provided incorrect field or missing fields";
    errorDetails = err;
  }else if(err instanceof Prisma.PrismaClientKnownRequestError){
    if(err.code === "P2025"){
      statusCode = 400;
      errorMessage = 'An operation failed because it depends on one or more records that were required but not found'
    }else if(err.code === 'P2002'){
      statusCode = 400;
      errorMessage = 'Unique constraint failed on the {constraint}'
    }else if(err.code === 'P2003'){
      statusCode = 400;
      errorMessage = 'Foreign key constraint failed on the field'
    }
  } else if(err instanceof Prisma.PrismaClientUnknownRequestError){
    statusCode = 5000;
    errorMessage = 'Engine is not connected.';
  }else if(err instanceof Prisma.PrismaClientRustPanicError){
    statusCode = 5000;
    errorMessage = 'Engine crashed';
  }else if(err instanceof Prisma.PrismaClientInitializationError){
    if(err.errorCode === 'P1000'){
      statusCode = 4001;
      errorMessage = 'Authentication failed. Please check you credentials.';
    }if(err.errorCode === 'P1001'){
      statusCode = 4001;
      errorMessage = 'Cant reach database server';
    }
  }

  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  })
}

export default errorHandler;