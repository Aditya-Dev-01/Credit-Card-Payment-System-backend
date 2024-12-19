import { Request, Response } from 'express';
import { CardService } from '../services/cardService';

export class CardController {
  static async saveCard(req: Request, res: Response): Promise<void> {
    try {
      const card = await CardService.saveCard(req.body);
      res.json({
        success: true,
        message: 'Card saved successfully',
        card
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to save card'
      });
    }
  }
}
