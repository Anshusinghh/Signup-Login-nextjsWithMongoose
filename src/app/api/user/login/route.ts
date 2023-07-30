import  {connect } from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest,NextResponse } from "next/server";



connect()