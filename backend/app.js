const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const bodyParser = require('body-parser'); // Permet d'extraire l'objet JSON des requêtes POST

const path = require("path");

const app = express();

mongoose.connect('mongodb+srv://projet6:ryan@atlascluster.srnuj7i.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Utilise le middleware pour analyser le corps des requêtes en tant que JSON

app.use((req, res, next) => {
  // Configuration des en-têtes pour autoriser les requêtes provenant de différents domaines
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Indique à Node.js de servir les fichiers statiques du dossier "images" lorsqu'une requête correspond à "/images/..."
app.use("/images", express.static(path.join(__dirname, "images")));

app.use('/api/sauces', sauceRoutes); // Utilise les routes pour les sauces
app.use('/api/auth', userRoutes); // Utilise les routes pour l'authentification des utilisateurs

const imagesDossier = './images'; // Définition du chemin du dossier "images"

// Vérifier si le dossier "images" existe
if (!fs.existsSync(imagesDossier)) {
  // Créer le dossier "images" s'il n'existe pas
  fs.mkdirSync(imagesDossier);
}

module.exports = app; // Exporte l'application Express