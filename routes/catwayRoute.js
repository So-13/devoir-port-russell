const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// Route pour lister tous les catways -> GET /catways
router.get('/', catwayController.getAllCatways);

// Route pour un catway spécifique -> GET /catways/:id
router.get('/:id', catwayController.getCatwayById);

// Route pour créer un catway -> POST /catways
router.post('/', catwayController.createCatway);

// Route pour modifier l'état d'un catway -> PUT /catways/:id
router.put('/:id', catwayController.updateCatway);

// Route pour supprimer un catway -> DELETE /catways/:id
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;