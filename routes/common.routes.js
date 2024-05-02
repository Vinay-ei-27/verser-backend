import { Router } from 'express';
import Controller from '../controller/common.controller.js';
const controller = new Controller();

const router = Router();

router.get('/home', controller.home);
router.get('/cards', controller.fetchCardsData);
router.get('/limitedCards', controller.fetch50CardsData);
router.post('/cards', controller.saveCardsData);
router.post('/saveCategories', controller.saveCategories);

export default router;
