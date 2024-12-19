import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validatePayment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    amount: Joi.number().min(0.01).max(1000).required(),
    currency: Joi.string().valid('USD', 'OMR').required(),
    cardDetails: Joi.object({
      cardNumber: Joi.string().pattern(/^\d{16}$/).required(),
      cardHolderName: Joi.string().max(100).pattern(/^[a-zA-Z\s-]*$/).required(),
      expirationDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/\d{2}$/).required(),
      securityCode: Joi.string().pattern(/^\d{3}$/).required(),
      saveCard: Joi.boolean().required()
    }).required()
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  next();
};
