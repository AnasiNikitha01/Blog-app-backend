import mongoose from "mongoose";

 export async function connect_database(){
    try {
        //connecting mongoDB with express with mongoose 
        const connect = await mongoose.connect(process.env.MongoDB_URL)
        console.log("connection done with MongoDB")
    } catch (error) {
        console.log(`error in connecting Database: ${error}`)
    }
}