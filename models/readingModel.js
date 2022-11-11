import mongoose from "mongoose"

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

})
const oneCardSchema = new mongoose.Schema({

        title: {type:String,default:"One Card"},
        card: [CardSchema]
})
const threeCardSchema = new mongoose.Schema({
    cardOne: {
        title: {type:String,default:"Past"},
        card: [CardSchema]
    },
    cardTwo: {
        title: {type:String, default:"Present"},
        card: [CardSchema]
    },
    cardThree: {
        title: {type:String,default:"Future"},
        card: [CardSchema]
    }

})
const fourCardSchema = new mongoose.Schema({
    cardOne: {
        title: {type:String,default:"Question"},
        card: [CardSchema]
    },
    cardTwo: {
        title: {type:String,default:"What you think the answer is"},
        card: [CardSchema]
    },
    cardThree: {
        title: {type:String,default:"Answer"},
        card: [CardSchema]
    },
    cardFour: {
        title: {type:String,default:"Why"},
        card: [CardSchema]
    }
})
const birthCardSchema = new mongoose.Schema({
    cardOne: {
        title: String,
        card: [CardSchema]
    },
})
const Card = mongoose.model("cards", CardSchema)
const oneCard = mongoose.model('onecardReadings', oneCardSchema)
const threeCard = mongoose.model('threecardReadings', threeCardSchema)
const fourCard = mongoose.model('fourcardReadings', fourCardSchema)
const birthCard = mongoose.model('birthcardReadings', birthCardSchema)

export {Card,oneCard,threeCard,fourCard,birthCard}