import express from 'express'
const wishlistRouter = express.Router()
import {
    addProductToWishlist,
    removeProductFromWishlist,
    getWishlist
} from '../controllers/wishlistController.js'
import auth from '../middlewares/auth.js'


wishlistRouter.get('/getwishlist', auth, getWishlist)

wishlistRouter.post('/addtowishlist', auth, addProductToWishlist)

wishlistRouter.put('/removefromwishlist', auth, removeProductFromWishlist)


export default wishlistRouter