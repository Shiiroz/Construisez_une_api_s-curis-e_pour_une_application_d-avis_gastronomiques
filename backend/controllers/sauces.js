// Récupération du modèle 'sauce'
const Sauce = require('../models/Sauce');
// Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs');

// Permet de créer une nouvelle sauce

exports.createSauce = (req, res, next) => {
  //let sauceData;

  try {
    sauceData = JSON.parse(req.body.sauce);
  } catch (error) {
    return res.status(400).json({ error: 'Données de sauce non valides' });
  }

  const sauce = new Sauce({
    ...sauceData,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });

  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};


// Permet de modifier une sauce

exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? (
    // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
      // On supprime l'ancienne image du serveur
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
      // On modifie les données et on ajoute la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  ) : ( // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
    // Si la modification ne contient pas de nouvelle image
    sauceObject = {
      ...req.body
    }
  )
  Sauce.updateOne(
      // On applique les paramètre de sauceObject
      {
        _id: req.params.id
      }, {
        ...sauceObject,
        _id: req.params.id
      }
    )
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

// Permet de supprimer la sauce

exports.deleteSauce = (req, res, next) => {
  // Avant de suppr l'objet, on va le chercher pour obtenir l'url de l'image et supprimer le fichier image de la base
  Sauce.findOne({
      _id: req.params.id
    })
    .then(sauce => {
      // Pour extraire ce fichier, on récupère l'url de la sauce, et on le split autour de la chaine de caractères, donc le nom du fichier
      const filename = sauce.imageUrl.split('/images/')[1];
      // Avec ce nom de fichier, on appelle unlink pour suppr le fichier
      fs.unlink(`images/${filename}`, () => {
        // On supprime le document correspondant de la base de données
        Sauce.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Sauce supprimée !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};

// Permet de récupérer une seule sauce, identifiée par son id depuis la base MongoDB

exports.getOneSauce = (req, res, next) => {
  // On utilise la méthode findOne et on lui passe l'objet de comparaison, on veut que l'id de la sauce soit le même que le paramètre de requête
  Sauce.findOne({
      _id: req.params.id
    })
    // Si ok on retourne une réponse et l'objet
    .then(sauce => res.status(200).json(sauce))
    // Si erreur on génère une erreur 404 pour dire qu'on ne trouve pas l'objet
    .catch(error => res.status(404).json({
      error
    }));
};

// Permet de récuperer toutes les sauces de la base MongoDB

exports.getAllSauce = (req, res, next) => {
  // On utilise la méthode find pour obtenir la liste complète des sauces trouvées dans la base, l'array de toutes les sauves de la base de données
  Sauce.find()
    // Si OK on retourne un tableau de toutes les données
    .then(sauces => res.status(200).json(sauces))
    // Si erreur on retourne un message d'erreur
    .catch(error => res.status(400).json({
      error
    }));
};
