"use client"
import { useRouter } from "next/navigation"
import {useState,useEffect} from "react"
import Link from "next/link"
import axios from "axios"

export default function Login(){
    const router=useRouter()
    const [user,setUser]=useState({
        email:"",
        password:"",
    })
    const [loading,setLoading]=useState(false)

    const Onlogin=async (e:any)=>{
        e.preventDefault();
        try {
            setLoading(true)
            const res=await axios.post("/api/user/login",user)    
            console.log("LoginConfirmed",res.data)
            router.push("/profile")       
        } catch (error:any) {
            console.log("Login failed", error.message);
            
        }finally{
            setLoading(false)
        }
    }
    return (
        <div>
            <h1>{loading?"processing":"Login"}</h1>
            <form  method="get" className="flex flex-col">
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
                <button onClick={Onlogin}>Login</button>
            </form>
            <Link href="/signup" className="bg-purple-600">Signup Page</Link>
        </div>
    )
}