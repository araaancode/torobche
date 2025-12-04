const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const foodsCtrls = require("../controllers/foods");

router.get('/', foodsCtrls.getFoods);
router.get('/:id', foodsCtrls.getFood);

router.post('/', upload.array('images', 10), foodsCtrls.createFood);


router.put('/:id/update', foodsCtrls.updateFood);
router.put('/:id/update-image', upload.array('images'), foodsCtrls.updateFoodImage);
router.delete('/:id/image/:imageIndex', foodsCtrls.deleteFoodImage);
router.delete('/:id', foodsCtrls.deleteFood);

router.post('/menu/:menuId/food/:foodId', foodsCtrls.addFoodToMenu);
router.delete('/menu/:menuId/food/:foodId', foodsCtrls.removeFoodFromMenu);

module.exports = router;