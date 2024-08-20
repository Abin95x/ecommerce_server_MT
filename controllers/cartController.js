import { Cart } from "../models/cartModel.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, price } = req.body;

        const quantity = 1
        if (!userId || !productId || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                product: [],
                grandTotal: 0
            });
        }

        const productIndex = cart.product.findIndex(p => p.productId.toString() === productId.toString());

        if (productIndex > -1) {
            cart.product[productIndex].quantity += quantity;
            cart.product[productIndex].totalPrice = cart.product[productIndex].quantity * cart.product[productIndex].price;
        } else {
            cart.product.push({
                productId,
                price,
                quantity,
                totalPrice: price * quantity
            });
        }

        cart.grandTotal = cart.product.reduce((total, item) => total + item.totalPrice, 0);

        await cart.save();

        res.status(200).json(cart);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



export const getCart = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const cart = await Cart.findOne({ user: userId }).populate('product.productId');
     
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



export const updateQuantity = async (req, res) => {
    try {
        const { id, productId, newQuantity } = req.body;

        if (newQuantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const cart = await Cart.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let itemIndex = -1;

        for (let i = 0; i < cart.product.length; i++) {
            const dbProductId = cart.product[i].productId.toString();
            if (dbProductId === productId) {
                itemIndex = i;
                break;
            }
        }
        
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.product[itemIndex].quantity = newQuantity;

        cart.product[itemIndex].totalPrice = cart.product[itemIndex].price * newQuantity;

        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const removeProduct = async (req, res) => {
    try {
        const { id, productId } = req.body;

        const cart = await Cart.findOne({ user: id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.product.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.product.splice(itemIndex, 1);

        cart.grandTotal = cart.product.reduce((total, item) => total + item.totalPrice, 0);

        await cart.save();

        res.status(200).json({ message: 'Product removed successfully', cart });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};





