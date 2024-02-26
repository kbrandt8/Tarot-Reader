
import { NextResponse } from "next/server"
import connectMongoDB from '@/libs/mongodb'
import mongoose from "mongoose";
import User from "@/models/userModel"
export async function POST(req, { params }) {
    const { user_id } = params
    const { reading, add } = await req.json()
    try {
        await connectMongoDB();
        const user = await User.findOne({ _id: user_id })
        if (user && add) {
            await User.updateOne(
                { _id: user_id },
                { $push: { readings: reading } }
            )

            return NextResponse.json({
                "message":"Reading Added"
            })
        } else if (user && !add) {
            await User.updateOne(
                { _id: user_id }, 
                { $pull: { readings: { _id: reading._id } } })
                return NextResponse.json({
                    "message":"Reading Deleted"
                })
        } else {
            return NextResponse.json({ "message": "error, user not found" })
        }

    } catch (error) {
        console.log(error)
    }
}