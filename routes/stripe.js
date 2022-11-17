import { Router } from "express";
const router = new Router();
import Stripe from 'stripe'
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/payment",async(req,res)=>{
    
    // stripe.charges.create({
    //     source: req.body.tokenId,
    //     amount: req.body.amount,
    //     currency: "inr",
    // },(stripeErr,stripeRes)=>{
    //     if(stripeErr){
    //         console.log(stripeErr);
    //         res.status(500).json(stripeErr);
    //     }else{
    //         res.status(200).json(stripeRes);
    //     }
    // });
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            payment_method_types: ['card'],
            metadata: {
              order_id: '6735',
            },
          });
          res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;