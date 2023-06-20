const express = require('express');
// On crée un router 
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Crée un nouvel utilisateur
router.post('/login', userCtrl.login); // Connecte un utilisateur

module.exports = router;