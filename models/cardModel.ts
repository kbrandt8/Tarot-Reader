import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    num: {
        type: Number,
        required: false
    },
    upright: {
        type: String,
        required: true,
    },
    reversed: {
        type: String,
        required: true,
    },
    isReversed: {
        type: Boolean,
        required: false,
    },
    title:String

})

const Card = mongoose.models.Card ?? mongoose.model("Card", CardSchema)
export default Card