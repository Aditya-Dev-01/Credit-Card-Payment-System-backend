import mongoose, { Document, Schema } from 'mongoose';
import { CurrencyType } from '../types/payment';

export interface IPayment extends Document {
  amount: number;
  currency: CurrencyType;
  convertedAmount: number;
  convertedCurrency: CurrencyType;
  cardId?: Schema.Types.ObjectId;
  status: 'success' | 'failure';
  createdAt: Date;
}

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 0.01,
    max: 1000.00,
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'OMR'] as CurrencyType[],
  },
  convertedAmount: {
    type: Number,
    required: true,
  },
  convertedCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'OMR'] as CurrencyType[],
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
  },
  status: {
    type: String,
    required: true,
    enum: ['success', 'failure'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
