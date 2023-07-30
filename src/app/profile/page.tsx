"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import {useState,useEffect} from "react"

export default function profilepage(){

    const router=useRouter()
    const Onlogout=async()=>{
        try {
            await axios.get("/api/user/logout")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>profile content</p>
            <hr />
            <button onClick={Onlogout}>Logout</button>
        </div>
    )
}