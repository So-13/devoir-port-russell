const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour lister tous les utilisateurs -> GET /users
router.get('/', userController.getAllUsers);

// Route pour créer un utilisateur -> POST /users
router.post('/', userController.createUser);

module.exports = router;
