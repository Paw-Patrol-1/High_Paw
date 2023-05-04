const JWT = require('jsonwebtoken');
const createError = require('http-errors');
require("dotenv").config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: "20s",
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message)
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

// middleware to protect routes
const verifyAccessToken = (req, res, next) => {
   if (!req.header("Authorization")) return next(createError.Unauthorized())
   const authHeader = req.header("Authorization")
   const splitToken = authHeader.split(" ");
   const token = splitToken[1];
   JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if(err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
    }
    req.payload = payload
    next()
   })
}

const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: "1y",
            audience: userId
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message)
                return reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(createError.Unauthorized())
            const userId = payload.aud

            resolve(userId)
        })
    })
}

module.exports = {
    signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken
}