import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try{
    prisma.$connect();
    app.listen(PORT, ()=>{
      console.log(`Express server is running on port: ${PORT}`)
    })
  }catch(err:any){
    console.log("An error occured:", err.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();