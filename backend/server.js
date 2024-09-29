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
// let filePath = path.join(__dirname, `.env`);
// let result = dotenv.config({ path: filePath });
// if (result.error) {
//     console.log(result.error);
//     process.exit(0);
//   }
dotenv.config(); // Let Render environment handle the PORT

//connecting database
connectDatabase();


// const server= app.listen(process.env.PORT, ()=>{
//     console.log(`Server is working on http://localhost:${process.env.PORT} `)
// })
const PORT = process.env.PORT || 8080;

const server= app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
});


