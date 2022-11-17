import  express  from 'express';
const app  = express();
import mongoose from 'mongoose';
import 'dotenv/config';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import cartRoute from './routes/cart.js';
import orderRoute from './routes/order.js';
import paymentRoute from './routes/stripe.js';
import cors from 'cors'
app.use(cors());
// connecting to mongodb and checking if connected
//  and if not connected show err
mongoose.connect(
    process.env.MONGO_URL
).then(() =>console.log('DBConnection Succesfull'))
.catch((err) =>{
    console.log(err);
});

app.use(express.json());
// sending response when /api/user/whatever defined 
// in userRoute is called through url

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/api/checkout',paymentRoute);


app.listen(process.env.PORT || 5000, () =>{
    console.log("Backend server is running!");
})