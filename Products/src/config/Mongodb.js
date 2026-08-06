import mongoose from 'mongoose';

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Products MongoDB is connected successfully");
    } catch (error) {
        console.log("Error connecting to Products MongoDB:", error.message);
    }
}

export default Connection;
