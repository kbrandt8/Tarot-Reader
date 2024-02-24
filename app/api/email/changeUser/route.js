import { NextResponse } from "next/server"
import connectMongoDB from '@/libs/mongodb'
import mongoose from "mongoose";
import User from "@/models/userModel"
export async function POST(req) {
    try {
        await connectMongoDB();
        const { _id,name,birthDate } = await req.json();
        const user = await User.findOne({ _id })
        if (user) {
            await User.updateOne(
                {_id},{name,birthDate}
            )
            return NextResponse.json({"message":"user updated successfully"})
        } else {
            console.log("no user found")
            return NextResponse.json({ "message": "error, user not found" })
        }

    } catch (error) {
        console.log(error)
    }
}