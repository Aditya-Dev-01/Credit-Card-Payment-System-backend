export interface CardDetails {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  securityCode: string;
  saveCard: boolean;
}

export interface PaymentDetails {
  amount: number;
  currency: 'USD' | 'OMR';
  cardDetails: CardDetails;
}


export type CurrencyType = 'USD' | 'OMR';

export interface PaymentResponse {
  success: boolean;
  message: string;
  convertedAmount?: number;
  convertedCurrency?: CurrencyType;
  originalAmount?: number;
  originalCurrency?: CurrencyType;
  error?: string;
}
