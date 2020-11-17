const Discord = require('discord.js');
const bot = new Discord.Client();
const Search = require('./class/search')
const format = require('./class/format')

bot.login('Nzc3NTIxODE3MjMyNDc0MTQz.X7Epng.ak3U-qkU4eq74xCeUVAtYgPjPaw');

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

                if (typeof dataSearch === 'undefined' || dataSearch.length === 0) {
                    message.author.send(Search.errorMessage(args))
                }
                for (let proposal of dataSearch) {
                    const proposalEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setAuthor(format.firstLetterUppercase(proposal.character))
                        .setDescription(format.firstLetterUppercase(proposal.title))
                        .setThumbnail('https://i.imgur.com/4V7g6KY.gif')
                        .addFields({
                            name: "Cmd pour lancer le mp3",
                            value: " /ks " + proposal.file
                        })
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
                        {name: '/ks [ARG]', value: 'Joue un son aléatoire qui dispose d\'une correspondance avec l\'argument.', inline: true },
                        {name: '/sks [ARG]', value: 'Vous envoie en DM les sons qui dispose d\'une correspondance avec l\'argument.', inline: true},
                    )
                message.channel.send(helpEmbed);
        }
    }
)


