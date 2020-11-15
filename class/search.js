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

        for (const sound of sounds){
            let soundTitle = format.removeDiacritics(sound.title)
            let soundCharacter = format.removeDiacritics(sound.character)
            let soundEpisode = format.removeDiacritics(sound.episode)
            let soundFile = format.removeDiacritics(sound.file)
            let matchIsOk = new Array()

            if(soundTitle.includes(keyNormalize) ||
                soundEpisode.includes(keyNormalize) ||
                soundCharacter.includes(keyNormalize) ||
                soundFile.includes(keyNormalize)){
                    matchIsOk['title'] = soundTitle,
                    matchIsOk['character'] = soundCharacter,
                    matchIsOk['episode'] = soundEpisode,
                    matchIsOk['file'] = soundFile

                    return matchIsOk
            }
        }
    }
}