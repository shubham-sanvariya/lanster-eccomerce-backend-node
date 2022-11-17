import {Router} from 'express';
import Cart from '../models/Cart.js';
import verifyToken from '../routes/verifyToken.js';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../routes/verifyToken.js';
// creating instance for Router class
const router = new Router();

// CREATE 

router.post("/", verifyToken, async (req,res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE

// becuase we are updating 
router.put("/:id", 
verifyTokenAndAuthorization, 
async (req,res) =>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate
        (req.params.id.trim(),{
            $set: req.body,
        },
        {new: true});
        res.status(200).json(updatedCart); 
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id",verifyTokenAndAuthorization,
async(req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart has been deleted... ")
    }catch(err){
        res.status(500).json(err)
    }
});

// GET USER Cart 
router.get("/find/:userId", verifyTokenAndAuthorization,
async(req,res) => {
    try{
      const cart =  await Cart.findOne({userId: req.params.userId})
      res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})

export default router;
