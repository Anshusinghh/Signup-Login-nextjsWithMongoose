import mongoose from "mongoose";
export async function connect(){
    try{
        mongoose.connect(process.env.DOMAIN_URL!)
        const connection=mongoose.connection;
        connection.on("connected",()=>{
            console.log("DB connected");
        })
        connection.on("error",(err)=>{
            console.log("Error "+err)
            process.exit();
        })
    }catch(err){
        console.log("Something went wrong");
        console.log(err);
    }
}