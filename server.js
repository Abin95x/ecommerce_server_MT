import express from 'express'
import cors from 'cors'
const app = express()
import { dbconnect } from './config/dbConfig.js'
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import cartRouter from './routes/cartRoute.js';
import wishlistRouter from './routes/wishlistRoute.js';
// import orderRouter from './routes/orderRoute.js';
dotenv.config()

import {job} from '../server/config/cronjob.js'

app.use(express.json({ limit: "20mb" }))
app.use(cors({
    origin: process.env.FRONT_END_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
}))

app.use('/', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)
// app.use('/order',orderRouter)
app.use('/category', categoryRouter)
app.use('/wishlist', wishlistRouter)



dbconnect()

app.listen(3000, () => {
    console.log('running...')
})