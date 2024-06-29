const app = require("./app")
const dotenv=require("dotenv");
const connectDatabase = require("./config/database")
const path = require("path")


//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//Config
// dotenv.config({path:"./config/config.env"})
let filePath = path.join(__dirname, `.env`);
let result = dotenv.config({ path: filePath });
if (result.error) {
    console.log(result.error);
    process.exit(0);
  }

//connecting database
connectDatabase();


const server= app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT} `)
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
});


