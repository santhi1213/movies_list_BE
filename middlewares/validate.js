const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  type: Joi.string().valid("Movie", "TV Show").required(),
  director: Joi.string().max(255).allow("", null),
  budget: Joi.string().max(100).allow("", null),
  location: Joi.string().max(255).allow("", null),
  duration: Joi.string().max(100).allow("", null),
  year: Joi.string().max(50).allow("", null),
  description: Joi.string().allow("", null),
});

function validateMovie(req, res, next) {
  const { error, value } = movieSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details,
    });
  }

  req.body = value;
  next();
}

module.exports = { validateMovie };
