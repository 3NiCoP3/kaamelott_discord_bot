const Discord = require('discord.js');
const bot = new Discord.Client();
const Search = require('./class/search')
const format = require('./class/format')
require('dotenv').config('/.env')
const token = process.env['TOKEN']

bot.login(token);

bot.on('message', function (message) {
        let args = message.content.split(' ')
        let cmd = args.shift()
        args.join()
        let dataSearch = Search.searchMatch(args)

        switch (cmd) {

            case '/ks':
                message.delete({timeout: 5})
                try {
                    let randomSound = dataSearch[Math.floor(Math.random() * dataSearch.length)];
                    const characterCapitalized = format.firstLetterUppercase(randomSound.character)
                    message.channel.send(
                        "**" + characterCapitalized + "**",
                        {files: ["./sounds/" + randomSound.file]}
                    );
                } catch (error) {
                    message.author.send(Search.errorMessage(args))
                }
                break;

            case '/sks':
                message.delete({timeout: 5})

                if (typeof dataSearch === 'undefined' ||
                    dataSearch.length === 0 ||
                    args.length === 0) {
                    return message.author.send(Search.errorMessage(args))
                }
                for (let proposal of dataSearch) {
                    const proposalEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(format.firstLetterUppercase(proposal.character))
                        .setDescription(format.firstLetterUppercase(proposal.title))
                        .setThumbnail('https://i.imgur.com/4V7g6KY.gif')
                        .addFields(
                            {name: '\u200B', value: '\u200B'},
                            {name: "Cmd pour lancer le mp3", value: " /ks " + proposal.file, inline: true},
                            {name: "Cmd pour lancer le mp3 en vocal", value: " /cks " + proposal.file, inline: true}
                        )
                    message.author.send(proposalEmbed);

                }
                break;

            case '/hks':
                const helpEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setAuthor('Fonctionnement du Bot :')
                    .setDescription('Plusieurs commandes sont à votre disposition.')
                    .setThumbnail('https://i.imgur.com/4V7g6KY.gif')
                    .addFields(
                        {name: '\u200B', value: '\u200B'},
                        {
                            name: '/ks [ARG]',
                            value: 'Joue un son aléatoire qui dispose d\'une correspondance avec l\'argument. Des arguments séparés par "_" forme un seul argument.',
                            inline: true
                        },
                        {
                            name: '/sks [ARG]',
                            value: 'Vous envoie en DM tous les sons qui disposent d\'une correspondance avec l\'argument.',
                            inline: true
                        },
                        {
                            name: '/cks [ARG]',
                            value: 'Joue le son en argument dans le channel vocal de l\'utilisateur. L\' argument doit être de type "*.mp3"',
                            inline: true
                        },
                    )
                message.channel.send(helpEmbed);
                break;

            case '/cks':
                message.delete({timeout: 5})
                try {
                    message.member.voice.channel
                        .join()
                        .then(function (connection) {
                            connection.play('./sounds/' + args)
                        })
                } catch (e) {
                    message.author.send(new Discord.MessageEmbed()
                        .setColor('#cd341f')
                        .setAuthor(format.firstLetterUppercase('Roi Loth'))
                        .setDescription(format.firstLetterUppercase('Tu n\'es pas dans un salon vocal, le son ne peut être joué.'))
                        .setThumbnail('https://img.xooimage.com/files3/3/a/e/roi-loth-3e577c.gif'))
                }

        }
    }
)


