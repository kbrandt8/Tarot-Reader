import { NextResponse } from "next/server"
import connectMongoDB from '@/libs/mongodb'
import User from "@/models/userModel"
export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id")
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error)
    }
}