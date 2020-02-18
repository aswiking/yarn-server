import yarnSchema from "./schemas/yarn-schema.js";

export default function validateYarnSchema(req, res, next) {
  const { value, error } = yarnSchema.validate(req.body);
  if (error) {
    throw {
      status: 400,
      messages: error.details.map(e => e.message)
    };
  }
  req.validatedBody = value;
  next();
}
