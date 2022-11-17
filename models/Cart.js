import mongoose from "mongoose";

// creating a type of instance from mongoose class
const CartSchema = new mongoose.Schema(
    // object
    {
        userId:{
            type: String, required: true
        },
        products: [
          {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
          },
        ],
    },
    // created at and updated at time
    {timestamps: true}
)

export default mongoose.model('Cart',CartSchema);