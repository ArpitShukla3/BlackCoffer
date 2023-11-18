import express from "express";
const app=express();
import route from "./Router/Route.js"
import dataBaseConnect from "./config/dataBaseConnection.js"
import cookieParse from "cookie-parser";
import cors from "cors";
const urlEncoded = express.urlencoded;
dataBaseConnect();
app.use(express.json());
app.use(cookieParse());
const PORT=5001;
app.use(cors({
    orgin:"http://localhost:5173",
    credentials:true
}))
app.use("/",route);
export default app;
app.listen(PORT,()=>
{
    console.log("Server is listening at port: "+PORT);
})   