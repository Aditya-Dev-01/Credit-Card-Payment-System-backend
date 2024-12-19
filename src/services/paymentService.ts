import { Card } from '../models/Card';
import { Payment } from '../models/Payment';
import { PaymentDetails, PaymentResponse, CurrencyType } from '../types/payment';
import { CurrencyConverter } from '../utils/currency';

export class PaymentService {
  static async processPayment(paymentDetails: PaymentDetails): Promise<PaymentResponse> {
    try {
      const { amount, currency, cardDetails } = paymentDetails;
      let savedCardId;

      // Save card if requested
      if (cardDetails.saveCard) {
        const card = new Card({
          cardHolderName: cardDetails.cardHolderName,
          cardNumber: cardDetails.cardNumber,
          expirationDate: cardDetails.expirationDate,
          securityCode: cardDetails.securityCode,
        });
        const savedCard = await card.save();
        savedCardId = savedCard._id;
      }

      // Check if payment should fail (last digit is 5)
      const shouldFail = cardDetails.cardNumber.endsWith('5');

      // Calculate converted amounts
      let convertedAmount: number;
      let convertedCurrency: CurrencyType;
      
      if (currency === 'USD') {
        convertedAmount = CurrencyConverter.convertUSDtoOMR(amount);
        convertedCurrency = 'OMR';
      } else {
        convertedAmount = CurrencyConverter.convertOMRtoUSD(amount);
        convertedCurrency = 'USD';
      }

      // Create payment record
      const payment = new Payment({
        amount,
        currency,
        convertedAmount,
        convertedCurrency,
        cardId: savedCardId,
        status: shouldFail ? 'failure' : 'success',
      });
      await payment.save();

      if (shouldFail) {
        return {
          success: false,
          message: 'Payment failed due to card ending in 5',
        };
      }

      return {
        success: true,
        message: 'Payment processed successfully',
        convertedAmount,
        convertedCurrency,
        originalAmount: amount,
        originalCurrency: currency
      };
    } catch (error) {
      throw new Error('Payment processing failed');
    }
  }
}