import { Router } from 'express';
import Controller from '../controller/common.controller.js';
const controller = new Controller();

const router = Router();

router.get('/cards', controller.fetchCardsData);

export default router;
