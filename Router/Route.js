import express from "express";
const route=express.Router();
 import {getUserbyID, oneUserDetail,userCreation,updateUser} from "../Controller/Controller.js"
route.post("/getUserByID",getUserbyID)
route.post(`/createUser`,userCreation)
route.post(`/updateUser/:id`,updateUser)
route.get(`/:id`,oneUserDetail)

export default route;     