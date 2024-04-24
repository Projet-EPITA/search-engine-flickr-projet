# Project search-engine-flickr

[![build workflow](https://github.com/Projet-EPITA/search-engine-flickr-projet/actions/workflows/build.yml/badge.svg)](https://github.com/Projet-EPITA/search-engine-flickr-projet/actions)

[![codecov](https://codecov.io/gh/Projet-EPITA/search-engine-flickr-projet/branch/main/graph/badge.svg)](https://codecov.io/gh/Projet-EPITA/search-engine-flickr-projet)


Réaliser un moteur de recherche de photos qui exploite l’API de Yahoo Flickr ( https://www.flickr.com/services/api/ ), HTML/CSS (Bootstrap optionnel) & Angular. 

Ce moteur de recherche doit contenir un champ de recherche, des champs de filtrage (taille de l’image, date minimum d’upload de la photo, date maximale d’upload de la photo, tri grâce à divers paramètres, recherche NSFW, tags supplémentaires, appartient ou non à une galerie, etc.) et une zone qui permet de voir les photos soit par liste (comme le propose Google Images) soit dans un Slider avec des flèches gauche et droite. 

En cliquant sur une photo, on doit pouvoir obtenir les données (nom, etc.) de son auteur, les autres photos de l’auteur, les commentaires de la photo, la position géographique et tout autre élément que vous pourrez récupérer.

# Utilisation de l'API

Pour pouvoir intéragir avec l'API Flickr, il faut mettre sa clé dans le fichier src/app/environment.ts

# Lancer le projet

A la racine du projet, lance le projet avec la commande `ng serve`.
