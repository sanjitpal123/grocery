import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'grocery_products', // The folder name in your Cloudinary account
        allowedFormats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed image types
        transformation: [{ width: 800, height: 800, crop: 'limit' }] // Optimize image size
    }
});

const upload = multer({ storage: storage });

export default upload;
