const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs')
const format = require('./format')

module.exports = class Search {

    static mapJsonSound() {
        let rawdata = fs.readFileSync('./sounds/sounds.json')
        let sound = JSON.parse(rawdata)
        return sound
    }

    static searchMatch(key) {
        let keyNormalize = format.removeDiacritics(key)
        let sounds = this.mapJsonSound();
        let matchIsOk = []

        for (const sound of sounds){
            let soundTitle = format.removeDiacritics(sound.title)
            let soundCharacter = format.removeDiacritics(sound.character)
            let soundEpisode = format.removeDiacritics(sound.episode)
            let soundFile = format.removeDiacritics(sound.file)

            if(soundTitle.includes(keyNormalize) ||
                soundEpisode.includes(keyNormalize) ||
                soundCharacter.includes(keyNormalize) ||
                soundFile.includes(keyNormalize)){
                    let tempMatch = []
                    tempMatch['title'] = soundTitle,
                    tempMatch['character'] = soundCharacter,
                    tempMatch['episode'] = soundEpisode,
                    tempMatch['file'] = soundFile
                    matchIsOk.push(tempMatch)
            }
        }
        return matchIsOk
    }

    static searchByCharacter(key) {
        let keyNormalize = format.removeDiacritics(key)
        let sounds = this.mapJsonSound();
        let matchIsOk = []

        for (const sound of sounds){
            let soundTitle = format.removeDiacritics(sound.title)
            let soundCharacter = format.removeDiacritics(sound.character)
            let soundEpisode = format.removeDiacritics(sound.episode)
            let soundFile = format.removeDiacritics(sound.file)

            if(soundCharacter.includes(keyNormalize)){
                let tempMatch = []
                    tempMatch['title'] = soundTitle,
                    tempMatch['character'] = soundCharacter,
                    tempMatch['episode'] = soundEpisode,
                    tempMatch['file'] = soundFile
                matchIsOk.push(tempMatch)
            }
        }
        return matchIsOk
    }

    static errorMessage(args){
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#cd341f')
            .setAuthor(format.firstLetterUppercase('Roi Loth'))
            .setDescription(format.firstLetterUppercase('Lorem ipsum dolor sit amet. Voilà. Et bien ça, par exemple, c\'est comme ' + args + ' ça veut absolument rien dire.'))
            .setThumbnail('https://img.xooimage.com/files3/3/a/e/roi-loth-3e577c.gif')
            .setFooter('Pas de correspondance');
        return errorEmbed
    }
}