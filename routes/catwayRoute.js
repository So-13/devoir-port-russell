const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const Catway = require('../models/Catway'); 

// Interface du tableau de bord (Vue EJS avec les vraies données)
router.get('/catways-dashboard', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways: catways });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des catways");
    }
});

// Routes de l'API CRUD
router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatway);
router.post('/delete/:id', catwayController.deleteCatway);

module.exports = router;