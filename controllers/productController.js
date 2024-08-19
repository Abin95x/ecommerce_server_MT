import { Product } from "../models/productModel.js";
import cloudinary from '../utils/cloudinary.js'

export const addProduct = async (req, res) => {
    try {
        const { name, brand, price, category, description,images } = req.body;
        const uploadedImages = await Promise.all(images.map(async (img) => {
            return await cloudinary.uploader.upload(img, { folder: 'e-commerce' });
        }));
   
        const newProduct = new Product({
            name,
            brand,
            price,
            category,
            description,
            images: uploadedImages.map(result => result.secure_url) 
        });
        

        await newProduct.save();
        res.status(200).json({ message: "Product successfully added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// export const getDetails = async (req, res) => {
//     try {
//         const {id} = req.query
//         console.log(id);
//         const details = await Product.findById(id)
//         res.status(200).json(details);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// export const editDetails = async (req, res) => {
//     try {
//         const {id, name, brand, price, description,images } = req.body;

//         const uploadedImages = await Promise.all(images.map(async (img) => {
//             return await cloudinary.uploader.upload(img, { folder: 'e-commerce' });
//         }));
        
//         await Product.findByIdAndUpdate(id, {
//             name: name,
//             brand: brand,
//             price: price,
//             description: description,
//             images: uploadedImages.map(img => img.secure_url) 
//         });

    
//         res.status(200).json({ message: "Product successfully added" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

export const searchProducts = async (req, res) => {
    try {
        const { value } = req.query;
        
        // Ensure value is a string and not empty
        if (typeof value !== 'string' || !value.trim()) {
            return res.status(400).json({ message: 'Invalid search value' });
        }

        // Create a regex pattern for case-insensitive matching
        const regex = new RegExp(value, 'i');

        // Find products that match the regex pattern
        const products = await Product.find({ name: regex });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
