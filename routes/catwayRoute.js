const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// Route pour lister tous les catways -> GET /catways
router.get('/', catwayController.getAllCatways);

// Route pour un catway spécifique -> GET /catways/:id
router.get('/:id', catwayController.getCatwayById);

module.exports = router;