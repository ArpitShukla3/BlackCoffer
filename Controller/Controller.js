import dotenv from "dotenv";
dotenv.config();
import heliverse from "../Model/Schema.js"; 
 export async function oneUserDetail(req,res){
   
    try {
        const {id}=req.params;
        const data = await heliverse.find({id:parseInt(id, 10)
        });
        return res.status(200).json({
            data:data
        }) 
       } catch (error) {
        return res.status(401).json({
            error:error
        }) 
       }

 }
 export async function getUserbyID(req,res){
   try {
    const {page}= req.body;
    if(!page)
    {
        page=1;
    }
    const data = await heliverse.find().limit(page*19).skip(page*19 -19);
    return res.status(200).json({
        data:data
    }) 
   } catch (error) {
    return res.status(401).json({
        data:error
    }) 
   }
 }
 export async function userCreation(req,res){
    try {
        const {avatar,domain,email,first_name,gender,last_name} = req.body;
        if(!avatar,!domain,!email,!first_name,!gender,!last_name) {
            return res.status(402).json({
                success:false,
                data: "enter all details"
         }) 
        }

        const foundItem = await heliverse.findOne({email});
        
        if (foundItem) {
           return res.status(404).json({
               success:false,
               message:"user exists"
           }) 
        }
        const newObj = { 
            avatar,domain,email,first_name,gender,last_name
         }
         const userInfo=new heliverse(newObj);
         const result=await userInfo.save();
         return res.status(200).json({
                success: true,
                data: "users credentials have been saved"
               })

    } catch (error) {
        return res.status(401).json({
            error:error
        }) 
    }
 }
 export async function updateUser(req,res){
    const {id}=req.params;
    try {
        const {avatar,domain,email,first_name,gender,last_name} = req.body;
        console.log(avatar,domain,email,first_name,gender,last_name)
        if(!avatar,!domain,!email,!first_name,!gender,!last_name) {
            return res.status(402).json({
                success:false,
                data: "enter all details"
         }) 
        }
        const newObj = { 
            avatar,domain,email,first_name,gender,last_name
         }
        await heliverse.findOneAndUpdate({id:parseInt(id, 10)
        },newObj);
         return res.status(205).json({
                success: true,
                data: "users credentials have been saved"
               })

    } catch (error) {
        return res.status(401).json({
            error:error
        }) 
    }
 }
 