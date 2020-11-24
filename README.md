# Bot Discord Kaamelott

Basé sur [kaamelott-soudboard](https://github.com/2ec0b4/kaamelott-soundboard). Merci à eux pour leur gros travail.

# Fonctionnement du bot

Pour ajouter le bot à votre server Discord suivez ce [lien](https://discord.com/api/oauth2/authorize?client_id=777521817232474143&permissions=260160&scope=bot)


Plusieurs commandes sont à votre disposition :

- `/hks `: Affiche un message d'aide

- `/ks [ARG]` : Joue un son aléatoire qui dispose d'une correspondance avec l'argument. Des arguments séparés par "_" forme un seul argument.

- `/sks [ARG]` : Vous envoie en DM tous les sons qui disposent d'une correspondance avec l'argument.

- `/cks [ARG]` : Joue le son en [ARG] dans le channel vocal de l'utilisateur.

# Lancement du bot

Au préalable installez Docker et Docker-compose sur votre machine.

Ensuite faites la commande :

```docker-compose up --build```

Cela va construire une image linux Alpine, avec toutes les dépendances nécessaires au bon fonctionnement du bot.
 
----
Créé avec **Node.JS** et **Discord.JS**.
