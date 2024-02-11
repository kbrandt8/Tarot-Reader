import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/mongodb'
import User from "@/models/userModel"
import mongoose from "mongoose";
import bcrypt from "bcrypt"
export async function POST(request) {
    const {email,name,password}= await request.json()
    await connectMongoDB();
    try {
        const newPassword = await bcrypt.hash(password, 10)
        await  User.create({
            name,
            email,
            password: newPassword
        })
        //const newUser = User.findOne({email})
        return NextResponse.json({message:"user created"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error})
    }




  


}
