import mongoose from "mongoose";

// creating a type of instance from mongoose class
const UserSchema = new mongoose.Schema(
    // object
    {
        username:{type:String,
                  required:true,
                  unique: true},
        
        email:{
            type: String, required: true, unique: true
        },
        password:{
            type: String, required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        
    },
    // created at and updated at time
    {timestamps: true}
)

export default mongoose.model('user',UserSchema);