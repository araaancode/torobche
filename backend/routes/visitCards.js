// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const visitCardsCtrls = require("../controllers/visitCards");

router.get('/', visitCardsCtrls.getVisitCards);
router.get('/:id', visitCardsCtrls.getVisitCard);
router.post('/', upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), visitCardsCtrls.createVisitCard);

// router.put('/:id/update', visitCardsCtrls.updateMenu);
// router.put('/:id/update-cover-image', upload.single('coverImage'), visitCardsCtrls.updateMenuCoverImage);
// router.put('/:id/update-icon', upload.single('icon'), visitCardsCtrls.updateMenuIcon);
// router.delete('/:id', visitCardsCtrls.deleteMenu);

module.exports = router;