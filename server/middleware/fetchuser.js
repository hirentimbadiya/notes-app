var jwt = require("jsonwebtoken");

const JWT_SECRET = "Asecretstring";

const fetchuser = (req,res,next)=>{
    
    // This will call the next function written next to fetchuser when it is called, in our case will run the async function in getuser
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET);
    // After verifying storing the id and user in request header
    req.id = data.id;
    req.user = data.user;
    next();
    }
    catch(error){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;