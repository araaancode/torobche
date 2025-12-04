// routes/visitCardRoutes.js - فوق ساده
const express = require('express');
const router = express.Router();
const visitCardCtlrs = require('../controllers/visitCards');

router.get('/', visitCardCtlrs.getAllCards);
router.get('/:id', visitCardCtlrs.getCard);
router.post('/', visitCardCtlrs.createCardFromTemplate);
router.put('/:id', visitCardCtlrs.updateCard);
router.delete('/:id', visitCardCtlrs.deleteCard);

router.get('/template/:templateId', visitCardCtlrs.getCardsByTemplate);
router.patch('/:id/toggle', visitCardCtlrs.toggleCardStatus);

module.exports = router;