const express = require("express");
const router = express.Router();
const User = require("../Models/User.model");
const {auth} = require("../config/auth.config");
const createError = require('http-errors');
const {authSchema} = require(`../helpers/validation_schema`);
const {signAccessToken} = require('../helpers/jwt_helper')

router.get('/', async (req, res, next) => {
    res.status(200).send("Welcome to the login, register and logout APIs");
})

router.post('/register', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        console.log(result);

        if (result.password!=result.confirmPassword){
            res.status(400).send({message:"password does not match"})
        }

        const doesExist = await User.findOne({email: result.email});
        if (doesExist) throw createError.Conflict(`${result.email} is already regsistered`);

        const user = new User(result)
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id)
        res.send({ accessToken })
    } catch (error) {
        if(error.isJoi === true) res.status(422)
        next(error);
    }
 });

router.post('/login', function(req,res){
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id
                        ,email : user.email
                    });
                });    
            });
          });
        }
    });
});

//logout user
router.get('/api/logout',auth,function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });

}); 

router.get('/api/profile',auth,function(req,res){
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
        
    })
});

module.exports = router