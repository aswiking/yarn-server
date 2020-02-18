import Joi from "@hapi/joi";

const yarnSchema = Joi.object({
  id: Joi.string().min(1),
  name: Joi.string()
    .min(1)
    .required(),
  brand: Joi.string()
    .min(1)
    .required(),
  weight: Joi.string().min(1),
  fibers: Joi.string().min(1)
});

export default yarnSchema;
