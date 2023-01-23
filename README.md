# groupomania 
Projet MERN de réseau social 

# Principales fonctionnalitées:

Page de connexion
- Possibilité pour un utilisateur de se connecter ou de créer un compte s’il n’en possède pas.
- Possibilité pour un utilisateur de se déconnecter
- La session de l’utilisateur persiste pendant qu’il est connecté
- Les données de connexion doivent être sécurisées.

Page d’accueil 
- Les posts créés par les différents utilisateurs doivent s'afficher de façon antéchronologique

Création de post
- Un utilisateur doit pouvoir créer un post
- Un post doit pouvoir contenir du texte et une image.
- Un utilisateur doit aussi pouvoir modifier et supprimer ses posts

Système de like
- Un utilisateur doit pouvoir liker un post, une seule fois pour chaque post

# principales technologies utilisées
 coté frontend : 
 - React 
 - axios 
 - jwt

 coté backend : 
 - Node.js
 - Express
 - MongoDb 

# INSTALATION 

 - Clonez ce repository. 

 ## 1 : installation Backend
Depuis le dossier backend :
1.1 Copier à la racine du dossier Backend le fichier .env fourni séparement 
1.2 Ouvrez le dossier Backend dans un terminal 
1.3 Installez les dépendances en tapant la commande : "npm install".
1.4 Lancez le serveur en tapant la commande : "nodemon server" (ou node server).

Le serveur doit alors fonctionner sur "localhost" avec le port par défaut "4000'".

## 2 : installation frontend
2.1 Depuis le fichier frontend :
2.2 Ouvrez le dossier frontend dans une fenêtre de terminal
2.3 Installez les dépendances en tapant la commande : "npm install".
2.4 Lancer le serveur de développement en tapant la commande `npm start`

Le serveur de développement doit fonctionner sur `http://localhost:3000/`.