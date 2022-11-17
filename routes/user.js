import {Router} from 'express';
import User from '../models/User.js';
import verifyToken from '../routes/verifyToken.js';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../routes/verifyToken.js';
// creating instance for Router class
const router = new Router();

// becuase we are updating 
router.put("/:id", 
verifyTokenAndAuthorization, 
async (req,res) =>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS)
            .toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate
        (req.params.id.trim(),{
            $set: req.body,
        },
        {new: true});
        res.status(200).json(updatedUser); 
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id",verifyTokenAndAuthorization,
async(req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id.trim())
        res.status(200).json("User has been deleted... ")
    }catch(err){
        res.status(500).json(err)
    }
});

// GET USER 
router.get("/find/:id",verifyTokenAndAdmin,
async(req,res) => {
    try{
      const user =  await User.findById(req.params.id.trim())
      const {password, ...others } = user._doc;
      res.status(200).json({others});
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL USER 
router.get("/",verifyTokenAndAdmin,
async(req,res) => {
    const query = req.query.new;
    try{
      const users = query
      ? await User.find().sort({ _id: -1 }).limit(1) 
      : await User.find();
      res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
});

// GET USER STATS 
router.get("/stats",verifyTokenAndAdmin,
async(req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    try{
        const data = await User.aggregate([
        // it is going to try to  match my condition
        {$match: {createdAt: {$gte: lastYear } } },
        {
            $project:{
                month: {$month: "$createdAt"},
            },
        },
        {
            $group:{
                _id: "$month",
                total:{$sum:1}
            },
        }
    ]);
    res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
});

export default router;
