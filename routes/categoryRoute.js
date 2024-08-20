import express from 'express'
const categoryRoute = express.Router()
import sanitizeInput from '../middlewares/sanitization.js'
import auth from '../middlewares/auth.js'
import {
    addCategory,
    getCategory,
    getOneCategory
} from '../controllers/categoryController.js'

categoryRoute.post('/addcategory', sanitizeInput, auth, addCategory)
categoryRoute.get('/getcategory', auth, getCategory)
categoryRoute.get('/getonecategory', auth, getOneCategory)


export default categoryRoute