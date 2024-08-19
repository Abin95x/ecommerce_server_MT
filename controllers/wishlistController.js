import { Wishlist } from "../models/wishlistModel.js";


export const getWishlist = async (req, res) => {
    try {
        const { userId } = req.query; 
        const wishlist = await Wishlist.findOne({ user: userId }).populate('product.productId'); 

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json({ wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const addProductToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, product: [] });
        }

        const productExists = wishlist.product.some(p => p.productId.toString() === productId);

        if (productExists) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        wishlist.product.push({ productId });

        await wishlist.save();

        res.status(200).json({ message: 'Product added to wishlist successfully', wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const removeProductFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        const itemIndex = wishlist.product.findIndex(p => p.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }

        wishlist.product.splice(itemIndex, 1);

        await wishlist.save();

        res.status(200).json({ message: 'Product removed from wishlist successfully', wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
