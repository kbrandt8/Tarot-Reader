import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongodb'
import User from "@/models/userModel"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
export async function POST(request) {
    const credentials = await request.json()
    const { username, password } = credentials
    console.log(username, password)
    connectMongoDB();
    try {
        const logUser = await User.findOne({ email: username })
        console.log(password, logUser.password)
        const isPasswordValid = await bcrypt.compare(
            password,
            logUser.password
        )
        if (isPasswordValid){
        const user = { id: logUser._id, name: logUser.name, email: logUser.email}
        return NextResponse.json({ user })
        }
    } catch (error) {
        console.log(error)
    }




  


}
