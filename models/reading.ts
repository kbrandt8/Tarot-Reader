import mongoose from "mongoose"


const ReadingSchema = new mongoose.Schema({
    title: Array,
    date: String,
    cards: Array,
    notes: String,
})

const Reading = mongoose.models.Reading ?? mongoose.model('Reading', ReadingSchema)
export {Reading, ReadingSchema}