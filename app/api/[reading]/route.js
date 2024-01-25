import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '../../../libs/mongodb'
import mongoose from "mongoose";
import Card from '../../../models/cardModel'
export async function GET(request, { params }) {
    const { reading } = params
    const one = ["One Card Reading"]
    const three = ["Past", "Present", "Future"]
    const four = ["Question", "Expectation", "Answer", "Why"]
    const celtic = ["Question", "Situation", "Root", "Past", "Possibilities", "Future", "Querent", "What Helps", "What Hurts", "Outcome"]
    let num = 0
    let title = []

    switch (reading) {
        case "OneCardReading":
            num = 1
            title = one
            break;
        case "ThreeCardReading":
            num = 3
            title = three
            break;
        case "FourCardReading":
            num = 4
            title = four
            break;
        case "CelticCrossReading":
            num = 10
            title = celtic
            break;
    }
    await connectMongoDB();

    const cards = await Card.aggregate([{ $sample: {size:num} }])

    const result = cards.forEach(card => {
        card.title = title[cards.indexOf(card)];
        card.isReversed = Math.floor(Math.random() * 10) > 5 ? true : false;
    })
    return NextResponse.json({ cards })

}