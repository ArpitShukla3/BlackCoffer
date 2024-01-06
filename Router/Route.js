import express from "express";
const route = express.Router();
import {querySearch, distinctType } from "../Controller/Controller.js"
route.get('/', (req, res) => {
    return res.status(200).json({
        message: "good to see you"
    })
})
route.get("/query", querySearch)
route.get("/search", distinctType)

export default route;      