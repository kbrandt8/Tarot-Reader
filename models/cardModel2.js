import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    num:{
        type:Number,
        required:false
    },
    upright:{
        type:String,
        required:true,
    },
    reversed:{
        type:String,
        required:true,
    },
   isReversed: {
        type: Boolean,
        default:
            Math.floor(Math.random() * 10) > 4 ? true : false
        
    }

})

const Card2 = mongoose.model("cards2",CardSchema)
export default Card2