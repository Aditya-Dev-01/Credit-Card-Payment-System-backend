import { PaymentService } from '../services/paymentService';
import { PaymentDetails, PaymentResponse } from '../types/payment';

export const handlePaymentProcessing = async (
  paymentDetails: PaymentDetails
): Promise<PaymentResponse> => {
  try {
    return await PaymentService.processPayment(paymentDetails);
  } catch (error) {
    throw new Error('Payment processing failed');
  }
};
