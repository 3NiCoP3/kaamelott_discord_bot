const Discord = require('discord.js');
const bot = new Discord.Client();
const Search = require('./class/search')

bot.login('Nzc3NTIxODE3MjMyNDc0MTQz.X7Epng.ak3U-qkU4eq74xCeUVAtYgPjPaw');

bot.on('message', function(message)
    {
        if (message.content.startsWith('/ks')){
            let args = message.content.split(' ')
            args.shift()
            args.join()
            let dataSearch = Search.searchMatch(args)
            try {
                message.channel.send(
                    "> " + dataSearch.title,
                    {files: ["./sounds/" + dataSearch.file]}
                );
            }
            catch (error){
                message.author.send('Pas de correspondances')
            }
        }
    }
)


