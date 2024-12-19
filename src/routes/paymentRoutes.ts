import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { validatePayment } from '../middleware/validation';

const router = Router();

router.post('/process', validatePayment, PaymentController.processPayment);

export default router;