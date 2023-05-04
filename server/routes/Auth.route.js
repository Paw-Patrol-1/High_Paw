const express = require("express");
const router = express.Router();
const User = require("../Models/User.model");
const {auth} = require("../config/auth.config");
const createError = require('http-errors');
const {authSchema, loginSchema} = require(`../helpers/validation_schema`);
const {signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_helper');

router.get('/', verifyAccessToken, async (req, res, next) => {
    console.log(req.header("Authorization"));
    res.status(200).send("Welcome to the login, register and logout APIs");
})

router.post("/refresh-token", async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);
        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);
        res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);
        console.log(result);

        // if (result.password!=result.confirmPassword) return res.status(400).send({message:"password does not match"})

        const doesExist = await User.findOne({email: result.email});
        if (doesExist) throw createError.Conflict(`${result.email} is already regsistered`);

        const user = new User(result)
        const savedUser = await user.save();
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);
        res.send({ accessToken, refreshToken })
    } catch (error) {
        if(error.isJoi === true) res.status(422)
        next(error);
    }
 });

router.post('/login', async (req,res, next) => {
    try {
        const result = await loginSchema.validateAsync(req.body);
        const user = await User.findOne({email: result.email});

        if(!user) throw createError.NotFound("User is not registered")

        const isMatch = await user.isValidPassword(result.password);

        if(!isMatch) throw createError.Unauthorized('Username or Password is not valid');

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({ accessToken, refreshToken })
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest("Invalid username or Password"));
        next(error)
    }
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