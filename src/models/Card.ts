import mongoose, { Document, Schema } from 'mongoose';

export interface ICard extends Document {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  createdAt: Date;
}

const CardSchema = new Schema({
  cardHolderName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cardNumber: {
    type: String,
    required: true,
    length: 16,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  securityCode: {
    type: String,
    required: true,
    length: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Mask card number before saving
CardSchema.pre('save', function(next) {
  if (this.isModified('cardNumber')) {
    this.cardNumber = this.cardNumber.slice(-4).padStart(16, '*');
  }
  next();
});

export const Card = mongoose.model<ICard>('Card', CardSchema);
