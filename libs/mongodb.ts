import mongoose from "mongoose";

const connectMongoDB = async () =>{
    const URI = process.env.MONGO_URL || ""
    try {
       await mongoose.connect(URI);

    } catch (error) {
        console.log(error);
        
    }
};

export default connectMongoDB;