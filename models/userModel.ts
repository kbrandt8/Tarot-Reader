import mongoose from "mongoose"
import { ReadingSchema } from "./reading"
const UserModel = new mongoose.Schema({
    name:{type:String,required:true},
    birthDate:Date,
    email:{type:String,required:true},
    password:{type:String,required:true},
    readings:[ReadingSchema]
},
{collection:'users'})
const User = mongoose.models.User ?? mongoose.model('User',UserModel)

export default User