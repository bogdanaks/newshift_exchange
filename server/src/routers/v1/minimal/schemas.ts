import joi from 'joi'

export const schemaGetMinimal = joi.object({
  from: joi.string().required(),
  to: joi.string().required(),
}).min(1).required()
