// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Upload instance
const menusCtrls = require("../controllers/menus");

// Use with function calls
router.get('/', menusCtrls.getMenus);
router.get('/:id', menusCtrls.getMenu);
router.post('/', upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), menusCtrls.createMenu); // WITH parentheses
router.put('/:id/update', menusCtrls.updateMenu);
router.put('/:id/update-cover-image', upload.single('coverImage'), menusCtrls.updateMenuCoverImage);
router.put('/:id/update-icon', upload.single('icon'), menusCtrls.updateMenuIcon);
router.delete('/:id', menusCtrls.deleteMenu);

module.exports = router;