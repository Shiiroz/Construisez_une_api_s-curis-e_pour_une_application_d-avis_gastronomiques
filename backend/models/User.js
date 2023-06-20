const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// On crée notre schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
    // L'email doit être unique
    email: {
      type: String,
      unique: true,
      required: [true],
    },
    // enregistrement du mot de passe
    password: {
      type: String,
      required: [true]
    }
  });
  
  userSchema.plugin(uniqueValidator);
  module.exports = mongoose.model('User', userSchema);