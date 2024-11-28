import mongoose from "mongoose";
const Schema=mongoose.Schema;

const link=new Schema({
    hash:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
     unique:true
    }
})
export const LinkModel=mongoose.model("link",link);