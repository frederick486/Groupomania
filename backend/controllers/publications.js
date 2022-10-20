const Publication = require("../models/publication");

//Permet de modifier le système de fichiers
const fs = require("fs");

// création d'une Publication
exports.createPublication = (req, res, next) => {
    const publication = new Publication({
      title: req.body.title,
      body: req.body.body,
    });
    //Enregistrement dans la base de données
    publication.save()
      .then(() => res.status(201).json({ message: "Publication enregistrée !" }))
      .catch((error) => res.status(400).json({ error }))
  };


  // Récupération de toutes les sauces
exports.getAllPublication = (req, res, next) => {
  //Utilisation de la méthode find() du modèle Mongoose qui renvoit un tableau de toutes les Publication de LA base de données
    Publication.find()
      .then(publication => res.status(200).json(publication))
      .catch(error => res.status(400).json({ error: error }))
  };