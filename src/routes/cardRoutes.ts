import { Router } from 'express';
import { CardController } from '../controllers/cardController';

const router = Router();

router.post('/save', CardController.saveCard);

export default router;