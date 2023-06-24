const express = require('express');
const mongoose = require('mongoose');

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

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// qui permet de dire a node si je cherche http://localhost:3000/images/... de rediriger vers le dossier images et d'éviter l'erreur 404
app.use("/images", express.static(path.join(__dirname, "images"))); 

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;