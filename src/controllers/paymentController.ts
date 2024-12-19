import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

export class PaymentController {
  static async processPayment(req: Request, res: Response): Promise<void> {
    try {
      const result = await PaymentService.processPayment(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Payment processing failed'
      });
    }
  }
}
