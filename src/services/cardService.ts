import { Card, ICard } from '../models/Card';

export class CardService {
  static async saveCard(cardDetails: Partial<ICard>): Promise<ICard> {
    try {
      const card = new Card(cardDetails);
      return await card.save();
    } catch (error) {
      throw new Error('Failed to save card details');
    }
  }
}