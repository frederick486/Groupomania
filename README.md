# groupomania 
Projet MERN de réseau social 

## Installation :
 - Clonez ce repository. 

### 1 : installation Backend
Depuis le dossier backend :<br />
    1.1 Coller le fichier .env fourni séparement à la racine du dossier Backend<br /> 
    1.2 Ouvrez le dossier Backend dans un terminal<br /> 
    1.3 Installez les dépendances en tapant la commande : `npm install`.<br />
    1.4 Lancez le serveur en tapant la commande : `nodemon server` (ou node server).

Le serveur doit alors fonctionner sur `localhost` avec le port par défaut `4000`.

### 2 : installation frontend
Depuis le fichier frontend :<br />
    2.1 Ouvrez le dossier frontend dans une fenêtre de terminal<br />
    2.2 Installez les dépendances en tapant la commande : `npm install`.<br />
    2.3 Lancer le serveur de développement en tapant la commande `npm start`

Le serveur de développement doit fonctionner sur `http://localhost:3000/`.

## Principales fonctionnalitées:

### Page de connexion
Connexion utilisateur :<br />
    1.1 Possibilité pour un utilisateur de se connecter ou de créer un compte s’il n’en possède pas. <br />
    1.2 Possibilité pour un utilisateur de se déconnecter <br />
    1.3 La session de l’utilisateur persiste pendant qu’il est connecté<br />
    1.4 Les données de connexion sont sécurisées.

### Page d’accueil 
Présentation de tous les posts :<br />
    2.1 Les posts créés par les différents utilisateurs s'affichent de façon antéchronologique<br />
    2.2 Les posts sont visibles par tous les visiteurs du site, connectés ou non

### Page post
Détails d'un post :<br />
    3.1 Les détails de chaque post est consultable par tous les visiteurs du site, connectés ou non

### Création de post
Précisions sur la création des posts :<br />
    4.1 Un utilisateur connecté peut créer un post<br />
    4.2 Un post peut contenir du texte et une image.<br />
    4.3 Un utilisateur connecté peut modifier et supprimer ses posts uniquement<br />
    4.4 Un utilisateur connecté peut laisser des commentaires sur ses posts et ceux des autres utilisateurs

### Système de like
Précisions sur le bouton like:<br />
    5.1 Un utilisateur connecté peut liker un post, une seule fois pour chaque post

## principales technologies utilisées
### coté frontend : 
React, react-router-dom, axios, jwt, jwt-decode

### coté backend : 
Node.js, Express, bcrypt, cors, dotenv, helmet, jsonwebtoken, mongoose, multer, La base de données est hébergée sur MongoDb 