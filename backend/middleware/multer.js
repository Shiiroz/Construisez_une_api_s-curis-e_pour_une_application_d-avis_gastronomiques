// Importation du package multer pour la gestion des fichiers entrants dans les requêtes HTTP
const multer = require('multer');

// Dictionnaire des types MIME pour définir le format des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de multer pour spécifier où enregistrer les fichiers images et leur donner un nom unique
const storage = multer.diskStorage({

  // Destination d'enregistrement des images
  destination: (req, file, callback) => {
    // On spécifie le dossier 'images' créé dans le backend
    callback(null, 'images');
  },

  // Nom de fichier pour éviter les doublons
  filename: (req, file, callback) => {
    // On génère un nouveau nom en remplaçant les espaces du nom d'origine par des underscores
    let name = file.originalname.split(' ').join('_');
    let extension = MIME_TYPES[file.mimetype];
    name = name.replace("." + extension, "_");

    // On appelle le callback en passant null pour indiquer qu'il n'y a pas d'erreur
    // et on crée le nom de fichier complet en ajoutant un timestamp, un point et l'extension du fichier
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exportation du module multer configuré avec l'objet storage
// La méthode single indique qu'il s'agit d'un fichier unique
// et 'image' précise qu'il s'agit d'un fichier image
module.exports = multer({ storage: storage }).single('image');
