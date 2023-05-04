const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref('password'),
    name: Joi.string().required(),
    breed: Joi.string().required(),
    age: Joi.number().required(),
    picture: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required()
});

module.exports = {
    authSchema
}