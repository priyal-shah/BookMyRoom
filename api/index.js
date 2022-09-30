import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
// im libraries we don't need extension but in files we need to add extension
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

//to hide secret key
dotenv.config();

//to connect to mongodb || call this function to connect in listen function
const connect = async()=> {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mpongodb")
    }catch(error){
        throw error
    }
};

//if mongodb not connected then this function will execute
mongoose.connection.on("disconnect", ()=>{
    console.log("mongoDB disconnected")
})

//middleware || used to use paths/ routes from this page
// api/auth defines path

app.use(cors());
app.use(cookieParser());
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage = err.message || "Somthing went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    connect()
    console.log("connected to backend!`");
});
