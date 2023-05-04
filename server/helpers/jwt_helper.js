const JWT = require('jsonwebtoken');
const createError = require('http-errors');
require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: "1w",
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken
}