import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.COULD_NAME,
    api_key: process.env.COULD_API_KEY,
    api_secret: process.env.COUlD_SECRET
});

export default cloudinary;
