import mongoose from "mongoose";

// creating a type of instance from mongoose class
const ProductSchema = new mongoose.Schema(
    // object
    {
        title:{type:String,
                  required:true,
                  unique: true},
        
        desc:{
            type: String, required: true
        },
        img:{
            type: String, required: true
        },
        categories:{
            type: Array
        },
        size:{
            type: Array, 
        },
        color:{
            type: Array, 
        },
        price:{
            type: Number, required: true
        },
        inStock: {type: Boolean,default: true},
    },
    // created at and updated at time
    {timestamps: true}
)

export default mongoose.model('Product',ProductSchema);