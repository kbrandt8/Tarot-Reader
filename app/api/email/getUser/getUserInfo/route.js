import { NextResponse } from "next/server"
import connectMongoDB from '@/libs/mongodb'
import mongoose from "mongoose";
import User from "@/models/userModel"
export async function POST(req) {
    try {
        await connectMongoDB();
        const { userId } = await req.json();
        const user = await User.findOne({ _id: userId })
        if (user) {
            return NextResponse.json({
            id:user._id,
            name: user.name,
            birthCard: user.birthCard,
            birthDate: user.birthDate,
            email: user.email,
            readings: user.readings });
        } else {
            return NextResponse.json({ "message": "error, user not found" })
        }

    } catch (error) {
        console.log(error)
    }
}