import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request, { params }) {
    try {
        const reading = await request.json()
        const { type, cards } = reading
        let readingString = [`My reading is a ${type.replace(/([A-Z])/g, ' $1').trim()}, My cards are: `]
        let cardsString = cards.map(card => `${card.title}: ${card.name} ${card.isReversed ? 'Reversed' : 'Upright'}`)
        const fullReadingString = readingString + cardsString.join(", ")
        const openai = new OpenAI({
            organization: process.env.OPEN_AI_ORGANIZATION,
            project: process.env.OPEN_AI_PROJ,
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a an expert tarot reader, interpreting the users reading." },
                {
                    role: "user",
                    content: fullReadingString,
                },
            ],
        });

        const interpretation = completion.choices[0].message.content
        return NextResponse.json({ "msg": interpretation })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ "msg": "# There was an error interpreting your reading, please contact the developer." })
    }
}