"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { useState,useEffect } from "react"
import Link from "next/link"
import { toast } from "react-hot-toast/headless"
import axios from "axios"

export default function Signup(){
    const router=useRouter();
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
    })
    const [buttonDisabled,setbuttonDis]=useState(false)
    const [loading,setLoading]=useState(false)
    const signupfunc= async (e:any)=>{
        try {
            e.preventDefault();
            setLoading(true)
            const res=await axios.post("/api/user/signup",user)
            console.log("SignupConfirmed",res.data)
            router.push("/login")
        } catch (error:any) {
            console.log("Error genrated "+ error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.username && user.email && user.password){
            setbuttonDis(true)
        }
        else{
            setbuttonDis(false)
        }
    },[user])
    return (
        <div>
            <h1>{loading?"Processing":"SignUp"}</h1>
            <form  method="get" className="flex flex-col">
                <input type="text" placeholder="username" 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                username:e.target.value
                            })
                        }}/>
                <input type="email" placeholder="email" 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                email:e.target.value
                            })
                        }}/>
                <input type="password" placeholder="password" 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                password:e.target.value
                            })
                        }}/>
                <button onClick={signupfunc} >{buttonDisabled?"Signup":"NoSignUp"}</button>
            </form>
            <Link href="/login" className="bg-purple-600">Login Page</Link>
        </div>
    )
}