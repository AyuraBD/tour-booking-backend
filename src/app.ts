import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { customerRouter } from "./modules/customer/customer.router";
import { operatorRouter } from "./modules/operator/operator.router";

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use('/customer', customerRouter);
app.use('/operator', operatorRouter);

app.get('/', (req, res)=>{
  res.send("Express server is running on.")
});

export default app;