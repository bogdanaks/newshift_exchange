import joi from 'joi'

export const schemaGetEstimate = joi.object({
  from: joi.string().required(),
  to: joi.string().required(),
  amount: joi.string().required(),
}).min(1).required()
