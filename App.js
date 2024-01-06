import express from "express";
import cors from "cors";
import route from "./Router/Route.js"
import dataBaseConnect from "./config/dataBaseConnection.js"
import cookieParse from "cookie-parser";
const app = express();
app.use(cors({
    origin: "*"
}));
dataBaseConnect();
const PORT = process.env.PORT || 5001;

//App Setup 
app.listen(PORT, function () {
    console.log("server is listening at port", PORT);
})
app.use(express.json()) // to accept json data
app.use(cookieParse());
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "working properly"
    })
})
app.use("/route", route);