import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongodb'
import mongoose from "mongoose";
import Card from '@/models/cardModel'
export async function POST(request, { params }) {
    const dates = await request.json()
    const { birth, date } = dates
    await connectMongoDB()
    try {
        function reduceDate(birth, date) {
            const allNumbers = [birth.replaceAll("-", ""), date.replaceAll("/", "")].join('')
            const numberArr = allNumbers.split('')
            let sum = numberArr.reduce((a, c) => {
                return parseInt(a) + parseInt(c)
            })
            if (sum < 21) {
                return sum
            } else {
                sum = sum.toString().split('').reduce((a, c) => {
                    return parseInt(a) + parseInt(c)
                })
                return sum
            }
        }
        const new_num = reduceDate(birth, date)
        const cards = await Card.find({ num: new_num })
        return NextResponse.json({ cards })



    } catch (error) {

        return NextResponse.json({ error })
    }

}