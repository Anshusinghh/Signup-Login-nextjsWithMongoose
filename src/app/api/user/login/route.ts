import  {connect } from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(req:NextRequest){
    try {
        const reqBody=await req.json()
        const {email,password}=reqBody
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error:"User not found"
            },{
                status:400
            })
        }
        const valid=await bcryptjs.compare(password,user.password)
        if(!valid){
            return NextResponse.json({
                error:"Invalid user"
            },{
                status:400
            })
        }
        const tokendata={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token=await jwt.sign(tokendata,process.env.TOKENSec!,{expiresIn:"1d"})

        const res=NextResponse.json({
            message:"Successfully logged in",
            success:true
        })
        res.cookies.set("token",token,{
            httpOnly:true
        })
        return res
    } catch (error) {
        return NextResponse.json({
            error:"Error while requesting"
        },{
            status:400
        })
    }
}