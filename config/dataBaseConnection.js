import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
async function dataBaseConnect(){
     //connecting with hotel database
     const Url= process.env.Url;
     try { 
        await mongoose.connect(Url)
        console.log("connected");
    } catch (error) { 
        console.log("Error occurred due to  "+error);
    }
      
} 

dataBaseConnect();
export default dataBaseConnect;