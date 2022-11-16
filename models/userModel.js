import mongoose from "mongoose"


const ReadingSchema = new mongoose.Schema({
    title: Array,
    date: String,
    cards: Array,
    notes: String,
})
const UserModel = new mongoose.Schema({
    name:{type:String,required:true},
    birthDate:Date,
    email:{type:String,required:true},
    password:{type:String,required:true},
    readings:[ReadingSchema]
},
{collection:'users'})

const User = mongoose.model('Users',UserModel)
const Reading = mongoose.model('Readings', ReadingSchema)

export {User,Reading}