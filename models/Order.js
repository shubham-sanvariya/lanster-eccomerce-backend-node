import mongoose from "mongoose";

// creating a type of instance from mongoose class
const OrderSchema = new mongoose.Schema(
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
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, default: 'pending'},
    },
    // created at and updated at time
    {timestamps: true}
);

export default mongoose.model('Order',OrderSchema);