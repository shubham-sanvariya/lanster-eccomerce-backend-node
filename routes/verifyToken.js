import  Jwt  from "jsonwebtoken";

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        Jwt.verify(token, process.env.JWT_SEC,
            (err,user) => {
                if(err) res.status(403).json("Token is not valid!");
                req.user = user;
                next();
            });
    } else {
        return res.status(401).json("you are not authenticated");
    }
};

export const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res, () => {
        // console.log(req.user.id.length, req.params.id.trim().length);
        // console.log(req.params.id.trim()===req.user.id);
        if(req.user.id === req.params.id.trim() || req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

export const verifyTokenAndAdmin= (req,res,next) =>{
    verifyToken(req,res, () => {
        // console.log(req.user.id.length, req.params.id.trim().length);
        // console.log(req.params.id.trim()===req.user.id);
        if(req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

export default verifyToken;