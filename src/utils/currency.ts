import { CurrencyType } from '../types/payment';

export class CurrencyConverter {
  private static USD_TO_OMR_RATE = 0.39;
  private static OMR_TO_USD_RATE = 1 / 0.39;

  static convertUSDtoOMR(amountUSD: number): number {
    return Number((amountUSD * this.USD_TO_OMR_RATE).toFixed(2));
  }

  static convertOMRtoUSD(amountOMR: number): number {
    return Number((amountOMR * this.OMR_TO_USD_RATE).toFixed(2));
  }

  static convert(amount: number, fromCurrency: CurrencyType, toCurrency: CurrencyType): number {
    if (fromCurrency === toCurrency) return Number(amount.toFixed(2));
    
    if (fromCurrency === 'USD' && toCurrency === 'OMR') {
      return this.convertUSDtoOMR(amount);
    } else {
      return this.convertOMRtoUSD(amount);
    }
  }
}
