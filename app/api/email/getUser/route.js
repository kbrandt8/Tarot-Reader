import { NextResponse } from "next/server"
import connectMongoDB from '@/libs/mongodb'
import mongoose from "mongoose";
import User from "@/models/userModel"
export async function POST(req) {
    try {
        await connectMongoDB();
        const { name,email,provider } = await req.json();
        const user = await User.findOne({ email })
        if(user){
            const userId = user._id.toString()

            if(user.provider){
                return NextResponse.json({ userId});  
            }else{
                await User.updateOne({_id:userId},{provider})
                return NextResponse.json({ userId}); 
            }
 
        }else{
            const newId = new mongoose.Types.ObjectId();
            await  User.create({
                _id:newId,
                name,
                email,
            })
            const userId = newId.toString()
            return NextResponse.json({userId})
        }
        
    } catch (error) {
        console.log(error)
    }
}