const express = require("express");
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.status(200).send("Welcome to the login, register and logout APIs")
})

router.post("/register", async (req, res, next) => {
    
    res.send('register route')
});

router.post("/login", async (req, res, next) => {
    res.send('login route')    
});

router.delete("/logout", async (req, res, next) => {
    res.send("logout route");
});

module.exports = router