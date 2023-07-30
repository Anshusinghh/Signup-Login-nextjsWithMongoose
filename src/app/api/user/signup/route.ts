import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(req:NextRequest){
    try {
        const reqBody=await req.json()
        const {username,email,password}=reqBody
        
        console.log(reqBody)

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exist"},{status:400})
        }
        const salt= await bcryptjs.genSalt(10)
        const hasedPass=await bcryptjs.hash(password,salt)

        const newuser=new User({
            username,
            email,
            password:hasedPass
        })
        const saved=await newuser.save()
        console.log(saved)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newuser
        })

    } catch (error:any) {
        return NextResponse.json({
            error:"Error"
            },{
                status:500
            })
    }
}