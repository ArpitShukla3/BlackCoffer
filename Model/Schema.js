import mongoose from "mongoose";
const {Schema}=mongoose;
const Heliverse=new Schema({
    
id:{},
first_name:{},
last_name:{},
email:{},
gender:{},
avatar:{},
domain:{},
available:{},
false:{}
});
   
const heliverse=mongoose.model("Heliverse",Heliverse);
export default heliverse; 