import { Category } from "../models/categoryModel.js";
import { Product } from "../models/productModel.js";

export const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body
        if (!categoryName) {
            return res.status(400).json({ message: 'Category required.' });
        }
        const exist = await Category.findOne({ name: categoryName })
        if (!exist) {
            const category = new Category({
                name: categoryName
            })
            await category.save()
            const categories = await Category.find()
            return res.status(200).json({ message: "Category successfully added", data: categories })

        } else {
            res.status(409).json({ message: 'Category already exist' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json({ message: "Category", data: category })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export const getOneCategory = async (req, res) => {
    try {
        const { name } = req.query
        const products = await Product.find({category:name});
        res.status(200).json({products});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
}