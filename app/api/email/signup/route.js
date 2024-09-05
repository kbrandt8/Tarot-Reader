import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongodb'
import User from "@/models/userModel"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
export async function POST(request) {
    const { email, name, password } = await request.json()
    await connectMongoDB();
    const tryUser = User.find({ email }) ? false : true
    if (tryUser) {
        try {
            console.log(tryUser)

            const newPassword = await bcrypt.hash(password, 10)
            await User.create({
                name,
                email,
                password: newPassword
            })
            const logUser = User.findOne({ email })

            return NextResponse.json({ message: "User Created", "userCreated": true })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error, "userCreated": false })
        }
    } else {
        return NextResponse.json({ "status": false, message: "email already in use.", "userCreated": false })
    }






}
