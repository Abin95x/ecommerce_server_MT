import express from 'express'
const productRouter = express.Router()
import sanitizeInput from '../middlewares/sanitization.js'
import auth  from '../middlewares/auth.js'
import {
    addProduct,
    getProducts,

    searchProducts
} from '../controllers/productController.js'

productRouter.post('/addproduct', auth, addProduct)
productRouter.get('/getproducts', auth, getProducts)
productRouter.get('/searchproducts',auth, searchProducts)





export default productRouter