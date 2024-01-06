import express from "express";
const route = express.Router();
import { getUserbyID, oneUserDetail, userCreation, updateUser, filter, querySearch, distinctType } from "../Controller/Controller.js"
route.get('/', (req, res) => {
    return res.status(200).json({
        message: "good to see you"
    })
})
// route.post("/getUserByID", getUserbyID)
// route.post(`/createUser`, userCreation)
// route.get(`/filter`, filter)
// route.post(`/updateUser/:id`, updateUser)
// route.get(`/:id`, oneUserDetail)
route.get("/query", querySearch)
route.get("/search", distinctType)

export default route;      