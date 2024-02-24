import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongodb'
import User from "@/models/userModel"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
export async function POST(request) {
    const credentials = await request.json()
    const { username, password } = credentials
    await connectMongoDB();
    try {
        const logUser = await User.findOne({ email: username })
        const isPasswordValid = await bcrypt.compare(
            password,
            logUser.password
        )
        if (isPasswordValid) {
            
            const user = { id: logUser._id, name: logUser.name, email: logUser.email }
            const response = NextResponse.json({user})
            const expiration = 24 * 60 * 60 * 1000 * 90
            response.cookies.set({
                name:'userId',
                value: logUser._id.toString(),
                expires:Date.now() + expiration
            })
            return response
        }
    } catch (error) {
        console.log(error)
    }







}
