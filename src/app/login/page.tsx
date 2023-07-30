"use client"
import { useRouter } from "next/navigation"
import React from "react"
import Link from "next/link"

export default function Login(){
    const {user,setUser}=React.useState({
        email:"",
        password:"",
    })
    return (
        <div>
            <h1>Login</h1>
            <form  method="get" className="flex flex-col">
                <input type="email" placeholder="email" 
                        onChange={(e)=>{
                            setUser({
                                ...user,
                                email:e.target.value
                            })
                        }}/>
                <input type="password" placeholder="password" />
                <button >Login</button>
            </form>
            <Link href="/signup" className="bg-purple-600">Signup Page</Link>
        </div>
    )
}