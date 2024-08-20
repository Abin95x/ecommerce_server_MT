import express from 'express'
const cartRouter = express.Router()
import {
    addToCart,
    getCart,
    updateQuantity,
    removeProduct
} from '../controllers/cartController.js'
import auth from '../middlewares/auth.js'

cartRouter.post('/addtocart', auth, addToCart)
cartRouter.get('/getcart', auth, getCart)
cartRouter.patch('/updatequantity', auth, updateQuantity)
cartRouter.put('/removefromcart', auth, removeProduct)


export default cartRouter