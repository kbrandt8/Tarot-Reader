import mongoose from "mongoose"
const ReadingSchema = new mongoose.Schema({
    title: { type: String },
    date: { type: String },
    cards: { type: Array },
    notes:{type:String}
})

const UserModel = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    readings:[ReadingSchema]
},
{collection:'users'})

const User = mongoose.model('Users',UserModel)
const Readings = mongoose.model('Readings', ReadingSchema)

export {User,Readings}