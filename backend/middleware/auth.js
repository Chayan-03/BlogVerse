import jwt from 'jsonwebtoken';

const verifytoken = async (req, res, next) => {
        //const authHeader = req.headers['authorization'];
        const token = req.headers['authorization'];
        //const token = authHeader && authHeader.split(' ')[1];
        if(token == null) return res.status(401).json({message: "Unauthorized"});
        //else case ie token found out 
        try{
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user  = verified;
            next();
        }catch(err){
            console.log(err);
            return res.status(403).json({message: "Invalid token"});
        }
        
        
    
    }
export default verifytoken;

