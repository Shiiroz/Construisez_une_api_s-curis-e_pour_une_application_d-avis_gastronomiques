const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    // UserId 
    userId: {
      type: String,
      required: true
    },
    // Nom de la sauce
    name: {
      type: String,
      required: true,
    },
    // fabricant de la sauce
    manufacturer: {
      type: String,
      required: true,
    },
    // description de la sauce
    description: {
      type: String,
      required: true,
    },
    // Ingredients dela sauce
    mainPepper: {
      type: String,
      required: true,
    },
    // l'url l'image de presentation de la sauce
    imageUrl: {
      type: String,
      required: true
    },
    // le niveau de la force
    heat: {
      type: Number,
      required: true
    },
    // nombre de Like reçu
    likes: {
      type: Number
    },
    // nombre de dislike reçu
    dislikes: {
      type: Number
    },
    // Utilisateurs qui Like la sauce
    usersLiked: {
      type: Array
    },
    // Utilisateur qui DisLike la sauce
    usersDisliked: {
      type: Array
    },
  })
  
  //on exporte le schema de la sauce
  module.exports = mongoose.model('Sauce', sauceSchema);