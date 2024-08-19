import mongoose from 'mongoose';

export const dbconnect = () => {
  mongoose
    .connect('mongodb+srv://abin:abin@cluster0.7tmlt.mongodb.net/ecommerce')
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
