const express = require('express');
const router = express.Router();
const businessCardCtrls = require('../controllers/bussinessCards');

// Import middleware

// Public routes
router.get('/', businessCardCtrls.getBusinessCards);
router.get('/type/:businessType', businessCardCtrls.getBusinessCardsByType);
router.get('/search/nearby', businessCardCtrls.getNearbyBusinessCards);
router.get('/types/list', businessCardCtrls.getBusinessTypes);
router.get('/:id', businessCardCtrls.getBusinessCard);


router.post('/', businessCardCtrls.createBusinessCard);
router.get('/user/my-cards', businessCardCtrls.getMyBusinessCards);
router.put('/:id', businessCardCtrls.updateBusinessCard);
router.delete('/:id', businessCardCtrls.deleteBusinessCard);


// Additional admin routes can be added here

module.exports = router;