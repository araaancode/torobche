// routes/visitCardRoutes.js
const express = require('express');
const router = express.Router();
const visitCardController = require('../controllers/visitCardController');
const { upload } = require('../config/multerConfig');

const cardUpload = upload.fields([
    { name: 'customLogo', maxCount: 1 },
    { name: 'customProfileImage', maxCount: 1 }
]);

router.get('/', visitCardController.getAllCards);
router.get('/code/:code', visitCardController.getCardByCode);
router.get('/:id', visitCardController.getCardById);
router.get('/user/:userId', visitCardController.getUserCards);
router.get('/:id/stats', visitCardController.getCardStats);

router.post('/create', cardUpload, visitCardController.createCardFromTemplate);
router.put('/:id', cardUpload, visitCardController.updateCard);
router.delete('/:id', visitCardController.deleteCard);
router.patch('/:id/status', visitCardController.updateCardStatus);

router.post('/:id/track-share', visitCardController.trackShare);
router.post('/:id/track-contact', visitCardController.trackContact);

module.exports = router;