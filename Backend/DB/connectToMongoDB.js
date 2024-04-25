import mongoose from "mongoose";

const connectToMongoDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Successfully connected to MongoDB")
    } catch (error) {
        console.log("Error in connecting MongoDB...",error.message)
    }
}
export default connectToMongoDB;