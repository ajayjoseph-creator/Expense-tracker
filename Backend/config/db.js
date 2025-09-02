import mongoose from "mongoose";
const  connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('mongoose connected'))
    .catch(()=>console.log('mongoose not connected'))
}

export default connectDB;