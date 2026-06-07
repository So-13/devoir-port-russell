const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour afficher la page de connexion
router.get('/login', (req, res) => {
    res.render('login');
});
// Route pour afficher le tableau de bord (page d'accueil)
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});
// Route pour lister tous les utilisateurs -> GET /users
router.get('/', userController.getAllUsers);

// Route pour créer un utilisateur -> POST /users
router.post('/', userController.createUser);

module.exports = router;
