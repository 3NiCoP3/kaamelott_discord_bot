const Discord = require('discord.js');
const bot = new Discord.Client();
const Search = require('./class/search')
const format = require('./class/format')

bot.login('Nzc3NTIxODE3MjMyNDc0MTQz.X7Epng.ak3U-qkU4eq74xCeUVAtYgPjPaw');

bot.on('message', function(message)
    {
        let args = message.content.split(' ')
        let cmd = args.shift()
        args.join()
        let dataSearch = Search.searchMatch(args)

        switch (cmd) {

            case '/ks':
                try {
                    let randomSound = dataSearch[Math.floor(Math.random() * dataSearch.length)];
                    const characterCapitalized = format.firstLetterUppercase(randomSound.character)
                    message.channel.send(
                        "**" + characterCapitalized +  "**" ,
                        {files: ["./sounds/" + randomSound.file]}
                    );
                }
                catch (error){
                    message.author.send('Pas de correspondances')
                }
                break;

            case '/sks':
                for(let proposal of dataSearch){
                    try {

                        const proposalEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setAuthor(format.firstLetterUppercase(proposal.character))
                            .setDescription(format.firstLetterUppercase(proposal.title))
                            .setThumbnail('https://i.imgur.com/4V7g6KY.gif') //photo du character
                            .addFields({ name: "Cmd pour lancer le mp3",
                                value: " /ks " + proposal.file})
                        message.author.send(proposalEmbed);
                    }
                    catch (error){
                        message.author.send('Pas de correspondances')
                    }
                }
                break;

            case '/cks':
                let characterSearch = Search.searchByCharacter(args)
                for(let proposal of characterSearch){
                    try {
                        const proposalEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setAuthor(format.firstLetterUppercase(proposal.character))
                            .setDescription(format.firstLetterUppercase(proposal.title))
                            .setThumbnail('https://i.imgur.com/4V7g6KY.gif') //photo du character
                            .addFields({ name: "Cmd pour lancer le mp3",
                                value: " /ks " + proposal.file})
                        message.author.send(proposalEmbed);
                    }
                    catch (error){
                        message.author.send('Pas de correspondances')
                    }
                }
        }
    }
)


