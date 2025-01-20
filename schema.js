//server side error handling

const Joi = require("joi");

module.exports.ListingSchema = Joi.object({
        title:  Joi.string().required,
        description:    Joi.string().required,
        image:Joi.string(),
        price:Joi.number().required,
        location:Joi.string().required,
        country:Joi.string().required
}).required;

