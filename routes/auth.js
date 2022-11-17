import {Router} from 'express';
import User from '../models/User.js';
// creating instance for Router class
const router = new Router();
// for passowrd
import CryptoJS from 'crypto-js';
// for more secure
import jwt from 'jsonwebtoken';

// RESTISTER 

router.post('/register', async (req,res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,
            process.env.PASS)
            .toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN 
router.post('/login',async (req,res) =>{
   
    try{
        // findone becuase their is only one user with same username
      const user = await User.findOne({
       username: req.body.username
      });
    
      if(!user){
        res.status(401).json("Wrong credentials!");
        return
      }

      const hashedPassword = CryptoJS.AES.
      decrypt(user.password,process.env.PASS);

      const Originalpassword = hashedPassword.
      toString(CryptoJS.enc.Utf8);


      const accessToken = jwt.sign({
        id: user.id,
        isAdmin: user.isAdmin,
       }, process.env.JWT_SEC,
       {expiresIn:"3d"}
       );

      const {password, ...others } = user._doc;
     Originalpassword !== req.body.password ? 
      res.status(401).json("Wrong credentials!"): 
       res.status(200).json({...others,accessToken});

       
      
        // if(passowrd !== req.body.passowrd){
        //     res.status(401).json("Wrong credentials!");
        //     return
        // }

  
    }catch(err){
        res.status(500).json(err)
    }
});

export default router;